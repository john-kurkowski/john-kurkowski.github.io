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
        <h2 className='font-bold font-sans lg:my-16 my-8 text-center text-3xl'>
          UX Engineering Consultant
        </h2>

        <div className='lg:my-16 my-8'>
          <div className='flex justify-between'>
            <h3 className='w-1/2'>I help frontend teams …</h3>

            <ul className='list-disc w-1/2'>
              <li className=''>Deliver incrementally—no rewrites</li>
              <li className=''>Work remotely and asynchronously</li>
              <li className=''>Debug anything</li>
            </ul>
          </div>

          <div className='mt-8'>
            <p>
              Modernize your frontend development to deliver incrementally.
              Don't believe you need to rewrite from scratch. Reduce risk for
              you and your customers. Boost morale with the momentum of showing
              rather than telling.
            </p>
            <p>
              Just want a tune up? I can figure out any legacy system. I augment
              your team to handle overflow tasks. I've worked remotely for
              years, asynchronously and independently. I can show you how.
            </p>
          </div>
        </div>

        <ul className='flex justify-center lg:my-8 my-16'>
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
