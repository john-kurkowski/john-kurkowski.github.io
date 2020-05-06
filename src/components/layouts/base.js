import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import avatar2X from 'src/images/avatar@2X.jpeg'
import favicon from 'src/images/favicon.ico'
import gitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import linkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import twitterLogo from 'src/images/icons/iconmonstr-twitter-1.svg'

function Layout ({ children, page, site }) {
  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ lang: 'en-US' }}>
        <meta charset='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
        {page.title ? (
          <Helmet>
            <title>
              {page.title} &ndash; {site.name}
            </title>
            <meta property='og:title' content={page.title} />
            <meta property='og:type' content='article' />
          </Helmet>
        ) : (
          <Helmet>
            <title>{site.name}</title>
            <meta property='og:title' content={site.name} />
            <meta property='og:type' content='profile' />
          </Helmet>
        )}

        <meta name='author' content={site.name} />
        <meta property='og:author' content={site.url} />
        <meta property='profile:first_name' content='John' />
        <meta property='profile:last_name' content='Kurkowski' />
        {page.url === '/' || page.url === '/index.html' ? (
          <Helmet>
            <meta name='description' content={site.description} />
            <meta name='twitter:description' content={site.description} />
          </Helmet>
        ) : page.description ? (
          <Helmet>
            <meta name='description' content={page.description} />
            <meta name='twitter:description' content={page.description} />
          </Helmet>
        ) : (
          <Helmet>
            <meta name='description' content={page.contentForMeta} />
            <meta name='twitter:description' content={page.contentForMeta} />
          </Helmet>
        )}

        {page.date && <meta httpEquiv='date' content={page.dateForMeta} />}

        <meta name='viewport' content='width=device-width, initial-scale=1' />

        <link rel='alternate' type='application/rss+xml' href='/atom.xml' />

        <link rel='shortcut icon' href={favicon} />
        <link rel='apple-touch-icon' href={avatar2X} />
        <meta property='og:image' content={avatar2X} />
        <meta name='twitter:image:src' content={avatar2X} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@bluu' />
        <meta name='twitter:creator' content='@bluu' />
      </Helmet>

      <div className='p-8'>
        <header className='mb-8'>
          <nav className='flex justify-between'>
            <h1>
              <a href='/'>John Kurkowski</a>
            </h1>

            <ul className='flex'>
              <li className=''>
                <a href='/hire'>Hire</a>
              </li>
              <li className='ml-8'>
                <a href='/about'>About</a>
              </li>
              <li className='ml-8'>
                <a href='/posts'>Articles</a>
              </li>
            </ul>
          </nav>
        </header>

        {children}

        <footer className='mt-8'>
          <div className=''>
            <ul className='flex justify-end'>
              <li className=''>
                <a href='//twitter.com/bluu'>
                  <figure>
                    <img
                      alt='Twitter logo icon'
                      className='w-8'
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
                      className='w-8'
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
                      className='w-8'
                      src={gitHubLogo}
                    />
                    <figcaption className='sr-only'>GitHub</figcaption>
                  </figure>
                </a>
              </li>
            </ul>
          </div>
        </footer>

        {
          // TODO: activate Disqus
        }
        <script src='/js/app.js'></script>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
  page: PropTypes.object,
  site: PropTypes.object
}

export default Layout
