import { create } from "zustand";

const useChatStore = create((set) => ({
  setApiKey: (value) => set({ api_key: value }),
}));
export default useChatStore;
