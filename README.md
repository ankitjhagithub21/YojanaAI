# Yojana AI

A production-ready Next.js 15 foundation using the App Router, TypeScript, Tailwind CSS v4, shadcn/ui, ESLint, and Prettier.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
