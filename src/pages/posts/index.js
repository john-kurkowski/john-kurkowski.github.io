import PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

export const page = {
  dateForMeta: '',
  description: '',
  title: 'Articles',
  url: ''
}

function Posts ({ data }) {
  return (
    <Layout page={page}>
      <section className=''>
        <h2 className='heading text-3xl'>Articles</h2>

        <ul className='mt-2 mx-2'>
          {data.allMdx.edges.map(({ node }) => (
            <li className='mt-10' key={node.id}>
              <Link className='inline-block link' to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>

              <blockquote className='italic mt-2 px-4 text-gray-600 text-sm'>
                {node.frontmatter.description || node.excerpt}
              </blockquote>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

Posts.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string.isRequired,

            fields: PropTypes.shape({
              date: PropTypes.string.isRequired,
              dateForTitle: PropTypes.string.isRequired,
              slug: PropTypes.string.isRequired
            }),

            frontmatter: PropTypes.shape({
              description: PropTypes.string,
              title: PropTypes.string.isRequired
            }),

            id: PropTypes.string.isRequired
          }).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
}

export default Posts

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { date: { ne: null } } }
      sort: { fields: [fields___date], order: DESC }
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
  }
`
