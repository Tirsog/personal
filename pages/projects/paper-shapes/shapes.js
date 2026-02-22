const r = (n) => Math.round(n * 100) / 100

function computeOutwardNormal(p1, p2, centroid) {
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  const len = Math.sqrt(dx * dx + dy * dy)
  const n1 = [-dy / len, dx / len]
  const n2 = [dy / len, -dx / len]
  const mx = (p1[0] + p2[0]) / 2
  const my = (p1[1] + p2[1]) / 2
  const toCx = centroid[0] - mx
  const toCy = centroid[1] - my
  const dot = n1[0] * toCx + n1[1] * toCy
  return dot < 0 ? n1 : n2
}

function makeTab(p1, p2, centroid, depth = 8, taper = 0.15) {
  const n = computeOutwardNormal(p1, p2, centroid)
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  const len = Math.sqrt(dx * dx + dy * dy)
  const ex = dx / len
  const ey = dy / len
  const inset = taper * len
  return [
    [r(p1[0]), r(p1[1])],
    [r(p2[0]), r(p2[1])],
    [r(p2[0] - inset * ex + depth * n[0]), r(p2[1] - inset * ey + depth * n[1])],
    [r(p1[0] + inset * ex + depth * n[0]), r(p1[1] + inset * ey + depth * n[1])],
  ]
}

function getCentroid(faces) {
  const pts = faces.flat()
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length
  return [cx, cy]
}

function normalizeCoords(shape) {
  const allPts = [...shape.faces.flat(), ...shape.tabs.flat()]
  const minX = Math.min(...allPts.map((p) => p[0]))
  const minY = Math.min(...allPts.map((p) => p[1]))
  const shift = (p) => [r(p[0] - minX), r(p[1] - minY)]
  const shiftEdge = (e) => [shift(e[0]), shift(e[1])]
  return {
    ...shape,
    faces: shape.faces.map((f) => f.map(shift)),
    foldLines: shape.foldLines.map(shiftEdge),
    tabs: shape.tabs.map((t) => t.map(shift)),
    boundingBox: {
      width: r(Math.max(...allPts.map((p) => p[0])) - minX),
      height: r(Math.max(...allPts.map((p) => p[1])) - minY),
    },
  }
}

function buildTetrahedron() {
  const s = 80
  const h = r(s * Math.sqrt(3) / 2)
  const faces = [
    [[0, h], [s / 2, 0], [s, h]],
    [[s / 2, 0], [1.5 * s, 0], [s, h]],
    [[s, h], [1.5 * s, 0], [2 * s, h]],
    [[1.5 * s, 0], [2.5 * s, 0], [2 * s, h]],
  ]
  const foldLines = [
    [[s / 2, 0], [s, h]],
    [[s, h], [1.5 * s, 0]],
    [[1.5 * s, 0], [2 * s, h]],
  ]
  const centroid = getCentroid(faces)
  const tabEdges = [
    [[0, h], [s, h]],
    [[s / 2, 0], [1.5 * s, 0]],
    [[2.5 * s, 0], [2 * s, h]],
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "tetrahedron",
    name: "Tetrahedron",
    description: "4 equilateral triangles",
    icon: "\u25B3",
    faces,
    foldLines,
    tabs,
  })
}

function buildSquarePyramid() {
  const s = 65
  const th = 55
  const half = s / 2
  const cx = half + th
  const cy = half + th
  const sq = [
    [cx - half, cy - half],
    [cx + half, cy - half],
    [cx + half, cy + half],
    [cx - half, cy + half],
  ]
  const faces = [
    sq,
    [sq[0], sq[1], [cx, cy - half - th]],
    [sq[1], sq[2], [cx + half + th, cy]],
    [sq[2], sq[3], [cx, cy + half + th]],
    [sq[3], sq[0], [cx - half - th, cy]],
  ]
  const foldLines = [
    [sq[0], sq[1]],
    [sq[1], sq[2]],
    [sq[2], sq[3]],
    [sq[3], sq[0]],
  ]
  const centroid = getCentroid(faces)
  const tabEdges = [
    [[cx, cy - half - th], sq[1]],
    [[cx + half + th, cy], sq[2]],
    [[cx, cy + half + th], sq[3]],
    [[cx - half - th, cy], sq[0]],
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "square-pyramid",
    name: "Square Pyramid",
    description: "1 square + 4 triangles",
    icon: "\u25B2",
    faces,
    foldLines,
    tabs,
  })
}

