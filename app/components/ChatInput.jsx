import React, { useState } from "react";
import { ArrowUp, CodeXml, Settings2, VenetianMask } from "lucide-react";
import useApiSettingsStore from "../store/useApiSettingsStore";
import useCustomPromptsStore from "../store/useCustomPromptsStore";
import CustomPromptsModal from "./CustomPromptsModal";

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
    <div className="bg-[var(--input-bg)]/80 rounded-[var(--border-radius-md)] flex flex-col flex-shrink-0 w-full max-w-2xl h-auto min-h-[100px] p-4 justify-center bottom-0">
      <div className="flex flex-col">
        {/* Textarea placeholder with instructions */}
        <div className="flex items-start justify-start mb-4 pb-4 text-[var(--character-message-color)] text-[1.1em] font-normal leading-normal tracking-[-0.32px] w-full">
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
              className="border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-90  hover:bg-green-200/20 hover:text-green-100 hover:border-green-500/40 transition-all duration-150"
              aria-label="Configure settings"
              type="button"
              id="API_SETTINGS"
              onClick={() => useApiSettingsStore.getState().openModal()}
            >
              {/* Configuration icon (slider) */}
              <div className="w-4.5 h-3.5 opacity-50 flex flex-row items-center justify-center">
                <Settings2 size={16} />
              </div>
            </button>
            <button
            id="PROMPTS"
              className="border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:opacity-100 hover:bg-green-200/20 hover:text-green-100 hover:border-green-500/40 transition-all duration-150"
              aria-label="Configure settings"
              type="button"
              onClick={() => useCustomPromptsStore.getState().openModal()}
            >
              {/* Configuration icon (slider) */}
              <div className="w-4.5 h-3.5 opacity-50 flex flex-row items-center justify-center">
                <CodeXml size={15} />
              </div>
            </button>
            <button
              className="border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] text-white h-8 flex items-center justify-center cursor-pointer  hover:bg-green-200/20 hover:text-white hover:border-green-500/40 transition-all duration-150 px-3 text-sm"
              aria-label="Configure settings"
              type="button"
            >
              {/* Configuration icon (slider) */}
              <div className="opacity-50 flex flex-row items-center justify-center gap-1">
                Characters
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
      <CustomPromptsModal />
    </div>
  );
}
