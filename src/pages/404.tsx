import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

export default function NotFound (props: {
  data: QueryData
}): React.ReactElement {
  const page = {
    dateForMeta: '',
    description: '',
    site: props.data.site,
    title: 'Not Found',
    url: ''
  }
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
