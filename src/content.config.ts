import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// Legacy "blog" collections — kept until the /blog content is fully migrated
// to /analyses and /publications. The /blog/* URLs are 301-redirected.
// ---------------------------------------------------------------------------
const blogSchema = ({ image }: { image: Function }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

const blog_en = defineCollection({
	loader: glob({ base: './src/content/blog_en', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

const blog_zh = defineCollection({
	loader: glob({ base: './src/content/blog_zh', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

// ---------------------------------------------------------------------------
// ANALYSES — original, primary content. Indexable, eligible for News/Discover.
// ---------------------------------------------------------------------------
export const PILLARS = ['energie', 'taiwan', 'indo-pacifique', 'notes'] as const;

const analyseSchema = ({ image }: { image: Function }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		pilier: z.enum(PILLARS),
		tags: z.array(z.string()).default([]),
		chapo: z.string().optional(),
	});

const analyses = defineCollection({
	loader: glob({ base: './src/content/analyses', pattern: '**/*.{md,mdx}' }),
	schema: analyseSchema,
});
const analyses_en = defineCollection({
	loader: glob({ base: './src/content/analyses_en', pattern: '**/*.{md,mdx}' }),
	schema: analyseSchema,
});
const analyses_zh = defineCollection({
	loader: glob({ base: './src/content/analyses_zh', pattern: '**/*.{md,mdx}' }),
	schema: analyseSchema,
});

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
	blog, blog_en, blog_zh,
	analyses, analyses_en, analyses_zh,
	publications, publications_en, publications_zh,
};
