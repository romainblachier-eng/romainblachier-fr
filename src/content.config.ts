import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { blog, blog_en, blog_zh };
