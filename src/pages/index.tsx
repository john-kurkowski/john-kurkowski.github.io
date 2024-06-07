import React from 'react'
import { HeadFC, Link, graphql } from 'gatsby'

import Layout, { Page } from 'src/components/layouts/base'
import Seo from 'src/components/layouts/Seo'

function Index(props: { data: QueryData }): React.ReactElement {
  const page = pageForProps(props)

  return (
    <Layout page={page}>
      <section>
        <h2 className='heading my-16 text-3xl'>Full Stack Web Developer</h2>

        <div className='text-xl'>
          <p className='mt-8'>
            I’m a full stack web developer, leaning toward frontend,{' '}
            <strong>user experience (UX)</strong> development. With 14+ years in
            the game, I specialize in the following.
          </p>

          <ol className='mt-8'>
            <li className='flex'>
              <span aria-label='Ship' role='img'>
                🚢
              </span>
              <span className='ml-4'>
                <em>Ship</em> incrementally, without rewrites
              </span>
            </li>
            <li className='flex'>
              <span aria-label='Test tube' role='img'>
                🧪
              </span>
              <span className='ml-4'>
                <em>Test</em> to serve the team, not a metric
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
            rewrite from scratch. Reduce risk for you and customers. Your team
            will love the momentum from showing, not telling.
          </p>

          <p>
            Just want a tune up? I debug any existing, legacy, or unfinished
            system.
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

interface QueryData {
  site: {
    siteMetadata: {
      description: string
      title: string
      url: string
    }
  }
}

export default Index

export const Head: HeadFC<QueryData> = (props) => {
  return <Seo page={pageForProps(props)} />
}

function pageForProps(props: { data: QueryData }): Page {
  return {
    dateForMeta: '',
    description:
      'With 14+ years in the game, I help frontend teams ship incrementally, without rewrites. Test to serve the team, not a metric. Debug any app, existing or legacy.',
    site: props.data.site,
    title: `${props.data.site.siteMetadata.title} - ${props.data.site.siteMetadata.description}`,
    url: '/',
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
