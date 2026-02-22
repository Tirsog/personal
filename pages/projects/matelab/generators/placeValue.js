import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function countInSteps() {
  const step = [2, 3, 5, 10][randInt(0, 3)]
  const start = randInt(0, 5) * step
  const seq = [start, start + step, start + step * 2]
  const answer = start + step * 3
  const d = generateDistractors(answer, 3, 0, 100)
  return mcq(`Count in ${step}s: ${seq.join(', ')}, ...?`, answer, d)
}

function tensAndOnes() {
  const tens = randInt(1, 9)
  const ones = randInt(0, 9)
  const num = tens * 10 + ones
  if (Math.random() < 0.5) {
    return numQ(`What number has ${tens} tens and ${ones} ones?`, num)
  }
  const d = generateDistractors(tens, 3, 0, 9)
  return mcq(`How many tens are in ${num}?`, tens, d)
}

function compareNumbers() {
  const a = randInt(10, 99)
  let b = a + randInt(1, 20) * (Math.random() < 0.5 ? 1 : -1)
  b = Math.max(0, Math.min(99, b))
  if (b === a) b = a + 1
  const ops = ['>', '<']
  const correct = a > b ? '>' : '<'
  const prompt = `Which symbol goes between? ${a} __ ${b}`
  return mcq(prompt, correct, [correct === '>' ? '<' : '>', '='])
}

function orderNumbers() {
  const nums = new Set()
  while (nums.size < 4) nums.add(randInt(1, 99))
  const arr = [...nums]
  const ascending = Math.random() < 0.5
  const sorted = [...arr].sort((a, b) => ascending ? a - b : b - a)
  const prompt = ascending
    ? `Put these in order, smallest first: ${arr.join(', ')}`
    : `Put these in order, largest first: ${arr.join(', ')}`
  const answer = sorted.join(', ')
  const wrongOrders = [
    [...arr].sort((a, b) => ascending ? b - a : a - b).join(', '),
    [arr[2], arr[0], arr[3], arr[1]].join(', '),
    [arr[1], arr[3], arr[0], arr[2]].join(', '),
  ].filter((w) => w !== answer)
  return mcq(prompt, answer, wrongOrders.slice(0, 3))
}

function oneMoreLess() {
  const n = randInt(2, 98)
  const addMore = Math.random() < 0.5
  const offset = [1, 10][randInt(0, 1)]
  const answer = addMore ? n + offset : n - offset
  const label = `${offset} ${addMore ? 'more' : 'less'} than ${n}`
  const d = generateDistractors(answer, 3, 0, 100)
  return mcq(`What is ${label}?`, answer, d)
}

function numberOnLine() {
  const base = randInt(0, 8) * 10
  const marked = base + randInt(1, 9)
  const ticks = []
  for (let i = base; i <= base + 10; i += 2) ticks.push(i)
  const d = generateDistractors(marked, 3, base, base + 10)
  return mcq(
    'What number is the arrow pointing to?',
    marked, d,
    { kind: 'numberLine', data: { min: base, max: base + 10, marked, ticks } }
  )
}

function oddOrEven() {
  const n = randInt(2, 50)
  const isEven = n % 2 === 0
  return tfQ(`${n} is an even number.`, isEven)
}

function partitionNumber() {
  const tens = randInt(1, 9)
  const ones = randInt(1, 9)
  const num = tens * 10 + ones
  const answer = `${tens * 10} + ${ones}`
  const wrongs = [
    `${(tens - 1) * 10} + ${ones + 10}`,
    `${tens * 10} + ${ones + 1}`,
    `${(tens + 1) * 10} + ${ones}`,
  ]
  return mcq(`Partition ${num} into tens and ones`, answer, wrongs)
}

export function generate(count = 10) {
  return pickAndShuffle([
    countInSteps, tensAndOnes, compareNumbers, orderNumbers,
    oneMoreLess, numberOnLine, oddOrEven, partitionNumber,
  ], count)
}

export default function _() { return null }
