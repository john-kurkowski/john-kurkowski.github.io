module.exports = {
  siteMetadata: {
    description: 'UX Engineer. Second, bolder self-assertion here.',
    siteUrl: 'https://johnkurkowski.com',
    title: 'John Kurkowski',
    url: 'https://johnkurkowski.com'
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
                  sort: { fields: [fields___date], order: DESC }
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
                      html
                      id
                    }
                  }
                }
              }
            `,
            serialize ({ query: { site, allMdx } }) {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                })
              })
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-41244988-1',
        head: true
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          `gatsby-plugin-catch-links`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              enableCustomId: true,
              isIconAfterHeader: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: []
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`
        ],
        plugins: [`gatsby-remark-autolink-headers`]
      }
    }
  ]
}
