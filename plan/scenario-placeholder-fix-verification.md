# Scenario Placeholder Fix - Verification

## Issue Identified
The `{{scenario}}` placeholder was not working correctly in the custom prompts feature. Upon investigation, I found that the issue was in how character data was being passed to the `replacePlaceholders` function in two locations:

1. `app/components/CustomPromptsModal.jsx` - Preview functionality
2. `app/components/ChatPage.jsx` - Active prompt usage

## Root Cause
In both files, the `replacePlaceholders` function was being called with character data that included `name` and `description` but was missing the `scenario` field. This meant that while the function could replace `{{user}}`, `{{char}}`, `{{user_description}}`, and `{{char_description}}`, it couldn't replace `{{scenario}}` because that data wasn't being passed.

## Fix Applied
I updated both files to include the `scenario` field when calling `replacePlaceholders`:

### In CustomPromptsModal.jsx:
```javascript
const preview = replacePlaceholders(
  formData.content,
  {
    name: defaultPersona.name,
    description: defaultPersona.description
  },
  {
    name: defaultCharacter.name,
    description: defaultCharacter.description,
    scenario: defaultCharacter.scenario  // Added this line
  }
);
```

### In ChatPage.jsx:
```javascript
const processedPrompt = replacePlaceholders(
  activePrompt.content,
  {
    name: defaultPersona.name,
    description: defaultPersona.description
  },
  {
    name: defaultCharacter.name,
    description: defaultCharacter.description,
    scenario: defaultCharacter.scenario  // Added this line
  }
);
```

## Verification
The fix ensures that:

1. When users create or edit custom prompts, the preview correctly shows the scenario text replacing `{{scenario}}`
2. When an active custom prompt is used in chat, the `{{scenario}}` placeholder is correctly replaced with the actual scenario text
3. All other placeholders continue to work as expected

## Testing
To verify the fix works:

1. Create a custom prompt with the `{{scenario}}` placeholder
2. Check that the preview shows the actual scenario text
3. Activate the prompt
4. Verify that messages sent to the LLM include the scenario text instead of the placeholder

The fix is minimal and targeted, addressing only the specific issue without affecting other functionality.