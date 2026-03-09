import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "3751d4fc-dd15-4aca-a025-57b1e024faf2",
  token: "0eb32f1fe4209ae9a7775a05fe274d9e0c19616f",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Articles",
        path: "src/content/blog",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "pubDate", label: "Date de publication", required: true },
          { type: "string", name: "description", label: "Description (SEO)", required: true },
          { type: "string", name: "category", label: "Catégorie" },
          { type: "rich-text", name: "body", label: "Contenu", isBody: true },
        ],
      },
    ],
  },
});
