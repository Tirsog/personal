import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function addOnes() {
  const a = randInt(10, 89)
  const b = randInt(1, 9)
  const answer = a + b
  const d = generateDistractors(answer, 3, 10, 99)
  return mcq(`${a} + ${b} = ?`, answer, d)
}

function addTens() {
  const a = randInt(10, 80)
  const b = randInt(1, 9) * 10
  const answer = a + b
  const d = generateDistractors(answer, 3, 10, 99)
  return mcq(`${a} + ${b} = ?`, answer, d)
}

function subtractOnes() {
  const a = randInt(12, 99)
  const b = randInt(1, Math.min(9, a - 1))
  const answer = a - b
  const d = generateDistractors(answer, 3, 1, 99)
  return mcq(`${a} - ${b} = ?`, answer, d)
}

function subtractTens() {
  const a = randInt(20, 99)
  const b = randInt(1, Math.floor(a / 10)) * 10
  const answer = a - b
  const d = generateDistractors(answer, 3, 0, 99)
  return mcq(`${a} - ${b} = ?`, answer, d)
}

function factsTo20() {
  const a = randInt(2, 18)
  const b = randInt(2, 20 - a)
  if (Math.random() < 0.5) {
    return numQ(`${a} + ${b} = ?`, a + b)
  }
  const sum = a + b
  return numQ(`${sum} - ${a} = ?`, b)
}

function missingNumber() {
  const a = randInt(2, 15)
  const b = randInt(2, 15)
  const sum = a + b
  if (Math.random() < 0.5) {
    const d = generateDistractors(b, 3, 1, 20)
    return mcq(`${a} + ? = ${sum}`, b, d)
  }
  const d = generateDistractors(a, 3, 1, 20)
  return mcq(`? + ${b} = ${sum}`, a, d)
}

function addThreeNumbers() {
  const a = randInt(1, 8)
  const b = randInt(1, 8)
  const c = randInt(1, 8)
  const answer = a + b + c
  const d = generateDistractors(answer, 3, 3, 30)
  return mcq(`${a} + ${b} + ${c} = ?`, answer, d)
}

function checkStatement() {
  const a = randInt(10, 50)
  const b = randInt(1, 30)
  const correct = a + b
  const shown = Math.random() < 0.5 ? correct : correct + randInt(-3, 3)
  return tfQ(`${a} + ${b} = ${shown}`, shown === correct)
}

export function generate(count = 10) {
  return pickAndShuffle([
    addOnes, addTens, subtractOnes, subtractTens,
    factsTo20, missingNumber, addThreeNumbers, checkStatement,
  ], count)
}

export default function _() { return null }
