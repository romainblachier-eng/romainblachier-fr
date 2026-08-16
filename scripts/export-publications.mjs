// Builds import-ready bibliographies from the site's own content, so that ORCID
// and HAL can be fed without retyping anything by hand.
//
//   node scripts/export-publications.mjs
//
// Sources of truth:
//   - src/content/publications/       (FR)  — press op-eds, canonical editorial record
//   - src/content/publications_en/    (EN)  — used when the piece was published in English
//   - src/data/journal-articles.json        — journal articles that have no page on the site
//
// Outputs, all under exports/:
//   - orcid-works.bib        every authored work, ready for ORCID's "Import BibTeX"
//   - hal-selection.bib      the scholarly subset only (HAL moderation refuses press op-eds)
//   - publications-audit.csv every entry with its raw and normalised title, to be proof-read
//
// Nothing here invents metadata: titles are *derived* from the site by stripping the
// editorial framing ("Mon article dans X : …"), never rewritten. The audit CSV exists so
// that every derivation can be checked against the original.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const FR_DIR = 'src/content/publications';
const EN_DIR = 'src/content/publications_en';
const JOURNAL_FILE = 'src/data/journal-articles.json';
const OUT_DIR = 'exports';

const AUTHOR = 'Blachier, Romain';
const ORCID = '0009-0008-3178-1600';

// --- Editorial policy tables -------------------------------------------------

// Outlets that publish analysis rather than press copy. These map to BibTeX
// @techreport (ORCID work type "report") and are the ones HAL will accept.
const THINK_TANKS = new Set([
	'Fondation Jean-Jaurès',
	'Terra Nova · La Grande Conversation',
	'Global Taiwan Institute',
	'Taiwan Insight (Univ. of Nottingham)',
	'Telos',
]);

// Language the piece was actually published in. Anything absent defaults to 'fr'.
// 'en' pulls the title from publications_en/, which carries the real English headline.
const ORIGINAL_LANG = {
	'african-arguments-cameroun-electricite': 'en',
	'commonwealth-prix-electricite-taiwan': 'en',
	'gti-paradiplomatie-taiwan': 'en',
	'kmt-rhetorique-imperialiste-taiwan': 'en',
	'liberty-times-electricite-geothermie-eolien': 'zh',
	'new-bloom-decarbonation-justice-territoriale-france-taiwan': 'en',
	'samoa-observer-renouvelables-cyclone': 'en',
	'taipei-times-bouee-strategie-energetique-taiwan': 'en',
	'taipei-times-cycle-combustible-nucleaire-taiwan': 'en',
	'taipei-times-diplomatie-parlementaire-taiwan': 'en',
	'taipei-times-geothermie-institutions-taiwan': 'en',
	'taipei-times-geothermie-taiwan': 'en',
	'taipei-times-kinmen-electricite-chine': 'en',
	'taipei-times-paradiplomatie-villes-taiwan': 'en',
	'taipei-times-transition-energetique-taiwan': 'en',
	'taiwan-energy-challenges-nottingham': 'en',
	'tribune-taipei-times': 'en',
	'udn-autoproduction-renouvelables-taiwan': 'zh',
	'udn-gouvernance-energetique-taiwan': 'zh',
};

// Site titles whose editorial framing is not a strippable prefix or suffix.
// Each value is the published headline as it appears on the outlet.
const TITLE_OVERRIDES = {
	'taipei-times-geothermie-institutions-taiwan': "Taiwan's geothermal problem is above ground",
	'taipei-times-transition-energetique-taiwan': "Why Taiwan's energy transition keeps falling short",
};

