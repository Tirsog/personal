import { randInt, mcq, tfQ, pickAndShuffle } from './utils'

function identifyRightAngle() {
  const shapes = [
    { name: 'square', hasRight: true, count: 4 },
    { name: 'rectangle', hasRight: true, count: 4 },
    { name: 'triangle', hasRight: false, count: 0 },
    { name: 'circle', hasRight: false, count: 0 },
    { name: 'pentagon', hasRight: false, count: 0 },
  ]
  const s = shapes[randInt(0, shapes.length - 1)]
  return tfQ(`A ${s.name} has right angles.`, s.hasRight)
}

function countRightAngles() {
  const shapes = [
    { name: 'square', count: 4 },
    { name: 'rectangle', count: 4 },
  ]
  const s = shapes[randInt(0, 1)]
  return mcq(`How many right angles does a ${s.name} have?`, s.count, [2, 3, 6])
}

function rightAngleInTurn() {
  return mcq('How many right angles are in a quarter turn?', 1, [2, 4, 0])
}

function rightAnglesInFull() {
  return mcq('How many right angles are in a full turn?', 4, [1, 2, 3])
}

function netIdentification() {
  const shapes = [
    { name: 'cube', faces: 6, answer: '6 squares' },
    { name: 'cuboid', faces: 6, answer: '6 rectangles' },
    { name: 'cylinder', faces: 3, answer: '2 circles and 1 rectangle' },
    { name: 'cone', faces: 2, answer: '1 circle and 1 sector' },
  ]
  const s = shapes[randInt(0, shapes.length - 1)]
  const wrongs = shapes.filter((o) => o.name !== s.name).map((o) => o.answer).slice(0, 3)
  return mcq(`The net of a ${s.name} is made of...`, s.answer, wrongs)
}

function facesOfCube() {
  return mcq('A cube net has how many square faces?', 6, [4, 5, 8])
}

function rightAngleSpotting() {
  const items = [
    { name: 'the corner of a book', has: true },
    { name: 'the corner of a clock face', has: true },
    { name: 'a slice of pizza', has: false },
    { name: 'a round ball', has: false },
  ]
  const item = items[randInt(0, items.length - 1)]
  return tfQ(`${item.name[0].toUpperCase() + item.name.slice(1)} has a right angle.`, item.has)
}

function halfTurnRightAngles() {
  return mcq('How many right angles are in a half turn?', 2, [1, 3, 4])
}

export function generate(count = 10) {
  return pickAndShuffle([
    identifyRightAngle, countRightAngles, rightAngleInTurn, rightAnglesInFull,
    netIdentification, facesOfCube, rightAngleSpotting, halfTurnRightAngles,
  ], count)
}

export default function _() { return null }
