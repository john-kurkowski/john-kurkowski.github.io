import React from 'react'

import { Page } from './base'

export default function Seo (props: { page: Page }): React.ReactElement {
  let title: string
  if (
    props.page.title &&
    props.page.title.includes(props.page.site.siteMetadata.title)
  ) {
    title = props.page.title
  } else if (props.page.title) {
    title = `${props.page.title} - ${props.page.site.siteMetadata.title}`
  } else {
    title = props.page.site.siteMetadata.title
  }

  const description =
    props.page.description || props.page.site.siteMetadata.description

  return (
    <>
      <html className='bg-secondary' lang='en-US' />
      <title>{title}</title>
      <meta property='og:title' content={title} />

      <meta name='author' content={props.page.site.siteMetadata.title} />
      <meta property='og:author' content={props.page.site.siteMetadata.url} />
      <meta property='profile:first_name' content='John' />
      <meta property='profile:last_name' content='Kurkowski' />

      <meta name='description' content={description} />
      <meta name='twitter:description' content={description} />

      {props.page.dateForMeta && (
        <meta httpEquiv='date' content={props.page.dateForMeta} />
      )}

      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, viewport-fit=cover'
      />

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
    </>
  )
}
