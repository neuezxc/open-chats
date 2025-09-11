# Custom System Prompts - Design Plan

## Overview
This document outlines the design plan for implementing the custom system prompts feature. The feature will allow users to create, save, edit, and apply custom system prompts with placeholders through a modal interface accessible via the "#Prompts" button in the chat input area.

## Architecture Design

### 1. State Management
Create a new Zustand store `useCustomPromptsStore` to manage:
- List of custom prompts
- Currently selected prompt
- Modal open/close state
- Form state for creating/editing prompts

### 2. Component Structure
- `CustomPromptsModal` - Main modal component for managing prompts
- `PromptList` - Displays saved prompts with edit/delete options
- `PromptForm` - Form for creating/editing prompts with validation
- `PromptPreview` - Shows how placeholders will be replaced

### 3. Data Structure
```javascript
// CustomPrompt entity
{
  id: string,           // Unique identifier
  name: string,         // User-defined name
  content: string,      // Prompt content with placeholders
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}

// Placeholders supported
const placeholders = [
  "{{user}}",
  "{{char}}", 
  "{{user_description}}",
  "{{char_description}}"
];
```

## Component Designs

### CustomPromptsModal
- Modal overlay similar to ApiSettingsModal
- Tabbed interface for "My Prompts" and "Create New"
- Responsive design that works on different screen sizes
- Close button and "X" in top right corner

### PromptList
- Displays saved prompts in a scrollable list
- Each item shows:
  - Prompt name
  - Preview of content (first 100 characters)
  - Edit and Delete buttons
 - Apply button to use the prompt
- Empty state with message when no prompts exist

### PromptForm
- Input field for prompt name
- Textarea for prompt content with placeholder insertion
- Validation for:
  - Required name
  - Required content
  - Valid placeholder syntax
- Buttons: Save, Cancel
- Placeholder helper with clickable insertion

### PromptPreview
- Shows how the prompt will look with placeholders replaced
- Uses current character/user data for preview
- Updates in real-time as user types

## Implementation Flow

### 1. Store Implementation
Create `useCustomPromptsStore` with:
- `prompts`: Array of saved prompts
- `isModalOpen`: Boolean for modal state
- `selectedPrompt`: Currently selected prompt for editing
- `setPrompts`: Update prompts array
- `addPrompt`: Add new prompt
- `updatePrompt`: Update existing prompt
- `deletePrompt`: Remove prompt
- `openModal`/`closeModal`: Control modal visibility
- `selectPrompt`: Set selected prompt for editing

### 2. Modal Component
Create `CustomPromptsModal` component:
- Use store for state management
- Implement tab navigation between list and form
- Add placeholder validation
- Create form with proper validation

### 3. Integration with ChatInput
Update `ChatInput` component:
- Add state for modal visibility
- Connect "#Prompts" button to open the modal
- Pass necessary props to modal component

### 4. Placeholder System
Implement placeholder validation and replacement:
- Function to validate placeholder syntax
- Function to replace placeholders with actual values
- Preview system showing replacements

## UI/UX Considerations

### Visual Design
- Follow existing app styling with consistent colors and spacing
- Use same modal structure as ApiSettingsModal
- Ensure proper contrast and readability
- Responsive layout for different screen sizes

### User Experience
- Clear feedback for validation errors
- Confirmation for delete operations
- Intuitive placeholder insertion
- Preview of how prompts will look
- Smooth transitions and animations

### Accessibility
- Proper keyboard navigation
- ARIA labels for interactive elements
- Sufficient color contrast
- Screen reader support

## Technical Considerations

### Data Persistence
- Save prompts to localStorage for persistence between sessions
- Load saved prompts on app initialization
- Handle storage errors gracefully

### Performance
- Efficient rendering of prompt lists
- Debounced preview updates
- Lazy loading for long prompt lists

### Error Handling
- Validation for all user inputs
- Graceful handling of storage errors
- User-friendly error messages

## Integration Points

### With Existing Stores
- Access character data from `useCharacterStore`
- Access user data from `usePersonaStore`
- Access current prompt settings from `usePromptStore`

### With Chat System
- Apply selected prompts to current chat session
- Update prompt context when sending messages

## Future Enhancements
- Import/export prompts as JSON
- Categorization/tagging of prompts
- Search and filter functionality
- Prompt templates/examples
- Sharing prompts between users

## Testing Considerations
- Unit tests for placeholder validation
- Integration tests for store operations
- UI tests for modal interactions
- Edge case testing for validation