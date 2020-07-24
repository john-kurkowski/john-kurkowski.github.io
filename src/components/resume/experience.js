import PropTypes from 'prop-types'
import React from 'react'

import styles from './experience.module.css'

const DATE_DISPLAY_FORMAT = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'America/Los_Angeles',
  year: 'numeric'
})

function Experience ({
  children,
  className,
  company,
  location,
  position,
  timeBegin,
  timeEnd
}) {
  return (
    <div
      className={`border-gray-400 border-l-4 px-4 text-sm ${className || ''}`}
    >
      <h5 className={styles.header}>
        <p className={`font-bold text-xl ${styles.dd}`}>{company}</p>

        <p className={styles.dd}>{position}</p>

        <p className={`post-time ${styles.dd}`}>
          <time
            className='whitespace-no-wrap'
            dateTime={`${timeBegin.getFullYear()}-${timeBegin.getMonth() + 1}`}
          >
            {DATE_DISPLAY_FORMAT.format(timeBegin)}
          </time>
          –
          <time
            className='whitespace-no-wrap'
            dateTime={`${timeEnd.getFullYear()}-${timeEnd.getMonth() + 1}`}
          >
            {DATE_DISPLAY_FORMAT.format(timeEnd)}
          </time>
        </p>

        <address>{location}</address>
      </h5>

      {children}
    </div>
  )
}

Experience.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  company: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  timeBegin: PropTypes.instanceOf(Date).isRequired,
  timeEnd: PropTypes.instanceOf(Date).isRequired
}

export default Experience
