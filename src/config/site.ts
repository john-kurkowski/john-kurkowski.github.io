export const productionSiteUrl = "https://johnkurkowski.com"

/**
 * Social metadata needs absolute URLs, but Netlify deploy previews must point at
 * their preview host so crawlers can fetch assets before they exist in
 * production.
 */
export function getSiteUrl(env = process.env) {
  return (
    env.DEPLOY_PRIME_URL ||
    env.DEPLOY_URL ||
    env.URL ||
    productionSiteUrl
  ).replace(/\/$/, "")
}

export const siteMetadata = {
  description:
    "With 14+ years in the game, I help frontend teams ship incrementally, with test coverage confidence, without rewrites. Debug any app, existing or legacy. Collaborate on distributed teams via docs, code review, and mentorship.",
  title: "John Kurkowski - Senior Full Stack Web Developer",
} as const
