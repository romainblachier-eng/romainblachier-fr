import { defineConfig, type Collection } from "tinacms";

const articleFields: Collection["fields"] = [
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
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
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
        name: "blog",
        label: "Articles (FR)",
        path: "src/content/blog",
        format: "md",
        fields: articleFields,
      },
      {
        name: "blog_en",
        label: "Articles (EN)",
        path: "src/content/blog_en",
        format: "md",
        fields: articleFields,
      },
    ],
  },
});