function buildCube() {
  const s = 55
  // Vertical cross: 3 wide × 4 tall for better A4 usage
  const faces = [
    [[s, 0], [2 * s, 0], [2 * s, s], [s, s]],
    [[0, s], [s, s], [s, 2 * s], [0, 2 * s]],
    [[s, s], [2 * s, s], [2 * s, 2 * s], [s, 2 * s]],
    [[2 * s, s], [3 * s, s], [3 * s, 2 * s], [2 * s, 2 * s]],
    [[s, 2 * s], [2 * s, 2 * s], [2 * s, 3 * s], [s, 3 * s]],
    [[s, 3 * s], [2 * s, 3 * s], [2 * s, 4 * s], [s, 4 * s]],
  ]
  const foldLines = [
    [[s, s], [2 * s, s]],
    [[s, s], [s, 2 * s]],
    [[2 * s, s], [2 * s, 2 * s]],
    [[s, 2 * s], [2 * s, 2 * s]],
    [[s, 3 * s], [2 * s, 3 * s]],
  ]
  const centroid = getCentroid(faces)
  const tabEdges = [
    [[s, 0], [2 * s, 0]],
    [[s, s], [s, 0]],
    [[2 * s, 0], [2 * s, s]],
    [[0, 2 * s], [0, s]],
    [[0, 2 * s], [s, 2 * s]],
    [[3 * s, 2 * s], [2 * s, 2 * s]],
    [[3 * s, s], [3 * s, 2 * s]],
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "cube",
    name: "Cube",
    description: "6 equal squares",
    icon: "\u25A1",
    faces,
    foldLines,
    tabs,
  })
}

function buildCuboid() {
  const L = 60
  const W = 45
  const H = 30
  // Vertical cross: 3 wide × 4 tall for better A4 usage
  const faces = [
    [[W, 0], [W + L, 0], [W + L, W], [W, W]],
    [[0, W], [W, W], [W, W + H], [0, W + H]],
    [[W, W], [W + L, W], [W + L, W + H], [W, W + H]],
    [[W + L, W], [W + L + W, W], [W + L + W, W + H], [W + L, W + H]],
    [[W, W + H], [W + L, W + H], [W + L, W + H + W], [W, W + H + W]],
    [[W, W + H + W], [W + L, W + H + W], [W + L, 2 * W + 2 * H], [W, 2 * W + 2 * H]],
  ]
  const foldLines = [
    [[W, W], [W + L, W]],
    [[W, W], [W, W + H]],
    [[W + L, W], [W + L, W + H]],
    [[W, W + H], [W + L, W + H]],
    [[W, W + H + W], [W + L, W + H + W]],
  ]
  const centroid = getCentroid(faces)
  const tabEdges = [
    [[W, 0], [W + L, 0]],
    [[W, W], [W, 0]],
    [[W + L, 0], [W + L, W]],
    [[0, W + H], [0, W]],
    [[0, W + H], [W, W + H]],
    [[W + L + W, W + H], [W + L, W + H]],
    [[W + L + W, W], [W + L + W, W + H]],
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "cuboid",
    name: "Cuboid",
    description: "Rectangular prism (2:1.5:1)",
    icon: "\u25AD",
    faces,
    foldLines,
    tabs,
  })
}

function buildTriangularPrism() {
  const s = 60
  const L = 80
  const th = r(s * Math.sqrt(3) / 2)
  const faces = [
    [[0, 0], [s, 0], [s, L], [0, L]],
    [[s, 0], [2 * s, 0], [2 * s, L], [s, L]],
    [[2 * s, 0], [3 * s, 0], [3 * s, L], [2 * s, L]],
    [[s, 0], [2 * s, 0], [1.5 * s, -th]],
    [[s, L], [2 * s, L], [1.5 * s, L + th]],
  ]
  const foldLines = [
    [[s, 0], [s, L]],
    [[2 * s, 0], [2 * s, L]],
    [[s, 0], [2 * s, 0]],
    [[s, L], [2 * s, L]],
  ]
  const centroid = getCentroid(faces)
  const tabEdges = [
    [[0, 0], [s, 0]],
    [[2 * s, 0], [3 * s, 0]],
    [[3 * s, L], [2 * s, L]],
    [[s, L], [0, L]],
    [[0, L], [0, 0]],
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "triangular-prism",
    name: "Triangular Prism",
    description: "2 triangles + 3 rectangles",
    icon: "\u25B7",
    faces,
    foldLines,
    tabs,
  })
}

