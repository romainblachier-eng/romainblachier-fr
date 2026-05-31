# AUDIT — Éligibilité Google News + Google Discover

**Site :** romainblachier.fr — Astro v5.18.0 + TinaCMS, hébergé Netlify
**Auteur unique :** Romain Blachier — ORCID `0009-0008-3178-1600`
**Langues :** FR (défaut, sans préfixe) / EN (`/en/`) / ZH (`/zh/`, `zh-Hant`)
**Date de l'audit :** 2026-05-31
**Branche :** `feature/google-news-architecture`
**Statut :** Phase 1 — AUCUNE modification de code effectuée. En attente de validation.

---

## 1. Cartographie du repo

### Structure `src/`
```
src/
├── components/        BaseHead, Header, HeaderLink, Footer, FormattedDate,
│                      MediaLogosBand, ui/shape-landing-hero.tsx (React)
├── consts.ts          SITE_TITLE, SITE_DESCRIPTION
├── content.config.ts  3 collections : blog (FR), blog_en, blog_zh
├── content/
│   ├── blog/          18 articles FR (.md)
│   ├── blog_en/       19 articles EN (.md)  ← 1 doublon (voir §3)
│   └── blog_zh/       18 articles ZH (.md)
├── i18n/              ui.ts (toutes les chaînes), utils.ts (helpers locale)
├── layouts/
│   └── BlogPost.astro  layout article + JSON-LD Article + meta OG
├── lib/utils.ts
├── pages/
│   ├── index.astro / about.astro / travaux.astro / rss.xml.js
│   ├── blog/index.astro + blog/[...slug].astro
│   ├── en/  (index, about, travaux, blog/…)   ← PAS de rss
│   └── zh/  (index, travaux, rss.xml.js, blog/…) ← PAS de about
└── styles/global.css
```

### Content collections (`content.config.ts`)
Schéma **commun et minimal** aux 3 collections :
```ts
{ title, description, pubDate, updatedDate?, heroImage? }
```
> ⚠️ Pas de champ `pilier`, `tags`, `media`, `lienCanonique`, `chapô`, `type`.
> La distinction original/reprise n'existe **nulle part** dans les données — elle
> n'est aujourd'hui lisible que dans le **titre** rédigé à la main.

### Configuration i18n (`astro.config.mjs`)
- `site: https://romainblachier.fr`
- `defaultLocale: fr`, `prefixDefaultLocale: false` (FR à la racine)
- Intégrations : `mdx`, `sitemap` (avec i18n), `react`, `tailwind`
- Sitemap i18n configuré : `fr→fr-FR`, `en→en-US`, `zh→zh-Hant`

### Routing actuel des articles
`/blog/[slug]` (FR), `/en/blog/[slug]`, `/zh/blog/[slug]` — un seul niveau, **tout est
mélangé** (originaux + reprises) dans la même collection et la même URL.

---

## 2. Inventaire des URLs `/blog/` + classification

Classification vérifiée **sur le corps de texte** (présence d'un lien canonique vers
un média hôte), pas seulement sur le titre.

### 2.1 ORIGINAUX primaires → cibles `/analyses/` (2 articles)

| Slug | Titre | Date | Pilier cible proposé |
|------|-------|------|----------------------|
| `petrole-100-dollars` | Le pétrole au-dessus de 100 dollars… | 2026-03-10 | **energie** |
| `Tawan-face--son-quation-nergtique-impossible` | Taïwan face à son équation énergétique impossible | 2026-03-09 | **taiwan** (tag énergie) |

> ⚠️ L'énoncé estimait « ~4 originaux ». La vérification n'en confirme que **2** :
> tous les autres pointent vers un média hôte. À **valider** : veux-tu en requalifier
> certains (ex. une reprise dont tu détiens les droits) en original ?

### 2.2 REPRISES (parutions externes) → cibles `/publications/` (16 articles)

