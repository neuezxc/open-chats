# Scenario Nested Placeholders Fix - Implementation Details

## Issue Identified
The `{{scenario}}` placeholder was working, but it was not processing nested placeholders within the scenario text itself. 

The scenario data is:
```
{{user}} and {{char}} are couple living together
```

When we replaced `{{scenario}}` with this text, we got:
```
{{user}} and {{char}} are couple living together
```

Instead of:
```
Mick and Hayeon are couple living together
```

## Root Cause
The `replacePlaceholders` function was directly replacing `{{scenario}}` with the raw scenario text without processing the placeholders contained within that text.

## Fix Applied
I updated the `replacePlaceholders` function in `app/utils/promptUtils.js` to:

1. First process the scenario text itself to replace any nested placeholders
2. Then use the processed scenario text as the replacement value for `{{scenario}}`

### Code Changes
```javascript
// First, process the scenario text itself if it contains placeholders
let processedScenario = charData.scenario || "";
if (processedScenario) {
  processedScenario = processedScenario
    .replace(/{{user}}/g, userData.name || "")
    .replace(/{{char}}/g, charData.name || "");
}

// Replace each placeholder with actual values
result = result.replace(/{{user}}/g, userData.name || "");
result = result.replace(/{{char}}/g, charData.name || "");
result = result.replace(/{{user_description}}/g, userData.description || "");
result = result.replace(/{{char_description}}/g, charData.description || "");
result = result.replace(/{{scenario}}/g, processedScenario);
```

## Verification
The fix ensures that:

1. When `{{scenario}}` is used in a custom prompt, it gets replaced with the scenario text
2. Any placeholders within the scenario text (`{{user}}` and `{{char}}`) are also replaced with actual values
3. For the example scenario "{{user}} and {{char}} are couple living together", it becomes "Mick and Hayeon are couple living together"

## Testing
To verify the fix works:
1. Create a custom prompt with the `{{scenario}}` placeholder
2. Check that the preview shows the fully processed scenario text with all placeholders replaced
3. Activate the prompt
4. Verify that messages sent to the LLM include the fully processed scenario text

The fix handles nested placeholders correctly while maintaining all existing functionality.