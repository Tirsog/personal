import { year2Planets, isPlanetUnlocked } from '../data/curriculum.js'
import { PlanetNode } from './PlanetNode'
import styles from './StarMap.module.css'

export function StarMap({ progress, onSelectPlanet }) {

  function getRocketPosition() {
    let lastCompletedIdx = -1
    for (let i = year2Planets.length - 1; i >= 0; i--) {
      if ((progress[year2Planets[i].key]?.bestStars || 0) > 0) {
        lastCompletedIdx = i
        break
      }
    }
    if (lastCompletedIdx === -1) {
      return { x: year2Planets[0].x, y: year2Planets[0].y - 45 }
    }
    const p = year2Planets[lastCompletedIdx]
    return { x: p.x, y: p.y - 45 }
  }

  const rocket = getRocketPosition()

  return (
    <div className={styles.mapContainer}>
      <svg
        viewBox="0 0 800 600"
        className={styles.mapSvg}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection paths between planets */}
        {year2Planets.slice(0, 10).map((planet, i) => {
          if (i === 0) return null
          const prev = year2Planets[i - 1]
          const unlocked = isPlanetUnlocked(i, progress)
          const midX = (prev.x + planet.x) / 2
          const midY = (prev.y + planet.y) / 2 - 20
          return (
            <path
              key={`path-${i}`}
              d={`M ${prev.x} ${prev.y} Q ${midX} ${midY} ${planet.x} ${planet.y}`}
              fill="none"
              stroke={unlocked ? 'rgba(148, 163, 184, 0.4)' : 'rgba(71, 85, 105, 0.3)'}
              strokeWidth="2"
              strokeDasharray={unlocked ? 'none' : '6 4'}
            />
          )
        })}

        {/* Stretch planet connections (from planet 10 to stretch planets) */}
        {year2Planets.slice(10).map((planet, i) => {
          const lastCore = year2Planets[9]
          const unlocked = isPlanetUnlocked(10 + i, progress)
          const midX = (lastCore.x + planet.x) / 2
          const midY = (lastCore.y + planet.y) / 2 - 15
          return (
            <path
              key={`stretch-path-${i}`}
              d={`M ${lastCore.x} ${lastCore.y} Q ${midX} ${midY} ${planet.x} ${planet.y}`}
              fill="none"
              stroke={unlocked ? 'rgba(251, 191, 36, 0.4)' : 'rgba(71, 85, 105, 0.2)'}
              strokeWidth="2"
              strokeDasharray={unlocked ? '4 4' : '6 4'}
            />
          )
        })}

        {/* Planets */}
        {year2Planets.map((planet, i) => (
          <PlanetNode
            key={planet.key}
            planet={planet}
            index={i}
            isUnlocked={isPlanetUnlocked(i, progress)}
            stars={progress[planet.key]?.bestStars || 0}
            onClick={onSelectPlanet}
          />
        ))}

        {/* Rocket */}
        <g className={styles.rocket}>
          <text
            x={rocket.x}
            y={rocket.y}
            textAnchor="middle"
            fontSize="24"
          >
            🚀
          </text>
        </g>
      </svg>
    </div>
  )
}

export default function _() { return null }