| Slug | Média hôte | Lien canonique détecté | Date |
|------|-----------|------------------------|------|
| `commonwealth-prix-electricite-taiwan` | CommonWealth Magazine | english.cw.com.tw/article/…id=4772 | 2026-05-22 |
| `communistes-asie-revue-conflits` | Revue Conflits | revueconflits.com/communistes-dasie… | 2026-04-27 |
| `jean-jaures-kmt-bascule-pekin` | Fondation Jean-Jaurès | jean-jaures.org/publication/taiwan… | 2026-04-29 |
| `kmt-rhetorique-imperialiste-taiwan` | Asia Times | asiatimes.com | 2026-04-10 |
| `le-vif-partis-taiwanais-divisions-pekin` | Le Vif *(citation, pas tribune)* | levif.be | 2026-05-14 |
| `letemps-coercition-chinoise-ciel-taiwan` | Le Temps | letemps.ch/opinions/coercition… | 2026-04-29 |
| `new-bloom-decarbonation-justice-territoriale-france-taiwan` | New Bloom Magazine | newbloommag.net | 2026-05-24 |
| `ormuz-terra-nova-tensions-energetiques` | Terra Nova / La Grande Conversation | lagrandeconversation.com/monde/ormuz… | 2026-04-21 |
| `revue-conflits-pekin-president-taiwanais` | Revue Conflits | revueconflits.com/comment-pekin… | 2026-04-23 |
| `taipei-times-diplomatie-parlementaire-taiwan` | Taipei Times | taipeitimes.com | 2026-05-03 |
| `taipei-times-geothermie-taiwan` | Taipei Times | taipeitimes.com | 2026-04-17 |
| `taipei-times-paradiplomatie-villes-taiwan` | Taipei Times | taipeitimes.com/News/…/2003857627 | 2026-05-20 |
| `taipei-times-transition-energetique-taiwan` | Taipei Times | taipeitimes.com | 2026-05-27 |
| `taiwan-energy-challenges-nottingham` | Taiwan Insight (Univ. Nottingham) | taiwaninsight.org | 2026-04-10 |
| `telos-emirats-opep-sortie` | Telos | telos-eu.com/fr/energie-la-sortie… | 2026-05-23 |
| `tribune-taipei-times` | Taipei Times | taipeitimes.com/News/…/2003854412 | 2026-03-25 |

**Médias hôtes uniques (pour le filtre du portfolio) :** Taipei Times (5), Revue Conflits (2),
CommonWealth, Jean-Jaurès, Asia Times, Le Vif, Le Temps, New Bloom, Terra Nova, Taiwan Insight, Telos.

> 📝 **Sous-type à prévoir dans le schéma `publications`** : `tribune` (texte écrit par RB)
> vs `citation`/`interview` (article tiers qui le cite — cas `le-vif`). Utile pour ne pas
> présenter une citation comme une signature.

### 2.3 Correspondance des slugs entre langues (impact hreflang — voir §6)

| FR & ZH | EN | OK ? |
|---------|----|------|
| 14 reprises (slugs identiques) | idem | ✅ |
| `petrole-100-dollars` | `oil-above-100-dollars` | ❌ slug EN différent |
| `Tawan-face--son-quation-nergtique-impossible` | `taiwan-impossible-energy-equation` | ❌ slug EN différent |
| `commonwealth-prix-electricite-taiwan` | `commonwealth-prix-electricite-taiwan` **+** `commonwealth-low-electricity-prices-taiwan` | ❌ **doublon EN** |

---

## 3. Vérifications techniques

### 3.1 Sitemaps
- ✅ `sitemap-index.xml` généré → pointe vers `sitemap-0.xml` (**66 URLs**).
- ✅ Alternances hreflang `xhtml:link` présentes dans le sitemap (i18n actif).
- ❌ **Pas de `lastmod`** sur les entrées (l'intégration ne le sérialise pas → à ajouter).
- ❌ **Pas de `news-sitemap.xml`** dédié (à créer en Phase 2).
- ⚠️ `/about/` n'a que les alternates `fr-FR` + `en-US` (pas de `zh-Hant`, car `/zh/about` n'existe pas).

### 3.2 Schema JSON-LD
- ✅ `BlogPost.astro` émet un JSON-LD **`Article`** (headline, author/publisher `Person @id #person`,
  datePublished, dateModified fallback sur pubDate, inLanguage, articleSection, isAccessibleForFree).
