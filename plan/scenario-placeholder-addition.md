# Scenario Placeholder Addition - Implementation Summary

## Overview
This document summarizes the implementation of the new `{{scenario}}` placeholder that references `character.scenario` and can be used in custom prompts.

## Changes Made

### 1. Updated `app/utils/promptUtils.js`
- Added `{{scenario}}` to the `PLACEHOLDERS` array
- Updated the `replacePlaceholders` function to handle the new placeholder
- The function now replaces `{{scenario}}` with `charData.scenario || ""`

### 2. Verified `app/components/ChatPage.jsx`
- Confirmed that the default prompt system already includes scenario processing
- The `systemPrompt` function already processes `defaultCharacter.scenario` and includes it in the template

### 3. Verified `app/components/CustomPromptsModal.jsx`
- Confirmed that the placeholder helper UI dynamically shows all placeholders from the `PLACEHOLDERS` array
- The new `{{scenario}}` placeholder will automatically appear in the UI

## How It Works

### In Custom Prompts
Users can now include `{{scenario}}` in their custom prompts, and it will be replaced with the character's scenario value (e.g., "{{user}} and hayeon are couple living together").

### In Default Prompts
The scenario is already processed in the default prompt system and included in the template as `[Scenario:{{scenario}}]`.

## Technical Details

### Data Flow
1. Character data is retrieved from `useCharacterStore`
2. When processing prompts, `replacePlaceholders` is called with character data
3. The function replaces `{{scenario}}` with `charData.scenario`
4. If `charData.scenario` is undefined or null, it defaults to an empty string

### Validation
- The placeholder is included in the validation system
- Invalid placeholders will be caught by the existing validation logic
- The placeholder follows the same pattern as other placeholders

## Testing Considerations

### Manual Testing Steps
1. Create a custom prompt that includes `{{scenario}}`
2. Activate the custom prompt
3. Verify that `{{scenario}}` is replaced with the actual scenario text
4. Send a message and verify the prompt is correctly sent to the API
5. Test with a character that has no scenario (should default to empty string)

### Edge Cases
- Character with undefined scenario field
- Character with null scenario field
- Character with empty string scenario field
- Custom prompt with multiple scenario placeholders

## Future Enhancements
- Add more character-specific placeholders as needed
- Consider adding user scenario fields if needed
- Implement placeholder preview in the custom prompt creation UI