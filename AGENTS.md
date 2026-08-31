# Codex operations

## Production

- Live site: https://romainblachier.fr
- Hosting: Netlify project `stirring-naiad-05bd91`.
- Production branch: `main`; a push can trigger a production deployment.
- CMS: Tina Cloud. The production build reads `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`.

## Local workflow

- Use npm; this repository has a `package-lock.json`.
- Development: `npm run dev`.
- Production-equivalent build: `npm run build`.
- Site-only build for previews: `npm run build:site`.
- SEO check: `npm run verify:seo`.

## Safety rules

- Inspect `git status` before editing and preserve unrelated local changes.
- Do not push `main`, trigger a deploy, or modify Tina/Netlify settings unless the user explicitly requests it.
- Before a production push, run the relevant build and SEO checks.
- After a requested deployment, verify both the Netlify deploy result and the live site.
- Never print, commit, or embed tokens in Git remotes, logs, source files, or documentation.
- Deploy previews and branch deploys intentionally use `npm run build:site`; do not add Tina Cloud credentials to preview contexts merely to generate `/admin`.
