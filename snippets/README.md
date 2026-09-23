# Snippets: from vanilla JS to React

**New here? Start with [HOW-TO-RUN.md](HOW-TO-RUN.md)** for step-by-step setup on Windows, macOS and Linux.

Small, self-contained examples to run live while each concept is explained. Nobody writes or changes code. You run each snippet, click through its walkthrough, and watch what happens.

Run the **vanilla** snippets first: they show where plain JavaScript breaks. Then run the **react** snippets, which follow the slide order (01 Components → 11 Structuring an App).

## Vanilla JS (`vanilla/`)

No install and no server needed. Open `vanilla/index.html` in a browser and follow the links, or open any file directly.

| File | What breaks |
|---|---|
| `01-building-ui-by-hand.html` | Describing one card takes a page of `createElement`/`appendChild` steps |
| `02-rebuild-destroys-input.html` | Rebuilding with `innerHTML` wipes what the user typed |
| `03-state-out-of-sync.html` | Remove updates the list but forgets the badge: badge says 3, list shows 2 |
| `04-dead-listeners.html` | A `+` button works once, then goes dead after `innerHTML` rebuilds it |

Each page shows its own walkthrough at the top. Pages 01 and 03 also print the relevant code at the bottom, so nobody needs to open the file.

## React (`react/`)

```bash
cd snippets/react
npm install
npm run dev
```

Open the URL Vite prints. Pick an exercise from the sidebar. The page shows the file its code lives in, the walkthrough, and the running exercise.

| Topic | Exercises |
|---|---|
| 01 Components | 01a A component is a function · 01b Composing components |
| 02 JSX | 02a JSX vs createElement · 02b JSX rules |
| 03 The Virtual DOM | 03a A re-render keeps what the user typed · 03b Only the changes reach the DOM |
| 04 Props | 04a Passing props · 04b Props are read-only |
| 05 Hooks | 05a useState · 05b Rules of hooks |
| 06 State Rules | 06a One source of truth · 06b Mutation vs replacement · 06c Derived values are not stored · 06d State is a snapshot |
| 07 Reacting to the User | 07a onClick survives re-renders · 07b Controlled input · 07c Passing arguments to handlers |
| 08 Fetching Data | 08a Fetch with useEffect · 08b The dependency array |
| 09 Lists & Keys | 09a Rendering lists · 09b Keys: index vs id |
| 10 Lifting State Up | 10a State stuck in siblings · 10b Lifted state · 10c Local state stays local |
| 11 Structuring an App | 11a A mini shop |

Every exercise is one component in its own file under `react/src/exercises/`, with its own data and styles, and never imports from another exercise. `11a` is the one multi-file exercise: its `mini-shop/` folder shows how an app is split up.

### Pairs to run side by side

| Vanilla | React |
|---|---|
| `vanilla/01` | `01b` Composing components |
| `vanilla/02` | `03a` A re-render keeps what the user typed |
| `vanilla/03` | `06a` One source of truth |
| `vanilla/04` | `07a` onClick survives re-renders |

### Exercise 08a needs the backend

`08a` fetches from the real API. Start the backend first (`cd backend && npm run dev`). The backend only accepts requests from the origin set as `CLIENT_ORIGIN` in `backend/.env` (default `http://localhost:5173`). If Vite starts the snippets on a different port because 5173 is taken, `08a` will show "Could not load products". Either free port 5173 or change `CLIENT_ORIGIN` to match, then restart the backend.

### Exercises that show a mistake

`05b` (a hook inside an `if`) and `07c` (calling a handler instead of passing it) each show the correct version next to the broken one, so the mistake can be seen with a click. When `05b`'s broken side crashes, only that exercise is replaced by the error message, with a **Restart exercise** button. The rest of the app keeps working.
