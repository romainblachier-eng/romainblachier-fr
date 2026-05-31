import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'fr' | 'en' | 'zh';

export const PILLARS = ['energie', 'taiwan', 'indo-pacifique', 'notes'] as const;
export type Pillar = (typeof PILLARS)[number];

export const pilierLabels: Record<Pillar, Record<Lang, string>> = {
	energie: { fr: 'Énergie', en: 'Energy', zh: '能源' },
	taiwan: { fr: 'Taïwan', en: 'Taiwan', zh: '台灣' },
	'indo-pacifique': { fr: 'Indo-Pacifique', en: 'Indo-Pacific', zh: '印太' },
	notes: { fr: 'Notes', en: 'Notes', zh: '隨筆' },
};

const analysesCollection = { fr: 'analyses', en: 'analyses_en', zh: 'analyses_zh' } as const;
const publicationsCollection = { fr: 'publications', en: 'publications_en', zh: 'publications_zh' } as const;

export async function getAnalyses(lang: Lang) {
	const entries = (await getCollection(analysesCollection[lang] as 'analyses')) as CollectionEntry<'analyses'>[];
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPublications(lang: Lang) {
	const entries = (await getCollection(publicationsCollection[lang] as 'publications')) as CollectionEntry<'publications'>[];
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
