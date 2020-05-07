import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Post ({ data }) {
  const post = data.markdownRemark

  const page = {
    dateForMeta: post.fields.dateForMeta,
    description: post.frontmatter.description || post.excerpt,
    title: post.frontmatter.title,
    url: ''
  }

  return (
    <Layout page={page}>
      <article>
        <h2>{page.title}</h2>
        <p className='meta'>{post.fields.dateForTitle}</p>

        <div
          className='post'
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>

        <div id='disqus_thread'></div>
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
    markdownRemark: PropTypes.shape({
      excerpt: PropTypes.string,
      html: PropTypes.string,

      fields: PropTypes.shape({
        dateForMeta: PropTypes.string.isRequired,
        dateForTitle: PropTypes.string.isRequired
      }),

      frontmatter: PropTypes.shape({
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Post

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 256)
      html
      fields {
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
