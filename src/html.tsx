import React from 'react'

export default function HTML (props: propTypes): React.ReactElement {
  return (
    <html lang='en-US' {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

interface propTypes {
  htmlAttributes: Record<string, unknown>
  headComponents: React.ReactElement[]
  bodyAttributes: Record<string, unknown>
  preBodyComponents: React.ReactElement[]
  body: string
  postBodyComponents: React.ReactElement[]
}
