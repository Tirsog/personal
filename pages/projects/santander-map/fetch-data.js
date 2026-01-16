/**
 * Utility script to fetch railway data from Overpass API and save as JSON files
 * Run this manually when you need to update the map data:
 * node pages/projects/santander-map/fetch-data.js
 */

const fs = require('fs');
const path = require('path');

const SANTANDER_CENTER = [43.4623, -3.8099];
const SEARCH_RADIUS_KM = 20;

const buildStationsQuery = () => {
  const [lat, lon] = SANTANDER_CENTER;
  const radiusMeters = SEARCH_RADIUS_KM * 1000;

  return `
    [out:json][timeout:90];
    (
      node["railway"="station"]["station"!="light_rail"]["station"!="subway"](around:${radiusMeters},${lat},${lon});
      node["railway"="halt"]["usage"!="tram"]["train"="yes"](around:${radiusMeters},${lat},${lon});
    );
    out body;
  `;
};

const buildRailwayLinesQuery = () => {
  const [lat, lon] = SANTANDER_CENTER;
  const radiusMeters = SEARCH_RADIUS_KM * 1000;

  return `
    [out:json][timeout:90];
    way["railway"="rail"](around:${radiusMeters},${lat},${lon});
    out geom;
  `;
};

const buildSchoolsQuery = () => {
  const [lat, lon] = SANTANDER_CENTER;
  const radiusMeters = SEARCH_RADIUS_KM * 1000;

  return `
    [out:json][timeout:90];
    (
      node["amenity"="school"](around:${radiusMeters},${lat},${lon});
      way["amenity"="school"](around:${radiusMeters},${lat},${lon});
    );
    out center body;
  `;
};

