import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql, useStaticQuery } from 'gatsby'

import avatar2X from 'src/images/avatar@2X.jpeg'
import favicon from 'src/images/favicon.ico'
import gitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import linkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import twitterLogo from 'src/images/icons/iconmonstr-twitter-1.svg'

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
      <Helmet htmlAttributes={{ class: 'bg-orange-300', lang: 'en-US' }}>
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
          href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Varela+Round&display=swap'
          rel='stylesheet'
        />

        <link rel='alternate' type='application/rss+xml' href='/atom.xml' />

        <link rel='shortcut icon' href={favicon} />
        <link rel='apple-touch-icon' href={avatar2X} />
        <meta property='og:image' content={avatar2X} />
        <meta name='twitter:image:src' content={avatar2X} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@bluu' />
        <meta name='twitter:creator' content='@bluu' />
      </Helmet>

      <div className='content-between flex flex-col font-serif min-h-full text-gray-800'>
        <div className='bg-white flex-grow'>
          <header className='bg-orange-300 border-b-2 border-gray-800 lg:px-8 px-4'>
            <nav className='flex flex-col font-sans items-center justify-between lg:flex-row text-black text-xl'>
              <h1 className='font-bold tracking-widest py-4 uppercase'>
                <a href='/'>John Kurkowski</a>
              </h1>

              <ul className='flex'>
                <li className=''>
                  <Link activeClassName='active' className='nav-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className=''>
                  <Link
                    activeClassName='active'
                    className='nav-link'
                    partiallyActive={true}
                    to='/about'
                  >
                    About
                  </Link>
                </li>
                <li className=''>
                  <Link
                    activeClassName='active'
                    className='nav-link'
                    partiallyActive={true}
                    to='/posts'
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          <main className='lg:my-16 lg:px-8 max-w-2xl mx-auto my-8 px-4'>
            {children}
          </main>
        </div>

        <footer className='border-gray-800 border-t-2 pb-4 pt-8'>
          <div className=''>
            <ul className='flex justify-center'>
              <li className=''>
                <a href='//twitter.com/bluu'>
                  <figure>
                    <img
                      alt='Twitter logo icon'
                      className='icon-social-media w-8'
                      src={twitterLogo}
                    />
                    <figcaption className='sr-only'>Twitter</figcaption>
                  </figure>
                </a>
              </li>
              <li className='ml-8'>
                <a href='//www.linkedin.com/in/johnkurkowski'>
                  <figure>
                    <img
                      alt='LinkedIn logo icon'
                      className='icon-social-media w-8'
                      src={linkedInLogo}
                    />
                    <figcaption className='sr-only'>LinkedIn</figcaption>
                  </figure>
                </a>
              </li>
              <li className='ml-8'>
                <a href='//github.com/john-kurkowski'>
                  <figure>
                    <img
                      alt='GitHub logo icon'
                      className='icon-social-media w-8'
                      src={gitHubLogo}
                    />
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
