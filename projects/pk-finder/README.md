# PK Finder — Localizador de puntos kilométricos

> **Estado:** investigación validada, sin desarrollar. NO publicado — esta carpeta está fuera de `pages/`, así que Next.js no la sirve como ruta.
>
> Documentado el 2026-08-24 a partir de la petición de Luis Burgada.

## Origen

Luis (trabaja en una gran empresa, presumiblemente conservación/mantenimiento de carreteras) pidió por WhatsApp:

> "Quiero una cosa con chati o similar. Quiero decirle: Carretera CA-171, pk 15+600 y que me dé un enlace de Google Maps del punto. Y quiero hacer una especie de programa porque es una cosa repetitiva, lo voy a usar recurrentemente."

También mencionó interés en **reporte y seguimiento de incidencias vía app**.

## Qué es «pk 15+600»

PK = punto kilométrico. Notación estándar de ingeniería de carreteras: **kilómetro 15 más 600 metros** desde el origen de la vía (15,6 km). Se lee "pk quince más seiscientos". El origen (pk 0+000) lo fija el titular de la vía, y los hitos son los mojones físicos del arcén — por eso no se puede calcular sin datos oficiales: los PKs no coinciden exactamente con la distancia geométrica (rectificaciones de trazado, orígenes históricos).

## Fuentes de datos investigadas

### ✅ Gobierno de Cantabria — LA fuente (verificada, funciona)

Servicio ArcGIS REST público, sin API key, consultable al vuelo:

```
https://geoservicios.cantabria.es/inspire/rest/services/Infraestructuras/MapServer
```

| Capa | id | Campos clave |
|---|---|---|
| **Puntos kilométricos de la Red Viaria** (hitos) | `1` | `CODIGOC` (ej. `CA-171`), `VALOR` (km, double) |
| **Red Viaria** (eje de la carretera, polilíneas) | `2` | `CODIGOC` |

Consulta de ejemplo (todos los hitos de la CA-171, en WGS84):

```
…/MapServer/1/query?where=CODIGOC='CA-171'&outFields=CODIGOC,VALOR&returnGeometry=true&outSR=4326&f=json
```

- La CA-171 tiene sus 21 hitos (1–21) con coordenadas.
- Los hitos caen a **0,0 m del eje** de la capa Red Viaria — ambas capas son coherentes entre sí.
- Solo cubre la **red autonómica de Cantabria**. Las estatales (N-611, A-67…) no están.

### ✅ IGN / CNIG — cobertura nacional (para estatales o fuera de Cantabria)

Producto **Redes de Transporte** del Centro de Descargas del CNIG:
<https://centrodedescargas.cnig.es/CentroDescargas/redes-transporte>

- Gratuito (CC-BY), por provincias, GeoPackage/Shapefile/CSV.
- **Incluye puntos kilométricos** de toda la red: estatal, autonómica y provincial.
- Pega: descarga estática, no es API consultable.
- Ojo: el servicio WFS INSPIRE (`https://servicios.idee.es/wfs-inspire/transportes`) **NO** expone los PKs como capa — solo vienen en el producto descargable.

### ❌ OpenStreetMap

La CA-171 (Reinosa–Corconte) está completa con geometría (ways con `ref=CA-171`), pero **sin hitos kilométricos mapeados** (0 nodos `highway=milestone` cerca de la vía). Sirve como geometría alternativa, no como fuente de PKs.

### Otros

- Visor de Cantabria: <https://mapas.cantabria.es> · Estado de carreteras: <https://www.carreterasdecantabria.es/estado> (solo incidencias de tráfico, sin datos técnicos accesibles).
- Servicios WMS/WFS de Cantabria: <https://www.territoriodecantabria.es/cartografia-sig/servicios-wms-iig> (EPSG:25830 nativo; el REST admite `outSR=4326`).

## Caso validado: CA-171, pk 15+600

1. **Primer intento — interpolación en línea recta** entre hito 15 y 16: `43.027959, -3.952653`. **FALLÓ**: el punto cayó en un prado ~150 m al sur de la carretera, porque la vía curva hacia el puente del embalse del Ebro (zona La Población / Corconte).
2. **Método correcto — recorrer el eje**: proyectar los hitos 15 y 16 sobre la polilínea de la capa Red Viaria, camino más corto por el grafo de segmentos (Dijkstra), y caminar 600 m por él (escalados: la distancia real hito→hito por el eje es 997 m, así que se camina `600 × 997/1000`).

   **Resultado: `43.028639, -3.953189`** → <https://www.google.com/maps?q=43.028639,-3.953189> — sobre la carretera. ✅

El script validado está en [`pk-along.js`](./pk-along.js) (Node, sin dependencias). Los datos de la consulta, en [`data/`](./data/) — son solo constancia/desarrollo offline; la web en producción consultaría el servicio en vivo.

