# Feature Specification: Custom System Prompts

## Document Details
* **Feature Specification:** Custom System Prompts
* **Feature Branch:** `feature/004-custom-system-prompts`
* **Created:** 2025-09-11
* **Status:** Draft
* **Input:** Users need a simple and powerful interface to define and save their own custom system prompts with placeholders. The feature should be accessible through the "#Prompts" button in the chat input area.

## ⚡ Quick Guidelines
*   `✅ Focus on WHAT users need and WHY`
*   `❌ Avoid HOW to implement (no tech stack, APIs, code structure)`
*   `👥 Written for business stakeholders, not developers`

## User Scenarios & Testing

### Primary User Story
As a user, I want to create and save custom system prompts with placeholders so that I can customize the AI's behavior for different scenarios and characters.

### Acceptance Scenarios
*   **Scenario 1: Creating a new custom prompt**
    *   Given I am on the chat interface
    *   When I click the "#Prompts" button
    *   Then I see a modal or interface for managing custom prompts
    *   And I can create a new prompt with a name and content

*   **Scenario 2: Using placeholders in prompts**
    *   Given I am creating a custom prompt
    *   When I type in the prompt content area
    *   Then I can insert placeholders like {{user}}, {{char}}, {{user_description}}, {{char_description}}
    *   And the placeholders are properly formatted

*   **Scenario 3: Saving and applying a custom prompt**
    *   Given I have created a custom prompt with placeholders
    *   When I save the prompt
    *   Then I can select it from a list of saved prompts
    *   And it is applied to the current chat session

*   **Scenario 4: Editing an existing prompt**
    *   Given I have previously saved custom prompts
    *   When I open the prompts interface
    *   Then I can edit the content of existing prompts
    *   And my changes are saved when I confirm

*   **Scenario 5: Deleting a custom prompt**
    *   Given I have previously saved custom prompts
    *   When I open the prompts interface
    *   Then I can delete prompts I no longer need
    *   And they are removed from my saved prompts list

### Edge Cases
*   What happens if a user tries to save a prompt without a name?
*   What happens if a user includes invalid placeholder syntax in their prompt?
*   What happens if a user tries to create a prompt with the same name as an existing one?

## Requirements

### Functional Requirements
*   **FR-01:** The system MUST provide a user interface accessible through the "#Prompts" button in the chat input area.
*   **FR-002:** The system MUST allow users to create new custom system prompts with a name and content.
*   **FR-003:** The system MUST support the following placeholders in custom prompts:
    *   {{user}} - Represents the user's name
    *   {{char}} - Represents the character's name
    *   {{user_description}} - Represents the user's description
    *   {{char_description}} - Represents the character's description
*   **FR-004:** The system MUST validate that all placeholders used in prompts follow the correct syntax.
*   **FR-005:** The system MUST allow users to save custom prompts with a unique name.
*   **FR-006:** The system MUST prevent users from saving prompts without a name.
*   **FR-007:** The system MUST allow users to edit existing custom prompts.
*   **FR-008:** The system MUST allow users to delete custom prompts they no longer need.
*   **FR-009:** The system MUST display a list of saved custom prompts for users to select from.
*   **FR-010:** The system MUST apply selected custom prompts to the current chat session.
*   **FR-011:** The system SHOULD provide a way to preview how placeholders will be replaced in the prompt.
*   **FR-012:** The system MAY provide default examples of custom prompts to help users get started.

### Key Entities
*   **CustomPrompt**
    *   `id` - Unique identifier for the prompt
    *   `name` - User-defined name for the prompt
    *   `content` - The actual prompt text with placeholders
    *   `createdAt` - Timestamp when the prompt was created
    *   `updatedAt` - Timestamp when the prompt was last modified

## Review & Acceptance Checklist
*   [x] Content Quality: Language is non-technical and focused on user value
*   [x] Requirement Completeness: All requirements are clear, testable, and have no open questions