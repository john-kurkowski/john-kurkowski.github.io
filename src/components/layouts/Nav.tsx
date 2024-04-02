import React from 'react'
import { Link } from 'gatsby'

export default function Nav(): React.ReactElement {
  return (
    <nav className='bg-secondary border-b-4 border-primary flex flex-col font-sans items-center justify-between lg:flex-row pt-2 px-8 text-background'>
      <h1 className='font-extrabold lg:pb-2 pb-4 text-2xl tracking-widester uppercase'>
        <Link to='/'>John Kurkowski</Link>
      </h1>

      <ul className='flex font-semibold'>
        <li className=''>
          <Link activeClassName='active' className='nav-link pr-4' to='/'>
            <span className='lg:pb-4 nav-link-content py-2'>Home</span>
          </Link>
        </li>
        <li className=''>
          <Link
            activeClassName='active'
            className='nav-link px-4'
            partiallyActive={true}
            to='/about'
          >
            <span className='lg:pb-4 nav-link-content py-2'>About</span>
          </Link>
        </li>
        <li className=''>
          <Link
            activeClassName='active'
            className='nav-link pl-4'
            partiallyActive={true}
            to='/posts'
          >
            <span className='lg:pb-4 nav-link-content py-2'>Articles</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
