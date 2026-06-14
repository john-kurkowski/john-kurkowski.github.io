import { readFileSync } from "node:fs"
import { join } from "node:path"
import { argosScreenshot } from "@argos-ci/playwright"
import { test } from "@playwright/test"

const viewports = [
  { width: 414, height: 896 },
  { width: 1280, height: 800 },
]

const argosCSS = `
  .embed iframe,
  .twitter-tweet-rendered {
    display: none !important;
  }
`

function pagePaths(): string[] {
  const siteUrl = "https://johnkurkowski.com"
  const sitemapXml = readFileSync(
    join(import.meta.dirname, "..", "..", "dist", "sitemap-0.xml"),
    "utf-8",
  )
  const urlsRe = new RegExp(`${siteUrl}(/[^<]*)`, "g")
  return Array.from(sitemapXml.matchAll(urlsRe)).map(([, url]) =>
    // biome-ignore lint/style/noNonNullAssertion: guaranteed group at this point
    url!.replaceAll("&amp;", "&"),
  )
}

function slugify(str: string): string {
  const replaced = str.replaceAll("/", "-")
  const stripped = replaced.replaceAll(/(^-+|-+$)/g, "")
  return stripped ? stripped : "index"
}

for (const path of pagePaths()) {
  const name = slugify(path)

  test(`captures ${name}`, async ({ page }) => {
    await page.goto(path)
    await argosScreenshot(page, name, {
      argosCSS,
      viewports,
    })
  })
}
