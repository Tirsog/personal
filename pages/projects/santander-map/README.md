# Santander Area Map - House Hunting Tool

An interactive map visualization tool to help find houses near railway stations around Santander, Spain.

## Overview

This tool helps visualize potential house locations near El Astillero/Santander by showing:
- 35 railway stations and stops within 20km radius
- 1km walkable radius circles around each station (blue)
- 644 train lines from OpenStreetMap (red)
- 179 schools classified by type with color-coded markers
- Interactive popups with detailed information
- Filterable layers for customized views

## Technical Implementation

### Stack
- **Mapping Library**: Leaflet.js with React-Leaflet
- **Map Tiles**: OpenStreetMap
- **Data Source**: Overpass API (OpenStreetMap query service)
- **Styling**: CSS Modules
- **Framework**: Next.js with React

### Architecture
- Static JSON data loading (no API calls, instant loading)
- Dynamic imports for Leaflet (SSR disabled to avoid webpack issues)
- Client-side filtering and layer toggling
- Custom SVG icons generated programmatically for different school types
- Responsive design with scrollable control panel

## Data Sources

The map loads data from static JSON files instead of querying the Overpass API in real-time. This provides:
- ⚡ Instant loading (no API timeouts)
- 🔒 No rate limiting issues
- 📡 Works offline after first load
- 💾 Consistent data for all users

### Data Files

- **Stations**: `/public/projects/santander-map/data/stations.json` (35 stations)
- **Railway Lines**: `/public/projects/santander-map/data/railway-lines.json` (644 lines)
- **Schools**: `/public/projects/santander-map/data/schools.json` (179 schools)

**Last Updated**: 2026-01-16

### Updating the Data

Railway stations and schools rarely change. The data was fetched on 2026-01-16 and is stored as static JSON files.

If you need to update the data in the future, you can fetch fresh data from OpenStreetMap using [Overpass Turbo](https://overpass-turbo.eu/) with the queries listed above, then manually update the JSON files in `public/projects/santander-map/data/`.

### Original Overpass Queries

The data was fetched using these queries:

**Stations** (excludes tram/metro):
```
[out:json][timeout:90];
(
  node["railway"="station"]["station"!="light_rail"]["station"!="subway"](around:20000,43.4623,-3.8099);
  node["railway"="halt"]["usage"!="tram"]["train"="yes"](around:20000,43.4623,-3.8099);
);
out body;
```

**Railway Lines**:
```
[out:json][timeout:90];
way["railway"="rail"](around:20000,43.4623,-3.8099);
out geom;
```

**Schools**:
```
[out:json][timeout:90];
(
  node["amenity"="school"](around:20000,43.4623,-3.8099);
  way["amenity"="school"](around:20000,43.4623,-3.8099);
);
out center body;
```

### School Type Classification

Schools are automatically classified by parsing their names:
- **Infantil** (75): "Escuela Infantil", "Guardería"
- **Primary-Secondary** (38): "Colegio" (general schools offering both levels)
- **Secondary** (23): "Instituto", "IES", "Secundaria"
- **FP** (6): "Formación Profesional", "FP", "Centro FP", "Técnico Profesional"
- **Special** (6): "Educación Especial"
- **Adult** (4): "Personas Adultas", "CEPA"
- **Other** (27): Universities, training centers, sports schools, etc.

### Overpass API Endpoints
The tool uses multiple mirrors with automatic fallback:
1. https://overpass-api.de/api/interpreter (primary)
2. https://overpass.kumi.systems/api/interpreter (backup)
3. https://overpass.openstreetmap.ru/api/interpreter (backup)

You can test queries manually at: https://overpass-turbo.eu/

## Features

- 🗺️ Interactive map centered on El Astillero with adjustable zoom
- 🚉 Railway station markers with custom blue icons
- ⭕ 1km walkable circles around each station
- 🚂 Train lines visualization in red
- 🏫 School markers (179 schools) with green icons, classified by type
- 🎓 School filtering by type: Infantil, Primaria/Secundaria, Secundaria, FP, Ed. Especial, Adultos, Otros (default: only Primaria/Secundaria + Secundaria)
- 💬 Interactive popups with detailed information
- 📊 Live statistics showing filtered counts
- 🎛️ Layer toggles to show/hide railways, stations, and individual school types
- ⚡ Instant loading from static JSON files (no API delays)
- 🖱️ Smooth scroll zoom control

## Planned Features

- 🏠 Custom marker placement for potential houses
- 📏 Distance measurements
- 🔍 Search and filter stations/schools
- 💾 Save favorite locations
- 🏫 Filter schools by type (primary/secondary)

## Location

`/pages/projects/santander-map/`

## Live URL

https://tirsog.es/projects/santander-map

## Data Validation

All data is sourced from OpenStreetMap. To validate school information:

1. **Via Map**: Click any school marker on the map - the popup includes a "Verify on OpenStreetMap →" link
2. **Via Overpass Turbo**: Visit [overpass-turbo.eu](https://overpass-turbo.eu/) and run the schools query
3. **Via OSM Search**: Search for schools directly on [OpenStreetMap.org](https://www.openstreetmap.org/)

Each school's classification is based on keyword matching in the school name. If a school is misclassified, you can:
- Check the raw OSM data via the verification link
- Update the classification logic in `fetch-data.js`
- Re-run the fetch script to regenerate the data

## Known Issues

- School classification is automated based on name parsing - some schools may be miscategorized
- OpenStreetMap data quality varies by area
- Some schools may be missing if not properly tagged in OSM

## Alternative Data Approaches

If API timeouts persist, consider:
1. Pre-fetching data and storing as static JSON
2. Using smaller search radius
3. Caching results in browser localStorage
4. Fetching data in stages (stations first, then lines)
