import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { ui } from '../../i18n/ui';

export async function GET(context) {
	const posts = await getCollection('analyses_en');
	return rss({
		title: ui.en['seo.title'],
		description: ui.en['seo.description'],
		site: context.site,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: `/en/analyses/${post.data.pilier}/${post.id}/`,
			})),
	});
}
