import { config, fields, collection } from '@keystatic/core';

const articleFields = {
  title: fields.slug({ name: { label: 'Titre / Title' } }),
  description: fields.text({ label: 'Description (SEO)', multiline: true, validation: { isRequired: true } }),
  pubDate: fields.date({ label: 'Date de publication', validation: { isRequired: true } }),
  updatedDate: fields.date({ label: 'Date de mise à jour' }),
  heroImage: fields.image({
    label: 'Image principale',
    directory: 'src/assets',
    publicPath: '../../assets/',
  }),
};

export default config({
  storage: { kind: 'local' },
  collections: {
    blog: collection({
      label: 'Articles (FR)',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...articleFields,
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
    blog_en: collection({
      label: 'Articles (EN)',
      slugField: 'title',
      path: 'src/content/blog_en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        ...articleFields,
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
