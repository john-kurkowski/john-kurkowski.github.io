import type { Page } from 'playwright-core'
import { CustomProjectConfig } from 'lost-pixel'
import { join } from 'path'
import { readFileSync } from 'fs'

/**
 * Hide 3rd party embeds.
 *
 * They're a distraction from 1st party diffs.
 */
async function hide3rdPartyEmbeds(page: Page) {
  await page.addStyleTag({
    content: `
        .embed iframe,
        .twitter-tweet-rendered {
          display: none !important;
        }
      `,
  })
}

/**
 * Parse the sitemap for all pages for visual regression testing to visit.
 *
 * The sitemap is an updated yet static list of all pages. "Parse" its XML with
 * vanilla Node.js for the page URLs.
 */
function pagePaths(): string[] {
  const siteUrl = 'https://johnkurkowski.com'
  const sitemapXml = readFileSync(
    join(__dirname, 'public', 'sitemap-0.xml'),
    'utf-8',
  )
  const urlsRe = new RegExp(`${siteUrl}(/[^<]*)`, 'g')
  return Array.from(sitemapXml.matchAll(urlsRe)).map(function ([, url]) {
    return url.replaceAll('&amp;', '').toLowerCase()
  })
}

/**
 * Id the pages by a friendlier, more uniform slug.
 */
function slugify(str: string): string {
  const replaced = str.replaceAll('/', '-')
  const stripped = replaced.replaceAll(/(^-+|-+$)/g, '')
  return stripped ? stripped : 'index'
}

export const config: CustomProjectConfig = {
  apiKey: process.env.LOST_PIXEL_API_KEY,
  beforeScreenshot: async (page) => {
    await hide3rdPartyEmbeds(page)
  },
  breakpoints: [414, 1280],
  lostPixelProjectId: 'clud602ae10romo0e861bvpv2',
  pageShots: {
    pages: pagePaths().map((path) => ({ path, name: slugify(path) })),
    baseUrl: 'http://172.17.0.1:9000',
  },
}
