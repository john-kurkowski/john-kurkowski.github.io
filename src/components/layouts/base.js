import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql, useStaticQuery } from 'gatsby'

import GitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import LinkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import TwitterLogo from 'src/images/icons/iconmonstr-twitter-1.svg'
import avatar2X from 'src/images/avatar@2X.jpeg'
import favicon from 'src/images/favicon.ico'

function Layout ({ children, page = {} }) {
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

  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ class: 'bg-secondary', lang: 'en-US' }}>
        <meta charset='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />

        {
          // Use repetitive if/else check, because Helmet doesn't flatten
          // fragments (multiple tags) and complains.
        }
        {page.title && (
          <title>
            {page.title} &ndash; {data.site.siteMetadata.title}
          </title>
        )}
        {page.title && <meta property='og:title' content={page.title} />}
        {page.title && <meta property='og:type' content='article' />}
        {!page.title && <title>{data.site.siteMetadata.title}</title>}
        {!page.title && (
          <meta property='og:title' content={data.site.siteMetadata.title} />
        )}
        {!page.title && <meta property='og:type' content='profile' />}

        <meta name='author' content={data.site.siteMetadata.title} />
        <meta property='og:author' content={data.site.siteMetadata.url} />
        <meta property='profile:first_name' content='John' />
        <meta property='profile:last_name' content='Kurkowski' />

        {
          // Use repetitive if/else check, because Helmet doesn't flatten
          // fragments (multiple tags) and complains.
        }
        {page.url === '/' && (
          <meta
            name='description'
            content={data.site.siteMetadata.description}
          />
        )}
        {page.url === '/' && (
          <meta
            name='twitter:description'
            content={data.site.siteMetadata.description}
          />
        )}
        {page.url !== '/' && page.description && (
          <meta name='description' content={page.description} />
        )}
        {page.url !== '/' && page.description && (
          <meta name='twitter:description' content={page.description} />
        )}

        {page.dateForMeta && (
          <meta httpEquiv='date' content={page.dateForMeta} />
        )}

        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link
          href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700;800&display=swap'
          rel='stylesheet'
        />

        <link rel='shortcut icon' href={favicon} />
        <link rel='apple-touch-icon' href={avatar2X} />
        <meta property='og:image' content={avatar2X} />
        <meta name='twitter:image:src' content={avatar2X} />
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
                <Link
                  activeClassName='active'
                  className='nav-link lg:pb-4 py-2'
                  to='/'
                >
                  Home
                </Link>
              </li>
              <li className=''>
                <Link
                  activeClassName='active'
                  className='lg:pb-4 ml-8 nav-link py-2'
                  partiallyActive={true}
                  to='/about'
                >
                  About
                </Link>
              </li>
              <li className=''>
                <Link
                  activeClassName='active'
                  className='lg:pb-4 ml-8 nav-link py-2'
                  partiallyActive={true}
                  to='/posts'
                >
                  Articles
                </Link>
              </li>
            </ul>
          </nav>

          <main className='max-w-2xl mx-auto my-8 px-4 text-gray-800'>
            {children}
          </main>
        </div>

        <footer className='bg-secondary border-primary border-t-4 font-sans pb-4 pt-8 text-background'>
          <div className=''>
            <ul className='flex justify-center'>
              <li className='icon-link'>
                <a href='//twitter.com/bluu'>
                  <figure>
                    <TwitterLogo />
                    <figcaption className='sr-only'>Twitter</figcaption>
                  </figure>
                </a>
              </li>
              <li className='icon-link ml-8'>
                <a href='//www.linkedin.com/in/johnkurkowski'>
                  <figure>
                    <LinkedInLogo />
                    <figcaption className='sr-only'>LinkedIn</figcaption>
                  </figure>
                </a>
              </li>
              <li className='icon-link ml-8'>
                <a href='//github.com/john-kurkowski'>
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

Layout.propTypes = {
  children: PropTypes.element.isRequired,

  page: PropTypes.shape({
    dateForMeta: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

export default Layout
