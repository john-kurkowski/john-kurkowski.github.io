module.exports = {
  siteMetadata: {
    description: 'UX Engineer. Second, bolder self-assertion here.',
    siteUrl: 'https://johnkurkowski.com',
    title: 'John Kurkowski',
    url: 'https://johnkurkowski.com'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-41244988-1',
        head: true
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
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
        ]
      }
    }
  ]
}
