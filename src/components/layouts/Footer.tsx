import React from 'react'

import GitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import LinkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import TwitterLogo from 'src/images/icons/iconmonstr-twitter-1.svg'

export default function Footer (): React.ReactElement {
  return (
    <footer className='bg-secondary border-primary border-t-4 font-sans pb-4 pt-8 text-background'>
      <div className=''>
        <ul className='flex justify-center'>
          <li>
            <a className='block icon-link' href='https://twitter.com/bluu'>
              <figure>
                <TwitterLogo />
                <figcaption className='sr-only'>Twitter</figcaption>
              </figure>
            </a>
          </li>
          <li>
            <a
              className='block icon-link pl-8'
              href='https://www.linkedin.com/in/johnkurkowski'
            >
              <figure>
                <LinkedInLogo />
                <figcaption className='sr-only'>LinkedIn</figcaption>
              </figure>
            </a>
          </li>
          <li>
            <a
              className='block icon-link pl-8'
              href='https://github.com/john-kurkowski'
            >
              <figure>
                <GitHubLogo />
                <figcaption className='sr-only'>GitHub</figcaption>
              </figure>
            </a>
          </li>
        </ul>
      </div>

      <small className='block mt-8 text-center'>© 2022</small>
    </footer>
  )
}
