import type { CollectionEntry } from 'astro:content'

/**
 * Converts filename to a URL-safe slug.
 *
 * To preserve URLs this project has used for years, the return value differs
 * slightly from Astro's default `entry.id`. For example, the `&` character is
 * preserved.
 */
export function slugify(entry: CollectionEntry<'posts'>) {
  const maybeFilenameNoDateNoExt = /\d+-\d+-\d+-(.+)\./.exec(
    entry.filePath ?? '',
  )
  if (!maybeFilenameNoDateNoExt || !maybeFilenameNoDateNoExt[1]) {
    throw new Error(`Invalid posts filename: ${entry.filePath}`)
  }

  return maybeFilenameNoDateNoExt[1]
}
