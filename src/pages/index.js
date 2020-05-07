import React from 'react'

import Layout from 'src/components/layouts/base'

export default function Index () {
  return (
    <Layout>
      <section className='max-w-2xl mx-auto my-16'>
        <h2 className='text-center my-16'>
          I'm baby yuccie small batch roof party freegan gentrify humblebrag
          forage.
        </h2>

        <div className='my-16'>
          <div className='flex justify-between'>
            <h3 className='w-1/2'>I help frontend …</h3>

            <ol className='w-1/2'>
              <li>Banh mi typewriter irony forage +1.</li>
              <li>
                Echo park iceland twee selfies cray typewriter single-origin
                coffee polaroid XOXO poutine gochujang disrupt gluten-free
                activated charcoal.
              </li>
              <li>
                Biodiesel microdosing brunch, succulents wolf tbh shabby chic
                VHS.
              </li>
            </ol>
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

        <ul className='flex justify-center my-16'>
          <li className=''>
            <a href='/hire'>Hire</a>
          </li>
          <li className='ml-8'>
            <a href='/about'>More about me</a>
          </li>
        </ul>
      </section>
    </Layout>
  )
}
