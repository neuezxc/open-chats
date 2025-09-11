# Custom Prompts Feature - Testing Plan

## Manual Testing Steps

1. **Verify Modal Opens**
   - Click the "#Prompts" button in the chat input area
   - Confirm the Custom Prompts modal opens correctly

2. **Create a New Prompt**
   - Navigate to the "Create New" tab
   - Enter a name for the prompt (e.g., "Test Prompt")
   - Enter content with placeholders (e.g., "Hello {{user}}, you are talking to {{char}}. {{user_description}} and {{char_description}}")
   - Click "Insert placeholders" buttons to add placeholders
   - Verify the preview shows correctly replaced placeholders
   - Click "Save Prompt"
   - Confirm the prompt appears in the "My Prompts" list

3. **Edit an Existing Prompt**
   - Click the "Edit" button on a saved prompt
   - Modify the prompt content
   - Save the changes
   - Confirm the updated prompt is displayed in the list

4. **Delete a Prompt**
   - Click the "Delete" button on a saved prompt
   - Confirm the deletion when prompted
   - Verify the prompt is removed from the list

5. **Apply a Prompt**
   - Click the "Apply" button on a saved prompt
   - Confirm the modal closes (actual application would be implemented based on app requirements)

6. **Form Validation**
   - Try to save a prompt without a name
   - Confirm an error message is displayed
   - Try to save a prompt with invalid placeholders
   - Confirm an error message is displayed

7. **Persistence**
   - Create a few prompts
   - Refresh the page
   - Confirm the prompts are still available

## Edge Cases to Test

1. **Empty State**
   - When no prompts exist, confirm the empty state message is displayed
   - Confirm the "Create Your First Prompt" button works

2. **Long Content**
   - Create a prompt with long content
   - Verify it displays correctly with truncation in the list view

3. **Special Characters**
   - Create prompts with special characters in name and content
   - Verify they save and display correctly

4. **Duplicate Names**
   - Try creating prompts with the same name
   - Confirm this is allowed (as per design, names don't need to be unique)

## Automated Testing Considerations

For future automated testing, we should test:

1. **Prompt Validation Functions**
   - validatePlaceholders function with various inputs
   - replacePlaceholders function with different placeholder combinations
   - validatePromptForm function with valid and invalid inputs

2. **Store Operations**
   - addPrompt, updatePrompt, deletePrompt operations
   - localStorage persistence and retrieval
   - State management for modal and form data

3. **Component Rendering**
   - CustomPromptsModal renders correctly in different states
   - PromptList displays prompts properly
   - PromptForm handles user input correctly
   - Preview updates in real-time