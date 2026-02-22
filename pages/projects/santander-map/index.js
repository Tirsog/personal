import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import styles from './SantanderMapPage.module.css';

const MapComponent = dynamic(() => import('../../../components/santanderMap/SantanderMap'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading map...</div>
});

export default function SantanderMap() {
  return (
    <>
      <Head>
        <title>Santander Area Map - House Hunting Tool</title>
        <meta name="description" content="Interactive map showing railway stations and train lines around Santander" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>

      <div className={styles.container}>
        {/* Back Button */}
        <Link href="/projects" className={styles.backButton}>
          ← Back to Projects
        </Link>

        <div className={styles.mapWrapper}>
          <MapComponent />
        </div>

        <div className={styles.info}>
          <h2>About This Tool</h2>
          <p>
            This interactive map helps visualize potential house locations near railway stations
            around Santander (20km radius). Each station has a 1km circle showing walkable distance.
            Schools are also displayed and can be filtered by type (Infantil, Primaria, Secundaria, FP, etc.).
          </p>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Data sourced from OpenStreetMap. Showing 35 train stations (tram stops excluded), 644 railway lines, and 179 schools classified by type.
            Click any school marker to see details and verify data on OpenStreetMap.
          </p>
          <div className={styles.legend}>
            <h3>Map Legend</h3>
            <ul>
              <li><span className={styles.stationMarker}>🚉</span> Railway stations and stops</li>
              <li><span className={styles.circleMarker}>○</span> 1km walkable radius</li>
              <li><span className={styles.railLine}>─</span> Train lines</li>
            </ul>
            <h4 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Schools by Type</h4>
            <ul>
              <li><span className={styles.schoolMarkerCyan}>●</span> Infantil (Preschool)</li>
              <li><span className={styles.schoolMarkerGreen}>●</span> Primaria/Secundaria (Primary/Secondary)</li>
              <li><span className={styles.schoolMarkerOrange}>●</span> Secundaria (High School)</li>
              <li><span className={styles.schoolMarkerPurple}>●</span> FP (Vocational)</li>
              <li><span className={styles.schoolMarkerGray}>●</span> Ed. Especial (Special Ed)</li>
              <li><span className={styles.schoolMarkerBrown}>●</span> Adultos (Adult Ed)</li>
              <li><span className={styles.schoolMarkerLightGray}>●</span> Otros (Other)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
