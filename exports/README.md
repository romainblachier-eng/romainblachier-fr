# Exports bibliographiques — ORCID, HAL, Cairn

Fichiers générés à partir du contenu du site, pour alimenter les profils de recherche
sans ressaisir quoi que ce soit.

Régénération :

```
npm run export:publications
```

Ces fichiers ne sont pas publiés sur le site : ils servent à l'import dans les
plateformes. Ne pas les éditer à la main — corriger la source puis relancer le script.

| Fichier | À quoi ça sert |
| --- | --- |
| `orcid-works.bib` | 56 travaux signés, prêts pour l'import BibTeX d'ORCID |
| `hal-selection.bib` | 9 travaux à caractère scientifique, pour le dépôt HAL |
| `publications-audit.csv` | Tableau de contrôle : titre du site vs titre normalisé, pour relecture |

## Sources

- `src/content/publications/` — tribunes de presse (version FR, référence éditoriale)
- `src/content/publications_en/` — utilisée quand le texte a paru en anglais
- `src/data/journal-articles.json` — articles de revue sans page sur le site

Les titres sont **dérivés** du site, jamais réécrits : le script retire l'habillage
éditorial (« Mon article dans X : … », « … — Taipei Times ») et rétablit la capitale
initiale. Chaque transformation est tracée dans la colonne `derivation` du CSV. C'est
là qu'il faut relire avant d'importer.

## Où en est chaque plateforme

### Cairn — rien à faire

Cairn n'est pas une plateforme de dépôt : c'est le diffuseur. La page auteur se remplit
toute seule à partir des revues qui y sont diffusées, et elle fonctionne déjà — elle
affiche la bio, l'identifiant ORCID, et les deux articles de revue référencés ci-dessous.
Le seul moyen de « nourrir » Cairn est de publier dans une revue qu'il diffuse.

### ORCID — à importer

Profil : [0009-0008-3178-1600](https://orcid.org/0009-0008-3178-1600)

1. *Works* → *Add* → *Import BibTeX* → charger `orcid-works.bib`.
2. Décocher les doublons signalés plus bas avant de valider.
3. Les tribunes arrivent en type « Other » (`@misc`) et les notes de think tank en
   « Report » (`@techreport`). C'est volontaire : les typer en *journal article*
   ferait passer une tribune de presse pour un article de revue. Le type précis
   (*newspaper article*, *magazine article*) se règle ensuite entrée par entrée.
4. Quand le DOI Cairn des deux articles de revue sera connu, préférer
   *Search & link* → Crossref : les métadonnées seront alors alimentées par l'éditeur.

### HAL — à déposer

Utiliser `hal-selection.bib`, pas `orcid-works.bib` : HAL est une archive scientifique
et sa modération refuse les tribunes de presse. La sélection retient les deux articles
de revue et les sept notes de think tank (Fondation Jean-Jaurès, Terra Nova, Telos,
Global Taiwan Institute, Taiwan Insight).

1. *Déposer* → importer le fichier BibTeX pour préremplir les métadonnées.
2. Typologie : `ART` (article dans une revue) pour les deux articles de revue,
   `OTHER` (autre publication scientifique) pour les notes.
3. ⚠️ HAL demande si l'article est **« avec comité de lecture »**. La réponse
   diffère entre les deux, et Cairn ne permet pas de les distinguer — il étiquette
   tout « Article de revue » :
   - *La Revue de l'Énergie* → **avec** comité de lecture
   - *Cahiers de Conflits* → **sans** comité de lecture

   Chaque entrée `@article` porte le rappel dans son champ `note`.
3. Renseigner l'IdHAL et le lier à l'ORCID : HAL sait ensuite pousser les dépôts
   vers ORCID automatiquement, ce qui évite de refaire l'import à chaque publication.

## À confirmer avant import

Le script signale ces points à chaque exécution. Rien n'a été deviné : les champs
inconnus sont absents des fichiers plutôt que remplis au jugé.

**« La fenêtre de rente : la sortie émirienne de l'OPEP+ comme aboutissement »**
— *La Revue de l'Énergie*, n° 685 (2026/4), p. 48-62. Manque : le DOI.

**« Communistes d'Asie : l'Orient est-il toujours rouge ? »**
— *Cahiers de Conflits*, 2026/3 Mai-Juin, n° 18, p. 40-44. Manque : le DOI.

⚠️ **Doublon confirmé** : ce texte figure deux fois dans `orcid-works.bib` — comme
tribune web Revue Conflits (27 avril 2026) et comme article imprimé dans les Cahiers
de Conflits. Même URL canonique de part et d'autre : c'est le même texte sous deux
formes. N'en importer qu'un.

## Cairn ne certifie rien

Être diffusé par Cairn n'atteste pas d'une évaluation par les pairs. Cairn diffuse
l'édition francophone en sciences humaines — revues académiques et revues de débat
confondues — et applique à tout le contenu d'un numéro la même étiquette « Article de
revue », qui est un type de document et non un label de qualité. Les sous-domaines
`shs.` et `stm.` relèvent d'un découpage disciplinaire, pas d'une hiérarchie.

D'où la distinction portée dans `journal-articles.json` via `comiteDeLecture`, que le
site et les dépôts doivent tenir puisque Cairn l'aplatit.

## Exclusions volontaires

Deux entrées du site restent hors des exports : ORCID et HAL recensent des travaux
signés, or ces deux-là ne le sont pas.

- `le-vif-partis-taiwanais-divisions-pekin` — citation dans un article d'un tiers
- `rti-diplomatie-villes-taiwan` — entretien accordé à Radio Taiwan International
