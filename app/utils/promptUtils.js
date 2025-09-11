/**
 * Utility functions for custom prompt validation and placeholder replacement
 */

// Supported placeholders
export const PLACEHOLDERS = [
  "{{user}}",
  "{{char}}",
  "{{user_description}}",
  "{{char_description}}",
  "{{scenario}}"
];

// Validate placeholder syntax
export const validatePlaceholders = (content) => {
  // Check if all placeholders in content are valid
  const placeholderRegex = /{{[^}]+}}/g;
  const foundPlaceholders = content.match(placeholderRegex) || [];
  
  const invalidPlaceholders = foundPlaceholders.filter(
    placeholder => !PLACEHOLDERS.includes(placeholder)
 );
  
  return {
    isValid: invalidPlaceholders.length === 0,
    invalidPlaceholders
  };
};

// Replace placeholders with actual values
export const replacePlaceholders = (content, userData, charData) => {
  let result = content;
  
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
  
  return result;
};

// Validate prompt form data
export const validatePromptForm = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }
  
  if (!formData.content.trim()) {
    errors.content = "Content is required";
  }
  
  const placeholderValidation = validatePlaceholders(formData.content);
  if (!placeholderValidation.isValid) {
    errors.content = `Invalid placeholders: ${placeholderValidation.invalidPlaceholders.join(", ")}`;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};