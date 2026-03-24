# NovaShop — Retail Web UI Challenge

A polished React retail web application built as part of a frontend design system challenge.

## Live Features

- **Product Listing Page** — Responsive grid of product cards fetched from API
- **ProductCard Component** — Displays image, title, brand, rating, price, Add to Cart
- **Search & Filter Bar** — Real-time search by title + category dropdown
- **Cart Drawer / Side Panel** — Slides in from right, full cart management
- **Light / Dark Mode** — Toggle in header, adapts via CSS design tokens

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone or unzip the project
cd retail-app

# Install dependencies
npm install

# Start the dev server
npm run dev
# → Opens at http://localhost:5173
```

### Optional: Run with Local Mock API

```bash
# In a separate terminal
npx json-server --watch db.json --port 4000
# → API at http://localhost:4000/products
```

The app auto-detects the local API and falls back to built-in mock data if unavailable.

---

## Project Structure

```
retail-app/
├── index.html
├── vite.config.js
├── package.json
├── db.json                          # Mock API data for json-server
└── src/
    ├── main.jsx                     # Entry point
    ├── App.jsx                      # Root with providers
    ├── styles/
    │   └── global.css               # CSS design tokens + reset
    ├── context/
    │   ├── CartContext.jsx          # Cart state management (useReducer)
    │   └── ThemeContext.jsx         # Light/dark theme toggle
    ├── hooks/
    │   └── useProducts.js           # Data fetching hook (API + fallback)
    ├── data/
    │   └── products.js              # Static mock product data
    ├── components/
    │   ├── Header.jsx               # Sticky nav, cart icon, theme toggle
    │   ├── ProductCard.jsx          # Reusable product card
    │   ├── SearchFilterBar.jsx      # Search input + category select
    │   ├── CartDrawer.jsx           # Slide-in cart side panel
    │   └── StarRating.jsx           # Fractional star rating display
    └── pages/
        └── ProductListingPage.jsx   # Main product grid page
```

---

## Approach & Design Decisions

### Design System
Built with a **custom minimal token-based design system** using CSS custom properties (variables). No third-party component library — all components are hand-crafted for full control.

**Tokens defined in `global.css`:**
- `--bg`, `--surface`, `--surface-2` — layered backgrounds
- `--text-primary`, `--text-secondary`, `--text-muted` — typography hierarchy
- `--accent`, `--accent-hover`, `--accent-light` — brand color ramp
- `--border`, `--shadow-sm/md/lg` — depth system
- `--radius-sm/md/lg` — consistent rounding
- `--font-display` (Syne), `--font-body` (DM Sans) — type pairing
- `--transition` — unified easing

### Component Architecture

**ProductCard** accepts these props:
```
title, price, imageUrl, rating, onAddToCart, id,
category, brand, stock, size
```
- Image fallback renders initials when `imageUrl` fails
- "Only N left" badge appears when `stock ≤ 20`
- Add to Cart button shows green "Added ✓" confirmation for 1.2s

**CartContext** uses `useReducer` for predictable state:
- Actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR`
- Derived values: `totalItems`, `totalPrice` computed on render

**useProducts hook** — tries `GET http://localhost:4000/products`, silently falls back to `mockProducts` on network failure. 600ms artificial delay on mock to show loading skeleton.

### State Management
- **Cart**: React Context + useReducer (no Redux needed at this scale)
- **Theme**: React Context + useState
- **Filters**: Local state in ProductListingPage, derived via `useMemo`

### Trade-offs
| Decision | Reason |
|---|---|
| CSS Modules over Tailwind | Full design control, no purge config needed, zero runtime cost |
| Custom design tokens over MUI/Chakra | Brief requires DS alignment; tokens are more portable |
| useReducer for cart | Cleaner than multiple useState for complex state transitions |
| Fallback mock data | Allows the app to run standalone without json-server |
| No React Router | Single page app; routing would add complexity without value here |

---

## Design Aesthetic

- **Palette**: Warm cream (`#F7F5F0`) base with terracotta accent (`#C84B31`)
- **Typography**: Syne (geometric, editorial) + DM Sans (humanist, readable)
- **Motion**: Cards animate in on load with staggered delays; hover lifts with shadow
- **Dark mode**: Full token swap — no hardcoded colors anywhere

---

## Submission

- **GitHub**: *(add your repo URL)*
- **Demo**: *(deploy to Vercel with `npm run build` → drag dist/ folder)*

---

## Optional Enhancements (not implemented)

- Product detail modal / page
- Wishlist / favorites
- Sort by price/rating
- Pagination or infinite scroll
- Toast notifications for cart actions
- Checkout flow
