import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styles from './SantanderMap.module.css';

// Fix for default marker icons in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icon for railway stations
const stationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
      <circle cx="12" cy="12" r="10" fill="#2563eb" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

// Custom icons for different school types
const createSchoolIcon = (color) => new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M12 6 L16 8 L16 11 L12 13 L8 11 L8 8 Z M12 13 L12 15" stroke="white" stroke-width="1.5" fill="white" stroke-linejoin="round"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const schoolIcons = {
  infantil: createSchoolIcon('#06b6d4'),        // Cyan
  'primary-secondary': createSchoolIcon('#059669'), // Green
  secondary: createSchoolIcon('#ea580c'),        // Orange
  fp: createSchoolIcon('#9333ea'),               // Purple
  special: createSchoolIcon('#6b7280'),          // Gray
  adult: createSchoolIcon('#78350f'),            // Brown
  other: createSchoolIcon('#94a3b8'),            // Light gray
};

const EL_ASTILLERO_CENTER = [43.4045, -3.8156]; // El Astillero coordinates
const SEARCH_RADIUS_KM = 20;
const WALKABLE_RADIUS_M = 1000; // 1km walkable radius

export default function SantanderMap() {
  const [stations, setStations] = useState([]);
  const [railwayLines, setRailwayLines] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);
  const [showRailways, setShowRailways] = useState(true);
  const [showCircles, setShowCircles] = useState(true);
  const [controlsCollapsed, setControlsCollapsed] = useState(true);

  // School type filters - default only primary and secondary
  const [schoolFilters, setSchoolFilters] = useState({
    infantil: false,
    'primary-secondary': true,
    secondary: true,
    fp: false,
    special: false,
    adult: false,
    other: false,
  });

  useEffect(() => {
    loadMapData();
  }, []);

  const loadMapData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load stations from JSON
      setLoadingStep('Loading railway stations...');
      const stationsResponse = await fetch('/projects/santander-map/data/stations.json');
      if (!stationsResponse.ok) {
        throw new Error('Failed to load stations data');
      }
      const stationsData = await stationsResponse.json();
      setStations(stationsData);
      console.log(`Loaded ${stationsData.length} stations`);

      // Load railway lines from JSON
      setLoadingStep('Loading railway lines...');
      const linesResponse = await fetch('/projects/santander-map/data/railway-lines.json');
      if (!linesResponse.ok) {
        throw new Error('Failed to load railway lines data');
      }
      const linesData = await linesResponse.json();
      setRailwayLines(linesData);
      console.log(`Loaded ${linesData.length} railway lines`);

      // Load schools from JSON
      setLoadingStep('Loading schools...');
      const schoolsResponse = await fetch('/projects/santander-map/data/schools.json');
      if (!schoolsResponse.ok) {
        throw new Error('Failed to load schools data');
      }
      const schoolsData = await schoolsResponse.json();
      setSchools(schoolsData);
      console.log(`Loaded ${schoolsData.length} schools`);

      setLoading(false);
      setLoadingStep('');
    } catch (err) {
      console.error('Error loading map data:', err);
      setError(err.message);
      setLoading(false);
      setLoadingStep('');
    }
  };

  const toggleSchoolFilter = (type) => {
    setSchoolFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const filteredSchools = schools.filter(school => schoolFilters[school.type]);


  if (loading) {
    return (
      <div className={styles.statusMessage}>
        <div>Loading map data...</div>
        {loadingStep && (
          <div style={{ fontSize: '0.875rem', marginTop: '0.75rem', color: '#3b82f6', fontWeight: '500' }}>
            {loadingStep}
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>{error}</p>
        <button onClick={loadMapData}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.mapContainer}>
      {/* Layer Controls */}
      <div className={styles.controls}>
        <button className={styles.controlsHeader} onClick={() => setControlsCollapsed(c => !c)}>
          <span>Layers</span>
          <span className={styles.controlsChevron}>{controlsCollapsed ? '▶' : '▼'}</span>
        </button>

        {!controlsCollapsed && (
          <>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={showRailways}
                onChange={(e) => setShowRailways(e.target.checked)}
                className={styles.controlCheckbox}
              />
              <span>Railway Lines</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={showCircles}
                onChange={(e) => setShowCircles(e.target.checked)}
                className={styles.controlCheckbox}
              />
              <span>Stations & Circles</span>
            </label>

            <div className={styles.controlDivider}></div>
            <div className={styles.controlGroupLabel}>Schools</div>

            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.infantil}
                onChange={() => toggleSchoolFilter('infantil')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#06b6d4' }}>●</span> Infantil (75)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters['primary-secondary']}
                onChange={() => toggleSchoolFilter('primary-secondary')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#059669' }}>●</span> Primaria/Sec. (38)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.secondary}
                onChange={() => toggleSchoolFilter('secondary')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#ea580c' }}>●</span> Secundaria (23)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.fp}
                onChange={() => toggleSchoolFilter('fp')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#9333ea' }}>●</span> FP (6)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.special}
                onChange={() => toggleSchoolFilter('special')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#6b7280' }}>●</span> Ed. Especial (6)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.adult}
                onChange={() => toggleSchoolFilter('adult')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#78350f' }}>●</span> Adultos (4)</span>
            </label>
            <label className={styles.controlLabel}>
              <input
                type="checkbox"
                checked={schoolFilters.other}
                onChange={() => toggleSchoolFilter('other')}
                className={styles.controlCheckbox}
              />
              <span><span style={{ color: '#94a3b8' }}>●</span> Otros (27)</span>
            </label>
          </>
        )}
      </div>

      <MapContainer
        center={EL_ASTILLERO_CENTER}
        zoom={11.5}
        className={styles.map}
        scrollWheelZoom={{
          wheelDebounceTime: 100,
          wheelPxPerZoomLevel: 120
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Railway lines */}
        {showRailways && railwayLines.map((line) => (
          <Polyline
            key={`line-${line.id}`}
            positions={line.coordinates}
            color="#dc2626"
            weight={3}
            opacity={0.7}
          >
            <Popup>{line.name}</Popup>
          </Polyline>
        ))}

        {/* Stations with circles and markers */}
        {showCircles && stations.map((station) => (
          <div key={`station-${station.id}`}>
            <Circle
              center={[station.lat, station.lon]}
              radius={WALKABLE_RADIUS_M}
              pathOptions={{
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                weight: 2,
              }}
            />
            <Marker position={[station.lat, station.lon]} icon={stationIcon}>
              <Popup>
                <div className={styles.popup}>
                  <h3>{station.name}</h3>
                  <p><strong>Type:</strong> {station.type}</p>
                  <p><strong>Operator:</strong> {station.operator}</p>
                  <p className={styles.popupRadius}>1km walkable radius</p>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}

        {/* Schools */}
        {filteredSchools.map((school) => (
          <Marker
            key={`school-${school.id}`}
            position={[school.lat, school.lon]}
            icon={schoolIcons[school.type] || schoolIcons.other}
          >
            <Popup>
              <div className={styles.popup}>
                <h3>{school.name}</h3>
                <p><strong>Type:</strong> {school.type}</p>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(school.name)}#map=19/${school.lat}/${school.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.85rem', color: '#2563eb', marginTop: '0.5rem', display: 'inline-block' }}
                >
                  Verify on OpenStreetMap →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className={styles.stats}>
        <p>Showing {stations.length} stations, {railwayLines.length} railway lines, and {filteredSchools.length} of {schools.length} schools</p>
      </div>
    </div>
  );
}
