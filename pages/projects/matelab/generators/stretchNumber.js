import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function readThreeDigit() {
  const h = randInt(1, 9)
  const t = randInt(0, 9)
  const o = randInt(0, 9)
  const num = h * 100 + t * 10 + o
  const d = generateDistractors(h, 3, 1, 9)
  return mcq(`How many hundreds in ${num}?`, h, d)
}

function placeValue3() {
  const h = randInt(1, 9)
  const t = randInt(0, 9)
  const o = randInt(0, 9)
  const num = h * 100 + t * 10 + o
  return numQ(`What number is ${h} hundreds, ${t} tens and ${o} ones?`, num)
}

function addHundreds() {
  const a = randInt(100, 800)
  const b = randInt(1, 9) * 100
  const answer = a + b
  if (answer > 999) return addHundreds()
  const d = generateDistractors(answer, 3, 100, 999)
  return mcq(`${a} + ${b} = ?`, answer, d)
}

function subtractHundreds() {
  const a = randInt(200, 999)
  const b = randInt(1, Math.floor(a / 100)) * 100
  const answer = a - b
  const d = generateDistractors(answer, 3, 0, 999)
  return mcq(`${a} - ${b} = ?`, answer, d)
}

function compareThreeDigit() {
  const a = randInt(100, 999)
  let b = a + randInt(1, 100) * (Math.random() < 0.5 ? 1 : -1)
  b = Math.max(100, Math.min(999, b))
  if (b === a) b = a + 1
  const correct = a > b ? '>' : '<'
  return mcq(`Which symbol goes between? ${a} __ ${b}`, correct, [correct === '>' ? '<' : '>', '='])
}

function countIn50s() {
  const start = randInt(0, 5) * 50
  const seq = [start, start + 50, start + 100]
  const answer = start + 150
  const d = generateDistractors(answer, 3, 50, 500)
  return mcq(`Count in 50s: ${seq.join(', ')}, ...?`, answer, d)
}

function roundToNearest10() {
  const n = randInt(11, 99)
  const answer = Math.round(n / 10) * 10
  const d = generateDistractors(answer, 3, 0, 100).filter((x) => x % 10 === 0)
  while (d.length < 3) d.push((randInt(1, 9)) * 10)
  return mcq(`Round ${n} to the nearest 10`, answer, d.slice(0, 3))
}

function partition3digit() {
  const h = randInt(1, 9)
  const t = randInt(1, 9)
  const o = randInt(1, 9)
  const num = h * 100 + t * 10 + o
  const answer = `${h * 100} + ${t * 10} + ${o}`
  const wrongs = [
    `${(h + 1) * 100} + ${t * 10} + ${o}`,
    `${h * 100} + ${(t + 1) * 10} + ${o}`,
    `${h * 10} + ${t * 10} + ${o}`,
  ]
  return mcq(`Partition ${num}`, answer, wrongs)
}

export function generate(count = 10) {
  return pickAndShuffle([
    readThreeDigit, placeValue3, addHundreds, subtractHundreds,
    compareThreeDigit, countIn50s, roundToNearest10, partition3digit,
  ], count)
}

export default function _() { return null }
