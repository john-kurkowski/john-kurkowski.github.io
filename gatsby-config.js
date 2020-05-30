module.exports = {
  siteMetadata: {
    description: 'UX Engineer. Second, bolder self-assertion here.',
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
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: []
            }
          }
        ]
      }
    }
  ]
}
