import path from 'path'
import { createFilePath } from 'gatsby-source-filesystem'

export function onCreateNode ({ node, getNode, actions }) {
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
      createNodeField({
        node,
        name: `date`,
        value: `${date}T00:00:00.0000-08:00`
      })
      createNodeField({ node, name: `slug`, value: `/posts/${title}/` })
    } else {
      createNodeField({ node, name: `slug`, value: slug })
    }
  }
}

export async function createPages ({ graphql, actions }) {
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
            internal {
              contentFilePath
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
        `./src/components/layouts/${
          isPost ? 'post' : 'page'
        }.jsx?__contentFilePath=${node.internal.contentFilePath}`
      ),
      context: {
        date: node.fields.date,
        slug: node.fields.slug
      }
    })
  })
}