// Trailing " — <outlet>" forms that appear in site titles, per media value.
const SUFFIX_VARIANTS = {
	'自由時報 Liberty Times': ['自由時報 (Liberty Times)', '自由時報'],
	'聯合報 United Daily News': ['聯合報 (United Daily News)', '聯合報'],
	'Taiwan Insight (Univ. of Nottingham)': ['Taiwan Insight / University of Nottingham', 'Taiwan Insight／諾丁罕大學'],
	'CommonWealth Magazine': ['CommonWealth Magazine', '天下雜誌 CommonWealth'],
	'African Arguments': ['tribune dans African Arguments', 'African Arguments評論', 'African Arguments'],
	'Radio Taiwan International': ['Radio Taiwan International', '中央廣播電臺'],
	'Taipei Times': ['Taipei Times', '台北時報'],
};

// --- Frontmatter ------------------------------------------------------------

function parseFrontmatter(raw) {
	const m = raw.match(/^---\n([\s\S]*?)\n---/);
	if (!m) return null;
	const out = {};
	for (const line of m[1].split('\n')) {
		const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
		if (!kv) continue;
		let v = kv[2].trim();
		if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
			v = v.slice(1, -1);
		}
		out[kv[1]] = v.replace(/\\"/g, '"');
	}
	return out;
}

function loadDir(dir) {
	const map = new Map();
	for (const f of readdirSync(dir)) {
		if (!f.endsWith('.md') && !f.endsWith('.mdx')) continue;
		const fm = parseFrontmatter(readFileSync(join(dir, f), 'utf8'));
		if (fm) map.set(f.replace(/\.mdx?$/, ''), fm);
	}
	return map;
}

// --- Title normalisation ----------------------------------------------------

// "Mon article dans Le Monde : « Titre »" -> "Titre". Only the framing is removed;
// the headline itself is never reworded.
const PREFIXES = [
	/^(Mon article|Ma tribune|Ma note|Mon entretien|Mon reportage)\b[^:]*:\s*/,
	/^(My article|My op-ed|My note|My interview|My report)\b[^:]*:\s*/,
	/^Dans\s+[^:]*:\s*/,
	/^Le Vif:\s*/,
];

function stripQuotes(s) {
	let t = s.trim();
	let changed = true;
	while (changed) {
		changed = false;
		for (const [open, close] of [['«', '»'], ['"', '"'], ['“', '”'], ['〈', '〉'], ['「', '」']]) {
			if (t.startsWith(open) && t.endsWith(close) && t.length > 2) {
				t = t.slice(open.length, t.length - close.length).trim();
				changed = true;
			}
		}
	}
	return t;
}

function normaliseTitle(slug, raw, media) {
	if (TITLE_OVERRIDES[slug]) return { title: TITLE_OVERRIDES[slug], derivation: 'override' };

	let t = stripQuotes(raw);
	const steps = [];

	for (const re of PREFIXES) {
		if (re.test(t)) {
			t = t.replace(re, '').trim();
			steps.push('prefix');
			break;
		}
	}

	// Remove a trailing outlet mention, anchored on a known variant so that em dashes
	// inside the headline itself survive.
	const variants = [media, ...(SUFFIX_VARIANTS[media] || [])]
		.filter(Boolean)
		.sort((a, b) => b.length - a.length);
	for (const v of variants) {
		const suffix = ` — ${v}`;
		if (t.endsWith(suffix)) {
			t = t.slice(0, -suffix.length).trim();
			steps.push('suffix');
			break;
		}
	}

	t = stripQuotes(t);

	// Stripping the framing can leave a headline that began as a subordinate clause
	// ("Ma tribune dans X : la vraie raison de…"). Restoring the initial capital is a
	// typographic fix, not a rewrite.
	if (steps.includes('prefix') && t && t[0] !== t[0].toUpperCase()) {
		t = t[0].toUpperCase() + t.slice(1);
		steps.push('capitale');
	}

	return { title: t, derivation: steps.length ? steps.join('+') : 'verbatim' };
}

// --- BibTeX -----------------------------------------------------------------

