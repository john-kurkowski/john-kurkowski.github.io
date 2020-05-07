import PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'
import { dateForTitle } from 'src/helpers/dates'

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
        <h2>Articles</h2>
        <ul className=''>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <li className="" key={node.id}>
              <span className="">{dateForTitle(node.fields.date)}</span>
              <Link className="" to={node.fields.slug}>{ node.frontmatter.title }</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
          }),

          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired
          }),

          id: PropTypes.string.isRequired
        }).isRequired,
      })).isRequired
    }).isRequired,
  }).isRequired,
}

export default Posts

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            date
            slug
          }
          frontmatter {
            title
          }
          id
        }
      }
    }
  }
`
