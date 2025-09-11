"use client";

import React, { useState } from "react";
import usePromptStore from "../store/usePromptStore";
import useCharacterStore from "../store/useCharacterStore";
import usePersonStore from "../store/usePersonaStore";
import useChatStore from "../store/useChatStore";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ApiSettingsModal from "./ApiSettingsModal";
import useApiSettingsStore from "../store/useApiSettingsStore";

export default function ChatPage() {
  const { defaultPersona } = usePersonStore();
  const { defaultCharacter } = useCharacterStore();
  const { jailbreak, role, memory, instruction } = usePromptStore();
  const { api_key } = useChatStore();
  const {
    apiKey,
    modelId,
    temperature,
    maxTokens,
    contextWindow,
    repetitionPenalty,
    frequencyPenalty,
    presencePenalty,
    topP
  } = useApiSettingsStore();

  const systemPrompt = () => {
    // Helper function to handle empty/undefined values
    const getValue = (value, fallback = "") => {
      return value === undefined || value === null || value.trim() === ""
        ? fallback
        : value;
    };

    // Helper function to process templates with user/char replacement
    const processTemplate = (template, fallback = "") => {
      const processed = getValue(template, fallback);
      if (processed === fallback) return fallback;

      return processed
        .replace(/{{user}}/g, defaultPersona.name)
        .replace(/{{char}}/g, defaultCharacter.name);
    };

    const replacements = {
      jailbreak: processTemplate(jailbreak),
      role: processTemplate(role),
      char: getValue(defaultCharacter.name, "Character"),
      character_description: processTemplate(defaultCharacter.description),
      user: getValue(defaultPersona.name, "User"),
      user_description: processTemplate(defaultPersona.description),
      scenario: processTemplate(defaultCharacter.scenario),
      memory: processTemplate(memory),
      instruction: processTemplate(instruction),
    };

    const template = `
    {{jailbreak}}
    {{role}}
    {{character_description}}
    {{user_description}}
    [Scenario:{{scenario}}]
    {{memory}}
    {{instruction}}
  `;

    console.log("Processed role:", replacements.role);

    // Final processing with fallback for any unexpected missing values
    return template
      .replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return replacements[key] !== undefined ? replacements[key] : "";
      })
      .trim();
  };
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: systemPrompt(),
    },
    {
      role: "assistant",
      content: defaultCharacter.InitialMessage,
    },
 ]);
  
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(userChat) {
    // Validate input
    if (userChat.trim() === "") return;
    if (isLoading) return;

    try {
      // Create new messages array with user message
      const newUserMessage = { role: "user", content: userChat };
      const updatedMessages = [...messages, newUserMessage];

      // Update UI immediately with user message
      setMessages(updatedMessages);
      setIsLoading(true);

      // Call API with updated messages including user's message
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey || api_key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: modelId,
            messages: updatedMessages,
            temperature: temperature,
            max_tokens: maxTokens,
            context_window: contextWindow,
            repetition_penalty: repetitionPenalty,
            frequency_penalty: frequencyPenalty,
            presence_penalty: presencePenalty,
            top_p: topP,
          }),
        }
      );

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid API response structure");
      }

      // Add assistant's response to messages
      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      console.log(systemPrompt());
    } catch (error) {
      // Handle errors (network issues, API errors, etc.)
      console.error("Error sending message:", error);
      // You might want to show an error message to the user here
      // For example, you could add an error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  }
  return (
    <>
      {/* Main container with responsive padding and full height */}
      <div
        className="relative flex flex-col items-center h-screen w-full bg-[var(--chat-background)] p-4 md:p-8"
        role="main"
      >
        {/* Chat Header - Centered character name */}
        <div className="flex-shrink-0 flex justify-center items-center w-full max-w-4xl h-5 pb-4 md:h-[20px] p">
          <div className="flex-shrink-0 flex justify-center items-center">
            <span className="text-[var(--character-name-color)]  md:text-sm font-medium leading-normal tracking-[-0.32px] ">
              {defaultCharacter.name}
            </span>
          </div>
        </div>

        {/* Chat Body - Container for messages with responsive padding */}
        <MessageList messages={messages} />

        {/* Input Area - Chat input with action buttons */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />

        {/* Disclaimer - AI notice */}
        <div className="justify-center items-center mt-2 hidden lg:flex">
          <span className="text-[var(--disclaimer-color)] text-sm font-normal leading-normal tracking-[-0.24px] ">
            This is an AI-generated persona, not a real person.
          </span>
        </div>
      </div>
      <ApiSettingsModal />
    </>
  );
}
