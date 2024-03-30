import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'
import Seo from 'src/components/layouts/Seo'

function Page(props) {
  const page = pageForProps(props)

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

  data: PropTypes.shape({
    mdx: PropTypes.shape({
      excerpt: PropTypes.string.isRequired,

      frontmatter: PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,

    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Page

export function Head(props) {
  return <Seo page={pageForProps(props)} />
}

function pageForProps(props) {
  const post = props.data.mdx
  const { site } = props.data

  return {
    dateForMeta: '',
    description: post.frontmatter.description || post.excerpt,
    site,
    title: post.frontmatter.title,
    url: '',
  }
}

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
