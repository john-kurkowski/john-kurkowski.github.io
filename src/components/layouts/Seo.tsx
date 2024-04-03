import React from 'react'

import { Page } from './base'

export default function Seo(props: { page: Page }): React.ReactElement {
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
      <title>{title}</title>
      <meta property='og:title' content={title} />

      <meta name='author' content={props.page.site.siteMetadata.title} />
      <meta property='og:author' content={props.page.site.siteMetadata.url} />

      <meta name='description' content={description} />
      <meta name='twitter:description' content={description} />

      {props.page.dateForMeta && (
        <meta httpEquiv='date' content={props.page.dateForMeta} />
      )}
    </>
  )
}