function buildPentagonalPyramid() {
  const s = 50
  const th = 45
  const R = s / (2 * Math.sin(Math.PI / 5))
  const verts = []
  for (let i = 0; i < 5; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    verts.push([r(R * Math.cos(angle)), r(R * Math.sin(angle))])
  }
  const offset = 80
  const pent = verts.map(([x, y]) => [r(x + offset), r(y + offset)])
  const faces = [pent]
  const foldLines = []
  const triApexes = []
  for (let i = 0; i < 5; i++) {
    const a = pent[i]
    const b = pent[(i + 1) % 5]
    foldLines.push([a, b])
    const mx = (a[0] + b[0]) / 2
    const my = (a[1] + b[1]) / 2
    const n = computeOutwardNormal(a, b, [offset, offset])
    const apex = [r(mx + th * n[0]), r(my + th * n[1])]
    triApexes.push(apex)
    faces.push([a, b, apex])
  }
  const centroid = getCentroid(faces)
  const tabEdges = []
  for (let i = 0; i < 5; i++) {
    tabEdges.push([triApexes[i], pent[(i + 1) % 5]])
  }
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "pentagonal-pyramid",
    name: "Pentagonal Pyramid",
    description: "1 pentagon + 5 triangles",
    icon: "\u2B1F",
    faces,
    foldLines,
    tabs,
  })
}

// --- General builders for prisms and pyramids ---

function polygonOnEdge(n, s, baseLeftX, baseRightX, baseY, dir) {
  const R = s / (2 * Math.sin(Math.PI / n))
  const apothem = s / (2 * Math.tan(Math.PI / n))
  const cx = (baseLeftX + baseRightX) / 2
  const cy = baseY + dir * apothem
  const startAngle = Math.atan2(baseY - cy, baseRightX - cx)
  const step = dir < 0 ? (2 * Math.PI) / n : (-2 * Math.PI) / n
  const verts = []
  for (let i = 0; i < n; i++) {
    const a = startAngle + i * step
    verts.push([r(cx + R * Math.cos(a)), r(cy + R * Math.sin(a))])
  }
  return verts
}

function buildPrism(n, s, L, id, name, icon) {
  const mid = Math.floor(n / 2)
  const faces = []
  const foldLines = []
  for (let i = 0; i < n; i++) {
    faces.push([
      [i * s, 0],
      [(i + 1) * s, 0],
      [(i + 1) * s, L],
      [i * s, L],
    ])
  }
  for (let i = 1; i < n; i++) foldLines.push([[i * s, 0], [i * s, L]])
  const topPoly = polygonOnEdge(n, s, mid * s, (mid + 1) * s, 0, -1)
  faces.push(topPoly)
  foldLines.push([[mid * s, 0], [(mid + 1) * s, 0]])
  const botPoly = polygonOnEdge(n, s, mid * s, (mid + 1) * s, L, 1)
  faces.push(botPoly)
  foldLines.push([[(mid + 1) * s, L], [mid * s, L]])
  const centroid = getCentroid(faces)
  const tabEdges = []
  for (let i = 0; i < n; i++) {
    if (i !== mid) {
      tabEdges.push([[i * s, 0], [(i + 1) * s, 0]])
      tabEdges.push([[(i + 1) * s, L], [i * s, L]])
    }
  }
  tabEdges.push([[0, L], [0, 0]])
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({ id, name, description: "", icon, faces, foldLines, tabs })
}

