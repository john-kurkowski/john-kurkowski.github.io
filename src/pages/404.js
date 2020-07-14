import React from 'react'

import Layout from 'src/components/layouts/base'

export const page = {
  dateForMeta: '',
  description: '',
  title: 'Not Found',
  url: ''
}

export default function NotFound () {
  return (
    <Layout page={page}>
      <section className='post'>
        <h2>Not Found</h2>

        <p>Sorry! Couldn't find that page.</p>
      </section>
    </Layout>
  )
}
