import React from 'react'

import { RenderBodyArgs } from 'gatsby'

export const onRenderBody = (args: RenderBodyArgs) => {
  args.setHtmlAttributes({
    className: 'bg-secondary',
  })

  args.setHeadComponents([
    <meta
      content='John'
      key='profile:first_name'
      property='profile:first_name'
    />,
    <meta
      content='Kurkowski'
      key='profile:last_name'
      property='profile:last_name'
    />,

    <meta
      content='width=device-width, initial-scale=1.0, viewport-fit=cover'
      key='viewport'
      name='viewport'
    />,

    <link
      crossOrigin='anonymous'
      href='https://fonts.gstatic.com/'
      key='preconnect'
      rel='preconnect'
    />,
    <link
      as='style'
      href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700;800'
      key='preload'
      rel='preload'
    />,
    <link
      href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700;800'
      key='stylesheet'
      rel='stylesheet'
    />,

    <link key='shortcut icon' href='/favicon.ico' rel='shortcut icon' />,
    <link
      key='apple-touch-icon'
      href='/avatar@2X.jpeg'
      rel='apple-touch-icon'
    />,
    <meta content='/avatar@2X.jpeg' key='og:image' property='og:image' />,
    <meta
      content='/avatar@2X.jpeg'
      key='twitter:image:src'
      name='twitter:image:src'
    />,
    <meta content='summary' key='twitter:card' name='twitter:card' />,
    <meta content='@bluu' key='twitter:site' name='twitter:site' />,
    <meta content='@bluu' key='twitter:creator' name='twitter:creator' />,
  ])
}
