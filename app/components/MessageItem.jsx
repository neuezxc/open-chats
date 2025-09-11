import React from "react";
import useCharacterStore from "../store/useCharacterStore";

export default function MessageItem({ message }) {
  const { defaultCharacter } = useCharacterStore();
  // Don't render system messages
  if (message.role === "system") {
    return null;
  }

  if (message.role === "assistant") {
    // Character message with avatar and text
    return (
      <div
        key={message.id}
        className={`flex w-full gap-5 mb-4`}
      >
        <div className="flex flex-row flex-grow items-start gap-3 md:gap-[13px] w-full">
          {/* Character avatar placeholder */}
          <div
            className="bg-[var(--character-image-bg)] rounded-[var(--border-radius-sm)] w-10 md:w-[50px] h-10 md:h-[50px] flex-shrink-0"
            aria-hidden="true"
          ></div>
          <div className="flex flex-col justify-center items-start gap-[var(--spacing-xs)] w-full max-w-full md:max-w-[85%] lg:max-w-[75%]">
            {/* Character name label */}
            <span className="text-[var(--character-name-color)] text-base md:text-lg font-medium leading-normal tracking-[-0.4px] block">
              {(message.name || defaultCharacter.name)}
            </span>
            {/* Character message content */}
            <span className="text-[var(--character-message-color)] text-base md:text-normal font-normal leading-normal tracking-[-0.4px] whitespace-pre-wrap break-words">
              {message.content}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    // User message in a bubble on the right
    return (
      <div
        key={message.id}
        className={`flex w-full mb-4 md:mb-0`}
      >
        <div className="flex self-end w-full justify-end">
          <div className="bg-[var(--user-bubble-bg)] rounded-[var(--border-radius-md)] w-auto max-w-full md:max-w-[85%] lg:max-w-[75%] p-4">
            <p className="text-[var(--user-message-color)] text-base md:text-normal font-normal leading-normal tracking-[-0.4px] whitespace-pre-wrap break-words">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
}