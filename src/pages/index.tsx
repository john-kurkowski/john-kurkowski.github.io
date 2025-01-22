import React from 'react'
import { HeadFC, Link, graphql } from 'gatsby'

import Layout, { Page } from 'src/components/layouts/base'
import Seo from 'src/components/layouts/Seo'

function Index(props: { data: QueryData }): React.ReactElement {
  const page = pageForProps(props)

  return (
    <Layout page={page}>
      <section>
        <h2 className='heading my-16 text-3xl'>
          Senior Full Stack Web Developer
        </h2>

        <p className='mt-8 text-xl'>
          I'm a full stack web developer, frontend-leaning. I'm obsessed with
          UX, DX, and raising team capability. With 14+ years in the game, I
          specialize in the following.
        </p>

        <ol className='mt-8 text-xl'>
          <li className='flex'>
            <span aria-label='Ship' role='img'>
              🚢
            </span>
            <span className='ml-4'>
              <em>Ship</em> incrementally, with test coverage confidence,
              without rewrites
            </span>
          </li>
          <li className='flex mt-2'>
            <span aria-label='Wrench' role='img'>
              🔧
            </span>
            <span className='ml-4'>
              <em>Debug</em> any app, existing or legacy
            </span>
          </li>
          <li className='flex mt-2'>
            <span aria-label='Test tube' role='img'>
              🤝
            </span>
            <span className='ml-4'>
              <em>Collaborate</em> on distributed teams via docs, code review,
              and mentorship
            </span>
          </li>
        </ol>

        <div className='mt-8'>
          <p>
            Evolve your frontend to ship incrementally. You don't need to
            rewrite from scratch. Reduce risk for you and customers. Your team
            will love the momentum from showing, not telling.
          </p>

          <p>
            Just want a tune up? I debug any existing, legacy, or unfinished
            system. I tend to work in TypeScript and Python, and I love learning
            new tech.
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
      'With 14+ years in the game, I help frontend teams ship incrementally, with test coverage confidence, without rewrites. Debug any app, existing or legacy. Collaborate on distributed teams via docs, code review, and mentorship.',
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
