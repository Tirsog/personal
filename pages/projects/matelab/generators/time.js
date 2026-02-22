import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function readClockHour() {
  const h = randInt(1, 12)
  return mcq(
    'What time does the clock show?',
    `${h} o'clock`,
    [`${h === 12 ? 1 : h + 1} o'clock`, `${h === 1 ? 12 : h - 1} o'clock`, `half past ${h}`],
    { kind: 'clock', data: { hours: h, minutes: 0 } }
  )
}

function readClockHalf() {
  const h = randInt(1, 12)
  return mcq(
    'What time does the clock show?',
    `half past ${h}`,
    [`${h} o'clock`, `quarter past ${h}`, `quarter to ${h + 1 > 12 ? 1 : h + 1}`],
    { kind: 'clock', data: { hours: h, minutes: 30 } }
  )
}

function readClockQuarter() {
  const h = randInt(1, 12)
  const isPast = Math.random() < 0.5
  const minutes = isPast ? 15 : 45
  const label = isPast ? `quarter past ${h}` : `quarter to ${h + 1 > 12 ? 1 : h + 1}`
  const wrongs = isPast
    ? [`quarter to ${h}`, `half past ${h}`, `${h} o'clock`]
    : [`quarter past ${h}`, `half past ${h}`, `${h + 1 > 12 ? 1 : h + 1} o'clock`]
  return mcq(
    'What time does the clock show?',
    label, wrongs,
    { kind: 'clock', data: { hours: h, minutes } }
  )
}

function readClock5min() {
  const h = randInt(1, 12)
  const fiveMin = randInt(1, 11)
  const minutes = fiveMin * 5
  const timeStr = `${h}:${String(minutes).padStart(2, '0')}`
  const wrongs = [
    `${h}:${String(((fiveMin + 1) * 5) % 60).padStart(2, '0')}`,
    `${h}:${String(((fiveMin - 1 + 12) * 5) % 60).padStart(2, '0')}`,
    `${h === 12 ? 1 : h + 1}:${String(minutes).padStart(2, '0')}`,
  ]
  return mcq(
    'What time does the clock show?',
    timeStr, wrongs,
    { kind: 'clock', data: { hours: h, minutes } }
  )
}

function elapsedTime() {
  const startH = randInt(1, 10)
  const elapsed = randInt(1, 3)
  const endH = startH + elapsed
  const d = generateDistractors(endH, 3, 1, 12)
  return mcq(
    `It is ${startH} o'clock. What time will it be in ${elapsed} hour${elapsed > 1 ? 's' : ''}?`,
    `${endH} o'clock`,
    d.map((n) => `${n} o'clock`)
  )
}

function minutesInHour() {
  return mcq('How many minutes are in 1 hour?', 60, [30, 100, 45])
}

function daysInWeek() {
  return mcq('How many days are in a week?', 7, [5, 6, 10])
}

function orderDays() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const idx = randInt(0, 5)
  const answer = days[idx + 1]
  const wrongs = days.filter((d) => d !== answer && d !== days[idx]).slice(0, 3)
  return mcq(`What day comes after ${days[idx]}?`, answer, wrongs)
}

export function generate(count = 10) {
  return pickAndShuffle([
    readClockHour, readClockHalf, readClockQuarter, readClock5min,
    elapsedTime, minutesInHour, daysInWeek, orderDays,
  ], count)
}

export default function _() { return null }
