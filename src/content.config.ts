import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Type-check frontmatter using a schema

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),

  schema: ({ image }) =>
    z
      .object({
        description: z.string(),
        title: z.string(),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        image: image().nullable(),
        imageAlt: z.string().optional(),
      })
      .refine((data) => data.image === null || data.imageAlt, {
        message: "imageAlt is required when image is set",
        path: ["imageAlt"],
      }),
})

export const collections = { posts }
