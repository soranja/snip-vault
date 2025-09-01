

# Snip Vault

A monorepo for collecting, rendering, and showcasing code snippets.  
Built with **pnpm workspaces**, **TypeScript**, **React**, **Vite**, and **Tailwind**.

---

## 📂 First Draft Structure

```
snip-vault/
├─ pnpm-workspace.yaml        # workspace definitions
├─ package.json               # root scripts + shared dev tools (ts, eslint, prettier, tsup)
├─ tsconfig.base.json         # base TS config (extended by packages/apps)
├─ eslint.config.js           # flat eslint config (shared)
├─ README.md
│
├─ apps/
│  └─ web/                    # main demo site + embed runtime
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     ├─ index.html
│     ├─ public/              # static assets
│     └─ src/
│        ├─ main.tsx
│        ├─ components/       # UI parts (cards, toggles, layouts…)
│        ├─ layout/
│        ├─ props/
│        ├─ style/
│        └─ routes/           # pages (gallery, embed iframe, etc.)
│
├─ packages/
│  ├─ core/                   # snippet data + APIs + build-time highlighting
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/
│  │     ├─ index.ts          # exports public API
│  │     ├─ types.ts          # shared types
│  │     ├─ store.ts          # loads manifest
│  │     ├─ render.ts         # Shiki helpers
│  │     └─ manifest.generated.json (git-ignored, built)
│  │
│  └─ react-ui/               # reusable React components
│     ├─ package.json
│     ├─ tsconfig.json
│     └─ src/
│        ├─ index.ts
│        ├─ CodeBlock.tsx     # code viewer
│        ├─ SnipBlock.tsx     # light/dark theme switcher
│        └─ styles.css
│
└─ snippets/                  # source of truth (git-tracked snippets)
   ├─ index.json              # { id, title, tags, files[] }
   └─ <id>/
      ├─ meta.json
      └─ files/
         ├─ App.tsx
         └─ ...
```

## Working with packages

### Installation / deletion
- pnpm install
- pnpm add <package> --filter @snip-vault/web
- pnpm add <package> --filter @snip-vault/core
- pnpm remove <package> --filter @snip-vault/core
- pnpm remove <package> --filter @snip-vault/web

### Demo / building
- pnpm --filter @snip-vault/web dev (run the web app, dev server)
- pnpm build
- pnpm --filter @snip-vault/web preview

### Checking / formatting / linting
- pnpm typecheck
- pnpm lint
- pnpm format

### Later...
_Regenerate the manifest with Shiki-highlighted HTML_
- pnpm precompute