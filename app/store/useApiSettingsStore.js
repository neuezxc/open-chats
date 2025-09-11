import { create } from "zustand";

const useApiSettingsStore = create((set) => ({
  // Connection settings
  apiKey: "",
  modelId: "openrouter/sonoma-dusk-alpha",
  
  // Parameter settings
  temperature: 0.7,
  maxTokens: 2048,
  contextWindow: 4096,
  
  // Advanced settings
  repetitionPenalty: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
  topP: 0.8,
  
  // Modal state
  isModalOpen: false,
  
  // Actions to update settings
  setApiKey: (value) => set({ apiKey: value }),
  setModelId: (value) => set({ modelId: value }),
  setTemperature: (value) => set({ temperature: value }),
  setMaxTokens: (value) => set({ maxTokens: value }),
  setContextWindow: (value) => set({ contextWindow: value }),
  setRepetitionPenalty: (value) => set({ repetitionPenalty: value }),
  setFrequencyPenalty: (value) => set({ frequencyPenalty: value }),
  setPresencePenalty: (value) => set({ presencePenalty: value }),
  setTopP: (value) => set({ topP: value }),
  
  // Modal actions
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  
  // Action to reset to defaults
  resetToDefaults: () => set({
    temperature: 0.7,
    maxTokens: 2048,
    contextWindow: 4096,
    repetitionPenalty: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    topP: 0.8,
  }),
}));

export default useApiSettingsStore;