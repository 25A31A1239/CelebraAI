# CelebraAI: Plan Smarter. Celebrate Bigger.

An AI-style celebration and event planner built for **PromptWars Virtual 2026, Challenge 05: Celebration & Event Planner**.
Enter your event details and get an organized plan with a budget, preparation timeline, vendor checklist, theme ideas and an assistant, all connected per event.

> **Demo mode.** Plans, themes and assistant replies come from deterministic local rules, **not a live AI**, and are labelled that way in the UI.
> Data is stored in your browser (localStorage). It is **not a cloud account**, there is no login, and nothing is sent to a server.

## Problem statement
Help people organize weddings, birthdays, anniversaries, college events, festivals, community and corporate celebrations with: event planning, budget estimation and allocation, preparation timelines, vendor checklists/management, and personalized ideas.

## Features
- **Landing page** with all sections, FAQ, and an accessible mobile menu.
- **Dashboard**: all statistics are computed from real data (never hardcoded); onboarding and empty states; optional sample wedding.
- **Event wizard** (5 steps, React Hook Form + Zod): validation in plain language, review/edit step, plan generated on confirm. Also used by **AI Event Planner**.
- **Intelligent planning engine**: output varies by event type, guests, budget tier (currency-aware), date, location, duration, priorities, food/dietary/entertainment/decoration preferences.
- **Budget Planner**: 11 categories, editable allocations, over-allocation guard, expenses (add/edit/delete), donut + bar charts with text summaries, overspending/underuse alerts.
- **Timeline**: deadlines counted back from the event date, filters, sorting, overdue/complete tracking, event-day schedule, countdown.
- **Vendor Manager**: your own vendors, quotations, booking/payment status, quotation comparison with budget-fit; clearly labelled sample placeholders only (no invented businesses).
- **Theme Studio**: palettes, decoration, lighting, stage, entrance, tables, photography, approximate decoration budget; regenerate, favourites, select for an event.
- **Guest Manager**: RSVP tracking, search/filter, statistics, CSV export (formula-injection safe). No messages are sent.
- **AI Assistant**: context-aware deterministic chat with history, suggested questions, loading and error states.
- **Settings**: JSON backup, load/remove sample data, reset (with confirmation), storage and security notes.
- Every event has its own isolated workspace (edit, duplicate, delete with confirmation).

## Tech stack
React 19, Vite, TypeScript (strict), Tailwind CSS v4, React Router, React Hook Form + Zod, Recharts (lazy-loaded with the Budget page), Lucide icons, Vitest + React Testing Library. Netlify-ready.

## Architecture
```
src/
  components/   common/ (Button, Modal, Field, Toast, ...) layout/ events/ budget/ landing/
  pages/        route-level pages (lazy-loaded)
  context/      eventsReducer (pure) + EventsProvider (persistence)
  services/     storage (versioned, failure-safe) · eventRepository · eventFactory (normalisation)
                ai/ (AIProvider interface, DemoProvider, Gemini placeholder) · assistant · themes
  schemas/      Zod schemas   utils/ budget, dates, stats, csv, vendors   data/ sample, labels, nav
netlify/functions/generate-plan.ts   server-side boundary for a future AI (returns 501 now)
tests/          10 files, 123 tests
```
Key decisions: pure reducer + typed child collections keep events isolated; storage sits behind a `Store` interface (swap for Supabase later); the UI only calls `getAIProvider()`.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
npm test             # unit + integration tests
npm run typecheck
npm run build        # production build to dist/
npm run check        # typecheck + tests + build
```

## Deploy (Netlify)
Connect the repo; `netlify.toml` already sets build command, publish dir, SPA redirect, and security headers (CSP, frame, referrer, permissions). Not deployed by this project's author unless you do it.

## Environment variables
`VITE_AI_PROVIDER=demo` (default). A future `GEMINI_API_KEY` belongs **only** in Netlify's server-side environment, never in frontend code. See `.env.example`.

## Current limitations
- Demo AI only; no live model. Local data only: no sync, no accounts, localStorage is unencrypted.
- No Playwright end-to-end tests and no browser/visual QA were run; UI behaviour is covered by React Testing Library (jsdom).
- No lint configuration is included. The Budget page chunk is ~114 KB gzipped (Recharts) and loads only on that page.
- Currency tiers use rough fixed factors for choosing a budget tier only (not pricing).
- Event-day schedule is generated, not manually editable.

## Future Gemini integration
Implement the call in `netlify/functions/generate-plan.ts` (read the key from `process.env`, validate input, return a `GeneratedPlan`), implement `GeminiProvider.generatePlan` to POST to `/api/generate-plan`, set `VITE_AI_PROVIDER=gemini`. No UI changes needed.

## Suggested 4-minute demo
1. Landing page, then Open demo workspace (20s) 2. Load sample wedding on Overview: stats from real data (30s) 3. Open the event: plan, budget table, schedule (40s) 4. Budget: change an allocation, add an overspend expense, see charts and alerts (50s) 5. Timeline: complete a task, filters (25s) 6. Vendors: quotation comparison (25s) 7. Theme Studio: regenerate, favourite, select (20s) 8. Guests: RSVP change, CSV (15s) 9. Assistant: suggested questions (15s). Settings > Reset to finish.
