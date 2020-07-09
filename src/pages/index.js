import React from 'react'
import { Link } from 'gatsby'

import Layout from 'src/components/layouts/base'

export const page = {
  dateForMeta: '',
  description: '',
  title: '',
  url: '/'
}

export default function Index () {
  return (
    <Layout page={page}>
      <section>
        <h2 className='heading mt-8 text-center text-3xl'>
          UX Engineering Consultant
        </h2>

        <div className='flex flex-col items-center text-xl'>
          <p className='mt-8'>I help frontend teams …</p>

          <ol className='mt-8'>
            <li>
              <span aria-label='Ship' className='inline-block' role='img'>
                🚢
              </span>
              <span className='inline-block ml-4'>
                <em>Ship</em> incrementally—no rewrites
              </span>
            </li>
            <li>
              <span
                aria-label='Globe with meridians'
                className='inline-block'
                role='img'
              >
                🌐
              </span>
              <span className='inline-block ml-4'>
                <em>Collaborate</em> remotely
              </span>
            </li>
            <li>
              <span aria-label='Wrench' className='inline-block' role='img'>
                🔧
              </span>
              <span className='inline-block ml-4'>
                <em>Debug</em> anything
              </span>
            </li>
          </ol>
        </div>

        <div className='mt-8'>
          <p>
            Modernize your frontend development to ship incrementally. You don't
            need to rewrite from scratch. Reduce risk for you and customers.
          </p>
          <p>
            Just want a tune up? I debug any legacy system. I augment your team
            to handle overflow tasks. I work remotely, async, and independently.
          </p>
        </div>

        <ul className='flex justify-center my-16'>
          <li className=''>
            <Link className='btn' to='/about'>
              More about me
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
