import { randInt, mcq, tfQ, generateDistractors, pickAndShuffle } from './utils'

const shapes2D = [
  { name: 'circle', sides: 0, vertices: 0 },
  { name: 'triangle', sides: 3, vertices: 3 },
  { name: 'square', sides: 4, vertices: 4 },
  { name: 'rectangle', sides: 4, vertices: 4 },
  { name: 'pentagon', sides: 5, vertices: 5 },
  { name: 'hexagon', sides: 6, vertices: 6 },
]

const shapes3D = [
  { name: 'cube', faces: 6, edges: 12, vertices: 8 },
  { name: 'cuboid', faces: 6, edges: 12, vertices: 8 },
  { name: 'sphere', faces: 1, edges: 0, vertices: 0 },
  { name: 'cylinder', faces: 3, edges: 2, vertices: 0 },
  { name: 'cone', faces: 2, edges: 1, vertices: 1 },
  { name: 'pyramid', faces: 5, edges: 8, vertices: 5 },
]

function countSides() {
  const s = shapes2D.filter((s) => s.sides > 0)[randInt(0, 4)]
  const d = generateDistractors(s.sides, 3, 2, 8)
  return mcq(
    `How many sides does a ${s.name} have?`,
    s.sides, d,
    { kind: 'shape', data: { shape: s.name, showLabel: false } }
  )
}

function countVertices() {
  const s = shapes2D.filter((s) => s.vertices > 0)[randInt(0, 4)]
  const d = generateDistractors(s.vertices, 3, 2, 8)
  return mcq(`How many vertices (corners) does a ${s.name} have?`, s.vertices, d)
}

function nameShape() {
  const s = shapes2D[randInt(0, shapes2D.length - 1)]
  const wrongs = shapes2D.filter((o) => o.name !== s.name).map((o) => o.name).slice(0, 3)
  return mcq(
    'What is this shape called?',
    s.name, wrongs,
    { kind: 'shape', data: { shape: s.name, showLabel: false } }
  )
}

function faces3D() {
  const s = shapes3D[randInt(0, shapes3D.length - 1)]
  const d = generateDistractors(s.faces, 3, 0, 8)
  return mcq(`How many faces does a ${s.name} have?`, s.faces, d)
}

function edges3D() {
  const s = shapes3D.filter((s) => s.edges > 0)[randInt(0, 3)]
  const d = generateDistractors(s.edges, 3, 0, 14)
  return mcq(`How many edges does a ${s.name} have?`, s.edges, d)
}

function is2Dor3D() {
  const all = [...shapes2D.map((s) => ({ ...s, dim: '2D' })), ...shapes3D.map((s) => ({ ...s, dim: '3D' }))]
  const s = all[randInt(0, all.length - 1)]
  return mcq(`Is a ${s.name} a 2D or 3D shape?`, s.dim, [s.dim === '2D' ? '3D' : '2D', 'Both', 'Neither'])
}

function sortByProperty() {
  const target = randInt(3, 6)
  const matching = shapes2D.filter((s) => s.sides === target)
  if (matching.length === 0) return countSides()
  const answer = matching[0].name
  const wrongs = shapes2D.filter((s) => s.sides !== target && s.sides > 0).map((s) => s.name).slice(0, 3)
  return mcq(`Which shape has exactly ${target} sides?`, answer, wrongs)
}

function trueFalseShape() {
  const s = shapes2D[randInt(1, shapes2D.length - 1)]
  const claimedSides = Math.random() < 0.5 ? s.sides : s.sides + randInt(-1, 1)
  return tfQ(`A ${s.name} has ${claimedSides} sides.`, claimedSides === s.sides)
}

export function generate(count = 10) {
  return pickAndShuffle([
    countSides, countVertices, nameShape, faces3D,
    edges3D, is2Dor3D, sortByProperty, trueFalseShape,
  ], count)
}

export default function _() { return null }
