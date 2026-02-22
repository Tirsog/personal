import { randInt, mcq, tfQ, generateDistractors, pickAndShuffle } from './utils'

function fractionOfShape() {
  const fracs = [
    { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 1, den: 4 },
    { num: 2, den: 3 }, { num: 3, den: 4 }, { num: 2, den: 4 },
  ]
  const f = fracs[randInt(0, fracs.length - 1)]
  const shape = ['circle', 'square'][randInt(0, 1)]
  const wrongs = fracs
    .filter((w) => w.num !== f.num || w.den !== f.den)
    .map((w) => `${w.num}/${w.den}`)
    .slice(0, 3)
  return mcq(
    'What fraction is shaded?',
    `${f.num}/${f.den}`, wrongs,
    { kind: 'fraction', data: { parts: f.den, shaded: f.num, shape } }
  )
}

function fractionOfQuantity() {
  const den = [2, 3, 4][randInt(0, 2)]
  const num = 1
  const whole = den * randInt(2, 6)
  const answer = (whole * num) / den
  const d = generateDistractors(answer, 3, 1, whole)
  return mcq(`Find 1/${den} of ${whole}`, answer, d)
}

function fractionOfQuantityComplex() {
  const pairs = [
    { num: 2, den: 3 }, { num: 3, den: 4 }, { num: 2, den: 4 },
  ]
  const f = pairs[randInt(0, pairs.length - 1)]
  const whole = f.den * randInt(2, 5)
  const answer = (whole * f.num) / f.den
  const d = generateDistractors(answer, 3, 1, whole)
  return mcq(`Find ${f.num}/${f.den} of ${whole}`, answer, d)
}

function equalParts() {
  const den = [2, 3, 4][randInt(0, 2)]
  const names = { 2: 'halves', 3: 'thirds', 4: 'quarters' }
  const wrongNames = Object.values(names).filter((n) => n !== names[den])
  return mcq(
    `A shape divided into ${den} equal parts is split into...`,
    names[den],
    [...wrongNames, 'fifths'].slice(0, 3)
  )
}

function compareFractions() {
  const a = { num: 1, den: [2, 3, 4][randInt(0, 2)] }
  let bDen = [2, 3, 4][randInt(0, 2)]
  while (bDen === a.den) bDen = [2, 3, 4][randInt(0, 2)]
  const b = { num: 1, den: bDen }
  const bigger = a.den < b.den ? `1/${a.den}` : `1/${b.den}`
  const smaller = a.den < b.den ? `1/${b.den}` : `1/${a.den}`
  return mcq(
    `Which is bigger: 1/${a.den} or 1/${b.den}?`,
    bigger,
    [smaller, 'They are equal', 'Cannot tell']
  )
}

function trueFalseFraction() {
  const den = [2, 3, 4][randInt(0, 2)]
  const whole = den * randInt(2, 5)
  const correctAns = whole / den
  const shown = Math.random() < 0.5 ? correctAns : correctAns + randInt(-2, 2)
  return tfQ(`1/${den} of ${whole} = ${shown}`, shown === correctAns)
}

function equivalentFraction() {
  return tfQ('1/2 is the same as 2/4.', true)
}

function shadeParts() {
  const den = [3, 4][randInt(0, 1)]
  const shaded = randInt(1, den - 1)
  const d = generateDistractors(shaded, 3, 0, den)
  return mcq(
    `How many parts are shaded?`,
    shaded, d,
    { kind: 'fraction', data: { parts: den, shaded, shape: 'circle' } }
  )
}

export function generate(count = 10) {
  return pickAndShuffle([
    fractionOfShape, fractionOfQuantity, fractionOfQuantityComplex,
    equalParts, compareFractions, trueFalseFraction, equivalentFraction, shadeParts,
  ], count)
}

export default function _() { return null }
