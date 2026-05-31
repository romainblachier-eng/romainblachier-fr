import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { ui } from '../../i18n/ui';

export async function GET(context) {
	const posts = await getCollection('analyses_zh');
	return rss({
		title: ui.zh['seo.title'],
		description: ui.zh['seo.description'],
		site: context.site,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/zh/analyses/${post.data.pilier}/${post.id}/`,
			})),
	});
}
