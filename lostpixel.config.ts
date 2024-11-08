import { CustomProjectConfig } from 'lost-pixel'
import { readFileSync } from 'fs'
import { join } from 'path'

const mask = [
  { selector: '.speakerdeck-embed' },
  { selector: '.twitter-tweet' },
]

function pagePaths(): string[] {
  const siteUrl = 'https://johnkurkowski.com'
  const sitemapXml = readFileSync(
    join(__dirname, 'public', 'sitemap-0.xml'),
    'utf-8',
  )
  const urlsRe = new RegExp(`${siteUrl}(/[^<]*)`, 'g')
  return Array.from(sitemapXml.matchAll(urlsRe)).map(function ([, url]) {
    return url.replaceAll('&amp;', '&')
  })
}

function slugify(str: string): string {
  const replaced = str.replaceAll('/', '-')
  const stripped = replaced.replaceAll(/(^-+|-+$)/g, '')
  return stripped ? stripped : 'index'
}

export const config: CustomProjectConfig = {
  apiKey: process.env.LOST_PIXEL_API_KEY,
  breakpoints: [414, 1280],
  lostPixelProjectId: 'clud602ae10romo0e861bvpv2',
  pageShots: {
    pages: pagePaths().map((path) => ({ path, mask, name: slugify(path) })),
    baseUrl: 'http://172.17.0.1:9000',
  },
}
