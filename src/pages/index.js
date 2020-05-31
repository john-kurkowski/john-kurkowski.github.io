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
        <h2 className='font-bold font-sans lg:my-16 my-8 text-center text-xl'>
          I’m baby yuccie small batch roof party freegan gentrify humblebrag
          forage.
        </h2>

        <div className='lg:my-16 my-8'>
          <div className='flex justify-between'>
            <h3 className='w-1/2'>I help frontend …</h3>

            <ul className='list-disc w-1/2'>
              <li className=''>Banh mi typewriter irony forage +1.</li>
              <li className=''>
                Echo park iceland twee selfies cray typewriter single-origin
                coffee polaroid XOXO poutine gochujang disrupt gluten-free
                activated charcoal.
              </li>
              <li className=''>
                Biodiesel microdosing brunch, succulents wolf tbh shabby chic
                VHS.
              </li>
            </ul>
          </div>

          <div className='mt-8'>
            <p>
              Shaman intelligentsia tofu cronut shoreditch. Chia sustainable
              occupy, narwhal bushwick snackwave squid before they sold out
              gentrify twee letterpress.
            </p>
            <p>
              Fanny pack truffaut hoodie, kitsch deep v enamel pin iceland
              master cleanse kinfolk fixie VHS raclette venmo ramps tacos.
              Hammock green juice jean shorts taxidermy skateboard twee vice
              whatever.
            </p>
          </div>
        </div>

        <ul className='flex justify-center lg:my-8 my-16'>
          <li className=''>
            <Link className='btn' to='/hire'>
              Hire
            </Link>
          </li>
          <li className='ml-12'>
            <Link className='btn' to='/about'>
              More about me
            </Link>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
