# Yojana AI

A production-ready Next.js 15 foundation using the App Router, TypeScript, Tailwind CSS v4, shadcn/ui, ESLint, and Prettier.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google AI Studio setup

Copy `.env.example` to `.env.local` and set `GOOGLE_API_KEY`. This value is read only
by server-side code and must never be exposed through a `NEXT_PUBLIC_` variable.

`POST /api/ai/latest-vacancies` accepts a candidate profile and returns structured,
current government-vacancy recommendations. The endpoint uses the Google AI Studio
Interactions API with Google Search and JSON Schema structured output.

## Scripts

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the development server with Turbopack |
| `npm run build`        | Create a production build                   |
| `npm run start`        | Run the production server                   |
| `npm run lint`         | Run ESLint                                  |
| `npm run typecheck`    | Run TypeScript checks                       |
| `npm run format:check` | Check formatting with Prettier              |

## Project structure

```text
src/
├── app/          # Routes, layouts, and global styles
├── components/   # Shared UI components (including shadcn/ui)
├── config/       # Application configuration
├── features/     # Domain-oriented feature modules
├── hooks/        # Reusable React hooks
├── lib/          # Framework-agnostic utilities
└── types/        # Shared TypeScript types
```
