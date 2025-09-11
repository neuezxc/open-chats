import React, { useState } from "react";
import { ArrowUp, CodeXml, Settings2 } from "lucide-react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [userChat, setUserChat] = useState("");

  const handleSendMessage = () => {
    if (userChat.trim() === "") return;
    if (isLoading) return;

    onSendMessage(userChat);
    setUserChat("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[var(--input-bg)] rounded-[var(--border-radius-md)] flex flex-col flex-shrink-0 w-full max-w-2xl h-auto min-h-[154px] p-4 justify-center">
      <div className="flex flex-col">
        {/* Textarea placeholder with instructions */}
        <div className="flex items-start justify-start mb-4 pb-4 text-[var(--character-message-color)] text-[1.2em] font-normal leading-normal tracking-[-0.32px] font-['Alegreya_Sans'] w-full">
          <textarea
            name=""
            id=""
            placeholder="Enter to send chat + Enter for linebreak."
            className="w-full"
            value={userChat}
            onChange={(e) => setUserChat(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          ></textarea>
        </div>

        {/* Input Tools - Send and configuration buttons */}
        <div className="flex flex-row flex-grow flex-shrink-0 justify-between items-start gap-4 h-auto">
          <div className="flex flex-row justify-start items-start gap-1 w-8 h-8">
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
          <div className="flex flex-row justify-start items-start gap-0 w-8 h-8">
            <button
              className="bg-[var(--send-button-bg)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="Send message"
              type="button"
              onClick={handleSendMessage}
              disabled={isLoading}
            >
              {/* Send icon (upward arrow) */}
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}