import { generate as placeValue } from './placeValue'
import { generate as addSubtract } from './addSubtract'
import { generate as multiplyDivide } from './multiplyDivide'
import { generate as fractions } from './fractions'
import { generate as measurement } from './measurement'
import { generate as time } from './time'
import { generate as money } from './money'
import { generate as shapes } from './shapes'
import { generate as positionDirection } from './positionDirection'
import { generate as statistics } from './statistics'
import { generate as stretchNumber } from './stretchNumber'
import { generate as stretchShapes } from './stretchShapes'

const generators = {
  placeValue,
  addSubtract,
  multiplyDivide,
  fractions,
  measurement,
  time,
  money,
  shapes,
  positionDirection,
  statistics,
  stretchNumber,
  stretchShapes,
}

export function generateQuestions(topicKey, count = 10) {
  const gen = generators[topicKey]
  if (!gen) {
    throw new Error(`No generator found for topic: ${topicKey}`)
  }
  return gen(count)
}

export default function _() { return null }
