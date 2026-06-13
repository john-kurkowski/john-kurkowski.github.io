import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import test from "node:test"
import { parse } from "yaml"

const readPage = (path: string) =>
  readFile(new URL(path, import.meta.url), "utf8")

const getMetaContent = (html: string, attribute: string, value: string) => {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${value}"\\s+content="([^"]*)"`,
  )
  const content = html.match(pattern)?.[1]

  assert.ok(content, `Missing meta ${attribute}="${value}"`)
  return content
}

test("all posts make an explicit social preview image decision", async () => {
  const postsDirectory = new URL("../src/content/posts/", import.meta.url)
  const filenames = await readdir(postsDirectory)

  for (const filename of filenames.filter((name) => name.endsWith(".mdx"))) {
    const post = await readFile(new URL(filename, postsDirectory), "utf8")
    const frontmatter = post.match(/^---\n(?<yaml>[\s\S]*?)\n---/)?.groups?.yaml

    assert.ok(frontmatter, `${filename} is missing frontmatter`)
    assert.ok(
      "image" in parse(frontmatter),
      `${filename} must set image to a path or null`,
    )
  }
})

test("article pages expose description metadata for link previews", async () => {
  const html = await readPage(
    "../dist/posts/hands-on-home-row-for-ai-assisted-coding/index.html",
  )
  const description =
    "AI-assisted coding has fit surprisingly well with the terminal and text-first tools I spent years sharpening. Agent orchestration may be the industry productivity boost I long wanted. While engineering discipline still matters, I feel wistful for hands-on coding."

  assert.equal(getMetaContent(html, "name", "description"), description)
  assert.equal(getMetaContent(html, "property", "og:description"), description)
  assert.equal(getMetaContent(html, "name", "twitter:description"), description)
})

test("image-backed articles expose absolute social preview images and alt text", async () => {
  const cases = [
    {
      alt: "PageSpeed Insights - screenshot",
      file: "pagespeed_insights.png",
      slug: "good-ideas-from-mobile-design-that-are-good-everywhere",
    },
    {
      alt: "Paint By Numbers example",
      file: "paint-by-numbers.jpg",
      slug: "paint-by-types",
    },
    {
      alt: "Google Chrome's network error screen",
      file: "google-chrome-dinosaur.png",
      slug: "1st-class-ux-for-web-programmers",
    },
    {
      alt: "A pencil sketch of a jar mostly full of sand, with several rocks and pebbles interspersed.",
      file: "jar-of-rocks.webp",
      slug: "procrastination-by-doing",
    },
    {
      alt: "Wireframe of 3 agent panes handling separate coding tasks in parallel.",
      file: "03-terminal-multiple-agents.png",
      slug: "hands-on-home-row-for-ai-assisted-coding",
    },
  ]

  for (const { alt, file, slug } of cases) {
    const html = await readPage(`../dist/posts/${slug}/index.html`)
    const [name, extension] = file.split(".")

    assert.match(
      getMetaContent(html, "property", "og:image"),
      new RegExp(
        `^https://johnkurkowski\\.com/_astro/${name}\\.[^.]+\\.${extension}$`,
      ),
    )
    assert.equal(getMetaContent(html, "property", "og:image:alt"), alt)
  }
})

test("articles without a preview image use the large social image fallback", async () => {
  const html = await readPage("../dist/posts/avoid-git-first-drafts/index.html")

  assert.equal(
    getMetaContent(html, "property", "og:image"),
    "https://johnkurkowski.com/avatar-social.jpeg",
  )
  assert.equal(getMetaContent(html, "property", "og:image:width"), "1200")
  assert.equal(getMetaContent(html, "property", "og:image:height"), "630")
  assert.equal(
    getMetaContent(html, "name", "twitter:card"),
    "summary_large_image",
  )
})

test("post pages identify themselves as Open Graph articles", async () => {
  const html = await readPage("../dist/posts/paint-by-types/index.html")

  assert.equal(getMetaContent(html, "property", "og:type"), "article")
})
