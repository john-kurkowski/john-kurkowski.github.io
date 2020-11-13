import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql, useStaticQuery } from 'gatsby'

import GitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import LinkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import TwitterLogo from 'src/images/icons/iconmonstr-twitter-1.svg'

function Layout (params: {
  children: React.ReactElement
  page: Page
}): React.ReactElement {
  const data = useStaticQuery(
    graphql`
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
  )

  let title: string
  if (
    params.page.title &&
    params.page.title.includes(data.site.siteMetadata.title)
  ) {
    title = params.page.title
  } else if (params.page.title) {
    title = `${params.page.title} - ${data.site.siteMetadata.title}`
  } else {
    title = data.site.siteMetadata.title
  }

  const description =
    params.page.description || data.site.siteMetadata.description

  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ class: 'bg-secondary' }}>
        <title>{title}</title>
        <meta property='og:title' content={title} />

        <meta name='author' content={data.site.siteMetadata.title} />
        <meta property='og:author' content={data.site.siteMetadata.url} />
        <meta property='profile:first_name' content='John' />
        <meta property='profile:last_name' content='Kurkowski' />

        <meta name='description' content={description} />
        <meta name='twitter:description' content={description} />

        {params.page.dateForMeta && (
          <meta httpEquiv='date' content={params.page.dateForMeta} />
        )}

        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link
          rel='preconnect'
          href='https://fonts.gstatic.com/'
          crossOrigin='anonymous'
        />
        <link
          as='style'
          href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700;800'
          rel='preload'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700;800'
          rel='stylesheet'
        />

        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/avatar@2X.jpeg' />
        <meta property='og:image' content='/avatar@2X.jpeg' />
        <meta name='twitter:image:src' content='/avatar@2X.jpeg' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@bluu' />
        <meta name='twitter:creator' content='@bluu' />
      </Helmet>

      <div className='content-between flex flex-col font-serif min-h-full'>
        <div className='bg-background flex-grow'>
          <nav className='bg-secondary border-b-4 border-primary flex flex-col font-sans items-center justify-between lg:flex-row pt-2 px-8 text-background'>
            <h1 className='font-extrabold pb-2 text-2xl tracking-widester uppercase'>
              <Link to='/'>John Kurkowski</Link>
            </h1>

            <ul className='flex font-semibold'>
              <li className=''>
                <Link activeClassName='active' className='nav-link pr-4' to='/'>
                  <span className='lg:pb-4 nav-link-content py-2'>Home</span>
                </Link>
              </li>
              <li className=''>
                <Link
                  activeClassName='active'
                  className='nav-link px-4'
                  partiallyActive={true}
                  to='/about'
                >
                  <span className='lg:pb-4 nav-link-content py-2'>About</span>
                </Link>
              </li>
              <li className=''>
                <Link
                  activeClassName='active'
                  className='nav-link pl-4'
                  partiallyActive={true}
                  to='/posts'
                >
                  <span className='lg:pb-4 nav-link-content py-2'>
                    Articles
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <main className='max-w-2xl mx-auto my-8 px-5 text-gray-800'>
            {params.children}
          </main>
        </div>

        <footer className='bg-secondary border-primary border-t-4 font-sans pb-4 pt-8 text-background'>
          <div className=''>
            <ul className='flex justify-center'>
              <li>
                <a className='block icon-link' href='//twitter.com/bluu'>
                  <figure>
                    <TwitterLogo />
                    <figcaption className='sr-only'>Twitter</figcaption>
                  </figure>
                </a>
              </li>
              <li>
                <a
                  className='block icon-link pl-8'
                  href='//www.linkedin.com/in/johnkurkowski'
                >
                  <figure>
                    <LinkedInLogo />
                    <figcaption className='sr-only'>LinkedIn</figcaption>
                  </figure>
                </a>
              </li>
              <li>
                <a
                  className='block icon-link pl-8'
                  href='//github.com/john-kurkowski'
                >
                  <figure>
                    <GitHubLogo />
                    <figcaption className='sr-only'>GitHub</figcaption>
                  </figure>
                </a>
              </li>
            </ul>
          </div>

          <small className='block mt-8 text-center'>© 2020</small>
        </footer>
      </div>
    </React.Fragment>
  )
}

export interface Page {
  dateForMeta: string
  description: string
  title: string
  url: string
}

export default Layout
