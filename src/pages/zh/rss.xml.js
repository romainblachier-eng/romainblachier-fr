import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { ui } from '../../i18n/ui';

export async function GET(context) {
	const posts = await getCollection('blog_zh');
	return rss({
		title: ui.zh['seo.title'],
		description: ui.zh['seo.description'],
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/zh/blog/${post.id}/`,
		})),
	});
}
