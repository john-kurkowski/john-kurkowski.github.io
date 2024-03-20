import React from 'react'

import GitHubLogo from 'src/images/icons/iconmonstr-github-1.svg'
import LinkedInLogo from 'src/images/icons/iconmonstr-linkedin-3.svg'
import SoundcloudLogo from 'src/images/icons/iconmonstr-soundcloud-1.svg'
import InstagramLogo from 'src/images/icons/iconmonstr-instagram-11.svg'
import SpotifyLogo from 'src/images/icons/iconmonstr-spotify-1.svg'

export default function Footer (): React.ReactElement {
  return (
    <footer className='bg-secondary border-primary border-t-4 font-sans pb-4 pt-8 text-background'>
      <div className=''>
        <ul className='flex justify-center'>
          <li>
            <a
              className='block icon-link'
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
          <li>
            <a
              className='block icon-link pl-8'
              href='https://open.spotify.com/artist/741OEc1uZH9VMiQomSfoHb?si=MnN5PqGvSUqAGGfVntle9w'
            >
              <figure>
                <SpotifyLogo />
                <figcaption className='sr-only'>Spotify</figcaption>
              </figure>
            </a>
          </li>
          <li>
            <a
              className='block icon-link pl-8'
              href='https://soundcloud.com/bluu/'
            >
              <figure>
                <SoundcloudLogo />
                <figcaption className='sr-only'>SoundCloud</figcaption>
              </figure>
            </a>
          </li>
          <li>
            <a
              className='block icon-link pl-8'
              href='https://instagram.com/johnkurkowski'
            >
              <figure>
                <InstagramLogo />
                <figcaption className='sr-only'>Instagram</figcaption>
              </figure>
            </a>
          </li>
        </ul>
      </div>

      <small className='block mt-8 text-center'>© 2024</small>
    </footer>
  )
}
