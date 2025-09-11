import React, { useState } from "react";
import useApiSettingsStore from "../store/useApiSettingsStore";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ApiSettingsModal() {
  const {
    isModalOpen,
    closeModal,
    apiKey,
    modelId,
    temperature,
    maxTokens,
    contextWindow,
    repetitionPenalty,
    frequencyPenalty,
    presencePenalty,
    topP,
    setApiKey,
    setModelId,
    setTemperature,
    setMaxTokens,
    setContextWindow,
    setRepetitionPenalty,
    setFrequencyPenalty,
    setPresencePenalty,
    setTopP,
  } = useApiSettingsStore();

  const [activeTab, setActiveTab] = useState("connection");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // If modal is not open, don't render anything
  if (!isModalOpen) return null;

  const handleSave = () => {
    // In a real implementation, you might want to validate the settings here
    closeModal();
 };

  const handleCancel = () => {
    // Reset any unsaved changes if needed
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--input-bg)] rounded-[var(--border-radius-md)] w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header - Fixed */}
        <div className="p-4 border-b border-[var(--config-button-border)] flex-shrink-0">
          <h2 className="text-xl font-medium text-[var(--character-name-color)]">API Settings</h2>
        </div>

        {/* Tab Navigation - Fixed */}
        <div className="flex border-b border-[var(--config-button-border)] flex-shrink-0">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "connection"
                ? "text-[var(--character-name-color)] border-b-2 border-[var(--send-button-bg)]"
                : "text-[var(--character-message-color)]"
            }`}
            onClick={() => setActiveTab("connection")}
          >
            Connection
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === "parameters"
                ? "text-[var(--character-name-color)] border-b-2 border-[var(--send-button-bg)]"
                : "text-[var(--character-message-color)]"
            }`}
            onClick={() => setActiveTab("parameters")}
          >
            Parameters
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto flex-grow">
          <div className="p-6">
            {/* Connection Tab */}
            {activeTab === "connection" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-[var(--character-name-color)] mb-2">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key here"
                    className="w-full bg-[var(--background)] border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] p-3 text-[var(--character-message-color)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--character-name-color)] mb-2">Model</label>
                  <input
                    type="text"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    placeholder="e.g., gpt-4-turbo, claude-3-opus-20240229"
                    className="w-full bg-[var(--background)] border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] p-3 text-[var(--character-message-color)]"
                  />
                </div>
              </div>
            )}

            {/* Parameters Tab */}
            {activeTab === "parameters" && (
              <div className="space-y-6">
                {/* Temperature */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[var(--character-name-color)]">Temperature</label>
                    <span className="text-[var(--character-message-color)]">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Max Tokens */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[var(--character-name-color)]">Max Tokens</label>
                    <span className="text-[var(--character-message-color)]">{maxTokens}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Context Window */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-[var(--character-name-color)]">Context Window</label>
                    <span className="text-[var(--character-message-color)]">{contextWindow}</span>
                  </div>
                  <input
                    type="range"
                    min="1024"
                    max="131072"
                    value={contextWindow}
                    onChange={(e) => setContextWindow(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Advanced Settings Toggle */}
                <div className="border-t border-[var(--config-button-border)] pt-4">
                  <button
                    className="flex items-center justify-between w-full py-2 text-[var(--character-name-color)]"
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  >
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    {showAdvancedSettings ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                  
                  {/* Advanced Settings Content */}
                  {showAdvancedSettings && (
                    <div className="mt-4 space-y-4">
                      {/* Repetition Penalty */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <label className="text-[var(--character-name-color)]">Repetition Penalty</label>
                            <p className="text-xs text-[var(--disclaimer-color)] mt-1">
                              Prevents the model from repeating the same phrases. Higher values reduce repetition.
                            </p>
                          </div>
                          <span className="text-[var(--character-message-color)]">{repetitionPenalty}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="2"
                          step="0.01"
                          value={repetitionPenalty}
                          onChange={(e) => setRepetitionPenalty(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      {/* Frequency Penalty */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <label className="text-[var(--character-name-color)]">Frequency Penalty</label>
                            <p className="text-xs text-[var(--disclaimer-color)] mt-1">
                              Encourages using different words by penalizing common ones. Higher values increase word diversity.
                            </p>
                          </div>
                          <span className="text-[var(--character-message-color)]">{frequencyPenalty}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.01"
                          value={frequencyPenalty}
                          onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      {/* Presence Penalty */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <label className="text-[var(--character-name-color)]">Presence Penalty</label>
                            <p className="text-xs text-[var(--disclaimer-color)] mt-1">
                              Encourages introducing new topics. Higher values make new concepts more likely.
                            </p>
                          </div>
                          <span className="text-[var(--character-message-color)]">{presencePenalty}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.01"
                          value={presencePenalty}
                          onChange={(e) => setPresencePenalty(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      {/* Top-P */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <label className="text-[var(--character-name-color)]">Top-P (Nucleus Sampling)</label>
                            <p className="text-xs text-[var(--disclaimer-color)] mt-1">
                              Controls the variety of response choices. Lower values lead to more focused and deterministic outputs.
                            </p>
                          </div>
                          <span className="text-[var(--character-message-color)]">{topP}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={topP}
                          onChange={(e) => setTopP(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer - Fixed */}
        <div className="p-4 border-t border-[var(--config-button-border)] flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-[var(--config-button-border)] rounded-[var(--border-radius-sm)] text-[var(--character-message-color)] hover:bg-[var(--background)]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[var(--send-button-bg)] rounded-[var(--border-radius-sm)] text-white hover:opacity-90"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}