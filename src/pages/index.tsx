import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Index (params: { data: Page }): React.ReactElement {
  const page = {
    dateForMeta: '',
    description:
      'I help frontend teams ship incrementally, without rewrites; collaborate remotely; debug any app, existing or legacy.',
    title: `${params.data.site.siteMetadata.title} - ${params.data.site.siteMetadata.description}`,
    url: '/'
  }

  return (
    <Layout page={page}>
      <section>
        <h2 className='heading my-16 text-3xl'>UX Engineering Consultant</h2>

        <div className='text-xl'>
          <p className='mt-8'>I help frontend teams …</p>

          <ol className='mt-8'>
            <li className='flex'>
              <span aria-label='Ship' role='img'>
                🚢
              </span>
              <span className='ml-4'>
                <em>Ship</em> incrementally—no rewrites
              </span>
            </li>
            <li className='flex'>
              <span aria-label='Globe with meridians' role='img'>
                🌐
              </span>
              <span className='ml-4'>
                <em>Collaborate</em> remotely
              </span>
            </li>
            <li className='flex'>
              <span aria-label='Wrench' role='img'>
                🔧
              </span>
              <span className='ml-4'>
                <em>Debug</em> any app, existing or legacy
              </span>
            </li>
          </ol>
        </div>

        <div className='mt-8'>
          <p>
            Evolve your frontend to ship incrementally. You don't need to
            rewrite from scratch. Reduce risk for you and customers.
          </p>
          <p>
            Just want a tune up? I debug any existing, legacy, or unfinished
            system. I work remotely, asynchronously, and independently.
          </p>
        </div>

        <ul className='flex justify-center my-16'>
          <li className=''>
            <Link className='btn' to='/about'>
              More about me
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  )
}

interface Page {
  site: {
    siteMetadata: {
      description: string
      title: string
      url: string
    }
  }
}

export default Index

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
