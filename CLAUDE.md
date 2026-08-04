# CLAUDE.md — romainblachier.fr

Instructions permanentes pour toute intervention sur ce site (contenu, code, méta, images).

## Contexte du site

Site professionnel de Romain Blachier, repositionné énergie–géopolitique (énergie, Taiwan/Indo-Pacifique, Afrique). Objectif : générer des demandes entrantes — enseignement, interventions médias, conférences, conseil et formation via Lapin Bleu. Ce n'est ni un CV (il existe ailleurs), ni un site politique.

Stack : Astro v5.x + TinaCMS, site statique trilingue FR (défaut) / EN (`/en/`) / ZH (`/zh/`), hébergé sur Netlify (déploiement automatique à chaque push sur `main`). La version FR est la source de vérité éditoriale : EN et ZH sont des traductions fidèles de FR, jamais des versions divergentes.

## Règle n°1 — Zéro invention

- Ne jamais inventer un client, une mission, une date, un chiffre, un titre de publication, un livrable.
- Les contenus incomplets portent un marqueur [à confirmer]. Ne jamais le remplir soi-même : le laisser en place ou demander à Romain.
- Le creux de publications 2024–2025 est réel et assumé. Ne pas le combler, ne pas le maquiller, ne pas antidater.
- Ne rien ajouter à la page Publications qui n'ait une URL source vérifiable.
- En cas de doute sur un fait, vérifier la fiche de faits ci-dessous ; s'il n'y figure pas, demander à Romain.

## Règle n°2 — Anonymisation totale (obligatoire, aucune exception)

Aucun nom de client, de commanditaire ou de collectivité cliente ne doit apparaître sur le site : ni dans les textes, ni dans le code, ni dans les métadonnées, balises title/alt, noms de fichiers, URLs ou commits.

Aucune exception, Cameroun inclus. Dans les études de cas, la mission Cameroun est anonymisée comme les autres. Seule la page Publications conserve les titres et médias tels que publiés : un titre de tribune déjà paru ne se réécrit pas.

Distinctions à appliquer :

1. Clients de conseil (Lapin Bleu) → toujours anonymisés, sans exception.
2. Organismes de formation et établissements d'enseignement (écoles, universités, organismes de formation continue et d'élus) → peuvent être nommés (validé par Romain, 2026-08-04). Le bandeau `trainingOrgs` de `src/data/profile.ts` et la section Références/enseignement restent tels quels ; ne pas y ajouter de nom sans validation.
3. Clients finaux d'une formation (la collectivité ou l'entreprise bénéficiaire) et lieux liés à une mission client → anonymisés dans les études de cas. Un lieu précis (ville, pays, campus) suffit souvent à identifier le commanditaire.

Formulations génériques approuvées (à utiliser telles quelles) :

- Cas PCAET → « une commune de 120 000 habitants »
- Formation d'élus à la transition écologique → « les élus d'une grande ville française »
- Formation secteur juridique → « un groupe d'édition juridique »
- Mission secteur électrique africain → « une institution régionale africaine du secteur électrique », « un État d'Afrique centrale »
- Séminaires à l'étranger → « une capitale d'Asie de l'Est »
- Cycle de conférences universitaires → « une université espagnole »

Si un nouveau cas apparaît sans formulation approuvée : proposer une formulation générique (type de structure + ordre de grandeur), ne jamais publier le nom.

## Règle n°3 — Employeur salarié

Ne jamais mentionner l'employeur salarié de Romain, ni son nom, ni son sigle, ni une périphrase identifiante (y compris tout descripteur du type « troisième producteur français d'électricité »). Formulations génériques : « secteur de l'électricité renouvelable », « secteur de l'énergie ». Toute l'activité de conseil et de formation présentée sur le site est portée par Lapin Bleu, exclusivement. Cette règle s'applique aussi à ce fichier et à tout le dépôt (public).

## Règle n°4 — Pas de politique

