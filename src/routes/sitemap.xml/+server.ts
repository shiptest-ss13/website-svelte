import type { Pathname } from '$app/types';
import { text } from '@sveltejs/kit';

export const prerender = true;

const pages = Object.entries({
	'/': 1,
	'/maps': 0.8
} as Record<Pathname, number>) as [Pathname, number][];

const external = Object.entries({
	'/wiki/Main_Page': 0.8,
	'/stats/': 0.8,
	'/join': 0.5,
	'/stats/info/adminlogs': 0.4,
	'/stats/stat/newscaster_stories': 0.4,
	'/stats/info/playtime': 0.4,
	'/stats/info/admins': 0.3,
	'/stats/library': 0.4,
	'/stats/deaths': 0.4,
	'/stats/stat': 0.4,
	'/stats/rounds/latest': 0.5,
	'/stats/stat/ship_purchased': 0.2,
	'/stats/library/gallery': 0.4,
	'/stats/rounds': 0.6
});

const subdomains = Object.entries({
	'https://forum.shiptest.net/': 0.8,
	'https://codedocs.shiptest.net/': 0.8,
	'https://status.shiptest.net/': 0.2
});

const lastMod = new Date(Date.now()).toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map(
			([page, priority]) => `
  <url>
    <loc>https://shiptest.net${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
	<lastmod>${lastMod}</lastmod>
  </url>
  `
		)
		.join('')}

  ${external
		.map(
			([page, priority]) => `
  <url>
    <loc>https://shiptest.net${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
	<lastmod>${lastMod}</lastmod>
  </url>
  `
		)
		.join('')}

  ${subdomains
		.map(
			([page, priority]) => `
  <url>
    <loc>${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
	<lastmod>${lastMod}</lastmod>
  </url>
  `
		)
		.join('')}
</urlset>`;

export async function GET() {
	return text(sitemap, {
		headers: {
			'content-type': 'application/xml'
		}
	});
}
