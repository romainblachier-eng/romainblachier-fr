import { defineConfig } from "tinacms";

// Liste des médias (label affiché ↔ identifiant technique « slug »).
// Le slug sert au logo et à l'URL ; le label est le nom affiché sur le site.
const MEDIA_OPTIONS = [
  { value: "jean-jaures", label: "Fondation Jean-Jaurès" },
  { value: "global-taiwan-institute", label: "Global Taiwan Institute" },
  { value: "udn", label: "聯合報 United Daily News" },
  { value: "liberty-times", label: "自由時報 Liberty Times" },
  { value: "taipei-times", label: "Taipei Times" },
  { value: "rti", label: "Radio Taiwan International" },
  { value: "new-bloom", label: "New Bloom Magazine" },
  { value: "telos", label: "Telos" },
  { value: "ceias", label: "CEIAS" },
  { value: "commonwealth", label: "CommonWealth Magazine" },
  { value: "le-vif", label: "Le Vif" },
  { value: "le-temps", label: "Le Temps" },
  { value: "revue-conflits", label: "Revue Conflits" },
  { value: "terra-nova", label: "Terra Nova · La Grande Conversation" },
  { value: "taiwan-insight", label: "Taiwan Insight (Univ. of Nottingham)" },
  { value: "asia-times", label: "Asia Times" },
  { value: "samoa-observer", label: "Samoa Observer" },
  { value: "slate-fr", label: "Slate.fr" },
  { value: "lyon-mag", label: "Lyon Mag" },
  { value: "hespress", label: "Hespress" },
  { value: "revue-energie", label: "La Revue de l'Énergie" },
  { value: "defis-actuels", label: "Défis Actuels" },
  { value: "ecomatin", label: "EcoMatin" },
  { value: "le-monde", label: "Le Monde" },
  { value: "liberation", label: "Libération" },
  { value: "marianne", label: "Marianne" },
  { value: "huffpost", label: "Le HuffPost" },
  { value: "rue89-lyon", label: "Rue89 Lyon" },
  { value: "cameroun-actuel", label: "Cameroun Actuel" },
  { value: "african-arguments", label: "African Arguments" },
];

// Champs communs aux trois collections de publications (FR / EN / ZH).
const publicationFields = [
  {
    type: "string",
    name: "title",
    label: "Titre",
    isTitle: true,
    required: true,
  },
  {
    type: "string",
    name: "media",
    label: "Média (nom affiché)",
    required: true,
    options: MEDIA_OPTIONS.map((m) => ({ value: m.label, label: m.label })),
  },
  {
    type: "string",
    name: "mediaSlug",
    label: "Identifiant du média (logo + URL) — choisir le MÊME média que ci-dessus",
    required: true,
    options: MEDIA_OPTIONS,
  },
  {
    type: "string",
    name: "kind",
    label: "Type",
    required: true,
    options: [
      { value: "tribune", label: "Tribune / article" },
      { value: "citation", label: "Citation" },
      { value: "interview", label: "Interview / entretien" },
    ],
  },
  {
    type: "string",
    name: "lienCanonique",
    label: "Lien canonique (URL de l'article sur le média)",
  },
  {
    type: "string",
    name: "description",
    label: "Description (SEO)",
    required: true,
    ui: { component: "textarea" },
  },
  {
    type: "datetime",
    name: "pubDate",
    label: "Date de publication",
    required: true,
  },
  {
    type: "datetime",
    name: "updatedDate",
    label: "Date de mise à jour",
  },
  {
    type: "string",
    name: "heroImage",
    label: "Image principale (logo du média) — ex. ../../assets/le-temps-logo.jpg",
    description: "Chemin relatif vers le logo dans src/assets, au format ../../assets/nom-du-fichier",
  },
  {
    type: "string",
    name: "body",
    label: "Contenu",
    isBody: true,
    ui: { component: "textarea" },
  },
];

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "src",
    },
  },
  schema: {
    collections: [
      {
        name: "publications",
        label: "Publications (FR)",
        path: "src/content/publications",
        format: "md",
        fields: publicationFields,
      },
      {
        name: "publications_en",
        label: "Publications (EN)",
        path: "src/content/publications_en",
        format: "md",
        fields: publicationFields,
      },
      {
        name: "publications_zh",
        label: "Publications (ZH)",
        path: "src/content/publications_zh",
        format: "md",
        fields: publicationFields,
      },
      {
        name: "blog",
        label: "Articles (blog)",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description (SEO)",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date de publication",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Date de mise à jour",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Image principale",
          },
          {
            type: "string",
            name: "body",
            label: "Contenu",
            isBody: true,
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