const BIBTEX_SPECIALS = /([{}\\&%$#_])/g;
const esc = (s) => String(s).replace(BIBTEX_SPECIALS, '\\$1');

function bibEntry(type, key, fields) {
	const rows = Object.entries(fields)
		.filter(([, v]) => v !== null && v !== undefined && v !== '')
		.map(([k, v]) => `\t${k.padEnd(12)} = {${v}}`);
	return `@${type}{${key},\n${rows.join(',\n')}\n}`;
}

const LANG_NAME = { fr: 'french', en: 'english', zh: 'chinese' };

// --- Build ------------------------------------------------------------------

const fr = loadDir(FR_DIR);
const en = loadDir(EN_DIR);
const journals = JSON.parse(readFileSync(JOURNAL_FILE, 'utf8'));

const works = [];
const warnings = [];

for (const [slug, meta] of [...fr.entries()].sort()) {
	// ORCID and HAL record works one has authored. A press citation or a granted
	// interview is neither, so both stay out of the bibliography by design.
	if (meta.kind && meta.kind !== 'tribune') {
		warnings.push(`exclu (kind=${meta.kind}) : ${slug}`);
		continue;
	}

	const lang = ORIGINAL_LANG[slug] || 'fr';
	const source = lang === 'en' && en.has(slug) ? en.get(slug) : meta;
	if (lang === 'en' && !en.has(slug)) warnings.push(`pas de version EN, titre FR utilisé : ${slug}`);

	const { title, derivation } = normaliseTitle(slug, source.title, meta.media);
	const date = new Date(meta.pubDate);
	if (Number.isNaN(date.getTime())) {
		warnings.push(`date illisible, entrée ignorée : ${slug}`);
		continue;
	}

	const isThinkTank = THINK_TANKS.has(meta.media);
	works.push({
		slug,
		key: `blachier${date.getUTCFullYear()}-${slug}`,
		type: isThinkTank ? 'techreport' : 'misc',
		scholarly: isThinkTank,
		title,
		rawTitle: source.title,
		derivation,
		media: meta.media,
		lang,
		date,
		url: meta.lienCanonique,
		abstract: meta.description,
		kind: meta.kind || 'tribune',
	});
}

for (const j of journals) {
	works.push({
		slug: j.slug,
		key: `blachier${j.year}-${j.slug}`,
		type: 'article',
		scholarly: true,
		title: j.title,
		rawTitle: j.title,
		derivation: 'journal-articles.json',
		media: j.journal,
		lang: j.lang,
		date: new Date(Date.UTC(j.year, 0, 1)),
		year: j.year,
		url: j.url,
		journal: j,
		kind: 'article de revue',
		aConfirmer: j.aConfirmer || [],
	});
	for (const f of j.aConfirmer || []) warnings.push(`à confirmer — ${j.slug} : ${f}`);
	// A journal article that also ran online exists twice in this export: once as the
	// web op-ed, once as the print reference. Importing both would double-count it.
	if (j.relatedSitePublication) {
		warnings.push(
			`doublon ${j.memeTexteQueVersionWeb ? 'confirmé' : 'probable'} — ${j.slug} et ` +
				`${j.relatedSitePublication} sont le même texte (version imprimée / version web) : ` +
				`n'en importer qu'un`,
		);
	}
	if (j.comiteDeLecture === false) {
		warnings.push(`HAL — ${j.slug} : déclarer SANS comité de lecture (Cairn ne le distingue pas)`);
	}
}

works.sort((a, b) => b.date - a.date);

function toBibtex(w) {
	if (w.type === 'article') {
		const j = w.journal;
		return bibEntry('article', w.key, {
			author: esc(AUTHOR),
			title: `{${esc(w.title)}}`,
			journal: esc(j.journal),
			year: j.year,
			volume: j.volume ? esc(j.volume) : null,
			number: j.number ? esc(j.number) : null,
			// BibTeX ranges use an en dash: "48-62" -> "48--62".
			pages: j.pages ? esc(j.pages).replace(/(\d)\s*-\s*(\d)/, '$1--$2') : null,
			issn: j.issn || null,
			doi: j.doi || null,
			url: j.url || null,
			publisher: j.publisher ? esc(j.publisher) : null,
			language: LANG_NAME[j.lang] || null,
			keywords: j.keywords?.length ? esc(j.keywords.join(', ')) : null,
			// Cairn's "date de mise en ligne" is the online release, not the print date.
			urldate: j.dateEnLigne || null,
			note: [
				j.urlIsIssueLevel ? 'URL = sommaire du numero' : null,
				j.dateEnLigne ? `mis en ligne le ${j.dateEnLigne}` : null,
				// A known start page with no end page is stated as such rather than
				// emitted as a range, which would invent an extent.
				!j.pages && j.pageDebut ? `commence p. ${j.pageDebut}, page de fin a confirmer` : null,
				// HAL's deposit form asks whether an ART is "avec comite de lecture".
				// Cairn labels every hosted item "Article de revue" regardless, so the
				// answer has to travel with the entry or it gets mis-declared.
				j.comiteDeLecture === false ? 'HAL : declarer SANS comite de lecture' : null,
				j.comiteDeLecture === true ? 'HAL : declarer AVEC comite de lecture' : null,
			]
				.filter(Boolean)
				.join(' ; ') || null,
			orcid: ORCID,
		});
	}

	const common = {
		author: esc(AUTHOR),
		title: `{${esc(w.title)}}`,
		year: w.date.getUTCFullYear(),
		month: w.date.getUTCMonth() + 1,
		date: w.date.toISOString().slice(0, 10),
		url: esc(w.url),
		language: LANG_NAME[w.lang] || null,
		abstract: esc(w.abstract),
		orcid: ORCID,
	};

	if (w.type === 'techreport') {
		return bibEntry('techreport', w.key, {
			...common,
			institution: esc(w.media),
			type: 'Note d\'analyse',
		});
	}
	return bibEntry('misc', w.key, {
		...common,
		howpublished: esc(w.media),
		note: 'Tribune de presse',
	});
}

mkdirSync(OUT_DIR, { recursive: true });

const header = (what) =>
	`% ${what}\n% Romain Blachier — ORCID ${ORCID}\n` +
	`% Genere par scripts/export-publications.mjs — ne pas editer a la main.\n\n`;

writeFileSync(
	join(OUT_DIR, 'orcid-works.bib'),
	header('Travaux signes — import ORCID') + works.map(toBibtex).join('\n\n') + '\n',
);

const halWorks = works.filter((w) => w.scholarly);
writeFileSync(
	join(OUT_DIR, 'hal-selection.bib'),
	header('Sous-ensemble scientifique — depot HAL') + halWorks.map(toBibtex).join('\n\n') + '\n',
);

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csv = [
	['slug', 'date', 'support', 'langue', 'type_bibtex', 'orcid', 'hal', 'titre_normalise', 'titre_site', 'derivation', 'url'],
	...works.map((w) => [
		w.slug,
		w.date.toISOString().slice(0, 10),
		w.media,
		w.lang,
		w.type,
		'oui',
		w.scholarly ? 'oui' : 'non',
		w.title,
		w.rawTitle,
		w.derivation,
		w.url || '',
	]),
]
	.map((row) => row.map(csvCell).join(','))
	.join('\n');
writeFileSync(join(OUT_DIR, 'publications-audit.csv'), csv + '\n');

console.log(`${works.length} travaux exportés → ${OUT_DIR}/orcid-works.bib`);
console.log(`${halWorks.length} retenus pour HAL → ${OUT_DIR}/hal-selection.bib`);
console.log(`audit des titres → ${OUT_DIR}/publications-audit.csv`);
if (warnings.length) {
	console.log(`\n${warnings.length} point(s) à vérifier :`);
	for (const w of warnings) console.log('  -', w);
}