function buildPyramid(n, s, th, offset, id, name, icon) {
  const R = s / (2 * Math.sin(Math.PI / n))
  const verts = []
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    verts.push([r(R * Math.cos(a) + offset), r(R * Math.sin(a) + offset)])
  }
  const faces = [verts]
  const foldLines = []
  const apexes = []
  for (let i = 0; i < n; i++) {
    const va = verts[i]
    const vb = verts[(i + 1) % n]
    foldLines.push([va, vb])
    const mx = (va[0] + vb[0]) / 2
    const my = (va[1] + vb[1]) / 2
    const norm = computeOutwardNormal(va, vb, [offset, offset])
    const apex = [r(mx + th * norm[0]), r(my + th * norm[1])]
    apexes.push(apex)
    faces.push([va, vb, apex])
  }
  const centroid = getCentroid(faces)
  const tabEdges = []
  for (let i = 0; i < n; i++) {
    tabEdges.push([apexes[i], verts[(i + 1) % n]])
  }
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({ id, name, description: "", icon, faces, foldLines, tabs })
}

function buildPentagonalPrism() {
  return buildPrism(5, 35, 55, "pentagonal-prism", "Pentagonal Prism", "\u2B23")
}

function buildHexagonalPrism() {
  return buildPrism(6, 28, 45, "hexagonal-prism", "Hexagonal Prism", "\u2B21")
}

function buildHexagonalPyramid() {
  return buildPyramid(6, 40, 40, 80, "hexagonal-pyramid", "Hexagonal Pyramid", "\u2B22")
}

function buildCone() {
  const rad = 25
  const h = 45
  const sl = Math.sqrt(rad * rad + h * h)
  const theta = (2 * Math.PI * rad) / sl
  const N = 60
  const cAngle = Math.PI / 2
  const apex = [0, 0]
  const arc = []
  for (let i = 0; i <= N; i++) {
    const a = cAngle - theta / 2 + (i * theta) / N
    arc.push([r(sl * Math.cos(a)), r(sl * Math.sin(a))])
  }
  const sectorFace = [apex, ...arc]
  const gap = 12
  const ccy = sl + gap + rad
  const circPts = []
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / N
    circPts.push([r(rad * Math.cos(a)), r(ccy + rad * Math.sin(a))])
  }
  const faces = [sectorFace, circPts]
  const foldLines = []
  const centroid = getCentroid(faces)
  const tabEdges = [
    [apex, arc[0]],
    ...Array.from({ length: 6 }, (_, i) => {
      const idx = Math.round((i * N) / 6)
      const idx2 = Math.round(((i + 1) * N) / 6) % N
      return [circPts[idx], circPts[idx2]]
    }),
  ]
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "cone",
    name: "Cone",
    description: "",
    icon: "\u25B3",
    faces,
    foldLines,
    tabs,
  })
}

function buildCylinder() {
  const rad = 20
  const h = 50
  const w = r(2 * Math.PI * rad)
  const N = 60
  const rectFace = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ]
  const gap = 10
  const c1y = -(gap + rad)
  const c2y = h + gap + rad
  const makeCircle = (cy) => {
    const pts = []
    for (let i = 0; i < N; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / N
      pts.push([r(w / 2 + rad * Math.cos(a)), r(cy + rad * Math.sin(a))])
    }
    return pts
  }
  const circ1 = makeCircle(c1y)
  const circ2 = makeCircle(c2y)
  const faces = [rectFace, circ1, circ2]
  const foldLines = []
  const centroid = getCentroid(faces)
  const tabEdges = [[rectFace[1], rectFace[2]]]
  for (const circ of [circ1, circ2]) {
    for (let i = 0; i < 6; i++) {
      const idx = Math.round((i * N) / 6)
      const idx2 = Math.round(((i + 1) * N) / 6) % N
      tabEdges.push([circ[idx], circ[idx2]])
    }
  }
  const tabs = tabEdges.map(([a, b]) => makeTab(a, b, centroid))
  return normalizeCoords({
    id: "cylinder",
    name: "Cylinder",
    description: "",
    icon: "\u25EF",
    faces,
    foldLines,
    tabs,
  })
}

export const shapes = [
  buildCube(),
  buildCuboid(),
  buildTetrahedron(),
  buildSquarePyramid(),
  buildPentagonalPyramid(),
  buildHexagonalPyramid(),
  buildTriangularPrism(),
  buildPentagonalPrism(),
  buildHexagonalPrism(),
  buildCone(),
  buildCylinder(),
]
