# Code Explainer AI

An AI-powered code explainer and learning app. Paste a snippet, choose beginner, intermediate or advanced, and receive a summary, explanations of every nonblank line, key concepts and an interactive quiz.

## Features

- Plain HTML, CSS and JavaScript, with no frontend build step.
- Locally bundled highlight.js syntax preview.
- Gemini via a server-side Vercel function; the API key never reaches the browser.
- Three learning levels, immediate quiz feedback, score and retry.
- Explicit offline demo with a fixed JavaScript example, tailored to each level.
- Download a lesson as text. Responsive layout, keyboard navigation, reduced-motion support and visible request status.
- Code is never executed. User-controlled text is rendered with textContent, not HTML.
- 4,000-character / 100-line input limit, strict JSON schema and server-side response validation.
- Five requests per minute per IP and fifteen total per minute per function instance. Five-minute in-memory response caching; no automatic paid retries.

## Local development

Requires Node 22 or newer. No runtime packages are needed.

```sh
npm start
npm test
```

Demo works without a key. For AI mode, create an ignored `.env.local` with GEMINI_API_KEY and start with `node --env-file=.env.local server.mjs`. Never commit this file.

## Vercel

Import `omparekh54-lgtm/code-explainer-ai`. Choose **Other**, with no build command and the repository root as the output directory. Add encrypted `GEMINI_API_KEY` in project environment variables. Optional `GEMINI_MODEL` defaults to `gemini-3.8-flash`. Deploy. Static assets and `/api/explain` are handled by Vercel.

## API

POST `/api/explain` with `{ "code": "console.log(1 + 2);", "level": "beginner" }`.

Returns `{ summary, lines: [{number, code, explanation}], concepts: [{name, explanation}], quiz: [{question, options, answer, explanation}], mode, cached }`. Quiz answers use a zero-based index. Source lines are numbered from one; the server replaces any AI-provided code with the original source.

## Limits and privacy

AI explanations can be wrong. Submitted code is sent to Google Gemini in AI mode; remove secrets and private code before submitting. The app does not execute code or save it to a database. A temporary cache exists in function memory for up to five minutes. Rate limits and caching are per instance and reset on cold starts; they are simple quota protection, not a distributed guarantee. Set project-level API quotas in Google AI Studio for a hard spending boundary. Model availability and free-tier quota depend on your Google project.

## Course evidence

See `docs/process.md` for the implemented architecture, design choices and verification, and `docs/comparison.md` for five samples and a rubric to compare two AI tools. The comparison must be performed and results recorded honestly. This repository does not claim that a second AI tool was used or fabricate a course report/video.

## Third-party license

highlight.js is bundled in `vendor/`; its BSD-3-Clause license is included there.
