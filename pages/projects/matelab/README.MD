This is a big project so please ask as many questions as you want as this will take quite a bit of time.

**Math & Measurement Learning Index (Age 6–7, Advanced)**

1. Number sense (0–1,000+)
2. Place value (units, tens, hundreds)
3. Addition & subtraction (multi-digit, mental math)
4. Multiplication (concept, tables, arrays)
5. Division (sharing, grouping)
6. Fractions (½, ⅓, ¼, equivalence)
7. Decimals (tenths, money context)
8. Number lines & estimation
9. Odd/even, primes (intro)
10. Patterns & sequences
11. Negative numbers (contextual)

**Geometry** 12. 2D shapes & properties 13. 3D shapes & nets 14. Angles (right, acute, obtuse) 15. Symmetry & transformations 16. Perimeter 17. Area (counting units, rectangles) 18. Coordinates (simple grids) 19. Tessellations

**Measurement** 20. Length (mm–cm–m) 21. Weight/mass (g–kg) 22. Volume/capacity (ml–l) 23. Time (clocks, elapsed time) 24. Temperature (°C, comparison)

**Conversions** 25. Metric unit conversions 26. Money (units, change, decimals) 27. Time conversions (minutes ↔ hours)

**Logic & Applied Math** 28. Word problems (multi-step) 29. Logical reasoning & puzzles 30. Data & graphs (bar, pictographs) 31. Ratios (simple, visual) 32. Probability (basic intuition)

**Enrichment** 33. Mental math strategies 34. Math games & challenges 35. Real-world projects (recipes, building, maps)

Given you already use Next.js + CSS and Strapi, I’d build it like this:

Frontend: Next.js (App Router) + TypeScript

UI: CSS Modules (or Tailwind if you ever want speed), simple component library optional (shadcn/ui)

Drawing/geometry:

Konva.js (react-konva) for interactive shapes, dragging, measuring, snapping

(Alternative: pure Canvas API if you want minimal deps)

Math engine:

fraction.js (fractions)

decimal.js (precise decimals, money, conversions)

optional: mathjs (only if you need more complex parsing)

State / lesson flow: Zustand (lightweight) or React Context if small

Persistence: Not sure if necessary? Local storage would do just to keep track of basic stuff?
