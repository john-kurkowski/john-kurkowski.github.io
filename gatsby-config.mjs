import { dirname } from 'path'
import { fileURLToPath } from 'url'
import remarkGfm from 'remark-gfm'

export default {
  siteMetadata: {
    description: 'Full Stack Web Developer',
    siteUrl: 'https://johnkurkowski.com',
    title: 'John Kurkowski',
    url: 'https://johnkurkowski.com',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: '/rss.xml',
            query: `
              {
                allMdx(
                  filter: { fields: { date: { ne: null } } }
                  sort: { fields: { date: DESC } }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 256)
                      fields {
                        date
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
            `,
            serialize({ query: { site, allMdx } }) {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.excerpt }],
                })
              })
            },
            title: 'John Kurkowski',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-0DLDSD2HD9'],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${dirname(fileURLToPath(import.meta.url))}/src/content/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          `gatsby-plugin-catch-links`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [],
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
  ],
}
