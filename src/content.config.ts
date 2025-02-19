import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Type-check frontmatter using a schema

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),

  schema: z.object({
    description: z.string(),
    title: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
})

export const collections = { posts }
