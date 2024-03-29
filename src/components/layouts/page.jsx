import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Page (props) {
  const post = props.data.mdx
  const { site } = props.data

  const page = {
    dateForMeta: '',
    description: post.frontmatter.description || post.excerpt,
    site,
    title: post.frontmatter.title,
    url: ''
  }

  return (
    <Layout page={page}>
      <article>
        <header className='post'>
          <h2>{page.title}</h2>
        </header>

        <div className='post'>{props.children}</div>
      </article>
    </Layout>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,

  data: {
    mdx: {
      excerpt: PropTypes.string.isRequired,

      frontmatter: {
        description: PropTypes.string,
        title: PropTypes.string.isRequired
      },

      site: {
        siteMetadata: {
          description: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        }
      }
    }
  }
}

export default Page

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 256)
      frontmatter {
        description
        title
      }
    }
    site {
      siteMetadata {
        description
        title
        url
      }
    }
  }
`
