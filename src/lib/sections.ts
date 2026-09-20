import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'fr' | 'en' | 'zh';

const publicationsCollection = { fr: 'publications', en: 'publications_en', zh: 'publications_zh' } as const;

export async function getPublications(lang: Lang) {
	const entries = (await getCollection(publicationsCollection[lang] as 'publications')) as CollectionEntry<'publications'>[];
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Titre pour les cartes d'accueil : retire le suffixe « — Média » quand la carte affiche déjà le média.
export function cardTitle(title: string, media: string) {
	const m = title.match(/^(.*?)\s*—\s*([^—]+)$/);
	if (!m) return title;
	const key = media.split(' ')[0];
	return m[2].includes(key) && m[2].length <= media.length + 16 ? m[1] : title;
}
