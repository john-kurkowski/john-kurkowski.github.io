import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'
import useScript from 'src/hooks/use-script'

function Post ({ data }) {
  const post = data.mdx

  const page = {
    dateForMeta: post.fields.dateForMeta,
    description: post.frontmatter.description || post.excerpt,
    title: post.frontmatter.title,
    url: ''
  }

  embedDisqus()

  dangerouslyEmbedJs(post.body)

  return (
    <Layout page={page}>
      <article>
        <header className='post'>
          <h2>{page.title}</h2>

          <time className='block mt-4 post-time' dateTime={post.fields.date}>
            {post.fields.dateForTitle}
          </time>
        </header>

        <div className='post'>
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>

        <div className='mt-8' id='disqus_thread'></div>
        <noscript>
          Enable JavaScript to view the{' '}
          <a href='https://disqus.com/?ref_noscript'>comments.</a>
        </noscript>
      </article>
    </Layout>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string,
      excerpt: PropTypes.string,

      fields: PropTypes.shape({
        date: PropTypes.string.isRequired,
        dateForMeta: PropTypes.string.isRequired,
        dateForTitle: PropTypes.string.isRequired
      }),

      frontmatter: PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Post

export const query = graphql`
  query($slug: String!) {
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

function dangerouslyEmbedJs (htmlString) {
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
  let disqus_shortname = 'johnkurkowski'

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
