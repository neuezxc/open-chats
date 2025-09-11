import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCustomPromptsStore = create(
  persist(
    (set, get) => ({
      // List of custom prompts
      prompts: [],
      
      // Modal state
      isModalOpen: false,
      
      // Currently selected prompt for editing
      selectedPrompt: null,
      
      // Currently active prompt (applied for use)
      activePrompt: null,
      
      // Form state for creating/editing prompts
      formData: {
        name: "",
        content: "",
      },
      
      // Form errors
      formErrors: {},
      
      // Actions to update prompts
      setPrompts: (prompts) => set({ prompts }),
      
      addPrompt: (prompt) => set((state) => ({
        prompts: [...state.prompts, prompt]
      })),
      
      updatePrompt: (id, updatedPrompt) => set((state) => ({
        prompts: state.prompts.map(prompt =>
          prompt.id === id ? { ...prompt, ...updatedPrompt } : prompt
        )
      })),
      
      deletePrompt: (id) => set((state) => ({
        // If deleting the active prompt, clear the active prompt
        activePrompt: state.activePrompt && state.activePrompt.id === id ? null : state.activePrompt,
        prompts: state.prompts.filter(prompt => prompt.id !== id)
      })),
      
      // Modal actions
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({
        isModalOpen: false,
        selectedPrompt: null,
        formData: { name: "", content: "" },
        formErrors: {}
      }),
      
      // Select a prompt for editing
      selectPrompt: (prompt) => set({
        selectedPrompt: prompt,
        formData: { name: prompt.name, content: prompt.content }
      }),
      
      // Activate a prompt for use in chat
      activatePrompt: (prompt) => set({ activePrompt: prompt }),
      
      // Deactivate the current prompt (revert to default)
      deactivatePrompt: () => set({ activePrompt: null }),
      
      // Form actions
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      
      setFormErrors: (errors) => set({ formErrors: errors }),
      
      clearFormErrors: () => set({ formErrors: {} }),
      
      // Apply a prompt (to be used in chat)
      applyPrompt: (prompt) => {
        // This would be used to apply the prompt to the current chat session
        // Implementation would depend on how prompts are used in the app
      },
    }),
    {
      name: "custom-prompts-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCustomPromptsStore;