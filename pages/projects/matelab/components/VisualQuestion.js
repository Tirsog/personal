import styles from './VisualQuestion.module.css'

function ClockFace({ hours, minutes }) {
  const h = hours % 12
  const minuteAngle = (minutes / 60) * 360 - 90
  const hourAngle = (h / 12) * 360 + (minutes / 60) * 30 - 90

  const minuteX = 50 + 32 * Math.cos((minuteAngle * Math.PI) / 180)
  const minuteY = 50 + 32 * Math.sin((minuteAngle * Math.PI) / 180)
  const hourX = 50 + 22 * Math.cos((hourAngle * Math.PI) / 180)
  const hourY = 50 + 22 * Math.sin((hourAngle * Math.PI) / 180)

  return (
    <svg viewBox="0 0 100 100" className={styles.visual}>
      <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
      {[...Array(12)].map((_, i) => {
        const angle = ((i + 1) / 12) * 360 - 90
        const x = 50 + 38 * Math.cos((angle * Math.PI) / 180)
        const y = 50 + 38 * Math.sin((angle * Math.PI) / 180)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fontSize="8" fill="#e2e8f0" fontWeight="600"
          >
            {i + 1}
          </text>
        )
      })}
      {/* Minute ticks */}
      {[...Array(60)].map((_, i) => {
        const angle = (i / 60) * 360 - 90
        const r1 = i % 5 === 0 ? 41 : 43
        const r2 = 45
        const x1 = 50 + r1 * Math.cos((angle * Math.PI) / 180)
        const y1 = 50 + r1 * Math.sin((angle * Math.PI) / 180)
        const x2 = 50 + r2 * Math.cos((angle * Math.PI) / 180)
        const y2 = 50 + r2 * Math.sin((angle * Math.PI) / 180)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#64748b" strokeWidth={i % 5 === 0 ? '1.5' : '0.5'}
          />
        )
      })}
      {/* Hour hand */}
      <line x1="50" y1="50" x2={hourX} y2={hourY} stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="50" y1="50" x2={minuteX} y2={minuteY} stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill="#e2e8f0" />
    </svg>
  )
}

