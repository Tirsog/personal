import { randInt, shuffleArray, mcq, numQ, generateDistractors, pickAndShuffle } from './utils'

function readBarChart() {
  const labels = ['Red', 'Blue', 'Green', 'Yellow']
  const values = labels.map(() => randInt(1, 8))
  const bars = labels.map((l, i) => ({ label: l, value: values[i], color: ['#ef4444', '#3b82f6', '#22c55e', '#eab308'][i] }))
  const askIdx = randInt(0, 3)
  const d = generateDistractors(values[askIdx], 3, 0, 10)
  return mcq(
    `How many children chose ${labels[askIdx]}?`,
    values[askIdx], d,
    { kind: 'barChart', data: { bars, maxVal: 10 } }
  )
}

function compareBars() {
  const labels = ['Cats', 'Dogs', 'Fish', 'Birds']
  const values = labels.map(() => randInt(1, 8))
  const bars = labels.map((l, i) => ({ label: l, value: values[i], color: '#60a5fa' }))
  const maxVal = Math.max(...values)
  const maxLabel = labels[values.indexOf(maxVal)]
  const wrongs = labels.filter((l) => l !== maxLabel).slice(0, 3)
  return mcq(
    'Which pet is the most popular?',
    maxLabel, wrongs,
    { kind: 'barChart', data: { bars, maxVal: 10 } }
  )
}

function totalFromChart() {
  const labels = ['Mon', 'Tue', 'Wed']
  const values = labels.map(() => randInt(1, 6))
  const bars = labels.map((l, i) => ({ label: l, value: values[i], color: '#a78bfa' }))
  const total = values.reduce((s, v) => s + v, 0)
  const d = generateDistractors(total, 3, 3, 25)
  return mcq(
    'How many altogether?',
    total, d,
    { kind: 'barChart', data: { bars, maxVal: 8 } }
  )
}

function readPictogram() {
  const themes = [
    { label: 'pet',    items: ['Dogs', 'Cats', 'Fish', 'Rabbits'] },
    { label: 'colour', items: ['Red', 'Blue', 'Green', 'Yellow'] },
    { label: 'sport',  items: ['Football', 'Swimming', 'Tennis', 'Cycling'] },
  ]
  const theme = themes[randInt(0, themes.length - 1)]
  const items = shuffleArray(theme.items).slice(0, 3)
  const perIcon = 2
  const values = items.map(() => randInt(1, 5) * perIcon)
  const rows = items.map((l, i) => ({ label: l, value: values[i] }))
  const askIdx = randInt(0, items.length - 1)
  const d = generateDistractors(values[askIdx], 3, perIcon, 12)
  return mcq(
    `How many children chose ${items[askIdx].toLowerCase()}?`,
    values[askIdx], d,
    { kind: 'pictogram', data: { rows, iconPerUnit: perIcon } }
  )
}

function readTally() {
  const value = randInt(3, 18)
  const d = generateDistractors(value, 3, 1, 25)
  return mcq(
    'How many tally marks are there?',
    value, d,
    { kind: 'tally', data: { value } }
  )
}

function differenceFromChart() {
  const labels = ['A', 'B', 'C']
  const values = labels.map(() => randInt(1, 8))
  const bars = labels.map((l, i) => ({ label: l, value: values[i], color: '#f472b6' }))
  const a = randInt(0, 1)
  const b = a + 1
  const diff = Math.abs(values[a] - values[b])
  const d = generateDistractors(diff, 3, 0, 10)
  return mcq(
    `How many more does ${labels[values[a] > values[b] ? a : b]} have than ${labels[values[a] > values[b] ? b : a]}?`,
    diff, d,
    { kind: 'barChart', data: { bars, maxVal: 10 } }
  )
}

function sortData() {
  const allNames = ['Alice', 'Ben', 'Cara', 'Dan', 'Eve', 'Finn']
  const selected = shuffleArray(allNames).slice(0, 3)
  const values = selected.map(() => randInt(2, 10))
  const askMax = Math.random() < 0.5
  const target = askMax ? Math.max(...values) : Math.min(...values)
  const targetName = selected[values.indexOf(target)]
  const wrongs = selected.filter((n) => n !== targetName)
  const colors = ['#f472b6', '#60a5fa', '#34d399']
  const bars = selected.map((n, i) => ({ label: n, value: values[i], color: colors[i] }))
  const contexts = [
    { noun: 'stickers', verb: 'has' },
    { noun: 'points', verb: 'scored' },
    { noun: 'books', verb: 'read' },
  ]
  const ctx = contexts[randInt(0, 2)]
  return mcq(
    `Who ${ctx.verb} the ${askMax ? 'most' : 'fewest'} ${ctx.noun}?`,
    targetName, wrongs,
    { kind: 'barChart', data: { bars, maxVal: 10 } }
  )
}

export function generate(count = 10) {
  return pickAndShuffle([
    readBarChart, compareBars, totalFromChart, readPictogram,
    readTally, differenceFromChart, sortData,
  ], count)
}

export default function _() { return null }
