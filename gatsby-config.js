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
        name: `posts`,
        path: `${__dirname}/_posts/`,
      }
    },
    `gatsby-transformer-remark`
  ]
}
