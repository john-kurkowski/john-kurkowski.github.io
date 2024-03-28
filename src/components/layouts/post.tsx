import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'
import useScript from 'src/hooks/use-script'

function Post (
  props: { data: Page, children: React.ReactNode }
): React.ReactElement {
  const post = props.data.mdx

  const page = {
    dateForMeta: post.fields.dateForMeta,
    description: post.frontmatter.description || post.excerpt || '',
    title: post.frontmatter.title,
    url: ''
  }

  embedDisqus()

  dangerouslyEmbedJs(post.body)

  return (
    <Layout page={page}>
      <>
        <div className='text-sm'>
          <Link className='link' to='/posts'>
            ↩ to Articles
          </Link>
        </div>

        <article>
          <header className='post'>
            <h2>{page.title}</h2>

            <time className='block mt-4 post-time' dateTime={post.fields.date}>
              {post.fields.dateForTitle}
            </time>
          </header>

          <div className='post'>{props.children}</div>

          <div className='mt-8' id='disqus_thread'></div>
          <noscript>
            Enable JavaScript to view the{' '}
            <a href='https://disqus.com/?ref_noscript'>comments.</a>
          </noscript>
        </article>
      </>
    </Layout>
  )
}

interface Page {
  mdx: {
    body: string
    excerpt?: string

    fields: {
      date: string
      dateForMeta: string
      dateForTitle: string
    }

    frontmatter: {
      description?: string
      title: string
    }
  }
}

export default Post

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 256)
      fields {
        date
        dateForMeta: date(formatString: "dddd, DD MMM YYYY HH:mm:ss [GMT]")
        dateForTitle: date(formatString: "DD MMM YYYY")
      }
      frontmatter {
        description
        title
      }
    }
  }
`

function dangerouslyEmbedJs (htmlString: string) {
  const jsUrlsRe = /src(:\s*|=)"([^"]+\.js)"/g
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = jsUrlsRe.exec(htmlString))) {
    const [, , url] = match
    useScript(url)
  }
}

function embedDisqus () {
  let disqus_loaded = false
  const disqus_shortname = 'johnkurkowski'

  useEffect(function () {
    window.onscroll = function () {
      if (disqus_loaded) {
        return
      }

      const disqus_thread = document.getElementById('disqus_thread')
      if (!disqus_thread) {
        return
      }

      const load_range_px = 600
      const scroll_height =
        window.innerHeight || document.documentElement.clientHeight
      const disqus_top = disqus_thread.getBoundingClientRect().top
      if (scroll_height + load_range_px >= disqus_top) {
        disqus_loaded = true

        const url = `//${disqus_shortname}.disqus.com/embed.js`

        const script = document.createElement('script')

        script.src = url
        script.async = true

        document.body.appendChild(script)
      }
    }
  })
}
