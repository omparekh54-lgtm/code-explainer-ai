# Build and design record

Built using ChatGPT/Codex from the supplied project discussion. No other coding assistant is claimed.

## Architecture

Browser (HTML/CSS/JS) → POST /api/explain → validation and limits → Gemini structured JSON → backend validation → lesson and quiz.

The browser keeps the current lesson only in memory. Demo mode uses a fixed eight-line JavaScript sample and calls no API. Syntax highlighting is bundled locally so demos do not depend on a CDN. AI mode uses a serverless function, keeping the key out of source and browser bundles.

## Human-centered choices

- Three levels use clear labels and explanations.
- Input starts empty; an explicit example button helps new users.
- Separate overview, lines, concepts and quiz views reduce clutter.
- Loading status and cancellation make long AI requests understandable.
- Errors explain next steps; demo results are explicitly labeled.
- Keyboard-accessible buttons, labels, focus indicators and reduced-motion support.
- Quizzes reveal feedback immediately, mark the correct choice, show score and support retry without another AI request.

## Reliability choices

Structured JSON prompting alone is insufficient: the server verifies line coverage, concept structure and quiz indexes. Original code is reconstructed server-side so the model cannot substitute code. Invalid output results in a clear retry/demo message. Source is rendered as text and never executed. AI requests have a timeout and no automatic retries. Responses are cached temporarily; simple in-memory rate limits protect quota within each serverless instance.

## Validation scope

The automated tests cover invalid inputs, each demo level, malformed/omitted model responses, preserving source lines, safe provider failures, rate limits and caching. Mock provider tests do not prove live key validity, model availability or factual AI accuracy. Live deployment and a real sample request must be verified separately.

## Suggested recording sequence (5–7 minutes)

1. Introduce the learning problem and intended users (45 seconds).
2. Paste code, choose a level and show the syntax preview (45 seconds).
3. Explain the summary and line views (90 seconds).
4. Review concepts and answer the quiz, including a wrong answer (60 seconds).
5. Switch to advanced and demonstrate the offline sample (45 seconds).
6. Show server-side key handling, validation and limitations without displaying secrets (60 seconds).
7. Reflect on what AI helped build and how its output needs review (45 seconds).
