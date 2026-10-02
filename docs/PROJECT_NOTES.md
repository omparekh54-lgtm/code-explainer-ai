# Course project notes

## Purpose and users

Help students understand short code snippets at their existing knowledge level. The core learning flow is paste code → choose level → read explanation → answer quiz → review feedback.

## Implementation record

Built with ChatGPT/Codex from the supplied project discussion. The implementation includes a server-only Gemini request, schema validation, accessible browser UI, five curated demo lessons, and mocked backend tests. No Copilot or Claude comparison was conducted during this implementation. Gemini assists users at runtime; Codex assisted software development. These are distinct uses of AI.

Important decisions:
- Keep HTML/CSS/JavaScript and Node serverless to make the architecture easy to inspect and explain.
- Treat source code and AI output as text, never executable content or trusted HTML.
- Number every line and reconstruct the displayed code from the user's input, so model-generated code cannot replace it.
- Reject incomplete line coverage and quizzes with invalid answer indices.
- Keep demo mode explicit and restrict it to curated samples; never fabricate a live explanation after an API failure.
- Add visible busy/error states, keyboard navigation, mobile layouts, and level selection.
- Use small per-instance limits, caching, and no automatic API retries to reduce unnecessary calls.

Limitations: structural validation is not semantic verification; memory-based rate limits are not distributed; demo levels use the same curated content; language auto-detection is performed by Gemini in the live prompt; long snippets may exceed output limits.

## Evaluation worksheet — complete with actual measurements

Run the five included examples through Gemini and a second tool of your choice. Preserve the actual prompts and outputs. For each tool/example record:

| Example | Tool | Accuracy (1–5) | Clarity (1–5) | Time (seconds) | Mistakes and corrections |
| --- | --- | --- | --- | --- | --- |
| Python sum | | | | | |
| JS filter | | | | | |
| Java maximum | | | | | |
| C++ countdown | | | | | |
| SQL grouped sales | | | | | |

Check every line against language semantics, expected outputs where determinable, and whether each quiz has exactly one correct answer. For beginner/intermediate/advanced outputs, compare depth and terminology. Record quota failures and malformed responses honestly.

## Report outline

1. Introduction: user problem, tools, architecture, scope.
2. Experimentation: real prompts, implementation decisions, screenshots, failures and fixes.
3. Analysis: filled evaluation worksheet and comparison of actual outputs.
4. Reflection: human-centered design, limitations, what AI helped with and what needed human review.

## 9-slide presentation outline

1. Problem and intended users.
2. Learning workflow.
3. Architecture and tools.
4. Editor and accessibility.
5. Live Gemini explanation.
6. Quiz feedback and learning loop.
7. Demo mode and quota safeguards.
8. Actual testing and comparison results.
9. Reflection and next improvements.

## 5–7 minute demo outline

Show the editor; choose a level; generate one explanation; review summary and lines; answer the quiz; download a lesson; demonstrate a second curated sample in Demo mode; explain server-only keys and limitations; close with actual evaluation findings. Never display environment variable values in the recording. Complete peer reviews personally according to the course rules.

## Verification recorded for this build

- 11 Node.js backend tests passed; JavaScript syntax checks passed.
- One real Gemini request succeeded on gemini-3.5-flash-lite: all 7 source lines explained and 3 quiz questions returned. No automated retries were used.
- A model-list authentication check succeeded without generation.
- Browser verification was attempted but blocked by an unavailable Chromium download. Desktop/mobile rendering and end-to-end interactions still need a browser check.
