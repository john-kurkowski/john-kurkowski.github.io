import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'
import { dateForMeta, dateForTitle } from 'src/helpers/dates'

function Post ({ data, pageContext }) {
  const post = data.markdownRemark

  const page = {
    dateForMeta: dateForMeta(pageContext.date),
    description: post.frontmatter.description || post.excerpt,
    title: post.frontmatter.title,
    url: ''
  }

  return (
    <Layout page={page}>
      <article>
        <h2>{page.title}</h2>
        <p className='meta'>{dateForTitle(pageContext.date)}</p>

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
      frontmatter: PropTypes.shape({
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
  }).isRequired,

  pageContext: PropTypes.shape({
    date: PropTypes.string.isRequired
  }).isRequired
}

export default Post

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 256)
      html
      frontmatter {
        description,
        title
      }
    }
  }
`
