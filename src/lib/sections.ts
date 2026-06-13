import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'fr' | 'en' | 'zh';

const publicationsCollection = { fr: 'publications', en: 'publications_en', zh: 'publications_zh' } as const;

export async function getPublications(lang: Lang) {
	const entries = (await getCollection(publicationsCollection[lang] as 'publications')) as CollectionEntry<'publications'>[];
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
