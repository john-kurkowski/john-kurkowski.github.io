import React from 'react'
import { HeadFC, graphql } from 'gatsby'

import Layout, { Page } from 'src/components/layouts/base'
import Seo from 'src/components/layouts/Seo'

export default function NotFound (props: {
  data: QueryData
}): React.ReactElement {
  const page = pageForProps(props)

  return (
    <Layout page={page}>
      <section className='post'>
        <h2>Not Found</h2>

        <p>Sorry! Couldn't find that page.</p>
      </section>
    </Layout>
  )
}

interface QueryData {
  site: {
    siteMetadata: {
      description: string
      title: string
      url: string
    }
  }
}

export const Head: HeadFC<QueryData> = props => {
  return <Seo page={pageForProps(props)} />
}

function pageForProps (props: { data: QueryData }): Page {
  return {
    dateForMeta: '',
    description: '',
    site: props.data.site,
    title: 'Not Found',
    url: ''
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        title
        url
      }
    }
  }
`
