import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import type { MarkdownAstroData, RemarkPlugin } from '@astrojs/markdown-remark'
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

    const data = file.data as { astro: MarkdownAstroData }
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
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
})