### Notas de implementación web (verificado 2026-08-24)

- **CORS: OK.** El servicio de Cantabria acepta peticiones cross-origin desde `tirsog.es` (responde `access-control-allow-origin` con el origen). La página puede hacer `fetch()` directo al servicio, **sin backend ni proxy**.
- El algoritmo de `pk-along.js` es JS sin dependencias: se porta al navegador cambiando los `require()` de ficheros por `fetch()` a las capas 1 y 2.
- La geometría completa de la CA-171 pesa 66 KB. Optimización: pedir solo el tramo relevante con filtro espacial (`geometry=envelope` alrededor de los dos hitos) → pocos KB por consulta.

### Algoritmo de referencia

1. Pedir hitos `floor(pk)` y `floor(pk)+1` de la carretera (capa 1).
2. Pedir geometría de la carretera (capa 2).
3. Proyectar ambos hitos sobre el segmento más cercano del eje.
4. Construir grafo de segmentos (nodos = extremos, cortados por las proyecciones) y hallar el camino hito→hito con Dijkstra.
5. Caminar `metros × (distancia_real_entre_hitos / 1000)` desde el hito inferior.
6. Enlace: `https://www.google.com/maps?q={lat},{lon}`.

Precisión resultante: metros (la del hito oficial + interpolación sobre el eje).

## Ideas de herramientas (roadmap comercial)

1. **Localizador de PKs** (esta herramienta). Carretera + PK → mapa + enlace Google Maps. Extensión natural: modo lote (pegar columna de Excel con 30 PKs → mapa con todos / export KML). Web estática, sin backend: la consulta al servicio de Cantabria se hace desde el navegador (~1 KB, milisegundos).
2. **GPS → PK inverso.** Desde el móvil a pie de carretera, un botón dice "estás en CA-171, pk 15+600" (hito más cercano a la posición + distancia por el eje). Mismo dato oficial usado al revés. Pieza clave para la app de incidencias, y regalo/demo comercial perfecto.
3. **App de reporte y seguimiento de incidencias** (lo que mencionó Luis — el proyecto grande):
   - *Campo:* foto + GPS (auto-convertido a carretera/PK con la pieza 2) + tipo (bache, desprendimiento, biondas, señalización…) + prioridad. PWA en el móvil, sin tiendas de apps.
   - *Oficina:* panel con incidencias en mapa, filtros por carretera/estado/tipo, ciclo de vida (reportada → asignada → resuelta), histórico por carretera.
   - *Salida:* informe PDF/Excel por periodo para justificar trabajos.
   - Sustituye WhatsApp + Excel como sistema de gestión → valor recurrente, cuota mensual.
4. **Planificador de rutas de inspección.** Ordenar incidencias abiertas por carretera y PK creciente para recorrerlas en un solo viaje.
5. **Generador de partes / órdenes de trabajo.** De incidencia a PDF con mapa, foto, PK, fecha y descripción.

**Secuencia comercial:** entregar (1) rápido y barato para ganar confianza → regalar (2) como demo dentro del mismo entregable → usar eso para abrir la conversación de (3), donde está el valor recurrente.

## Estimación y precios (hablado 2026-08-24)

- Horas reales con IA: **5–10 h** (prototipo 1–2 h; casos límite 2–4 h; validación con casos reales de Luis 1–2 h; pulido/hosting/docs 1–2 h). Integrar estatales vía IGN: +2–4 h.
- Tarifa freelance España a gran empresa: 60–75 €/h como suelo.
- **Recomendado: precio cerrado 800–1.500 €** (parte baja solo autonómicas de Cantabria; alta con estatales vía IGN). Si acaba siendo favor informal: 300–500 €.
- Cláusulas: **mantenimiento aparte** (el servicio de Cantabria no tiene SLA; opcional cuota 100–200 €/año) y **ampliaciones aparte** (presupuestar cada "¿y no podrías añadir…?").
- La app de incidencias (3) es proyecto de varios miles + cuota mensual — presupuesto separado tras reunión.

## Borrador de email a Luis (pendiente de enviar)

