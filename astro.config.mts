import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'

const parsePublishTime: RemarkPlugin = function () {
  return function (tree, file) {
    const maybeDateString = /^\d+-\d+-\d+/.exec(file.stem!)
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
}

export default defineConfig({
  markdown: {
    remarkPlugins: [parsePublishTime],
    shikiConfig: {
      theme: 'slack-ochin',
    },
  },

  site: 'https://johnkurkowski.com',
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})
