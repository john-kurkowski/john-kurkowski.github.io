import React from 'react'
import { HeadFC, Link, graphql } from 'gatsby'

import Layout, { Page } from 'src/components/layouts/base'
import Seo from 'src/components/layouts/Seo'

function Posts(props: { data: QueryData }): React.ReactElement {
  const page = pageForProps(props)

  return (
    <Layout page={page}>
      <section className=''>
        <h2 className='heading text-3xl'>Articles</h2>

        <ul className='mt-2 mx-2'>
          {props.data.allMdx.edges.map(({ node }) => (
            <li className='mt-10' key={node.id}>
              <Link className='inline-block link' to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>

              <blockquote className='italic mt-2 px-4 text-gray-500 text-sm'>
                {node.frontmatter.description || node.excerpt}
              </blockquote>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

interface QueryData {
  allMdx: {
    edges: {
      node: {
        excerpt: string

        fields: {
          date: string
          dateForTitle: string
          slug: string
        }

        frontmatter: {
          description: string
          title: string
        }

        id: string
      }
    }[]
  }

  site: {
    siteMetadata: {
      description: string
      title: string
      url: string
    }
  }
}

export default Posts

export const Head: HeadFC<QueryData> = (props) => {
  return <Seo page={pageForProps(props)} />
}

function pageForProps(props: { data: QueryData }): Page {
  return {
    dateForMeta: '',
    description: '',
    site: props.data.site,
    title: 'Articles',
    url: '',
  }
}

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { date: { ne: null } } }
      sort: { fields: { date: DESC } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 256)
          fields {
            date
            dateForTitle: date(formatString: "DD MMM YYYY")
            slug
          }
          frontmatter {
            description
            title
          }
          id
        }
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
