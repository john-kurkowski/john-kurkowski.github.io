import React from 'react'

import styles from './experience.module.css'

const DATE_DISPLAY_FORMAT = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'America/Los_Angeles',
  year: 'numeric'
})

function Experience (params: {
  children: React.ReactElement
  className?: string
  company: string
  location: string
  position: string
  timeBegin: Date
  timeEnd: Date
}): React.ReactElement {
  return (
    <div
      className={`border-gray-400 border-l-4 px-4 text-sm ${params.className ||
        ''}`}
    >
      <h5 className={styles.header}>
        <p className={`font-bold text-xl ${styles.dd}`}>{params.company}</p>

        <p className={styles.dd}>{params.position}</p>

        <p className={`post-time ${styles.dd}`}>
          <time
            className='whitespace-no-wrap'
            dateTime={`${params.timeBegin.getFullYear()}-${params.timeBegin.getMonth() +
              1}`}
          >
            {DATE_DISPLAY_FORMAT.format(params.timeBegin)}
          </time>
          –
          <time
            className='whitespace-no-wrap'
            dateTime={`${params.timeEnd.getFullYear()}-${params.timeEnd.getMonth() +
              1}`}
          >
            {DATE_DISPLAY_FORMAT.format(params.timeEnd)}
          </time>
        </p>

        <address>{params.location}</address>
      </h5>

      {params.children}
    </div>
  )
}

export default Experience