- ❌ Type **`Article`** et non **`NewsArticle`** (requis pour la cible News).
- ❌ **`about.astro` n'a AUCUN JSON-LD** : pas de `Person` + `sameAs` (ORCID / LinkedIn / France-Formosa).
- ❌ Pas de **`Organization`/`WebSite`** au niveau site.
- ⚠️ L'`@id #person` est référencé partout mais **jamais défini** (aucune page ne déclare le nœud `Person`).

### 3.3 Pages institutionnelles (E-E-A-T, requis News)

| Page | FR | EN | ZH |
|------|----|----|----|
| À propos (`/about`) | ✅ | ✅ | ❌ manquant |
| Méthodologie | ❌ | ❌ | ❌ |
| Corrections / politique éditoriale | ❌ | ❌ | ❌ |
| Mentions légales | ❌ | ❌ | ❌ |
| Contact (page dédiée) | ❌ (ancre `/#contact` seulement) | ❌ | ❌ |

> Il existe une page `/travaux` (portfolio enseignement + médias) — utile mais ne remplace
> aucune des pages ci-dessus.

### 3.4 Core Web Vitals
Lighthouse **non installable** dans cet environnement (réseau restreint). Analyse statique :

- **LCP** : probable = image héro (`astro:assets <Image>` avec `width/height` explicites → bon
  pour le CLS). Risque : Google Fonts chargées en **render-blocking** (`<link rel=stylesheet>`)
  malgré `preconnect` + `display=swap`. → *Reco : envisager self-host des fonts + `preload` de l'héro.*
