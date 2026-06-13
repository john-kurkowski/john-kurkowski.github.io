import { type RemarkPlugin, unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import { getSiteUrl } from "./src/config/site"

const parsePublishTime: RemarkPlugin = () => (_tree, file) => {
  const maybeDateString = /\d+-\d+-\d+/.exec(file.path)
  let authorOffsetDate = null
  if (maybeDateString) {
    const [dateString] = maybeDateString
    authorOffsetDate = new Date(
      `${dateString}T00:00:00.000-08:00`,
    ).toISOString()
  }

  const data = file.data as {
    astro: { frontmatter: { date: string | null } }
  }
  data.astro.frontmatter.date = authorOffsetDate
}

export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [parsePublishTime],
    }),
    shikiConfig: {
      theme: "slack-ochin",
    },
  },

  site: getSiteUrl(),
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})
