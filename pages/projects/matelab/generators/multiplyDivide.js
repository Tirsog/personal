import { randInt, mcq, numQ, tfQ, generateDistractors, pickAndShuffle } from './utils'

function timesTable() {
  const table = [2, 5, 10][randInt(0, 2)]
  const n = randInt(1, 12)
  const answer = table * n
  const d = generateDistractors(answer, 3, table, table * 12)
  return mcq(`${n} × ${table} = ?`, answer, d)
}

function divisionFact() {
  const table = [2, 5, 10][randInt(0, 2)]
  const n = randInt(1, 12)
  const product = table * n
  const d = generateDistractors(n, 3, 1, 12)
  return mcq(`${product} ÷ ${table} = ?`, n, d)
}

function arrayQuestion() {
  const rows = randInt(2, 5)
  const cols = randInt(2, 5)
  const answer = rows * cols
  const d = generateDistractors(answer, 3, 2, 30)
  return mcq(
    `How many dots are there? (${rows} rows of ${cols})`,
    answer, d,
    { kind: 'array', data: { rows, cols } }
  )
}

function doubleNumber() {
  const n = randInt(2, 20)
  const answer = n * 2
  const d = generateDistractors(answer, 3, 2, 50)
  return mcq(`Double ${n} = ?`, answer, d)
}

function sharingEqually() {
  const groups = [2, 5, 10][randInt(0, 2)]
  const each = randInt(1, 6)
  const total = groups * each
  const d = generateDistractors(each, 3, 1, 12)
  return mcq(`Share ${total} equally into ${groups} groups. How many in each group?`, each, d)
}

function grouping() {
  const groupSize = [2, 5, 10][randInt(0, 2)]
  const numGroups = randInt(2, 6)
  const total = groupSize * numGroups
  const d = generateDistractors(numGroups, 3, 1, 12)
  return mcq(`${total} items in groups of ${groupSize}. How many groups?`, numGroups, d)
}

function missingFactor() {
  const table = [2, 5, 10][randInt(0, 2)]
  const n = randInt(1, 12)
  const product = table * n
  const d = generateDistractors(n, 3, 1, 12)
  return mcq(`? × ${table} = ${product}`, n, d)
}

function oddOneOut() {
  const table = [2, 5, 10][randInt(0, 2)]
  const multiples = []
  while (multiples.length < 3) {
    const m = table * randInt(1, 12)
    if (!multiples.includes(m)) multiples.push(m)
  }
  let odd = multiples[0] + 1
  while (odd % table === 0 || multiples.includes(odd)) odd++
  return mcq(`Which is NOT a multiple of ${table}?`, odd, multiples)
}

export function generate(count = 10) {
  return pickAndShuffle([
    timesTable, divisionFact, arrayQuestion, doubleNumber,
    sharingEqually, grouping, missingFactor, oddOneOut,
  ], count)
}

export default function _() { return null }
