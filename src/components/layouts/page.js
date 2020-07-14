import PropTypes from 'prop-types'
import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Page ({ data }) {
  const post = data.mdx

  const page = {
    dateForMeta: '',
    description: post.frontmatter.description || post.excerpt,
    title: post.frontmatter.title,
    url: ''
  }

  return (
    <Layout page={page}>
      <article>
        <header className='post'>
          <h2>{page.title}</h2>
        </header>

        <div className='post'>
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string,
      excerpt: PropTypes.string,

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
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 256)
      frontmatter {
        description
        title
      }
    }
  }
`
