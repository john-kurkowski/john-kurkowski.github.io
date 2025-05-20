import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { siteMetadata } from '../config/site'
import { slugify } from '../utils/content'

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')
  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site?.toString() ?? '',
    items: posts.map((post) => ({
      ...post.data,
      link: `/posts/${slugify(post)}`,
    })),
  })
}
