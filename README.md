# Code Explainer AI

**Live app:** https://code-explainer-ai-zeta.vercel.app/

An AI programming tutor that turns a code snippet into a plain-language overview, a complete line-by-line explanation, key concepts, and an interactive multiple-choice quiz.

## Features

- Beginner, intermediate, and advanced learning levels for live explanations.
- Code editor with syntax highlighting, line numbers, Tab indentation, and Ctrl/Cmd+Enter shortcut.
- Language selection, auto-detection, and local text-file import.
- Overview, line-by-line, and quiz tabs with immediate answer feedback, final score, and retry.
- Five curated examples: Python, JavaScript, Java, C++, and SQL.
- Explicit Demo mode that uses no API quota. Demo lessons are curated and do not vary by level.
- Download the complete lesson as a text file.
- Responsive layout, labeled inputs, keyboard tab navigation, focus indicators, and reduced motion support.

## Stack and architecture

Plain HTML/CSS/browser JavaScript in `public/`, and one Node.js Vercel serverless function in `api/explain.js`. highlight.js is bundled locally in `public/vendor/` with its BSD license. There are no runtime npm dependencies and no build step.

Browser → POST `/api/explain` → input checks and usage limits → Gemini GenerateContent → JSON validation → explanation and quiz.

Code is never executed. API keys remain on the server. The UI creates text nodes for model output and uploaded code rather than inserting HTML. No database, analytics, or browser persistence is used. Live responses may be retained in process memory for 10 minutes to avoid duplicate requests; caches have at most 30 entries.

## Run locally

Node.js 22 or newer:

```bash
npm install
npm test
npm run check
npm run dev
```

Open http://localhost:3000. All five demo examples work without configuration.

For live AI, create a local `.env` file based on `.env.example`, add your own Gemini API key, and use:

```bash
node --env-file=.env dev-server.js
```

Do not commit `.env` or share the key in screenshots.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Select **Other** as the framework. Use `public` as the output directory. No build command is needed.
3. Add `GEMINI_API_KEY` as a sensitive server environment variable for Production (and Preview only if needed).
4. Optionally add `GEMINI_MODEL`; the default is `gemini-3.5-flash-lite`.
5. Deploy. Test a curated demo first, then request a live explanation.
6. If limiting access to a class or private audience, set `APP_ACCESS_CODE`. The UI asks for it only when the server requires one.

`vercel.json` configures static output, the function timeout, and security headers.

## Usage safeguards and limits

Requests are capped at 4,000 characters and 80 lines. The server permits 3 live requests per client per minute, at most 2 concurrent upstream calls, and 100 upstream calls per UTC day **per warm function instance**. Repeated successful requests can use a 10-minute cache. There are no automatic retries or hidden model fallbacks.

These in-memory limits reset on cold starts and are not a distributed quota or a guaranteed spending cap. For a widely shared public deployment, configure provider quota/billing controls and Vercel Firewall rate limiting, or use a persistent shared limiter. `APP_ACCESS_CODE` can restrict who can make live calls. Demo mode does not call Gemini. Free-tier model availability and limits depend on the Google project; the app does not enable billing.

AI output is validated structurally, but explanations are not independently verified. Review important claims. The app flags provider failures and never silently labels demo output as AI output.

## Tests and course documentation

`npm test` covers all demos, malformed input/output, secret-safe provider errors, quotas, caching, cross-origin requests, and optional access codes. Tests mock Gemini and consume no quota.

See `docs/PROJECT_NOTES.md` for the real implementation record, evaluation template, and presentation outline. Do not claim a comparison with a second AI tool until you have actually conducted one.
