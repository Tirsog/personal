## About this repository

This is a personal website and blog built with Next.js 15, React 19, and CSS Modules.

### Tech Stack

-   **Framework:** Next.js 15.5.4 (Pages Router)
-   **React:** 19.2.0
-   **Package Manager:** Yarn
-   **Styling:** CSS Modules (previously migrated from Tailwind CSS)
-   **Content:** Markdown blog posts with gray-matter and marked
-   **Email:** SendGrid API integration
-   **Deployment:** Netlify

### Project Structure

-   `pages/` - Next.js pages (index, articles, contact, bees)
-   `components/` - Reusable React components
-   `styles/` - CSS Modules for component styling
-   `posts/` - Markdown blog posts
-   `public/` - Static assets (images, sitemap, robots.txt)

### Development

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## How to run it?

1. yarn install
2. yarn dev

For local builds

1. yarn build
2. yarn start

## CNAME File

This file is necessary for the Netlify Domain configuration.

## Pending Work

_General_

-   [x] Created layout component and wrapped the entire \_app
-   [x] Assets folder (And find Licensed images and icons)
-   [x] Customized 404 Page. Redirect useEffect.
-   [ ] Customized Head for each page.
-   [ ] Test Error in 404.tsx line 10 in production.
-   [ ] Generate Sitemap at build: https://github.com/vercel/next.js/tree/canary/

examples/with-sitemap

-   [ ] Test Chatwoot

_NavBar_

-   [x] Recreate Nav Component to be a single component.
-   [x] Make responsive and togglable icons
-   [x] Add Logo
-   [x] Hamburger/Close as csv: https://icon-sets.iconify.design/charm/menu-hamburger/ & https://icon-sets.iconify.design/material-symbols/close/
-   [ ] Improve background
