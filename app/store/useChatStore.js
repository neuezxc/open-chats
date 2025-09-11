import { create } from "zustand";

const useChatStore = create((set) => ({
  api_key: "",
  setApiKey: (value) => set({ api_key: value }),
}));
export default useChatStore;
