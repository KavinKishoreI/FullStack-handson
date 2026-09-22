# React Shop — Teaching Artifact

## 1. What this is

This is the React half of a two-implementation teaching repo built for a full-stack workshop. The first half, `client-vanilla`, is the same shop built in plain JavaScript and deliberately made painful. This app removes each of those pains, one at a time, and the git history on this branch is the lesson: check out a tag, compare it against the corresponding stage in `client-vanilla`, and the difference is the point.

This is ordinary, beginner-level React — function components and `useState`/`useEffect` only. No Redux, no Context, no custom hooks, no `useMemo`/`useCallback`.

## 2. Run it

Start the backend first (from the `backend/` folder):

```bash
npm install
npm run db:reset
npm run dev
```

The backend must be running at `http://localhost:4000` before this app will show any products.

Then, from `client-react/`:

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## 3. Component tree and state ownership

```
App                       ← owns ALL shared state
├── Header                ← props: itemCount
├── StatusLine            ← props: message, isError
├── Filters               ← props: searchText, category, categories, onSearchChange, onCategoryChange
├── ProductGrid           ← props: products, onAddToCart
│   └── ProductCard       ← props: product, onAddToCart   |   OWNS its own quantity state
├── CartPanel             ← props: items, onIncrement, onDecrement, onRemove
│   └── CartRow           ← props: item, onIncrement, onDecrement, onRemove
└── Summary               ← props: total, shippingNote, isFreeShipping, disabled, onCheckout
```

`ProductCard` owning its own quantity stepper — instead of that value living in `App` — is deliberate. It's what lets a card's chosen quantity survive a re-render caused by search or category filtering, which is the direct answer to the vanilla build's `bug-filter-resets-cards`.

Everything else — the cart, search text, category, status message, and the fetched product list — lives in `App`. Total, shipping note, item count, and the filtered/joined product and cart lists are never stored: they're computed fresh on every render from that state.

## 4. Stages

| Tag | What it demonstrates | Reproduce it |
|---|---|---|
| `react-static` | Same page as `client-vanilla`, now built from Header/Filters/ProductGrid/CartPanel/Summary/StatusLine components instead of one script. Still no shared state beyond one card's local stepper. | Load the page — visually identical to Commit 1's static markup, with 8 product cards rendered from a hardcoded array. |
| `react-mutation-bug` | Mutating a cart item's `quantity` directly, then calling `setCart` with the same array reference, does not trigger a re-render — React bails out because the reference didn't change. | Add an item to the cart, click `+` in the cart panel once. The displayed quantity does not change, even though React DevTools shows the underlying state array was actually mutated. |
| `react-cart` | The badge, cart panel, and summary all read the same `cart` state and recompute their derived values on every render, so they cannot disagree, and nothing needs to be "recalculated" on demand. | Add items, use `+`/`−`/Remove, and checkout. The total and free-shipping line update correctly after every single action, with no extra code written to keep them in sync. |
| `react-preserves-state` | Filtering the product grid does not reset a card's own state, because `ProductCard` instances are matched to their product by a stable `key`. | Set a product card's quantity stepper to 5, then type into the search box so the grid re-filters. The stepper stays at 5 — the same action resets it to 1 in `client-vanilla`. |
| `react-index-key-bug` | Using the array index as the `key` breaks that guarantee: after filtering, React matches old component instances to new products by *position*, not identity, so local state can land on the wrong product. | Set the 3rd product card's stepper to 7, then filter to a category that removes that product from the list. The value 7 reappears on whichever product now sits in that same list position. |
| `react-complete` | Feature-complete, parity with `client-vanilla`: products load from the real backend, loading and error states are handled, and an empty search shows a message instead of a blank grid. | Stop the backend and reload the page — an error message appears. Restart it, search for `zzz` — `No products match your search.` appears instead of an empty grid. |

## 5. Vanilla → React

| # | Vanilla pain | Vanilla tag / place | React answer | React tag / place |
|---|---|---|---|---|
| 1 | UI built by construction steps, not described | `renderProductGrid()` | JSX describes the result once | `ProductCard.jsx` |
| 2 | One data change → five manual DOM updates | Commit 4 add handler | `setCart` and stop | Commit 5 |
| 3 | Regions silently disagree | `bug-badge-desync` | Impossible: all read one `cart` | `react-cart` |
| 4 | Handlers die when elements are rebuilt | `bug-dead-listeners` | `onClick` lives in JSX, returns with the element | Commit 5 |
| 5 | Delegation needed as a workaround | Commit 7 (vanilla) | Never needed | — |
| 6 | Rebuilding destroys in-progress UI state | `bug-filter-resets-cards` | Reconciliation keeps untouched components alive | `react-preserves-state` |
| 7 | Surgical updates need hand-written diffing | discussion at vanilla Commit 8 | Virtual DOM diffs for you; keys tell it what is what | `react-index-key-bug` → Commit 13 |
| 8 | Derived values need a recalculation call from every mutation site | `bug-stale-shipping`, then 5 call sites | Computed during render; no call sites | Commit 8 |
| 9 | One 300-line file, no boundaries | all of `app.js` | Eight components with explicit props | `react-static` |
| 10 | Full re-render is correct but destroys state and wastes work | `vanilla-rerender` | Same mental model, neither cost | `react-complete` |

**The one React concept with no vanilla counterpart:** `react-mutation-bug`. It's not that mutation is slow — it's that `setState` bails out when handed the same reference. A new array (even one with identical contents) is what tells React a re-render is needed.

## 6. What this app does not do

- **No persistence (no `localStorage`).** The cart lives in component state only. This matches `client-vanilla` and is deliberate: the workshop's backend section opens by asking "where does your cart go when you refresh?", and persisting it here would answer that question early.
- **No login.** Authentication is a separate part of the workshop, layered onto both frontends only in the optional integration stage.
- **No real checkout.** Clicking "Checkout" never calls the API — it clears the cart and shows `Order placed (pretend).`, exactly like `client-vanilla`.
