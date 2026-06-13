import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// PUBLICATIONS — portfolio of op-eds published in other outlets.
// Detail pages are noindex,follow and canonicalize to the host publisher.
// ---------------------------------------------------------------------------
const publicationSchema = ({ image }: { image: Function }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		media: z.string(),
		mediaSlug: z.string(),
		lienCanonique: z.string().url(),
		chapo: z.string().optional(),
		kind: z.enum(['tribune', 'citation']).default('tribune'),
	});

const publications = defineCollection({
	loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
	schema: publicationSchema,
});
const publications_en = defineCollection({
	loader: glob({ base: './src/content/publications_en', pattern: '**/*.{md,mdx}' }),
	schema: publicationSchema,
});
const publications_zh = defineCollection({
	loader: glob({ base: './src/content/publications_zh', pattern: '**/*.{md,mdx}' }),
	schema: publicationSchema,
});

export const collections = {
	publications, publications_en, publications_zh,
};
