import { defineCollection, z } from 'astro:content'

// Type-check frontmatter using a schema

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    description: z.string(),
    title: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
  }),
})

export const collections = { posts }
