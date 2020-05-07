import moment from 'moment'

export function dateForMeta (str) {
  return moment(str).format('dddd, DD MMM YYYY HH:mm:ss [GMT]')
}

export function dateForTitle (str) {
  return moment(str).format('DD MMM YYYY')
}
