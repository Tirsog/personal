export function PlanetNode({ planet, index, isUnlocked, stars, onClick }) {
  const { x, y, color, name, isStretch } = planet
  const radius = 28
  const touchRadius = 32

  return (
    <g
      onClick={isUnlocked ? () => onClick(planet) : undefined}
      style={{ cursor: isUnlocked ? 'pointer' : 'default' }}
    >
      {/* Touch target */}
      <circle cx={x} cy={y} r={touchRadius} fill="transparent" />

      {/* Glow effect for unlocked planets */}
      {isUnlocked && (
        <circle
          cx={x}
          cy={y}
          r={radius + 6}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values={`${radius + 4};${radius + 8};${radius + 4}`}
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Planet body */}
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={isUnlocked ? color : '#374151'}
        stroke={isUnlocked ? color : '#4b5563'}
        strokeWidth="2"
        opacity={isUnlocked ? 1 : 0.5}
      />

      {/* Stretch planet ring */}
      {isStretch && (
        <ellipse
          cx={x}
          cy={y}
          rx={radius + 8}
          ry={8}
          fill="none"
          stroke={isUnlocked ? color : '#4b5563'}
          strokeWidth="1.5"
          opacity={isUnlocked ? 0.6 : 0.3}
        />
      )}

      {/* Planet name */}
      <text
        x={x}
        y={y + radius + 16}
        textAnchor="middle"
        fill={isUnlocked ? '#e2e8f0' : '#64748b'}
        fontSize="11"
        fontWeight="600"
      >
        {name}
      </text>

      {/* Lock icon for locked planets */}
      {!isUnlocked && (
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="18"
          fill="#64748b"
        >
          🔒
        </text>
      )}

      {/* Star indicators */}
      {isUnlocked && stars > 0 && (
        <g>
          {[0, 1, 2].map((i) => {
            const starX = x - 12 + i * 12
            const starY = y - radius - 10
            return (
              <text
                key={i}
                x={starX}
                y={starY}
                textAnchor="middle"
                fontSize="10"
                fill={i < stars ? '#fbbf24' : '#374151'}
              >
                ★
              </text>
            )
          })}
        </g>
      )}
    </g>
  )
}

export default function _() { return null }
