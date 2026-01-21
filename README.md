## About this repository

This is a personal website and blog built with Next.js 15, React 19, and CSS Modules.

### Tech Stack

-   **Package Manager:** Yarn
-   **Styling:** CSS Modules (previously migrated from Tailwind CSS)
-   **Content:** Markdown blog posts with gray-matter and marked
-   **Email:** Resend API integration
-   **Mapping:** Leaflet and React-Leaflet for interactive maps
-   **Data Sources:** OpenStreetMap via Overpass API
-   **Deployment:** Netlify

### Projects

This repository includes several interactive projects. Each project has its own README with detailed documentation:

-   **UK Beekeeper's Calendar** (`/pages/projects/bees/`) - Seasonal guide for UK beekeepers with monthly tasks, colony states, and bee forage information
-   **Santander Area Map** (`/pages/projects/santander-map/`) - Interactive house hunting map centered on El Astillero showing:
    -   35 railway stations with 1km walkable radius circles
    -   644 railway lines from OpenStreetMap
    -   179 schools classified by type (Infantil, Primaria/Secundaria, Secundaria, FP, etc.)
    -   Color-coded markers and filterable layers
    -   Static JSON data (no API calls, instant loading)

See individual project folders for detailed documentation.

## How to run it?

1. yarn install
2. yarn dev

For local builds

1. yarn build
2. yarn start

## CNAME File

This file is necessary for the Netlify Domain configuration.
