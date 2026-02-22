const year2Planets = [
  {
    key: 'placeValue',
    name: 'Numeria',
    color: '#3b82f6',
    x: 120,
    y: 100,
    description: 'Count to 100, steps of 2/3/5, place value, compare & order',
  },
  {
    key: 'addSubtract',
    name: 'Addara',
    color: '#10b981',
    x: 280,
    y: 160,
    description: '2-digit +/- ones and tens, facts to 20, missing numbers',
  },
  {
    key: 'multiplyDivide',
    name: 'Multiplex',
    color: '#f59e0b',
    x: 440,
    y: 90,
    description: '2, 5, 10 times tables, arrays, sharing & grouping',
  },
  {
    key: 'fractions',
    name: 'Fractonia',
    color: '#ef4444',
    x: 600,
    y: 170,
    description: '1/2, 1/3, 1/4, 2/3, 3/4 of shapes and quantities',
  },
  {
    key: 'measurement',
    name: 'Metrion',
    color: '#8b5cf6',
    x: 700,
    y: 310,
    description: 'Length cm/m, mass g/kg, capacity ml/l, temperature',
  },
  {
    key: 'time',
    name: 'Chronos',
    color: '#06b6d4',
    x: 550,
    y: 390,
    description: 'Clock to 5 min, elapsed time, minutes/hours/days',
  },
  {
    key: 'money',
    name: 'Coinara',
    color: '#f97316',
    x: 380,
    y: 310,
    description: 'UK coins, combinations, making change',
  },
  {
    key: 'shapes',
    name: 'Geometra',
    color: '#ec4899',
    x: 200,
    y: 370,
    description: '2D sides/vertices, 3D faces/edges, sort shapes',
  },
  {
    key: 'positionDirection',
    name: 'Compassia',
    color: '#14b8a6',
    x: 100,
    y: 490,
    description: 'Quarter/half turns, clockwise/anticlockwise, grid movement',
  },
  {
    key: 'statistics',
    name: 'Datavis',
    color: '#a855f7',
    x: 300,
    y: 520,
    description: 'Pictograms, tally charts, bar charts, tables',
  },
  {
    key: 'stretchNumber',
    name: 'Nova Prime',
    color: '#fbbf24',
    x: 500,
    y: 510,
    description: 'Numbers to 1,000, 3-digit operations',
    isStretch: true,
  },
  {
    key: 'stretchShapes',
    name: 'Crystal Nebula',
    color: '#c084fc',
    x: 680,
    y: 480,
    description: 'Right angles, nets',
    isStretch: true,
  },
]

const defaultUnlocked = ['placeValue', 'addSubtract', 'multiplyDivide']

function isPlanetUnlocked(planetIndex, progress) {
  const planet = year2Planets[planetIndex]
  if (!planet) return false

  if (defaultUnlocked.includes(planet.key)) return true

  if (planet.isStretch) {
    const corePlanets = year2Planets.filter((p) => !p.isStretch)
    return corePlanets.every((p) => (progress[p.key]?.bestStars || 0) >= 2)
  }

  const prevPlanet = year2Planets[planetIndex - 1]
  if (!prevPlanet) return false
  return (progress[prevPlanet.key]?.bestStars || 0) >= 1
}

function getTotalStars(progress) {
  return Object.values(progress).reduce(
    (sum, p) => sum + (p.bestStars || 0),
    0
  )
}

function createEmptyProgress() {
  const progress = {}
  year2Planets.forEach((planet) => {
    progress[planet.key] = { bestStars: 0, attempts: 0, lastAttempt: null }
  })
  return progress
}

export {
  year2Planets,
  defaultUnlocked,
  isPlanetUnlocked,
  getTotalStars,
  createEmptyProgress,
}

export default function _() { return null }
