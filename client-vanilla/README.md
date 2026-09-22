# Vanilla JS Shop — Teaching Artifact

## 1. What this is

This is a teaching artifact for a full-stack workshop, not a production app. Its purpose is to **earn React**: the git history on this branch is the lesson. Each commit adds one feature and, in several places, plants a specific, nameable bug that a beginner would naturally write. The bugs are fixed a commit or two later — except the ones that vanilla JS genuinely cannot fix well, which are left in place on purpose. By the last commit, the code has organically rediscovered the shape of React (one state object, one render function) and hit the wall that React actually solves.

This is deliberately **not** the good version of this app. Don't copy patterns from it into real projects.

## 2. Run it

Start the backend first (from the `backend/` folder, on the `main`/`backend` branch):

```bash
npm install
npm run db:reset
npm run dev
```

The backend must be running at `http://localhost:4000` before this app will show any products.

Then, from the repository root, serve `client-vanilla/` as static files. Any of these work:

```bash
npx serve client-vanilla
```

```bash
python3 -m http.server --directory client-vanilla
```

Or open `client-vanilla/index.html` with VS Code's Live Server extension.

Open the served URL in a browser.

## 3. The stages

Each tag below marks a specific commit. Check one out with `git checkout <tag-name>`, reload the page, and follow the reproduction steps.

| Tag | What it demonstrates | Reproduce it |
|---|---|---|
| `vanilla-static` | Markup and CSS only. Completely inert — no JS file exists yet. | Load the page. It renders all six regions correctly and shows no console errors, but nothing responds to clicks or typing. |
| `bug-badge-desync` | Removing an item does not update the header badge. The remove handler updates the cart panel and the total, but forgets to call the function that updates the badge. | Add 3 items (any 3, one each), then remove 1 from the cart panel. The badge still says 3; the cart panel correctly shows 2. |
| `bug-dead-listeners` | Quantity buttons in the cart stop working after one click. `renderCartPanel()` rebuilds the row markup via `innerHTML`, which destroys the DOM nodes the `+`/`−` listeners were attached to — and the click handler's own re-render doesn't reattach them. | Add an item to the cart. Click `+` once — it works, quantity goes up. Click `+` again — nothing happens. |
| `bug-filter-resets-cards` | Typing in search or changing the category resets every product card's quantity stepper to 1, because filtering rebuilds the whole grid from scratch. This is **not fixed** — there is no good fix in vanilla JS for this without hand-rolled diffing. | Set a product card's stepper to 5 (click `+` four times). Type one letter into the search box. The stepper is back to 1. |
| `bug-stale-shipping` | The `+`/`−` buttons in the cart update the total but not the free-shipping progress line, because that call was left out when total-updating was wired into those two handlers. | Add an item so the cart total is close to but under ₹2,000. Click `+` in the cart. The total updates; the shipping line does not. |
| `vanilla-messy` | Everything works correctly again, via `recalculateSummary()` called from all five places that mutate the cart (add, remove, `+`, `−`, checkout). The catch: those five call sites must each be remembered by hand — nothing enforces it. | Add, remove, use `+`/`−`, and checkout — the total, shipping line, badge, and checkout button all stay correct through every action. |
| `vanilla-rerender` | The "rediscovery": `allProducts`/`cart`/`searchText`/`selectedCategory` are collapsed into one `state` object, and one `renderAll()` rebuilds every region. The badge can no longer disagree with the panel, and derived values can no longer go stale. But now the stepper-reset problem happens on **every** cart interaction, not just filtering, because every change re-renders the entire page. | Set a card's stepper to 5, then add a *different* item to the cart (a cart action, not a filter action). The stepper still resets to 1 — everything rebuilds on every click now. |
| `vanilla-complete` | Final vanilla implementation, with this README. | Every command in this README works as described. |

## 4. What this app does not do

- **No persistence (no `localStorage`).** The cart lives in a JavaScript variable only. Refresh the page and it's gone — this is a fixed teaching decision, not an oversight. The backend section of the workshop opens by asking "where does your cart go when you refresh?", and persisting it here would spoil that question.
- **No login.** There's no concept of a signed-in user here; the backend's auth system is a separate part of the workshop.
- **No real checkout.** Clicking "Checkout" never calls the API. It clears the cart and prints "Order placed (pretend)." — enough to demonstrate the interaction without building order flow into a throwaway app.
- **No server-side filtering.** The backend's `/api/products` endpoint supports `search` and `category` query parameters, but this app deliberately ignores them and filters `allProducts` in the browser instead. Client-side filtering is what makes the re-render/reset problem (`bug-filter-resets-cards`, and its worse cousin in `vanilla-rerender`) visible at all.
