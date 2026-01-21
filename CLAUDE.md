# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website and blog built with Next.js 15, React 19, and CSS Modules. The site features markdown-based blog posts, a contact form with email integration, and project showcases. It's deployed on Netlify.

## Development Commands

**Package Manager:** Yarn (not npm)

```bash
# Install dependencies
yarn install

# Development server (runs on http://localhost:3000)
yarn dev

# Production build
yarn build

# Production server (must run build first)
yarn start

# Linting
yarn lint
```

Note: The build process automatically runs `next-sitemap` as a postbuild step to generate sitemap.xml and robots.txt.

## Development Environment

**Platform:** Windows with WSL2

**IMPORTANT:** When running commands or providing command suggestions:
- **Always advise the user to run commands in PowerShell**, not WSL bash
- File operations (removing node_modules, lock files, etc.) should be done in PowerShell using `Remove-Item` commands
- Only use the Bash tool for git operations and simple file reads
- Never use the Bash tool for package management or file operations that modify node_modules

### Common Issues

**Lockfile Conflicts:**
- This project uses **Yarn only** (never npm)
- If `package-lock.json` appears, it must be deleted immediately
- Mixing `package-lock.json` and `yarn.lock` causes Next.js to fail with: `Failed to patch lockfile` and `Cannot read properties of undefined (reading 'os')`

**Resolution (run in PowerShell):**
```powershell
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules
Remove-Item -Force yarn.lock
yarn install
```

## Architecture

### Blog System

The blog uses a static site generation approach with markdown files:

- **Blog posts** are stored as markdown files in the `/posts` directory
- Each post has frontmatter metadata (title, description, date, image)
- Posts are parsed using `gray-matter` and rendered with `marked`
- The home page (`pages/index.js`) reads all posts at build time via `getStaticProps`, sorts them by date (newest first), and passes them to the `ArticlesList` component
- Individual blog posts are rendered via dynamic routing at `/articles/[slug].js`
- Post slugs are derived from the markdown filename (e.g., `third-culture-kids.md` → `/articles/third-culture-kids`)

### Page Structure

- `pages/_app.js` wraps all pages with the shared `Layout` component
- `Layout` component (`components/layout.js`) provides the common structure: Navbar → main content → Footer
- Pages use Next.js static generation (`getStaticProps`, `getStaticPaths`) for optimal performance

### Contact Form Flow

The contact form has a complete flow from frontend to email delivery:

1. User fills form in `ContactForm` component (`components/contactForm/ContactForm.js`)
2. Frontend validates email format and handles submission state
3. Form submits to `/api/resend` API route
4. API route uses Resend service to send email to `hi@tirsog.es`
5. Success/error feedback is shown to the user

**Environment Variables Required:**
- `RESEND_API_KEY` - API key for Resend email service
- `SITE_URL` - Site URL for sitemap generation (defaults to https://tirsog.es)

Note: The codebase previously used SendGrid but has been migrated to Resend. Old SendGrid references may still exist.

### Styling Approach

- **CSS Modules** are used throughout (not Tailwind)
- Each component/page has its own `.module.css` file
- Global styles in `styles/globals.css`
- The project was migrated from Tailwind to CSS Modules

### Directory Structure

```
/components        # Reusable React components (Navbar, Footer, Layout, etc.)
  /santanderMap    # Santander map components (map visualization)
/pages            # Next.js pages and API routes
  /api            # API endpoints (resend.js for contact form)
  /articles       # Blog post pages ([slug].js for dynamic routing)
  /projects       # Individual project pages
    /bees         # UK Beekeeper's Calendar project
    /santander-map # Santander Area Map project with data files
/posts            # Markdown blog posts
/styles           # CSS Module files (*.module.css) and globals.css
/public           # Static assets (images, favicon, etc.)
  /projects/santander-map/data # Static JSON data for map (stations, railway lines, schools)
```

## Projects

### UK Beekeeper's Calendar (`/pages/projects/bees/`)

A seasonal guide for beekeepers in the UK showing monthly tasks, colony states, and bee forage.

- **Tech**: React with state management for tab switching
- **Data**: Static arrays in component (no external data)
- **Styling**: CSS Modules with color-coded tabs

### Santander Area Map (`/pages/projects/santander-map/`)

Interactive map tool for house hunting around Santander/El Astillero showing railway stations, train lines, and schools.

**Key Features:**
- Map centered on El Astillero (43.4045, -3.8156) at zoom 11.5
- 35 railway stations with 1km walkable radius circles (blue markers)
- 644 railway lines (red polylines)
- 179 schools classified by type with color-coded markers:
  - Cyan: Infantil (Preschool)
  - Green: Primaria/Secundaria (Combined schools)
  - Orange: Secundaria (High schools)
  - Purple: FP (Vocational training)
  - Gray: Ed. Especial (Special education)
  - Brown: Adultos (Adult education)
  - Light Gray: Otros (Other)
- Toggle controls for layers (railways, stations, individual school types)
- Default shows: Railways, Stations, Primary-Secondary schools, Secondary schools

**Technical Implementation:**
- **Mapping**: Leaflet with React-Leaflet (dynamically imported, SSR disabled)
- **Data Source**: Static JSON files from OpenStreetMap (fetched via Overpass API, saved 2026-01-16)
- **Data Files**:
  - `public/projects/santander-map/data/stations.json` (35 stations)
  - `public/projects/santander-map/data/railway-lines.json` (644 lines)
  - `public/projects/santander-map/data/schools.json` (179 schools with type classification)
- **School Classification**: Automated parsing of school names to determine type (Infantil, Primaria, Secundaria, FP, etc.)
- **Performance**: Instant loading (no API calls), client-side filtering
- **Validation**: Each school marker popup includes link to verify data on OpenStreetMap
- **Custom Icons**: SVG icons created programmatically with different colors per school type

**Important Notes:**
- Leaflet CSS loaded via `<link>` in Head (generates Next.js warning but works)
- Map component uses dynamic import to avoid SSR issues
- Scroll zoom speed reduced (wheelPxPerZoomLevel: 120, wheelDebounceTime: 100ms)
- All data is static - no fetch scripts in the repository (infrastructure rarely changes)

## Key Technical Details

- **Next.js Version:** 15.5.7 with React 19.2.0
- **Routing:** Pages Router (not App Router)
- **Data Fetching:** Static generation with `getStaticProps` and `getStaticPaths`
- **Markdown Processing:** `gray-matter` for frontmatter + `marked` for HTML conversion
- **Email Service:** Resend (replaced SendGrid)
- **Deployment:** Netlify (CNAME file required for custom domain)
- **Sitemap:** Automatically generated via `next-sitemap` after build

## Common Workflows

### Adding a New Blog Post

1. Create a new `.md` file in `/posts` directory
2. Add frontmatter at the top:
   ```yaml
   ---
   title: Post Title
   description: Post description for SEO
   date: Month DD, YYYY
   image: /images/posts/image-name.png
   ---
   ```
3. Write content in markdown below the frontmatter
4. The post will automatically appear on the homepage sorted by date
5. Accessible at `/articles/[filename-without-extension]`

### Modifying the Contact Form

The contact form component is at `components/contactForm/ContactForm.js` and sends to the API route at `pages/api/resend.js`. The API key must be set in `.env` as `RESEND_API_KEY`.

### Working with Styles

Components use CSS Modules imported as `styles` objects. Always check for existing module files before creating new ones. The naming convention is `ComponentName.module.css` located alongside or in a styles directory.
