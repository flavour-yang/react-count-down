/*
 * @Author: Y
 * @Date: 2022-06-10
 * @Description: 时间格式
 */
export const MILLISECOND = 1000
export const SECOND = 1 * MILLISECOND
export const MINUTE = SECOND * 60
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24

export interface Timer {
  days: number, hours: number, minutes: number, seconds: number, milliseconds: number
}

export const parseTime = (time: number) => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  }
}

export const formatTime = (format: string, currentTime: Timer) => {
  const { days, hours, minutes, seconds, milliseconds } = currentTime
  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days.toString()))
  }
  if (format.includes('hh')) {
    format = format.replace('hh', hours.toString())
  }
  if (format.includes('mm')) {
    format = format.replace('mm', minutes.toString())
  }
  if (format.includes('ss')) {
    format = format.replace('ss', seconds.toString())
  }
  if (format.includes('ms')) {
    const strMilliseconds = milliseconds.toString().slice(0, 2)
    format = format.replace('ms', padZero(strMilliseconds))
  }
  return format
}

export function padZero(num: string | number, targetLength = 2): string {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}