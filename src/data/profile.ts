// -----------------------------------------------------------------------------
// SOURCE UNIQUE des faits de parcours affichés sur le site.
//
// Avant ce fichier, les listes d'établissements étaient recopiées à la main dans
// six pages (trois homes + trois « À propos ») et avaient divergé : Sciences Po
// Paris manquait sur les homes, EM Lyon et Centrale Lyon manquaient sur À propos,
// et NTU figurait sur les homes sans exister nulle part ailleurs. Toute page qui
// affiche ces faits lit désormais ce module — ne pas redéclarer une liste locale.
//
// Référence : CV expert (politiques énergétiques, gouvernance du secteur
// électrique et coopération internationale).
// -----------------------------------------------------------------------------

export type Institution = {
	/** Libellé affiché en FR et EN. */
	name: string;
	/** Libellé affiché en ZH ; à défaut, `name` est réutilisé tel quel. */
	zh?: string;
};

/**
 * Établissements où l'enseignement a effectivement eu lieu depuis 2010.
 * Un cours seulement programmé n'a rien à faire ici : voir `upcomingInstitutions`.
 */
export const teachingInstitutions: Institution[] = [
	{ name: 'Sciences Po Paris', zh: '巴黎政治學院' },
	{ name: 'EM Lyon Business School', zh: 'EM Lyon（里昂高等商學院）' },
	{ name: 'Grenoble École de Management', zh: 'Grenoble École de Management（格勒諾布爾管理學院）' },
	{ name: 'IEP de Lyon', zh: 'IEP de Lyon（里昂政治學院）' },
	{ name: 'Université Lyon 2', zh: 'Université Lyon 2（里昂第二大學）' },
	{ name: 'Université Lyon 1', zh: 'Université Lyon 1（里昂第一大學）' },
	{ name: 'ENTPE', zh: 'ENTPE（國立公共工程學院）' },
	{ name: 'ECAM Lyon', zh: 'ECAM Lyon（里昂ECAM工程師學院）' },
	{ name: 'INSEEC Grande Écoles', zh: 'INSEEC Grande Écoles' },
	{ name: 'UCLy — Université catholique de Lyon', zh: 'UCLy（里昂天主教大學）' },
	{ name: 'Université catholique de Lille (FLD)', zh: 'Université catholique de Lille（里爾天主教大學）' },
	{ name: 'ILERI', zh: 'ILERI' },
	{ name: 'HEIP', zh: 'HEIP' },
	{ name: "IRIS Sup'", zh: "IRIS Sup'" },
	{ name: 'Universidad de Granada', zh: 'Universidad de Granada（格拉納達大學）' },
];

/** Cours contractés pour l'année 2026-2027, pas encore dispensés. */
export const upcomingInstitutions: Institution[] = [
	{ name: 'École Centrale de Lyon', zh: 'École Centrale de Lyon（里昂中央理工學院）' },
	{ name: 'INSA Lyon', zh: 'INSA Lyon（里昂國立應用科學學院）' },
];

/** Libellé d'un établissement dans la langue courante. */
export const institutionLabel = (i: Institution, lang: string) =>
	lang === 'zh' && i.zh ? i.zh : i.name;

/**
 * Organismes de formation continue et de formation d'élus pour lesquels
 * Romain Blachier conçoit et anime des modules. `slug` sert à résoudre
 * automatiquement `src/assets/<slug>-logo.<ext>` ; sans fichier, le nom
 * s'affiche en toutes lettres.
 */
export const trainingOrgs = [
	{ slug: 'nepsen', name: 'NEPSEN', url: 'https://www.nepsen.fr/' },
	{ slug: 'ensap-formation', name: 'ENSAP Formation', url: 'https://www.ensap.fr/' },
	{ slug: 'ecologica', name: 'Ecologica', url: 'https://ecologica.fr/' },
	{ slug: 'lefebvre-dalloz', name: 'Lefebvre Dalloz', url: 'https://www.lefebvre-dalloz.fr/' },
];