- **CLS** : a priori faible (dimensions d'images fixées ; fonts en swap).
- **INP** : JS minimal — **un seul îlot React** `client:load` (`shape-landing-hero`) **sur la home
  uniquement**. Les pages article sont quasi 100 % statiques. → *Reco : passer l'îlot en `client:visible`
  ou `client:idle` si possible.*
- ⚠️ 1 article FR sans `heroImage` (`petrole-100-dollars`) → pas d'image OG/héro dédiée.

### 3.5 Cohérence hreflang
- ✅ `BaseHead.astro` émet `fr` / `en` / `zh-Hant` / `x-default` sur **toutes** les pages.
- ❌ **MAIS** les liens hreflang sont générés en **réutilisant le même slug** (strip du préfixe locale).
  Pour les 2 originaux dont le slug EN diffère, BaseHead pointe vers `/en/blog/petrole-100-dollars`
  et `/en/blog/Tawan-face…` qui **n'existent pas (404)**. Le sitemap, lui, **omet** l'alternate EN
  → incohérence BaseHead ↔ sitemap.
- ⚠️ `/about` déclare un hreflang `zh-Hant` vers `/zh/about` **inexistant**.
- ℹ️ Un script inline reconnaît déjà le problème (« Article slugs differ between locales »).

### 3.6 Redirections existantes (`public/_redirects`, Netlify)
- Uniquement des redirections **302 par langue du navigateur** (`/`, `/about`, `/blog/*`).
- ❌ **Aucune 301**. La future migration `/blog/[slug]` → `/analyses|/publications` devra
  ajouter des 301 systématiques (et préserver ces 302 de langue ou les revoir).

### 3.7 robots.txt
- ✅ Présent, `Allow: /`, pointe `sitemap-index.xml`.
- ❌ Ne référence pas (encore) le futur `news-sitemap.xml`.

### 3.8 RSS
- ✅ `rss.xml` (FR) et `/zh/rss.xml`. ❌ Pas de RSS EN. (Discover apprécie un flux propre.)

---

## 4. Diagnostic de synthèse

Le problème central confirmé : **une seule collection mélange 2 originaux et 16 reprises**,
sans aucune donnée structurée distinguant les deux. Les reprises (qui devraient être `noindex`
et canonicaliser vers le média hôte) sont aujourd'hui indexées comme du contenu de premier plan,
ce qui dilue le signal éditorial et fait lire le site comme un agrégateur. S'ajoutent : absence
de `NewsArticle`, de nœud `Person`+`sameAs`, des pages E-E-A-T, et un hreflang cassé sur les
originaux (slugs EN divergents).

---

## 5. Checklist priorisée

### 🔴 P0 — Bloquants éligibilité News/Discover
- [ ] **P0.1** Créer collections + schémas `analyses` et `publications` (avec `type`, `pilier`,
      `tags`, `media`, `lienCanonique`, `chapo`, `dateMaj`).
- [ ] **P0.2** Migrer les 2 originaux → `/analyses/[pilier]/[slug]` ; les 16 reprises →
      `/publications/[media]/[slug]`.
- [ ] **P0.3** `noindex,follow` + `<link rel=canonical>` vers le média hôte sur **chaque** page
      détail `/publications/`.
- [ ] **P0.4** **301** de toutes les anciennes URLs `/blog/[slug]` (FR/EN/ZH) vers leur destination ;
      script de vérification en fin de Phase 2.
- [ ] **P0.5** Passer le JSON-LD article de `Article` → **`NewsArticle`** sur `/analyses/` + définir
      réellement le nœud **`Person`** (`@id #person`) avec `sameAs` (ORCID, LinkedIn, France-Formosa).
- [ ] **P0.6** Pages institutionnelles FR/EN/ZH : **À propos** (+ZH manquant), **Méthodologie**,
      **Corrections/politique éditoriale**, **Mentions légales**, **Contact**.

### 🟠 P1 — Importants (qualité du signal)
- [ ] **P1.1** `news-sitemap.xml` dédié `/analyses/` (≤ 1000 URLs, 2 dernières années) + déclaration
      dans `robots.txt`.
- [ ] **P1.2** Corriger le **hreflang des originaux** (slugs EN divergents) : table de correspondance
      explicite plutôt que substitution naïve de slug, côté BaseHead **et** sitemap.
- [ ] **P1.3** Résoudre le **doublon EN `commonwealth-*`** (garder une seule version, 301 de l'autre).
- [ ] **P1.4** Ajouter `lastmod` au sitemap + `dateModified` **visible** et dans le schéma sur `/analyses/`.
- [ ] **P1.5** Hubs piliers `/analyses/energie/`, `/analyses/taiwan/`, `/analyses/indo-pacifique/`,
      `/analyses/notes/` + page `/publications/` filtrable (média / thème / année).
- [ ] **P1.6** Schema `Organization`/`WebSite` au niveau site.

### 🟡 P2 — Optimisations
- [ ] **P2.1** Core Web Vitals : self-host fonts + `preload` héro ; îlot React `client:load`→`client:visible`.
- [ ] **P2.2** Flux **RSS EN** ; envisager un flux dédié `/analyses/`.
- [ ] **P2.3** `heroImage` pour `petrole-100-dollars` (et image OG par défaut par pilier).
- [ ] **P2.4** Distinguer sous-type `tribune` vs `citation` dans `publications` (cas `le-vif`).
- [ ] **P2.5** Fil d'Ariane (`BreadcrumbList` JSON-LD) sur les nouvelles sections.

---

## 6. Points nécessitant ta décision avant la Phase 2

1. **Nombre d'originaux** : seuls **2** sont des originaux primaires (pas 4). En requalifier d'autres ?
2. **Pilier de `Taiwan-face…`** : `/analyses/taiwan/` ou `/analyses/energie/` ? (proposé : taiwan + tag énergie)
3. **Mapping `[media]`** dans l'URL des publications : slugs médias souhaités
   (`taipei-times`, `revue-conflits`, `le-temps`, `commonwealth`, `jean-jaures`, `asia-times`,
   `new-bloom`, `terra-nova`, `taiwan-insight`, `telos`, `le-vif`) — valides-tu ces libellés ?
4. **Reprises et langues** : on conserve les 3 versions FR/EN/ZH des reprises en `noindex`,
   ou on n'en garde qu'une langue par parution ?
5. **`/blog/` après migration** : on supprime l'ancienne route (tout en 301) ou on garde
   un `/blog/` qui redirige vers `/analyses/` ?
6. **Branche / instruction** : la consigne globale du repo cible `claude/commonwealth-magazine-summary-8zqKj`,
   mais cette tâche demande explicitement `feature/google-news-architecture` (utilisée ici). À confirmer.

---

*Fin Phase 1. Aucune modification de code n'a été faite. En attente de validation pour la Phase 2.*
