const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: `collection`,
      value: parent.sourceInstanceName
    })

    const slug = createFilePath({ node, getNode })
    const [, date, title] =
      slug.match(/^\/posts\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/) || []

    const isPost = !!date
    if (isPost) {
      createNodeField({ node, name: `date`, value: date })
      createNodeField({ node, name: `slug`, value: `/posts/${title}/` })
    } else {
      createNodeField({ node, name: `slug`, value: slug })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
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

  result.data.allMdx.edges.map(({ node }) => {
    const isPost = !!node.fields.date

    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `./src/components/layouts/${isPost ? 'post' : 'page'}.js`
      ),
      context: {
        date: node.fields.date,
        slug: node.fields.slug
      }
    })
  })
}
