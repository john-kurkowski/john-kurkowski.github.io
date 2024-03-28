import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Page (
  props: { data: Page, children: React.ReactNode },
): React.ReactElement {
  const post = props.data.mdx

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

        <div className='post'>{props.children}</div>
      </article>
    </Layout>
  )
}

interface Page {
  mdx: {
    excerpt: string

    frontmatter: {
      description?: string
      title: string
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
  }
`
