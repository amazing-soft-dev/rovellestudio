# Rovelle Studio

Independent studio site. Next.js 16 App Router, Tailwind CSS v4, a DOM project helix, and one contact route.

`dev` is where work lands. `main` is what Vercel deploys. Do not push to either branch. Open a pull request from `feat/`, `fix/`, `docs/`, `ci/`, or `build/`. CI must pass. A merge commit is the only way in.

```
npm install
npm run generate:sources
npm run dev
```

`RESEND_API_KEY` is server-only. The static export omits `/api/contact`.
