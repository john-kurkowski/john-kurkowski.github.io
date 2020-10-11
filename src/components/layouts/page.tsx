import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Page (params: { data: Page }): React.ReactElement {
  const post = params.data.mdx

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

interface Page {
  mdx: {
    body: string
    excerpt: string

    frontmatter: {
      description?: string
      title: string
    }
  }
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
