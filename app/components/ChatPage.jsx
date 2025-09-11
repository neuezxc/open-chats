"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, CodeXml, Settings2 } from "lucide-react";
import usePromptStore from "../store/usePromptStore";
import useCharacterStore from "../store/useCharacterStore";
import usePersonStore from "../store/usePersonaStore";
import useChatStore from "../store/useChatStore";

export default function ChatPage() {
  const { defaultPersona } = usePersonStore();
  const { defaultCharacter } = useCharacterStore();
  const { jailbreak, role, memory, instruction } = usePromptStore();
  const { api_key } = useChatStore();

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

  const [userChat, setUserChat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(messages);
    console.log(systemPrompt());
  }, messages);

  async function sendMessage() {
    // Validate input
    if (userChat.trim() === "") return;

    // Prevent sending new messages while waiting for a response
    if (isLoading) return;

    try {
      // Create new messages array with user message
      const newUserMessage = { role: "user", content: userChat };
      const updatedMessages = [...messages, newUserMessage];

      // Update UI immediately with user message
      setMessages(updatedMessages);
      setUserChat("");
      setIsLoading(true);

      // Call API with updated messages including user's message
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openrouter/sonoma-dusk-alpha",
            messages: updatedMessages,
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
    // Main container with responsive padding and full height
    <div
      className="flex flex-col items-center h-screen w-full bg-[var(--chat-background)] p-4 md:p-8"
      role="main"
    >
      {/* Chat Header - Centered character name */}
      <div className="flex-shrink-0 flex justify-center items-center w-full max-w-4xl h-11 md:h-[45px] py-3">
        <div className="flex-shrink-0 flex justify-center items-center">
          <span className="text-[var(--character-name-color)] text-lg md:text-xl font-medium leading-normal tracking-[-0.32px] font-['Alegreya_Sans']">
            characterName
          </span>
        </div>
      </div>

      {/* Chat Body - Container for messages with responsive padding */}
      <div className="flex flex-col items-center w-full max-w-2xl flex-grow py-4 md:py-[45px] overflow-y-auto">
        <div className="flex flex-col flex-grow flex-shrink-0 justify-start items-start gap-0 w-full">
          {/* Map through messages and render based on type */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.role === "assistant" ? "mb-4" : "mb-4 md:mb-0"
              }`}
            >
              {message.role === "assistant" ? (
                // Character message with avatar and text
                <div className="flex flex-row flex-grow flex-shrink-0 items-start gap-3 md:gap-[13px] w-full">
                  {/* Character avatar placeholder */}
                  <div
                    className="bg-[var(--character-image-bg)] rounded-[var(--border-radius-sm)] w-10 md:w-[50px] h-10 md:h-[50px] flex-shrink-0"
                    aria-hidden="true"
                  ></div>
                  <div className="flex flex-col justify-center items-start gap-[var(--spacing-xs)] w-full max-w-[450px]">
                    {/* Character name label */}
                    <span className="text-[var(--character-name-color)] text-lg md:text-xl font-medium leading-normal tracking-[-0.4px] font-['Alegreya_Sans'] block">
                      {message.sender}:
                    </span>
                    {/* Character message content */}
                    <span className="text-[var(--character-message-color)] text-lg md:text-xl font-normal leading-normal tracking-[-0.4px] font-['Alegreya_Sans'] block">
                      {message.content}
                    </span>
                  </div>
                </div>
              ) : (
                // User message in a bubble on the right
                <div className="flex self-end w-full justify-end">
                  <div className="bg-[var(--user-bubble-bg)] rounded-[var(--border-radius-md)] w-full max-w-[382px] h-auto min-h-[76px] p-4 flex-shrink-0">
                    <span className="text-[var(--user-message-color)] text-lg md:text-xl font-normal leading-normal tracking-[-0.4px] font-['Alegreya_Sans'] block">
                      {message.content}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Area - Chat input with action buttons */}
      <div className="bg-[var(--input-bg)] rounded-[var(--border-radius-md)] flex flex-col flex-shrink-0 w-full max-w-2xl h-auto min-h-[154px] p-4 justify-center">
        <div className="flex flex-col">
          {/* Textarea placeholder with instructions */}
          <div className="flex items-start  justify-start mb-4 pb-4 text-[var(--character-message-color)] text-[1.2em] font-normal leading-normal tracking-[-0.32px] font-['Alegreya_Sans'] w-full">
            <textarea
              name=""
              id=""
              placeholder="Enter to send chat + Enter for linebreak."
              className="w-full"
              value={userChat}
              onChange={(e) => setUserChat(e.target.value)}
            ></textarea>
          </div>

          {/* Input Tools - Send and configuration buttons */}
          <div className="flex flex-row flex-grow flex-shrink-0 justify-between items-start gap-4 h-auto">
            <div className="flex flex-row  justify-start items-start gap-1 w-8 h-8">
              <button
                className="border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                aria-label="Configure settings"
                type="button"
              >
                {/* Configuration icon (slider) */}
                <div className="w-4.5 h-3.5 opacity-29 flex flex-row items-center justify-center">
                  <Settings2 size={16} />
                </div>
              </button>
              <button
                className="border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-100 hover:text-white transition-opacity"
                aria-label="Configure settings"
                type="button"
              >
                {/* Configuration icon (slider) */}
                <div className="w-4.5 h-3.5 opacity-29 flex flex-row items-center justify-center">
                  <CodeXml size={15} />
                </div>
              </button>
            </div>
            <div className="flex flex-rowjustify-start items-start gap-0 w-8 h-8 ">
              <button
                className="bg-[var(--send-button-bg)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                aria-label="Send message"
                type="button"
                onClick={sendMessage}
              >
                {/* Send icon (upward arrow) */}
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer - AI notice */}
      <div className="flex justify-center items-center mt-4">
        <span className="text-[var(--disclaimer-color)] text-sm font-normal leading-normal tracking-[-0.24px] font-['Alegreya_Sans']">
          This is an AI-generated persona, not a real person.
        </span>
      </div>
    </div>
  );
}
