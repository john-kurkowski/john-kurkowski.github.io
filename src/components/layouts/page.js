import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Page ({ data }) {
  const post = data.markdownRemark

  const page = {
    dateForMeta: '',
    description: post.frontmatter.description || post.excerpt,
    title: post.frontmatter.title,
    url: ''
  }

  return (
    <Layout page={page}>
      <div
        className='post'
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      excerpt: PropTypes.string,
      html: PropTypes.string,

      frontmatter: PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default Page

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 256)
      html
      frontmatter {
        description
        title
      }
    }
  }
`
