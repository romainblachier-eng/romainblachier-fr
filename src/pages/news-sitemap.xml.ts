import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const SITE = 'https://romainblachier.fr';
const PUBLICATION_NAME = 'Romain Blachier';
// Google News sitemaps only include articles from the last 2 days for crawling,
// but the spec asks for the last 2 years and a 1000-URL cap as an upper bound.
const MAX_AGE_MS = 2 * 365 * 24 * 60 * 60 * 1000;
const MAX_URLS = 1000;

const xmlEscape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
	const [fr, en, zh] = await Promise.all([
		getCollection('analyses'),
		getCollection('analyses_en'),
		getCollection('analyses_zh'),
	]);

	const rows = [
		...fr.map((p) => ({ p, lang: 'fr', prefix: '' })),
		...en.map((p) => ({ p, lang: 'en', prefix: '/en' })),
		...zh.map((p) => ({ p, lang: 'zh', prefix: '/zh' })),
	];

	const now = Date.now();
	const entries = rows
		.filter(({ p }) => now - new Date(p.data.pubDate).valueOf() <= MAX_AGE_MS)
		.sort((a, b) => new Date(b.p.data.pubDate).valueOf() - new Date(a.p.data.pubDate).valueOf())
		.slice(0, MAX_URLS)
		.map(({ p, lang, prefix }) => {
			const loc = `${SITE}${prefix}/analyses/${p.data.pilier}/${p.id}/`;
			const date = new Date(p.data.pubDate).toISOString();
			return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(PUBLICATION_NAME)}</news:name>
        <news:language>${lang}</news:language>
      </news:publication>
      <news:publication_date>${date}</news:publication_date>
      <news:title>${xmlEscape(p.data.title)}</news:title>
    </news:news>
  </url>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
