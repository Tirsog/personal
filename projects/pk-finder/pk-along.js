// Camina N metros por el eje de la carretera desde el hito PK inicial hacia el siguiente.
const road = require('./data/road-ca171.json');
const pks = require('./data/pk-ca171.json');

const R = 6371000;
const rad = d => d * Math.PI / 180;
// distancia equirectangular (sobrada precisión a esta escala)
function dist(a, b) {
  const x = rad(b[0] - a[0]) * Math.cos(rad((a[1] + b[1]) / 2));
  const y = rad(b[1] - a[1]);
  return Math.sqrt(x * x + y * y) * R;
}

// Todos los segmentos [p1, p2] de todas las paths de todas las features
const segs = [];
for (const f of road.features)
  for (const path of f.geometry.paths)
    for (let i = 0; i < path.length - 1; i++) segs.push([path[i], path[i + 1]]);

// Grafo: nodos = extremos redondeados, aristas = segmentos
const key = p => p[0].toFixed(6) + ',' + p[1].toFixed(6);
const adj = new Map();
function addEdge(a, b) {
  const ka = key(a), kb = key(b), d = dist(a, b);
  if (!adj.has(ka)) adj.set(ka, { p: a, e: [] });
  if (!adj.has(kb)) adj.set(kb, { p: b, e: [] });
  adj.get(ka).e.push({ to: kb, d });
  adj.get(kb).e.push({ to: ka, d });
}

// Proyecta un punto sobre el segmento más cercano; devuelve el punto proyectado
function project(pt) {
  let best = null;
  for (let s = 0; s < segs.length; s++) {
    const [a, b] = segs[s];
    const abx = b[0] - a[0], aby = b[1] - a[1];
    const t = Math.max(0, Math.min(1,
      ((pt[0] - a[0]) * abx + (pt[1] - a[1]) * aby) / (abx * abx + aby * aby || 1)));
    const proj = [a[0] + t * abx, a[1] + t * aby];
    const d = dist(pt, proj);
    if (!best || d < best.d) best = { d, proj, s, t };
  }
  return best;
}

const h15 = pks.features.find(f => f.attributes.VALOR === 15);
const h16 = pks.features.find(f => f.attributes.VALOR === 16);
const p15 = project([h15.geometry.x, h15.geometry.y]);
const p16 = project([h16.geometry.x, h16.geometry.y]);
console.log('hito 15 está a', p15.d.toFixed(1), 'm del eje; hito 16 a', p16.d.toFixed(1), 'm');

// Construye el grafo, partiendo los segmentos donde caen las proyecciones
for (let s = 0; s < segs.length; s++) {
  const [a, b] = segs[s];
  const cuts = [p15, p16].filter(p => p.s === s).sort((u, v) => u.t - v.t);
  let prev = a;
  for (const c of cuts) { addEdge(prev, c.proj); prev = c.proj; }
  addEdge(prev, b);
}

// Dijkstra de p15 a p16
const start = key(p15.proj), goal = key(p16.proj);
const distTo = new Map([[start, 0]]), prevOf = new Map();
const pq = [[0, start]];
while (pq.length) {
  pq.sort((a, b) => a[0] - b[0]);
  const [d, u] = pq.shift();
  if (u === goal) break;
  if (d > (distTo.get(u) ?? Infinity)) continue;
  for (const { to, d: w } of adj.get(u).e) {
    const nd = d + w;
    if (nd < (distTo.get(to) ?? Infinity)) {
      distTo.set(to, nd); prevOf.set(to, u); pq.push([nd, to]);
    }
  }
}
if (!distTo.has(goal)) { console.log('Sin camino entre hitos'); process.exit(1); }
console.log('distancia por el eje hito15→hito16:', distTo.get(goal).toFixed(0), 'm');

// Reconstruye el camino y anda 600 m (escalados a la distancia real entre hitos)
const path = [];
for (let u = goal; u; u = prevOf.get(u)) path.unshift(adj.get(u).p);
const target = 600 * (distTo.get(goal) / 1000); // corrige si el tramo no mide 1000 m exactos
let acc = 0;
for (let i = 0; i < path.length - 1; i++) {
  const d = dist(path[i], path[i + 1]);
  if (acc + d >= target) {
    const t = (target - acc) / d;
    const lon = path[i][0] + t * (path[i + 1][0] - path[i][0]);
    const lat = path[i][1] + t * (path[i + 1][1] - path[i][1]);
    console.log('PK 15+600 por el eje:', lat.toFixed(6) + ',', lon.toFixed(6));
    console.log('https://www.google.com/maps?q=' + lat.toFixed(6) + ',' + lon.toFixed(6));
    break;
  }
  acc += d;
}
