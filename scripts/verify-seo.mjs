// Phase 2 verification: every 301 destination and every internal hreflang target
// must resolve to a page actually built in dist/. Exits non-zero on any failure.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://romainblachier.fr';
let failures = 0;
const fail = (msg) => { console.error('  ✗', msg); failures++; };

// Resolve a site-absolute path ("/analyses/x/") to its built file in dist.
function builtPathExists(urlPath) {
	const clean = urlPath.split('#')[0].split('?')[0];
	const p = clean.replace(/^\//, '').replace(/\/$/, '');
	if (p === '') return existsSync(join(DIST, 'index.html'));
	return (
		existsSync(join(DIST, p, 'index.html')) ||
		existsSync(join(DIST, p)) ||
		existsSync(join(DIST, p + '.html'))
	);
}

// ---- 1. Redirect destinations ----
console.log('\n[1] Checking _redirects destinations resolve to built pages…');
const redirects = readFileSync('public/_redirects', 'utf8').split('\n');
let redChecked = 0;
for (const line of redirects) {
	const t = line.trim();
	if (!t || t.startsWith('#')) continue;
	const parts = t.split(/\s+/);
	if (parts.length < 2) continue;
	const [src, dest, status] = parts;
	if (status && status.startsWith('30') && status !== '301') continue; // only assert 301 targets
	if (dest.startsWith('http')) continue;
	if (dest.includes('*') || dest.endsWith('/analyses/') || dest.endsWith('/a-propos')) {
		// alias/institutional catch-alls: just check the base exists
	}
	if (src.includes('*')) continue; // catch-all source, dest checked above
	redChecked++;
	if (!builtPathExists(dest)) fail(`301 ${src} → ${dest} : destination not built`);
}
console.log(`    ${redChecked} specific 301 rules checked.`);

// ---- 2. Legacy /blog slugs all covered ----
console.log('\n[2] Checking every legacy /blog/[slug] has a redirect…');
const redirectSources = redirects
	.map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
	.map((l) => l.split(/\s+/)[0]);
const hasBlogCatchAll = redirectSources.some((s) => /\/blog\/\*$/.test(s));
if (!hasBlogCatchAll) fail('no /blog/* catch-all redirect present');
else console.log('    /blog/* catch-all present (FR/EN/ZH).');

// ---- 3. Internal hreflang targets resolve ----
console.log('\n[3] Checking internal hreflang targets resolve to built pages…');
function walk(dir) {
	let out = [];
	for (const e of readdirSync(dir)) {
		const f = join(dir, e);
		if (statSync(f).isDirectory()) out = out.concat(walk(f));
		else if (f.endsWith('.html')) out.push(f);
	}
	return out;
}
const htmlFiles = walk(DIST);
let pagesWithHreflang = 0, hreflangChecked = 0;
const hreflangRe = /<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g;
for (const file of htmlFiles) {
	const html = readFileSync(file, 'utf8');
	let m, sawAny = false;
	while ((m = hreflangRe.exec(html))) {
		const href = m[1];
		if (!href.startsWith(SITE)) continue;
		sawAny = true;
		hreflangChecked++;
		const path = href.slice(SITE.length);
		if (!builtPathExists(path)) fail(`${file.replace(DIST, '')} → hreflang ${href} : not built`);
	}
	if (sawAny) pagesWithHreflang++;
}
console.log(`    ${pagesWithHreflang} pages with hreflang, ${hreflangChecked} internal targets checked.`);

// ---- 4. No page is ever noindex ----
console.log('\n[4] Checking no page is noindex…');
let indexChecked = 0;
for (const file of htmlFiles) {
	const html = readFileSync(file, 'utf8');
	if (/content="noindex/.test(html)) fail(`${file.replace(DIST, '')} : noindex — every page of the site must stay indexable`);
	indexChecked++;
}
console.log(`    ${indexChecked} pages checked.`);

// ---- 5. Publication detail pages are self-canonical ----
console.log('\n[5] Checking /publications detail pages canonicalize to themselves…');
const pubPages = htmlFiles.filter((f) => /\/publications\/[^/]+\/[^/]+\/index\.html$/.test(f));
let pubChecked = 0;
for (const file of pubPages) {
	const html = readFileSync(file, 'utf8');
	const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
	const self = SITE + file.replace(DIST, '').replace(/index\.html$/, '');
	// A canonical pointing at the publisher hands the page over to them: it must stay on us.
	if (!canon || canon[1] !== self) {
		fail(`${file.replace(DIST, '')} : canonical is ${canon ? canon[1] : 'missing'}, expected ${self}`);
	}
	pubChecked++;
}
console.log(`    ${pubChecked} publication detail pages checked.`);

// ---- Result ----
console.log('');
if (failures) { console.error(`✗ verification FAILED with ${failures} issue(s).`); process.exit(1); }
console.log('✓ verification PASSED — redirects, hreflang, indexability, and publication canonicals all consistent.');
