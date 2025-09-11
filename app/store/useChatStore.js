import { create } from "zustand";

const useChatStore = create((set) => ({
  api_key: process.env.OPENROUTER_API_KEY,
  setApiKey: (value) => set({ api_key: value }),
}));
export default useChatStore;
