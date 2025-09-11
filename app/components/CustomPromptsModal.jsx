import React, { useState, useEffect } from "react";
import useCustomPromptsStore from "../store/useCustomPromptsStore";
import useCharacterStore from "../store/useCharacterStore";
import usePersonStore from "../store/usePersonaStore";
import { X } from "lucide-react";
import {
  PLACEHOLDERS,
  validatePromptForm,
  replacePlaceholders,
} from "../utils/promptUtils";

export default function CustomPromptsModal() {
  const {
    isModalOpen,
    closeModal,
    prompts,
    selectedPrompt,
    activePrompt,
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    clearFormErrors,
    addPrompt,
    updatePrompt,
    deletePrompt,
    selectPrompt,
    activatePrompt,
    deactivatePrompt,
  } = useCustomPromptsStore();

  const { defaultCharacter } = useCharacterStore();
  const { defaultPersona } = usePersonStore();

  const [activeTab, setActiveTab] = useState("myPrompts");
  const [previewContent, setPreviewContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Update preview when form data or character/persona data changes
  useEffect(() => {
    if (formData.content) {
      const preview = replacePlaceholders(
        formData.content,
        {
          name: defaultPersona.name,
          description: defaultPersona.description,
        },
        {
          name: defaultCharacter.name,
          description: defaultCharacter.description,
          scenario: defaultCharacter.scenario,
        }
      );
      setPreviewContent(preview);
    } else {
      setPreviewContent("");
    }
  }, [formData.content, defaultPersona, defaultCharacter]);

  const handleSave = () => {
    clearFormErrors();

    const validation = validatePromptForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const promptData = {
      id: selectedPrompt ? selectedPrompt.id : Date.now().toString(),
      name: formData.name,
      content: formData.content,
      createdAt: selectedPrompt
        ? selectedPrompt.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (selectedPrompt) {
      updatePrompt(selectedPrompt.id, promptData);
    } else {
      addPrompt(promptData);
    }

    // Reset form and switch to list view
    setFormData({ name: "", content: "" });
    setActiveTab("myPrompts");
  };

  const handleCancel = () => {
    clearFormErrors();
    setFormData({ name: "", content: "" });
    setActiveTab("myPrompts");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      deletePrompt(id);
    }
  };

  const insertPlaceholder = (placeholder) => {
    const textarea = document.getElementById("prompt-content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newContent =
      formData.content.substring(0, start) +
      placeholder +
      formData.content.substring(end);

    setFormData({ content: newContent });

    // Set focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + placeholder.length,
        start + placeholder.length
      );
    }, 0);
  };

  // Always render the component but conditionally show the modal content
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--input-bg)] rounded-[var(--border-radius-md)] w-full max-w-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-[var(--config-button-border)] flex-shrink-0 flex justify-between items-center">
              <h2 className="text-xl font-medium text-[var(--character-name-color)]">
                Custom Prompts
              </h2>
              <button
                onClick={closeModal}
                className="text-[var(--character-message-color)] hover:text-[var(--character-name-color)]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[var(--config-button-border)] flex-shrink-0">
              <button
                className={`py-3 px-6 font-medium ${
                  activeTab === "myPrompts"
                    ? "text-[var(--character-name-color)] border-b-2 border-[var(--send-button-bg)]"
                    : "text-[var(--character-message-color)]"
                }`}
                onClick={() => setActiveTab("myPrompts")}
              >
                My Prompts
              </button>
              <button
                className={`py-3 px-6 font-medium ${
                  activeTab === "createNew"
                    ? "text-[var(--character-name-color)] border-b-2 border-[var(--send-button-bg)]"
                    : "text-[var(--character-message-color)]"
                }`}
                onClick={() => setActiveTab("createNew")}
              >
                Create New
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-grow">
              <div className="p-6">
                {/* My Prompts Tab */}
                {activeTab === "myPrompts" && (
                  <div className="space-y-4">
                    {prompts.length === 0 ? (
                      <div className="text-center py-8 text-[var(--character-message-color)]">
                        <p>No custom prompts saved yet.</p>
                        <button
                          onClick={() => setActiveTab("createNew")}
                          className="mt-4 px-4 py-2 bg-[var(--send-button-bg)] rounded-[var(--border-radius-sm)] text-white hover:opacity-90"
                        >
                          Create Your First Prompt
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                        {prompts.map((prompt) => (
                          <div
                            key={prompt.id}
                            className={`border rounded-[var(--border-radius-sm)] p-4 ${
                              activePrompt && activePrompt.id === prompt.id
                                ? "border-green-500/60 bg-green-900/10"
                                : "border-[var(--config-button-border)]"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-medium text-[var(--character-name-color)]">
                                  {prompt.name}
                                </h3>
                                <p className="text-[var(--character-message-color)] text-sm mt-1 line-clamp-2">
                                  {prompt.content.substring(0, 100)}
                                  {prompt.content.length > 100 ? "..." : ""}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-2">
                                <button
                                  onClick={() => {
                                    if (activePrompt && activePrompt.id === prompt.id) {
                                      deactivatePrompt();
                                    } else {
                                      activatePrompt(prompt);
                                    }
                                  }}
                                  className={`px-3 py-1 rounded text-white text-sm ${
                                    activePrompt && activePrompt.id === prompt.id
                                      ? "bg-green-600 hover:bg-green-700"
                                      : "bg-[var(--send-button-bg)] hover:opacity-90"
                                  }`}
                                >
                                  {activePrompt && activePrompt.id === prompt.id
                                    ? "Deactivate"
                                    : "Activate"}
                                </button>
                                <button
                                  onClick={() => {
                                    selectPrompt(prompt);
                                    setActiveTab("createNew");
                                  }}
                                  className="px-3 py-1 border border-[var(--config-button-border)] rounded text-[var(--character-message-color)] text-sm hover:bg-[var(--background)]"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(prompt.id)}
                                  className="px-3 py-1 border border-red-500 rounded text-red-500 text-sm hover:bg-red-500/10"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Create New Tab */}
                {activeTab === "createNew" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[var(--character-name-color)] mb-2">
                        Prompt Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ name: e.target.value })}
                        placeholder="e.g., Roleplay Scenario, Writing Assistant, etc."
                        className={`w-full bg-[var(--background)] border ${
                          formErrors.name
                            ? "border-red-500"
                            : "border-[var(--config-button-border)]"
                        } rounded-[var(--border-radius-sm)] p-3 text-[var(--character-message-color)]`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[var(--character-name-color)]">
                          Prompt Content
                        </label>
                        {/* Preview Toggle Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="px-3 py-1 bg-[var(--background)] border border-[var(--config-button-border)] rounded text-[var(--character-message-color)] text-sm hover:bg-[var(--send-button-bg)] hover:text-white"
                          >
                            {showPreview ? "Edit" : "Preview"}
                          </button>
                        </div>
                      </div>
                      {/* Mode Indicator */}
                      <div
                        className={`flex items-center px-3 py-1 rounded-t-[var(--border-radius-sm)] text-xs font-medium ${
                          showPreview
                            ? "bg-green-800/20 text-green-300 border border-b-0 border-green-500/50"
                            : "bg-green-500/20 text-green-300 border border-b-0 border-green-500/50"
                        }`}
                      >
                        {showPreview ? (
                          <>
                            <span className="mr-2">Preview Mode</span>
                          </>
                        ) : (
                          <>
                            <span className="mr-2">Edit Mode</span> 
                          </>
                        )}
                      </div>
                      <textarea
                        id="prompt-content"
                        value={showPreview ? previewContent : formData.content}
                        onChange={(e) =>
                          !showPreview &&
                          setFormData({ content: e.target.value })
                        }
                        placeholder={
                          showPreview
                            ? "Processed preview will appear here..."
                            : "Enter your prompt content here. You can use placeholders like {{user}}, {{char}}, etc."
                        }
                        className={`w-full bg-[var(--background)] border ${
                          formErrors.content
                            ? "border-red-500"
                            : "border-[var(--config-button-border)]"
                        } rounded-b-[var(--border-radius-sm)] p-3 text-[var(--character-message-color)] min-h-[300px] ${
                          showPreview
                            ? "bg-green-400/10 border-green-500/50 cursor-default"
                            : "bg-[var(--background)] border-[var(--config-button-border)]"
                        }`}
                        readOnly={showPreview}
                      />
                      {formErrors.content && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.content}
                        </p>
                      )}
                      <div className="flex justify-end">
                        <div className="text-xs text-[var(--character-message-color)]">
                          {formData.content.length} characters
                        </div>
                      </div>

                      {/* Placeholder Helper */}
                      <div className="mt-5">
                        <p className="text-[var(--character-message-color)] mb-2">
                          Insert placeholders
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {PLACEHOLDERS.map((placeholder) => (
                            <button
                              key={placeholder}
                              onClick={() => insertPlaceholder(placeholder)}
                              className="px-2 py-1 bg-[var(--background)] border-[var(--config-button-border)] rounded text-[var(--character-message-color)] text-sm hover:bg-[var(--send-button-bg)] hover:text-white"
                            >
                              {placeholder}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--config-button-border)] flex justify-end gap-3 flex-shrink-0">
              {activeTab === "createNew" ? (
                <>
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
                    Save Prompt
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActiveTab("createNew")}
                  className="px-4 py-2 bg-[var(--send-button-bg)] rounded-[var(--border-radius-sm)] text-white hover:opacity-90"
                >
                  Create New Prompt
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
