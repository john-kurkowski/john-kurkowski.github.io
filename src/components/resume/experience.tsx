import React from 'react'

const DATE_DISPLAY_FORMAT = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
})

function Experience(props: {
  children: React.ReactElement
  className?: string
  company: string
  location: string
  position: string
  timeBegin: Date
  timeEnd: Date | 'present'
}): React.ReactElement {
  const undoInheritedGlobalParagraphStyle = {
    margin: 0,
  }

  const timeEnd =
    props.timeEnd instanceof Date
      ? `${props.timeEnd.getFullYear()}-${props.timeEnd.getMonth() + 1}`
      : props.timeEnd

  const timeEndDisplay =
    props.timeEnd instanceof Date
      ? DATE_DISPLAY_FORMAT.format(props.timeEnd)
      : props.timeEnd

  return (
    <div
      className={`border-gray-300 border-l-4 px-4 text-sm ${
        props.className || ''
      }`}
    >
      <h5 className='gap-x-4 grid grid-cols-[auto_auto] grid-flow-col grid-rows-[1fr_0.5fr] items-center justify-between'>
        <p
          className='font-bold text-xl'
          style={undoInheritedGlobalParagraphStyle}
        >
          {props.company}
        </p>

        <p style={undoInheritedGlobalParagraphStyle}>{props.position}</p>

        <p
          className='justify-self-end post-time'
          style={undoInheritedGlobalParagraphStyle}
        >
          <time
            className='whitespace-no-wrap'
            dateTime={`${props.timeBegin.getFullYear()}-${
              props.timeBegin.getMonth() + 1
            }`}
          >
            {DATE_DISPLAY_FORMAT.format(props.timeBegin)}
          </time>
          –
          <time className='whitespace-no-wrap' dateTime={timeEnd}>
            {timeEndDisplay}
          </time>
        </p>

        <address className='justify-self-end'>{props.location}</address>
      </h5>

      <div className='text-justify'>{props.children}</div>
    </div>
  )
}

export default Experience
