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

## Publication titles

- For an article about a country other than France, include that country's name in parentheses when it is absent from the article title. For example: `À Douala, les usines devraient connaître la veille l'heure de la coupure (Cameroun)`.
- Put this country label before any publisher suffix such as `— EcoMatin`, so it remains visible when homepage cards omit the publisher. A country mentioned only in a publisher suffix is not sufficient.
- Use the country that the article concerns, not the publisher's location. For a comparison focused on several countries, name the relevant countries together. Do not invent a single country for a worldwide or broadly regional topic.
- Do not add `(France)` to articles solely about France. Do not duplicate a country already named in the article title; common country names and abbreviations in each language count.
- Apply this rule to French, English, and Traditional Chinese entries, using the corresponding country names. Preserve descriptions and article text when only the title needs changing.
- Before publishing, verify that the country remains visible on homepage cards, the Publications index, and the article detail page.

## Safety rules

- Inspect `git status` before editing and preserve unrelated local changes.
- Do not push `main`, trigger a deploy, or modify Tina/Netlify settings unless the user explicitly requests it.
- Before a production push, run the relevant build and SEO checks.
- After a requested deployment, verify both the Netlify deploy result and the live site.
- Never print, commit, or embed tokens in Git remotes, logs, source files, or documentation.
- Deploy previews and branch deploys intentionally use `npm run build:site`; do not add Tina Cloud credentials to preview contexts merely to generate `/admin`.
