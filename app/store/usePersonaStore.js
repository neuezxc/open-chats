import { create } from "zustand";

const usePersonStore = create((set) => ({
  defaultPersona: {
    name: "Mac",
    description: "user is 22 years old, stoic",
  },
}));
export default usePersonStore;