const fetchOverpassData = async (query, retryCount = 0) => {
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter',
  ];

  const maxRetries = endpoints.length;
  const endpoint = endpoints[retryCount % endpoints.length];

  try {
    console.log(`Fetching from ${endpoint}...`);
    const response = await fetch(endpoint, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Attempt ${retryCount + 1} failed:`, error.message);

    if (retryCount < maxRetries - 1) {
      console.log('Retrying with different endpoint...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchOverpassData(query, retryCount + 1);
    }

    throw error;
  }
};

const processStations = (data) => {
  const stationsMap = new Map();
  const allStations = [];

  data.elements.forEach((element) => {
    if (element.type === 'node' && element.tags && element.tags.railway && element.lat && element.lon) {
      const tramTag = element.tags.tram;
      const usage = element.tags.usage;

      if (tramTag === 'yes' || usage === 'tram' || usage === 'metro') {
        return;
      }

      allStations.push({
        id: element.id,
        lat: element.lat,
        lon: element.lon,
        name: element.tags.name || 'Unnamed Station',
        type: element.tags.railway,
        operator: element.tags.operator || 'Unknown',
      });
    }
  });

  // Deduplicate by name
  allStations.forEach((station) => {
    let key;
    if (station.name !== 'Unnamed Station') {
      key = station.name.toLowerCase().trim();
    } else {
      key = `unnamed_${station.lat.toFixed(4)}_${station.lon.toFixed(4)}`;
    }

    if (!stationsMap.has(key)) {
      stationsMap.set(key, station);
    } else {
      const existing = stationsMap.get(key);
      if (station.type === 'station' && existing.type !== 'station') {
        stationsMap.set(key, station);
      }
    }
  });

  return Array.from(stationsMap.values());
};

const processRailwayLines = (data) => {
  const lines = [];

  data.elements.forEach((element) => {
    if (element.type === 'way' && element.geometry) {
      const coordinates = element.geometry.map((point) => [point.lat, point.lon]);

      if (coordinates.length > 1) {
        lines.push({
          id: element.id,
          coordinates,
          name: element.tags?.name || 'Railway Line',
          usage: element.tags?.usage || 'main',
        });
      }
    }
  });

  return lines;
};

const classifySchoolType = (name) => {
  const nameLower = name.toLowerCase();

  // Infantil (Preschool)
  if (nameLower.includes('infantil') || nameLower.includes('guardería')) {
    return 'infantil';
  }

  // Primaria (Primary)
  if (nameLower.includes('primaria') || nameLower.includes('ceip')) {
    return 'primary';
  }

  // Secundaria (Secondary/High School)
  if (nameLower.includes('secundaria') ||
      nameLower.includes('instituto') ||
      nameLower.includes('ies ') ||
      nameLower.startsWith('ies')) {
    return 'secondary';
  }

  // FP (Vocational Training)
  if (nameLower.includes('formación profesional') ||
      nameLower.includes(' fp ') ||
      nameLower.includes('centro fp') ||
      nameLower.includes('técnico profesional') ||
      nameLower.includes('cfgs') ||
      nameLower.includes('cfgm')) {
    return 'fp';
  }

  // Special Education
  if (nameLower.includes('educación especial')) {
    return 'special';
  }

  // Adult Education
  if (nameLower.includes('personas adultas') || nameLower.includes('cepa')) {
    return 'adult';
  }

  // University
  if (nameLower.includes('universidad') || nameLower.includes('university')) {
    return 'university';
  }

  // Generic Colegio - likely primary/secondary combined
  if (nameLower.includes('colegio')) {
    return 'primary-secondary';
  }

  return 'other';
};

const processSchools = (data) => {
  const schoolsMap = new Map();

  data.elements.forEach((element) => {
    if (element.tags && element.tags.amenity === 'school') {
      let lat, lon;

      if (element.type === 'node') {
        lat = element.lat;
        lon = element.lon;
      } else if (element.type === 'way' && element.center) {
        lat = element.center.lat;
        lon = element.center.lon;
      } else {
        return; // Skip if no coordinates
      }

      const name = element.tags.name || 'Unnamed School';
      const school = {
        id: element.id,
        lat,
        lon,
        name,
        type: classifySchoolType(name),
      };

      // Deduplicate by name
      const key = school.name.toLowerCase().trim();
      if (!schoolsMap.has(key)) {
        schoolsMap.set(key, school);
      }
    }
  });

  return Array.from(schoolsMap.values());
};

async function main() {
  try {
    console.log('Fetching railway stations...');
    const stationsData = await fetchOverpassData(buildStationsQuery());
    const stations = processStations(stationsData);
    console.log(`✓ Found ${stations.length} stations`);

    console.log('\nFetching railway lines...');
    const linesData = await fetchOverpassData(buildRailwayLinesQuery());
    const lines = processRailwayLines(linesData);
    console.log(`✓ Found ${lines.length} railway lines`);

    console.log('\nFetching schools...');
    const schoolsData = await fetchOverpassData(buildSchoolsQuery());
    const schools = processSchools(schoolsData);
    console.log(`✓ Found ${schools.length} schools`);

    // Save to data directory (source)
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const stationsPath = path.join(dataDir, 'stations.json');
    const linesPath = path.join(dataDir, 'railway-lines.json');
    const schoolsPath = path.join(dataDir, 'schools.json');

    fs.writeFileSync(stationsPath, JSON.stringify(stations, null, 2));
    fs.writeFileSync(linesPath, JSON.stringify(lines, null, 2));
    fs.writeFileSync(schoolsPath, JSON.stringify(schools, null, 2));

    // Also copy to public directory for Next.js to serve
    const publicDir = path.join(__dirname, '../../../public/projects/santander-map/data');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const publicStationsPath = path.join(publicDir, 'stations.json');
    const publicLinesPath = path.join(publicDir, 'railway-lines.json');
    const publicSchoolsPath = path.join(publicDir, 'schools.json');

    fs.writeFileSync(publicStationsPath, JSON.stringify(stations, null, 2));
    fs.writeFileSync(publicLinesPath, JSON.stringify(lines, null, 2));
    fs.writeFileSync(publicSchoolsPath, JSON.stringify(schools, null, 2));

    console.log('\n✓ Data saved successfully!');
    console.log(`  - Stations: ${stationsPath}`);
    console.log(`  - Railway lines: ${linesPath}`);
    console.log(`  - Schools: ${schoolsPath}`);
    console.log(`\n✓ Also copied to public directory for web serving`);
    console.log(`  - ${publicStationsPath}`);
    console.log(`  - ${publicLinesPath}`);
    console.log(`  - ${publicSchoolsPath}`);
    console.log(`\nLast updated: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }
}

main();