> **Asunto: Localizador de PKs — hecho, funciona (y alguna idea más)**
>
> Luis,
>
> Le he estado dando una vuelta a lo que me comentaste del "chati" para los puntos kilométricos, y te traigo mejores noticias de las que esperaba: no hace falta un chat con IA, hace falta algo más simple y más fiable — y ya tengo la prueba de que funciona.
>
> El problema real era saber dónde está físicamente cada hito kilométrico. Resulta que el Gobierno de Cantabria publica esa capa oficialmente (la posición real de cada mojón de la red autonómica), y he montado la consulta con tu ejemplo exacto:
>
> **CA-171, pk 15+600** → https://www.google.com/maps?q=43.028639,-3.953189
>
> Compruébalo tú que conoces la zona: cae sobre la carretera pasada La Población, yendo hacia el puente de Corconte. La precisión es la del hito oficial, no una estimación.
>
> Convertir esto en herramienta es directo: una página web (te vale desde el móvil, sin instalar nada) donde escribes carretera y PK y te devuelve el punto en un mapa con el botón de copiar el enlace de Google Maps. Para la red autonómica de Cantabria sale rápido; si también necesitáis carreteras estatales (N-611, A-67...) hay que integrar otra fuente de datos del IGN, que también es oficial y gratuita — dime qué carreteras usáis y ajusto el alcance.
>
> Sobre lo que me comentaste de reporte y seguimiento de incidencias vía app: ahí sí que hay proyecto interesante, y encaja de lleno con esto. La pieza clave sería la inversa de lo anterior: estás en el arcén, le das a un botón, y el GPS del móvil te dice "CA-171, pk 15+600" — más foto, categoría de incidencia y estado. Eso ya es una herramienta de trabajo para toda la brigada, no un truco. Si te interesa, lo hablamos con calma porque el alcance es otro.
>
> Te preparo presupuesto cerrado del localizador esta semana. ¿Te llamo el jueves y me cuentas qué carreteras cubrís y cómo os llegan hoy las incidencias?
>
> Un abrazo,
> Tirso

*(Nota: el enlace del email ya está actualizado al punto corregido por el eje, no al de la línea recta.)*

## Viabilidad como negocio (análisis 2026-08-24)

**Veredicto: no como startup-cohete; sí como negocio rentable de nicho, condicionado a validación.**

A favor:
- Dolor real e infradigitalizado: en conservación de carreteras (y diputaciones, forestales, grúas, emergencias) el PK es el idioma diario y muchas brigadas funcionan con WhatsApp + Excel + partes en Word. Que Luis lo pida a título personal es síntoma de que su empresa no le da herramienta.
- Coste de construir ridículo (datos oficiales gratis, sin backend) → márgenes excelentes.
- Entrada comercial resuelta: un usuario real dentro de una gran empresa que lo ha pedido él.

En contra:
- **El localizador es una feature, no un negocio** — se replica en días. Lo defendible es la relación con clientes y conocer el flujo (partes, justificación ante la administración, certificaciones mensuales).
- **Incumbentes**: las grandes conservadoras suelen tener Esri (Survey123/Field Maps hace app de incidencias out-of-the-box) y los contratos estatales obligan a reportar en sistemas del Ministerio. El hueco: contratos autonómicos/provinciales y empresas medianas donde nadie configura Esri.
- **Mercado finito y venta lenta**: negocio de 10–30 clientes a 100–500 €/mes por contrato, no SaaS masivo. Ciclos de venta de meses.
- Dependencia de datos de terceros sin SLA (mitigable cacheando).

Secuencia de validación: cobrar el localizador a la empresa de Luis (si una gran empresa no paga ~1.000 €, esa es la respuesta de mercado) → piloto de incidencias para aprender el flujo real → solo si se usa a diario durante meses, productizar y buscar los siguientes 5 contratos por referencia.

**Pregunta clave para la llamada del jueves** (decide todo sin escribir código): ¿cómo reportan hoy las incidencias, y qué sistema les obliga a usar su cliente/administración? "WhatsApp y Excel" = hay negocio. "Survey123 corporativo" = quedarse en el localizador y no invertir más.

### ¿Empresa de múltiples herramientas de este tipo?

Viable como **estudio de herramientas verticales**, con una condición: que compartan comprador y canal. El modelo "muchas mini-herramientas para el mismo cliente" (conservación/obra civil: localizador, GPS→PK, incidencias, partes, rutas…) compone — cada herramienta nueva se vende a los clientes ya ganados y las referencias se acumulan. El modelo "20 herramientas para 20 sectores distintos" no compone: 20 canales de venta, 20 mercados que aprender, mantenimiento multiplicado. Con IA el coste de construir colapsa, así que el cuello de botella ya no es programar: es distribución, soporte y mantenimiento. El roadmap de este README ya tiene la forma correcta (suite vertical para un mismo comprador).

## Próximos pasos

- [ ] Enviar email a Luis / llamada: qué carreteras cubre su empresa y cómo gestionan incidencias hoy.
- [ ] Decidir alcance: ¿solo red autonómica de Cantabria o también estatales (IGN)?
- [ ] Prototipo web: formulario carretera+PK → mapa Leaflet + enlace (reutilizar infraestructura del mapa de Santander: `pages/projects/santander-map/`).
- [ ] Opcional para la llamada: mini-demo del GPS→PK inverso.
- [ ] Presupuesto cerrado por escrito con cláusulas de mantenimiento y ampliaciones.