function ShapeRenderer({ shape, parts, shaded, showLabel }) {
  const shapes = {
    circle: () => {
      if (parts && shaded !== undefined) {
        return (
          <svg viewBox="0 0 100 100" className={styles.visual}>
            {[...Array(parts)].map((_, i) => {
              const startAngle = (i / parts) * 360 - 90
              const endAngle = ((i + 1) / parts) * 360 - 90
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
              const largeArc = (endAngle - startAngle) > 180 ? 1 : 0
              return (
                <path key={i}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={i < shaded ? '#3b82f6' : 'rgba(30, 41, 59, 0.6)'}
                  stroke="#94a3b8" strokeWidth="1"
                />
              )
            })}
          </svg>
        )
      }
      return (
        <svg viewBox="0 0 100 100" className={styles.visual}>
          <circle cx="50" cy="50" r="40" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
          {showLabel && <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12">circle</text>}
        </svg>
      )
    },
    triangle: () => (
      <svg viewBox="0 0 100 100" className={styles.visual}>
        <polygon points="50,10 10,85 90,85" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
        {showLabel && <text x="50" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="12">triangle</text>}
      </svg>
    ),
    square: () => {
      if (parts && shaded !== undefined) {
        const cols = parts <= 4 ? parts : Math.ceil(Math.sqrt(parts))
        const rows = Math.ceil(parts / cols)
        const cellW = 70 / cols
        const cellH = 70 / rows
        let idx = 0
        return (
          <svg viewBox="0 0 100 100" className={styles.visual}>
            {[...Array(rows)].map((_, r) =>
              [...Array(cols)].map((_, c) => {
                if (idx >= parts) return null
                const filled = idx < shaded
                idx++
                return (
                  <rect key={`${r}-${c}`}
                    x={15 + c * cellW} y={15 + r * cellH}
                    width={cellW} height={cellH}
                    fill={filled ? '#3b82f6' : 'rgba(30, 41, 59, 0.6)'}
                    stroke="#94a3b8" strokeWidth="1"
                  />
                )
              })
            )}
          </svg>
        )
      }
      return (
        <svg viewBox="0 0 100 100" className={styles.visual}>
          <rect x="15" y="15" width="70" height="70" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
          {showLabel && <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12">square</text>}
        </svg>
      )
    },
    rectangle: () => (
      <svg viewBox="0 0 100 100" className={styles.visual}>
        <rect x="10" y="25" width="80" height="50" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
        {showLabel && <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12">rectangle</text>}
      </svg>
    ),
    pentagon: () => {
      const pts = [0, 1, 2, 3, 4].map(i => {
        const a = (i / 5) * 360 - 90
        return `${50 + 38 * Math.cos(a * Math.PI / 180)},${50 + 38 * Math.sin(a * Math.PI / 180)}`
      }).join(' ')
      return (
        <svg viewBox="0 0 100 100" className={styles.visual}>
          <polygon points={pts} fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
          {showLabel && <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12">pentagon</text>}
        </svg>
      )
    },
    hexagon: () => {
      const pts = [0, 1, 2, 3, 4, 5].map(i => {
        const a = (i / 6) * 360 - 90
        return `${50 + 38 * Math.cos(a * Math.PI / 180)},${50 + 38 * Math.sin(a * Math.PI / 180)}`
      }).join(' ')
      return (
        <svg viewBox="0 0 100 100" className={styles.visual}>
          <polygon points={pts} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
          {showLabel && <text x="50" y="55" textAnchor="middle" fill="#e2e8f0" fontSize="12">hexagon</text>}
        </svg>
      )
    },
  }
  const renderer = shapes[shape]
  return renderer ? renderer() : null
}

function BarChart({ bars, maxVal }) {
  const rawMax = maxVal || Math.max(...bars.map((b) => b.value), 1)
  const step = rawMax <= 5 ? 1 : 2
  const max = Math.ceil(rawMax / step) * step
  const chartH = 115
  const yBase = 135
  const xStart = 42
  const xEnd = 232
  const xSpan = xEnd - xStart

  const ticks = []
  for (let v = 0; v <= max; v += step) ticks.push(v)

  return (
    <svg viewBox="0 0 248 165" className={styles.barChartVisual}>
      {/* Horizontal grid lines */}
      {ticks.map((v, i) => {
        const y = yBase - (v / max) * chartH
        return (
          <line key={`grid-${i}`} x1="36" y1={y} x2={xEnd} y2={y}
            stroke="#374151" strokeWidth="0.5" strokeDasharray="3,3"
          />
        )
      })}
      {/* Y axis */}
      <line x1="35" y1="15" x2="35" y2={yBase} stroke="#64748b" strokeWidth="1" />
      {/* X axis */}
      <line x1="35" y1={yBase} x2={xEnd} y2={yBase} stroke="#64748b" strokeWidth="1" />
      {/* Y labels */}
      {ticks.map((v, i) => {
        const y = yBase - (v / max) * chartH
        return (
          <text key={i} x="30" y={y + 3.5} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
        )
      })}
      {/* Bars */}
      {bars.map((bar, i) => {
        const h = (bar.value / max) * chartH
        const x = xStart + i * (xSpan / bars.length)
        const w = (xSpan / bars.length) * 0.7
        return (
          <g key={i}>
            <rect x={x} y={yBase - h} width={w} height={h}
              fill={bar.color || '#3b82f6'} rx="2"
            />
            <text x={x + w / 2} y={yBase + 13} textAnchor="middle" fontSize="8" fill="#94a3b8">
              {bar.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function CoinDisplay({ coins }) {
  const coinColors = {
    '1p': '#cd7f32', '2p': '#cd7f32', '5p': '#94a3b8', '10p': '#94a3b8',
    '20p': '#94a3b8', '50p': '#94a3b8', '£1': '#fbbf24', '£2': '#94a3b8',
  }
  return (
    <svg viewBox={`0 0 ${Math.max(coins.length * 50, 200)} 70`} className={styles.visual}>
      {coins.map((coin, i) => (
        <g key={i}>
          <circle cx={30 + i * 45} cy="35" r="20"
            fill={coinColors[coin] || '#94a3b8'}
            stroke="#475569" strokeWidth="1.5"
          />
          <text x={30 + i * 45} y="38" textAnchor="middle" fontSize="9"
            fill="#1e293b" fontWeight="700"
          >
            {coin}
          </text>
        </g>
      ))}
    </svg>
  )
}

function FractionVisual({ parts, shaded, shape }) {
  return <ShapeRenderer shape={shape || 'circle'} parts={parts} shaded={shaded} />
}

function ArrayDots({ rows, cols }) {
  const dotR = Math.min(8, 60 / Math.max(rows, cols))
  const gap = dotR * 2.5
  const w = cols * gap + 20
  const h = rows * gap + 20
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.visual}>
      {[...Array(rows)].map((_, r) =>
        [...Array(cols)].map((_, c) => (
          <circle key={`${r}-${c}`}
            cx={10 + c * gap + dotR}
            cy={10 + r * gap + dotR}
            r={dotR * 0.8}
            fill="#60a5fa"
          />
        ))
      )}
    </svg>
  )
}

function NumberLine({ min, max, marked, ticks }) {
  const range = max - min
  const w = 200
  return (
    <svg viewBox={`0 0 ${w + 20} 50`} className={styles.visual}>
      <line x1="10" y1="25" x2={w + 10} y2="25" stroke="#64748b" strokeWidth="2" />
      {(ticks || [min, max]).map((t, i) => {
        const x = 10 + ((t - min) / range) * w
        return (
          <g key={i}>
            <line x1={x} y1="20" x2={x} y2="30" stroke="#94a3b8" strokeWidth="1.5" />
            <text x={x} y="42" textAnchor="middle" fontSize="9" fill="#94a3b8">{t}</text>
          </g>
        )
      })}
      {marked !== undefined && (
        <g>
          <polygon
            points={`${10 + ((marked - min) / range) * w},18 ${10 + ((marked - min) / range) * w - 5},8 ${10 + ((marked - min) / range) * w + 5},8`}
            fill="#f59e0b"
          />
        </g>
      )}
    </svg>
  )
}

function Pictogram({ rows, iconPerUnit, icon }) {
  const sym = icon || '⭐'
  const rowH = 32
  const headerH = 44
  const totalH = headerH + rows.length * rowH + 8

  return (
    <svg viewBox={`0 0 250 ${totalH}`} className={styles.visual}>
      {/* Key */}
      <rect x="4" y="5" width="120" height="28" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="12" y="24" fontSize="13" fill="#f1f5f9" fontWeight="700">
        Key: {sym} = {iconPerUnit}
      </text>
      {rows.map((row, i) => {
        const fullIcons = Math.floor(row.value / iconPerUnit)
        const halfIcon = (row.value % iconPerUnit) >= (iconPerUnit / 2) ? 1 : 0
        const yMid = headerH + i * rowH + rowH / 2
        return (
          <g key={i}>
            <text x="5" y={yMid} fontSize="13" fill="#f1f5f9" fontWeight="600" dominantBaseline="central">{row.label}</text>
            {[...Array(fullIcons + halfIcon)].map((_, j) => (
              <text key={j} x={80 + j * 22} y={yMid} fontSize="16" dominantBaseline="central">{sym}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

function TallyMarks({ value }) {
  const groups = Math.floor(value / 5)
  const remainder = value % 5
  return (
    <svg viewBox={`0 0 ${Math.max((groups + 1) * 35, 80)} 40`} className={styles.visual}>
      {[...Array(groups)].map((_, g) => (
        <g key={g}>
          {[0, 1, 2, 3].map((l) => (
            <line key={l}
              x1={10 + g * 35 + l * 6} y1="5"
              x2={10 + g * 35 + l * 6} y2="35"
              stroke="#e2e8f0" strokeWidth="2"
            />
          ))}
          <line
            x1={10 + g * 35 - 2} y1="25"
            x2={10 + g * 35 + 20} y2="10"
            stroke="#e2e8f0" strokeWidth="2"
          />
        </g>
      ))}
      {[...Array(remainder)].map((_, l) => (
        <line key={l}
          x1={10 + groups * 35 + l * 6} y1="5"
          x2={10 + groups * 35 + l * 6} y2="35"
          stroke="#e2e8f0" strokeWidth="2"
        />
      ))}
    </svg>
  )
}

export function VisualQuestion({ visual }) {
  if (!visual) return null
  const { kind, data } = visual

  switch (kind) {
    case 'clock':
      return <ClockFace hours={data.hours} minutes={data.minutes} />
    case 'shape':
      return <ShapeRenderer shape={data.shape} parts={data.parts} shaded={data.shaded} showLabel={data.showLabel} />
    case 'barChart':
      return <BarChart bars={data.bars} maxVal={data.maxVal} />
    case 'coins':
      return <CoinDisplay coins={data.coins} />
    case 'fraction':
      return <FractionVisual parts={data.parts} shaded={data.shaded} shape={data.shape} />
    case 'array':
      return <ArrayDots rows={data.rows} cols={data.cols} />
    case 'numberLine':
      return <NumberLine min={data.min} max={data.max} marked={data.marked} ticks={data.ticks} />
    case 'pictogram':
      return <Pictogram rows={data.rows} iconPerUnit={data.iconPerUnit} icon={data.icon} />
    case 'tally':
      return <TallyMarks value={data.value} />
    default:
      return null
  }
}

export default function _() { return null }
