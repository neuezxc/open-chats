import React from "react";
import { ArrowUp, CodeXml, Settings2 } from "lucide-react";

/**
 * Props interface for the ChatPage component
 * @typedef {Object} ChatPageProps
 * @property {string} [characterName] - Name of the character in the chat
 * @property {Array<Message>} [messages] - Array of message objects
 */

/**
 * Message object structure
 * @typedef {Object} Message
 * @property {number} id - Unique identifier for the message
 * @property {'character' | 'user'} type - Type of message sender
 * @property {string} content - Content of the message
 * @property {string} [sender] - Name of the sender (for character messages)
 */

/**
 * ChatPage Component
 * A responsive chat interface with character and user messages
 *
 * This component implements:
 * - Responsive design using Tailwind CSS utility classes
 * - Flexbox layout for proper alignment and spacing
 * - CSS custom properties for consistent theming
 * - Accessible UI elements with proper ARIA attributes
 * - Reusable and customizable through props
 *
 * @param {ChatPageProps} props - Component props
 * @returns {JSX.Element} ChatPage component
 */
export default function ChatPage({
  characterName = "Character Name",
  messages = [
    {
      id: 1,
      type: "character",
      content:
        "Hey there! The usual today? Or are we feeling adventurous and trying something new?",
      sender: "Character Name",
    },
    {
      id: 2,
      type: "user",
      content:
        "Hmm, maybe something new. What do you recommend that's not too sweet?",
    },
  ],
}) {
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
            {characterName}
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
                message.type === "character" ? "mb-4" : "mb-4 md:mb-0"
              }`}
            >
              {message.type === "character" ? (
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
