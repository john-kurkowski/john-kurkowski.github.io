const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    const [, date, title] = slug.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    )
    createNodeField({ node, name: `date`, value: date })
    createNodeField({ node, name: `slug`, value: `/posts/${title}/` })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              date
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.map(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/layouts/post.js`),
      context: {
        date: node.fields.date,
        slug: node.fields.slug
      }
    })
  })
}
