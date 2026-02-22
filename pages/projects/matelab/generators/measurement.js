import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function compareLengths() {
  const a = randInt(10, 90)
  const b = randInt(10, 90)
  if (a === b) return compareLengths()
  const longer = a > b ? `${a} cm` : `${b} cm`
  return mcq(`Which is longer: ${a} cm or ${b} cm?`, longer, [`${a > b ? b : a} cm`, 'They are equal', 'Cannot tell'])
}

function cmToM() {
  const m = randInt(1, 5)
  const cm = m * 100
  const d = generateDistractors(m, 3, 1, 10)
  return mcq(`${cm} cm = ? metres`, m, d)
}

function mToCm() {
  const m = randInt(1, 5)
  const answer = m * 100
  const d = generateDistractors(answer, 3, 50, 600)
  return mcq(`${m} metre${m > 1 ? 's' : ''} = ? cm`, answer, d)
}

function compareMass() {
  const a = randInt(100, 900)
  const b = randInt(100, 900)
  if (a === b) return compareMass()
  const heavier = a > b ? `${a} g` : `${b} g`
  return mcq(`Which is heavier: ${a} g or ${b} g?`, heavier, [`${a > b ? b : a} g`, 'They are equal', 'Cannot tell'])
}

function kgAndG() {
  const kg = randInt(1, 5)
  const answer = kg * 1000
  const d = generateDistractors(answer, 3, 500, 6000)
  return mcq(`${kg} kg = ? g`, answer, d)
}

function capacity() {
  const litres = randInt(1, 5)
  const answer = litres * 1000
  const d = generateDistractors(answer, 3, 500, 6000)
  return mcq(`${litres} litre${litres > 1 ? 's' : ''} = ? ml`, answer, d)
}

function temperature() {
  const temps = [randInt(-5, 15), randInt(-5, 15)]
  if (temps[0] === temps[1]) temps[1] += 1
  const warmer = temps[0] > temps[1] ? `${temps[0]}°C` : `${temps[1]}°C`
  return mcq(
    `Which is warmer: ${temps[0]}°C or ${temps[1]}°C?`,
    warmer,
    [`${temps[0] > temps[1] ? temps[1] : temps[0]}°C`, 'They are equal', 'Cannot tell']
  )
}

function estimateLength() {
  const objects = [
    { name: 'a pencil', answer: '15 cm', wrongs: ['15 m', '150 cm', '1 cm'] },
    { name: 'a football pitch', answer: '100 m', wrongs: ['100 cm', '10 m', '1 km'] },
    { name: 'a door', answer: '2 m', wrongs: ['2 cm', '20 m', '200 m'] },
    { name: 'a finger width', answer: '1 cm', wrongs: ['1 m', '10 cm', '1 mm'] },
  ]
  const obj = objects[randInt(0, objects.length - 1)]
  return mcq(`About how long is ${obj.name}?`, obj.answer, obj.wrongs)
}

export function generate(count = 10) {
  return pickAndShuffle([
    compareLengths, cmToM, mToCm, compareMass,
    kgAndG, capacity, temperature, estimateLength,
  ], count)
}

export default function _() { return null }
