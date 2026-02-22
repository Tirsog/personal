import { randInt, mcq, tfQ, pickAndShuffle } from './utils'

function quarterTurn() {
  const directions = ['North', 'East', 'South', 'West']
  const startIdx = randInt(0, 3)
  const clockwise = Math.random() < 0.5
  const endIdx = clockwise ? (startIdx + 1) % 4 : (startIdx + 3) % 4
  const label = clockwise ? 'clockwise' : 'anticlockwise'
  const wrongs = directions.filter((d) => d !== directions[endIdx]).slice(0, 3)
  return mcq(
    `You face ${directions[startIdx]}. Make a quarter turn ${label}. Which way do you face?`,
    directions[endIdx], wrongs
  )
}

function halfTurn() {
  const directions = ['North', 'East', 'South', 'West']
  const startIdx = randInt(0, 3)
  const endIdx = (startIdx + 2) % 4
  const wrongs = directions.filter((d) => d !== directions[endIdx]).slice(0, 3)
  return mcq(
    `You face ${directions[startIdx]}. Make a half turn. Which way do you face?`,
    directions[endIdx], wrongs
  )
}

function howManyQuarterTurns() {
  const directions = ['North', 'East', 'South', 'West']
  const startIdx = randInt(0, 3)
  const turns = randInt(1, 3)
  const endIdx = (startIdx + turns) % 4
  return mcq(
    `How many quarter turns clockwise from ${directions[startIdx]} to ${directions[endIdx]}?`,
    turns, [turns === 1 ? 2 : 1, turns === 3 ? 2 : 3, 4]
  )
}

function clockwiseOrAnti() {
  const directions = ['North', 'East', 'South', 'West']
  const startIdx = randInt(0, 3)
  const clockwise = Math.random() < 0.5
  const endIdx = clockwise ? (startIdx + 1) % 4 : (startIdx + 3) % 4
  return mcq(
    `From ${directions[startIdx]} to ${directions[endIdx]} with one quarter turn, which way did you turn?`,
    clockwise ? 'Clockwise' : 'Anticlockwise',
    [clockwise ? 'Anticlockwise' : 'Clockwise', 'No turn needed', 'Half turn']
  )
}

function gridMovement() {
  const steps = randInt(1, 4)
  const dir = ['left', 'right', 'up', 'down'][randInt(0, 3)]
  const startX = randInt(1, 5)
  const startY = randInt(1, 5)
  let endX = startX, endY = startY
  if (dir === 'left') endX = startX - steps
  if (dir === 'right') endX = startX + steps
  if (dir === 'up') endY = startY + steps
  if (dir === 'down') endY = startY - steps
  const answer = `(${endX}, ${endY})`
  const wrongs = [
    `(${endX + 1}, ${endY})`,
    `(${endX}, ${endY + 1})`,
    `(${startX}, ${startY})`,
  ]
  return mcq(
    `Start at (${startX}, ${startY}). Move ${steps} square${steps > 1 ? 's' : ''} ${dir}. Where are you?`,
    answer, wrongs
  )
}

function trueFalseTurn() {
  const directions = ['North', 'East', 'South', 'West']
  const startIdx = randInt(0, 3)
  const endIdx = (startIdx + 2) % 4
  const claimedEnd = Math.random() < 0.5 ? directions[endIdx] : directions[(startIdx + 1) % 4]
  return tfQ(
    `A half turn from ${directions[startIdx]} faces ${claimedEnd}.`,
    claimedEnd === directions[endIdx]
  )
}

function fullTurn() {
  const directions = ['North', 'East', 'South', 'West']
  const start = directions[randInt(0, 3)]
  return mcq(
    `You face ${start} and make a full turn. Which way do you face?`,
    start,
    directions.filter((d) => d !== start).slice(0, 3)
  )
}

export function generate(count = 10) {
  return pickAndShuffle([
    quarterTurn, halfTurn, howManyQuarterTurns, clockwiseOrAnti,
    gridMovement, trueFalseTurn, fullTurn,
  ], count)
}

export default function _() { return null }
