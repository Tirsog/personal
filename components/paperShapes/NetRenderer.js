export default function NetRenderer({ shape, printMode = false }) {
  const A4_W = 210
  const A4_H = 297
  const MARGIN = 5
  const printW = A4_W - 2 * MARGIN
  const printH = A4_H - 2 * MARGIN

  const { faces, foldLines, tabs, boundingBox } = shape
  const scale = Math.min(printW / boundingBox.width, printH / boundingBox.height)
  const netW = boundingBox.width * scale
  const netH = boundingBox.height * scale
  const offsetX = (A4_W - netW) / 2
  const offsetY = (A4_H - netH) / 2

  const toSvg = (p) =>
    `${(p[0] * scale + offsetX).toFixed(2)},${(p[1] * scale + offsetY).toFixed(2)}`
  const polyPoints = (pts) => pts.map(toSvg).join(" ")

  const strokeScale = scale

  return (
    <svg
      viewBox={`0 0 ${A4_W} ${A4_H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", background: printMode ? "white" : "none" }}
    >
      {tabs.map((tab, i) => (
        <polygon
          key={`tab-${i}`}
          points={polyPoints(tab)}
          fill="#e8e8e8"
          stroke="#666"
          strokeWidth={0.3 * strokeScale}
        />
      ))}

      {faces.map((face, i) => (
        <polygon
          key={`face-${i}`}
          points={polyPoints(face)}
          fill="none"
          stroke="black"
          strokeWidth={0.4 * strokeScale}
          strokeLinejoin="round"
        />
      ))}

      {foldLines.map(([a, b], i) => (
        <line
          key={`fold-${i}`}
          x1={(a[0] * scale + offsetX).toFixed(2)}
          y1={(a[1] * scale + offsetY).toFixed(2)}
          x2={(b[0] * scale + offsetX).toFixed(2)}
          y2={(b[1] * scale + offsetY).toFixed(2)}
          stroke="#999"
          strokeWidth={0.25 * strokeScale}
          strokeDasharray={`${2.5 * strokeScale},${2.5 * strokeScale}`}
        />
      ))}

      {printMode && (
        <text
          x={A4_W - 5}
          y={A4_H - 3}
          textAnchor="end"
          fontSize="3"
          fill="#ccc"
        >
          {shape.name}
        </text>
      )}
    </svg>
  )
}