- Aucun contenu partisan, aucune mention d'appartenance ou d'engagement politique passé ou présent.
- Les mandats locaux (12 ans d'élu à Lyon) peuvent apparaître comme crédential factuel d'expérience des collectivités, sans étiquette.
- Ne pas remonter d'interviews ou contenus relevant de la vie politique interne dans /publications ou /presse.

## Règle n°5 — Études de cas

Gabarit imposé pour chaque cas :

1. Contexte — type de structure anonymisé (« une intercommunalité de X habitants »)
2. Demande — ce qui a été confié
3. Intervention — méthode, durée
4. Livrable et suites — ce qui a été remis, ce que ça a produit

Cas en attente de compléments (autre boîte mail à connecter) : PCAET 120 000 hab, formation d'élus transition écologique, séminaires à Taipei, conférences à Grenade. Squelettes autorisés avec [à confirmer], publication interdite tant que les trous ne sont pas validés par Romain.

## Règle n°6 — Hygiène du dépôt

- Ce fichier ne contient volontairement aucun nom de client réel : ne pas en ajouter, même en commentaire.
- Pas de noms de clients dans les commentaires de code, les données de test, les fichiers d'exemple ou les messages de commit.
- En cas de doute sur le caractère public d'une information : la traiter comme confidentielle et signaler le doute à Romain plutôt que de publier.

## Fiche de faits — source de vérité (CV expert, août 2026)

### Identité et positionnement

- Romain Blachier. Expert senior — politiques énergétiques, gouvernance publique et coopération internationale.
- Fil rouge intellectuel : l'écart entre l'autorité formellement attribuée et la capacité réelle d'agir dans la gouvernance de l'électricité.
- ORCID : 0009-0008-3178-1600. LinkedIn : linkedin.com/in/romainblachier. Cairn : publications-de-romain-blachier.
- Basé à Lyon, France. Mobilité internationale immédiate.

### Chiffres clés (à utiliser tels quels, ne pas arrondir autrement)

- **18 ans** dans l'électricité renouvelable (depuis 2008). Formulation acceptée : « près de deux décennies ». Ne pas écrire « deux décennies » sec.
- **12 ans** de mandat exécutif local (Ville et Métropole de Lyon, 2008-2020).
- **16 ans** d'enseignement supérieur (depuis 2010), ~180 h/an, ~780 h cumulées, en français, anglais et espagnol.
- **5 pays** de publication : France, Taïwan, États-Unis, Cameroun, Suisse.
- **3 zones** d'intervention : Afrique francophone, Europe, Indo-Pacifique.

### Enseignement 2026-2027 — liste affichée sur le site (10 établissements)

emlyon business school • Grenoble École de Management • École Centrale de Lyon • INSA Lyon • ENTPE • UCLy • Université catholique de Lille • HEIP • ILERI • IRIS Sup'.

Notes :

- **Sciences Po Paris et Sciences Po Lyon (IEP) sont volontairement absents** de la liste affichée (choix de Romain, 2026-08-04) bien qu'il y enseigne : ne pas les réintroduire sans son accord.
- Les belles écoles se placent en tête de liste (ordre voulu).
- École Centrale de Lyon et INSA Lyon sont **programmés 2026-2027** (nouveaux). Ne pas écrire qu'il y intervient « depuis 2010 ».
- Université de Grenade (Espagne) : cycle invité annuel en espagnol, à mentionner à part (hors des 12).
- NTU Taipei ne figure pas au CV 2026-27 : ne pas la lister sans confirmation de Romain.
- Cette liste vit dans `src/data/profile.ts` (source unique) et remplace toute liste divergente.

### Positions institutionnelles

- Chef de projet Innovation dans le secteur de l'électricité renouvelable (depuis 2017, dans l'entreprise depuis 2008 — voir règle n°3, ne jamais nommer).
- Expert associé, Fondation Jean-Jaurès.
- Membre du collège société civile, Plateforme RSE (France Stratégie, services du Premier ministre).
- Président de l'association France-Formosa depuis 2012 ; deux missions officielles à Taïwan sur invitation du MOFA (2019, 2025).
- Recherche doctorale en préparation (Université Lyon 2), codirection Stéphane Cadiou (Triangle) et François-Mathieu Poupeau (LATTS/ENPC), sur la gouvernance de la transition électrique.

### Conseil — Lapin Bleu

- Lapin Bleu SASU (Lyon) : structure indépendante de conseil et de formation, organisme de formation déclaré NDA 84692485869. Facturation France et international.
- Expert référencé auprès de la Banque africaine de développement (BAD) depuis 2025.

## Conventions éditoriales

- **Voix FR homepage** : conserver la structure « J'enseigne / J'écris / J'expertise / Je réfléchis ». C'est la signature du site, ne pas la remplacer par des catégories génériques.
- Ton : sobre, factuel, première personne. Pas d'emphase marketing (« leader », « reconnu », « incontournable »), pas d'emoji dans le corps des pages FR.
- Dates et chiffres toujours vérifiables contre la fiche de faits ci-dessus.
- Les pages Méthodologie et Corrections existent : les préserver, ne jamais les supprimer.
- Ne pas réécrire les pages qui fonctionnent (Presse, Conseil, Méthodologie, Corrections) sans demande explicite.
- Ne pas supprimer le numéro de téléphone de la page Presse sans demander (choix délibéré pour les journalistes).

## Conventions techniques

- Nav et footer : composants uniques (`src/components/Header.astro`, `Footer.astro`) partagés par toutes les pages et toutes les langues. Ne pas dupliquer.
- Chaque page FR doit avoir : title unique, meta description 140-160 caractères, canonical, og:locale:alternate pour en_US **et** zh_TW, balises hreflang réciproques quand l'équivalent existe.
- Sélecteur de langue : pointer vers l'équivalent exact de la page si disponible, sinon masquer la langue pour cette page (géré par `src/i18n/routes.ts`).
- JSON-LD : schema Person sur la homepage, BreadcrumbList sur les pages intérieures.
- Ne pas casser les URL existantes. Toute suppression de page = redirection 301.
- Ne pas ajouter de tracking, cookies ou scripts tiers sans demande explicite.
- Build : `tinacms build` + `astro build` (Node ≥ 22.12 requis). Toute dépendance utilisée dans `src/` doit figurer dans `package.json`.

## Domaines d'enseignement

- Marchés de l'énergie et géopolitique de l'énergie
- Transition énergétique et souveraineté énergétique
- Taïwan & Indo-Pacifique (sécurité énergétique, semi-conducteurs, relations Chine-Taïwan)
- Systèmes politiques comparés
- Communication stratégique et de crise
- Affaires publiques et relations institutionnelles
- Religion & géopolitique
- Gouvernance locale
- Économie de la culture
- IA & enseignement

## Canva MCP — Conventions pour les présentations

- Pas de brand kit configuré pour l'instant
- Workflow obligatoire : `request-outline-review` → `generate-design-structured` → cycle d'édition → export
- Style par défaut pour les cours : `"elegant"`, audience `"educational"`
- Format d'export privilégié : PPTX
- Utiliser le skill `/ppt-cours` pour créer des présentations de cours
