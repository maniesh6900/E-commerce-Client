# MERN E‑commerce – Client (Vite + React)

A modern React storefront that talks to the hosted API at `https://e-commerce-backend-8xl7.onrender.com`. It includes catalog browsing with filters, product detail pages with variant selection, a persisted cart, Stripe checkout, and an authenticated orders view.

## Features
- Product catalog with category routes, color/size filters, and newest/price sorting.
- Product detail page with variant (color/size) selection, quantity adjust, and add‑to‑cart.
- Cart with line‑item quantity controls, remove item, order summary, and Stripe Checkout hand‑off.
- Auth: login/register against `/auth` endpoints; redirects to home when already signed in.
- Orders: protected route that lists a user’s orders via `/orders/find/:userId`.
- Theme toggle (light/dark) stored in `localStorage`; global CSS variables for both themes.
- State persisted locally so cart and user survive refreshes.

## Tech stack & tools used
- Core: React 18, Vite 5.
- Routing: `react-router-dom` v6.
- State: Redux Toolkit 2 + Redux Persist 6, React‑Redux 9.
- Styling/UI: `styled-components` 6, MUI v6 icons + badge (`@mui/material`) with Emotion engine.
- Data fetching: Axios.
- Payments: `react-stripe-checkout` (Stripe publishable key), `@paypal/react-paypal-js` dependency available for PayPal flows.
- Utilities & build: `@vitejs/plugin-react`, ESLint 9 with React/React‑Hooks/React‑Refresh plugins.

## Project structure (key parts)
- `src/pages/` – screens (`home`, `productList`, `product`, `cart`, `orders`, `login`, `register`, `pay`, `success`, `Error`).
- `src/components/` – navbar (with theme toggle), sliders/cards, announcements, newsletter, footer, product grid.
- `src/redux/` – store setup with persistence plus `user` and `cart` slices, API call helpers.
- `src/requestMerthod.js` – Axios clients pointing to the hosted API (public and bearer‑token variants).
- `public/` – static assets; `src/assets/` – local images.

## Environment
Create `.env` in the project root:
```
REACT_APP_STRIPE=<your_stripe_publishable_key>
# Optional: VITE_API_BASE_URL=<your_backend_url>  (update requestMerthod.js to use it)
```
The current code reads `process.env.REACT_APP_STRIPE` for Stripe Checkout and uses the base URL hardcoded in `src/requestMerthod.js`. For production, prefer moving secrets/tokens out of source.

## Scripts
- `npm run dev` – start Vite dev server.
- `npm run build` – production build.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint.

## API touchpoints
- Products: `GET /products` and `GET /products?categories=:cat`, `GET /products/find/:id`.
- Auth: `POST /auth/login`, `POST /auth/register`.
- Orders (auth required): `GET /orders/find/:userId` via `userRequest` (Bearer token header).
- Checkout: `POST /checkout/payment` (Stripe token + amount) and `POST /payment/checkout` used by the pay page.

## Running locally
1) Install dependencies: `npm install`  
2) Add your `.env` with the Stripe publishable key.  
3) Update `src/requestMerthod.js` if you want a different API base URL or to inject a runtime token.  
4) Start dev server: `npm run dev` and open the shown URL.

## Notes
- Cart totals are recalculated in the Redux slice and persisted with Redux Persist.
- Theme choice is saved to `localStorage` and applied via the `data-theme` attribute on `<html>`.
- `userRequest` currently ships with a static JWT; replace it with the logged‑in user token before deploying.
