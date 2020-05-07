import React from 'react'

import Layout from 'src/components/layouts/base'

export const page = {
  contentForMeta: '',
  dateForMeta: '',
  description: '',
  title: 'Not Found',
  url: '',
}

export default function NotFound () {
  return (
    <Layout page={page}>
      <section className='content'>
        <h1>Not Found</h1>

        <p>Sorry! Couldn't find that page. Bummer.</p>
      </section>
    </Layout>
  )
}
