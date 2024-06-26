import React from 'react'

import Footer from './Footer'
import Nav from './Nav'

function Layout(props: {
  children: React.ReactElement
  page: Page
}): React.ReactElement {
  return (
    <React.Fragment>
      <div className='content-between flex flex-col font-serif min-h-full'>
        <div className='bg-background flex-grow'>
          <Nav />

          <main className='max-w-2xl mx-auto my-8 px-5 text-gray-800'>
            {props.children}
          </main>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  )
}

export interface Page {
  dateForMeta: string
  description: string
  site: {
    siteMetadata: {
      description: string
      title: string
      url: string
    }
  }
  title: string
  url: string
}

export default Layout
