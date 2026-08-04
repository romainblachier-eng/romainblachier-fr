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
 * Liste canonique 2026-2027 (CV expert, août 2026) des établissements
 * d'enseignement. Un cours seulement programmé n'a rien à faire ici :
 * voir `upcomingInstitutions`. L'Universidad de Granada (cycle invité
 * annuel en espagnol) se mentionne à part, jamais dans cette liste.
 */
export const teachingInstitutions: Institution[] = [
	{ name: 'Sciences Po Paris', zh: '巴黎政治學院' },
	{ name: 'Sciences Po Lyon (IEP)', zh: 'Sciences Po Lyon（里昂政治學院）' },
	{ name: 'emlyon business school', zh: 'emlyon business school（里昂高等商學院）' },
	{ name: 'Grenoble École de Management', zh: 'Grenoble École de Management（格勒諾布爾管理學院）' },
	{ name: 'ENTPE', zh: 'ENTPE（國立公共工程學院）' },
	{ name: 'UCLy — Université catholique de Lyon', zh: 'UCLy（里昂天主教大學）' },
	{ name: 'Université catholique de Lille', zh: 'Université catholique de Lille（里爾天主教大學）' },
	{ name: 'HEIP', zh: 'HEIP' },
	{ name: 'ILERI', zh: 'ILERI' },
	{ name: "IRIS Sup'", zh: "IRIS Sup'" },
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
	{ slug: 'emlyon', name: 'emlyon business school', url: 'https://em-lyon.com/' },
	{ slug: 'lefebvre-dalloz', name: 'Lefebvre Dalloz', url: 'https://www.lefebvre-dalloz.fr/' },
];
