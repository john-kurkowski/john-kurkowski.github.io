import assert from "node:assert/strict"
import test from "node:test"
import { getSiteUrl, productionSiteUrl } from "../src/config/site.ts"

test("site URL falls back to production outside deploy environments", () => {
  assert.equal(getSiteUrl({}), productionSiteUrl)
})

test("site URL prefers Netlify deploy preview URLs", () => {
  assert.equal(
    getSiteUrl({
      DEPLOY_PRIME_URL: "https://deploy-preview-96--john-kurkowski.netlify.app",
      DEPLOY_URL: "https://example-deploy-url.netlify.app",
      URL: productionSiteUrl,
    }),
    "https://deploy-preview-96--john-kurkowski.netlify.app",
  )
})

test("site URL normalizes trailing slashes", () => {
  assert.equal(
    getSiteUrl({
      DEPLOY_PRIME_URL:
        "https://deploy-preview-96--john-kurkowski.netlify.app/",
    }),
    "https://deploy-preview-96--john-kurkowski.netlify.app",
  )
})
