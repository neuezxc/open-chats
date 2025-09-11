import { create } from "zustand";

const useCharacterStore = create((set) => ({
  defaultCharacter: {
    name: "Hayeon",
    image: "hayeon.png",
    bio: "Hayeon is a streamer, gal",
    description: "hayeon is 22 years old, grumpy",
    scenario: "{{user}} and hayeon are couple living together",
    InitialMessage: "Yo?? *looking at you*",
    messages: [],
  },
  updateCharacterMessages: (newMessages) =>
    set((state) => ({
      defaultCharacter: {
        ...state.defaultCharacter,
        messages: newMessages,
      },
    })),
}));
export default useCharacterStore;
