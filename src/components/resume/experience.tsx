import React from 'react'

import styles from './experience.module.css'

const DATE_DISPLAY_FORMAT = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'America/Los_Angeles',
  year: 'numeric'
})

function Experience (props: {
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
      className={`border-gray-400 border-l-4 px-4 text-sm ${
        props.className || ''
      }`}
    >
      <h5 className={styles.header}>
        <p className={`font-bold text-xl ${styles.dd}`}>{props.company}</p>

        <p className={styles.dd}>{props.position}</p>

        <p className={`post-time ${styles.dd}`}>
          <time
            className='whitespace-no-wrap'
            dateTime={`${props.timeBegin.getFullYear()}-${
              props.timeBegin.getMonth() + 1
            }`}
          >
            {DATE_DISPLAY_FORMAT.format(props.timeBegin)}
          </time>
          –
          <time
            className='whitespace-no-wrap'
            dateTime={`${props.timeEnd.getFullYear()}-${
              props.timeEnd.getMonth() + 1
            }`}
          >
            {DATE_DISPLAY_FORMAT.format(props.timeEnd)}
          </time>
        </p>

        <address>{props.location}</address>
      </h5>

      {props.children}
    </div>
  )
}

export default Experience
