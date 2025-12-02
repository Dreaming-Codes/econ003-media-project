# AGENTS.md
1. Install dependencies with `bun install`; keep Bun as the script runner.
2. Lint/format/check with Biome: `bun run lint`, `bun run format`, `bun run check`.
3. Keep `src/routes` file-based structure; regenerate `routeTree.gen.ts` by running the dev server after adding files.
4. Co-locate loaders/server functions with their routes; move reusable logic into `src/lib`.
5. Tailwind utility classes go layout → spacing → color → effects; avoid inline styles unless required.
6. Import order: React/built-ins, third-party libs, absolute aliases, then relative modules; group type-only imports via `import type`.
7. Stick to single quotes, no semicolons, and Biome defaults for spacing/line width.
8. Favor strict TypeScript types; avoid `any`, use `type` aliases for objects and `interface` only when extension is necessary.
9. Components are PascalCase, hooks camelCase, constants SCREAMING_SNAKE_CASE, files kebab-case within routes.
10. Default-export page-level components, prefer named exports for helpers to keep tree-shaking predictable.
11. Keep JSX props alphabetized when practical and extract repeated fragments into small components.
12. Handle async and loader errors with `try/catch`, returning typed `Response` objects or error boundaries.
13. Log errors once via `console.error` in server utilities; show user-friendly fallback UI states.
14. Shared utilities should be pure functions with explicit parameter and return types; avoid implicit `any`.
15. Add Shadcn UI pieces with `bunx shadcn@latest add <component>`.
16. After styling-heavy changes run `bun run format` to keep Tailwind class ordering consistent.
17. Before review ensure Bun/Vitest tests pass, lint is clean, and generated files (e.g., `routeTree.gen.ts`) stay untouched.
