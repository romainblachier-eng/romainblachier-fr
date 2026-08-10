import type { ui } from './ui';

export type Lang = keyof typeof ui;

/**
 * Pages whose URL is NOT the same path across locales.
 *
 * BaseHead builds its hreflang alternates by stripping the locale prefix and
 * reusing the same path in every language. That works as long as a page lives at
 * the same slug everywhere (`/a-propos` ↔ `/en/a-propos`). It breaks in two ways
 * for the pages below:
 *
 *   - the English slug differs (`/conseil` ↔ `/en/consulting`), so the naive
 *     alternate would point at a 404;
 *   - there is no Chinese version, so advertising `/zh/…` would point at a 404
 *     too. A missing entry here means "no alternate in that language" — not
 *     "same path".
 *
 * Any page added here must pass its key to `<Page routeKey="…">`.
 */
export const localizedRoutes = {
	conseil: { fr: '/conseil', en: '/en/consulting' },
	presse: { fr: '/presse', en: '/en/press' },
	recherche: { fr: '/recherche', en: '/en/research' },
	diagnosticIA: { fr: '/diagnostic-ia' },
} as const satisfies Record<string, Partial<Record<Lang, string>>>;

export type RouteKey = keyof typeof localizedRoutes;

/** URL of a localized page, or undefined when it does not exist in that language. */
export function routePath(key: RouteKey, lang: Lang): string | undefined {
	return (localizedRoutes[key] as Partial<Record<Lang, string>>)[lang];
}

/** Every language in which a page exists, for hreflang emission. */
export function routeAlternates(key: RouteKey): Partial<Record<Lang, string>> {
	return localizedRoutes[key];
}
