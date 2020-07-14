import PropTypes from 'prop-types'
import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'src/components/layouts/base'

function Index ({ data }) {
  const page = {
    dateForMeta: '',
    description:
      'I help frontend teams … Ship incrementally—no rewrites. Collaborate remotely. Debug anything.',
    title: `${data.site.siteMetadata.title} - ${data.site.siteMetadata.description}`,
    url: '/'
  }

  return (
    <Layout page={page}>
      <section>
        <h2 className='heading my-16 text-3xl'>UX Engineering Consultant</h2>

        <div className='text-xl'>
          <p className='mt-8'>I help frontend teams …</p>

          <ol className='mt-8'>
            <li>
              <span aria-label='Ship' className='inline-block' role='img'>
                🚢
              </span>
              <span className='inline-block ml-4'>
                <em>Ship</em> incrementally—no rewrites
              </span>
            </li>
            <li>
              <span
                aria-label='Globe with meridians'
                className='inline-block'
                role='img'
              >
                🌐
              </span>
              <span className='inline-block ml-4'>
                <em>Collaborate</em> remotely
              </span>
            </li>
            <li>
              <span aria-label='Wrench' className='inline-block' role='img'>
                🔧
              </span>
              <span className='inline-block ml-4'>
                <em>Debug</em> anything
              </span>
            </li>
          </ol>
        </div>

        <div className='mt-8'>
          <p>
            Modernize your frontend development to ship incrementally. You don't
            need to rewrite from scratch. Reduce risk for you and customers.
          </p>
          <p>
            Just want a tune up? I debug any legacy system. I augment your team
            to handle overflow tasks. I work remotely, async, and independently.
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

Index.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        description: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
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
