import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'fr' | 'en' | 'zh';

const publicationsCollection = { fr: 'publications', en: 'publications_en', zh: 'publications_zh' } as const;

export async function getPublications(lang: Lang) {
	const entries = (await getCollection(publicationsCollection[lang] as 'publications')) as CollectionEntry<'publications'>[];
	return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Mots significatifs d'un nom de média, pour reconnaître ce média dans un préfixe ou un suffixe de titre.
const mediaWords = (media: string) =>
	media.toLowerCase().split(/[\s/@'’-]+/).filter((w) => w.length >= 3);

// Préfixes « Mon article dans X : », « My op-ed in X: », « 我在《X》的文章： », « Dans X : »…
// En français et en anglais, ils ne sont retirés que si le segment nomme bien le média
// de l'entrée ; les tournures chinoises (« 我在…的文章： ») sont assez spécifiques pour s'en passer.
const PREFIXES: RegExp[] = [
	/^(?:mon|ma|mes)\s+(?:article|tribune|note|entretien|analyse|chronique)s?\s+(?:dans|sur|au|aux|pour|à)\s+([^:]{2,60}?)\s*:\s*/i,
	/^dans\s+([^:]{2,40}?)\s*:\s*/i,
	/^my\s+(?:article|op-ed|note|interview|column|analysis|paper)\s+(?:in|at|for|on|with)\s+(?:the\s+)?([^:]{2,60}?)\s*:\s*/i,
	/^in\s+([^:,]{2,40}?)\s*:\s*/i,
	/^我(?:在|為)\s*(.{1,30}?)\s*(?:的|撰寫的)(?:文章|專欄|評論|研究報告|報告|投書)：\s*/,
	/^《([^》]{1,30})》：\s*/,
];

/**
 * Titre d'affichage dans les listes qui montrent déjà le média à côté (cartes d'accueil,
 * index des publications) : retire le préfixe « Mon article dans X : » et le suffixe
 * « — X ». Le titre complet reste celui de la page détail et des métadonnées.
 */
export function cardTitle(title: string, media: string) {
	const words = mediaWords(media);
	const names = (s: string) => {
		const l = s.toLowerCase();
		return words.some((w) => l.includes(w)) || l.includes(media.toLowerCase());
	};
	// Étiquette de rubrique chinoise en tête (« 【投書】 » = tribune) : redondante dans une liste.
	let out = title.replace(/^【[^】]{1,6}】\s*/, '');
	for (const re of PREFIXES) {
		const m = out.match(re);
		if (m && (/^[《我]/.test(m[0]) || names(m[1]))) {
			out = out.slice(m[0].length);
			break;
		}
	}
	const s = out.match(/^(.*?)\s*—\s*([^—]+)$/);
	if (s && names(s[2]) && s[2].length <= media.length + 16) out = s[1];
	out = out.trim();
	return out ? out.charAt(0).toUpperCase() + out.slice(1) : title;
}
