import AComponentIsAFunction from './exercises/01-components/01a-a-component-is-a-function.jsx';
import ComposingComponents from './exercises/01-components/01b-composing-components.jsx';
import JsxVsCreateElement from './exercises/02-jsx/02a-jsx-vs-createelement.jsx';
import JsxRules from './exercises/02-jsx/02b-jsx-rules.jsx';
import RerenderKeepsInput from './exercises/03-virtual-dom/03a-rerender-keeps-input.jsx';
import OnlyChangesReachTheDom from './exercises/03-virtual-dom/03b-only-changes-reach-the-dom.jsx';
import PassingProps from './exercises/04-props/04a-passing-props.jsx';
import PropsAreReadOnly from './exercises/04-props/04b-props-are-read-only.jsx';
import UseStateBasics from './exercises/05-hooks/05a-usestate.jsx';
import RulesOfHooks from './exercises/05-hooks/05b-rules-of-hooks.jsx';
import OneSourceOfTruth from './exercises/06-state-rules/06a-one-source-of-truth.jsx';
import MutationVsReplacement from './exercises/06-state-rules/06b-mutation-vs-replacement.jsx';
import DerivedNotStored from './exercises/06-state-rules/06c-derived-not-stored.jsx';
import StateIsASnapshot from './exercises/06-state-rules/06d-state-is-a-snapshot.jsx';
import OnClickSurvivesRerender from './exercises/07-reacting-to-the-user/07a-onclick-survives-rerender.jsx';
import ControlledInput from './exercises/07-reacting-to-the-user/07b-controlled-input.jsx';
import PassingArguments from './exercises/07-reacting-to-the-user/07c-passing-arguments.jsx';
import FetchWithUseEffect from './exercises/08-fetching-data/08a-fetch-with-useeffect.jsx';
import DependencyArray from './exercises/08-fetching-data/08b-dependency-array.jsx';
import RenderingLists from './exercises/09-lists-and-keys/09a-rendering-lists.jsx';
import KeysIndexVsId from './exercises/09-lists-and-keys/09b-keys-index-vs-id.jsx';
import StateStuckInSiblings from './exercises/10-lifting-state-up/10a-state-stuck-in-siblings.jsx';
import LiftedState from './exercises/10-lifting-state-up/10b-lifted-state.jsx';
import LocalStateStaysLocal from './exercises/10-lifting-state-up/10c-local-state-stays-local.jsx';
import MiniShop from './exercises/11-structuring-an-app/mini-shop/MiniShop.jsx';

export const topics = [
  {
    number: '01',
    title: 'Components',
    exercises: [
      {
        id: '01a',
        title: 'A component is a function',
        file: '01-components/01a-a-component-is-a-function.jsx',
        Component: AComponentIsAFunction,
        steps: [
          'Greeting is a plain function that returns what should appear on screen.',
          'It is used three times as <Greeting />, so it appears three times. Write it once, use it anywhere.',
          'The text lives in one place. Change it there and every copy changes with it.',
        ],
      },
      {
        id: '01b',
        title: 'Composing components',
        file: '01-components/01b-composing-components.jsx',
        Component: ComposingComponents,
        steps: [
          'ComposingComponents uses ProductGrid, which uses ProductCard. Components are built out of components.',
          'Compare ProductCard with createCard in vanilla/01 — same card, no createElement/appendChild steps.',
          'The grid comes from the products array: one ProductCard per product. More data means more cards, with no extra UI code.',
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'JSX',
    exercises: [
      {
        id: '02a',
        title: 'JSX vs createElement',
        file: '02-jsx/02a-jsx-vs-createelement.jsx',
        Component: JsxVsCreateElement,
        steps: [
          'Both cards look identical on screen.',
          'In the code, WithJsx and WithoutJsx describe the same thing. JSX is turned into createElement calls before the browser runs it.',
          'JSX reads like the HTML it produces. The createElement version is what React actually runs.',
        ],
      },
      {
        id: '02b',
        title: 'JSX rules',
        file: '02-jsx/02b-jsx-rules.jsx',
        Component: JsxRules,
        steps: [
          'Curly braces {} run any JavaScript expression: shopName.toUpperCase(), products.length, a price calculation.',
          'It is className, not class, because class is a reserved word in JavaScript.',
          'The component returns <>...</> — a fragment — because a component must return one root.',
          'The three products have stock 25, 1 and 0. StockNote picks a different label and colour for each, using a plain if/else before the JSX.',
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'The Virtual DOM',
    exercises: [
      {
        id: '03a',
        title: 'A re-render keeps what the user typed',
        file: '03-virtual-dom/03a-rerender-keeps-input.jsx',
        Component: RerenderKeepsInput,
        steps: [
          'Type a gift note into any card.',
          'Click Refresh prices. The prices change and your note is still there.',
          'Now run vanilla/02: the same steps wipe the note, because innerHTML rebuilt every card.',
          'React re-ran the whole component, compared the result with the last one, and only updated the price text.',
        ],
      },
      {
        id: '03b',
        title: 'Only the changes reach the DOM',
        file: '03-virtual-dom/03b-only-changes-reach-the-dom.jsx',
        Component: OnlyChangesReachTheDom,
        steps: [
          'Open DevTools (F12) → Elements tab, and expand this exercise.',
          'Click the button a few times. The function runs every time — watch the run count.',
          'In the Elements tab, only the two numbers flash. The heading and paragraph are never touched.',
        ],
      },
    ],
  },
  {
    number: '04',
    title: 'Props',
    exercises: [
      {
        id: '04a',
        title: 'Passing props',
        file: '04-props/04a-passing-props.jsx',
        Component: PassingProps,
        steps: [
          'One Header component, three different outputs — because each use passes different props.',
          'Props are how a parent hands data to a child: <Header itemCount={3} />.',
          'Same component, different input, different output — just like calling a function with different arguments.',
        ],
      },
      {
        id: '04b',
        title: 'Props are read-only',
        file: '04-props/04b-props-are-read-only.jsx',
        Component: PropsAreReadOnly,
        steps: [
          'The child tries to change its own prop with props.itemCount = 99.',
          'React refuses — the error message is shown in red.',
          'A child can read props but never change them. To change data, the owner of the data has to change it.',
        ],
      },
    ],
  },
  {
    number: '05',
    title: 'Hooks',
    exercises: [
      {
        id: '05a',
        title: 'useState',
        file: '05-hooks/05a-usestate.jsx',
        Component: UseStateBasics,
        steps: [
          'useState(1) gives back two things: the current value (quantity) and a function to change it (setQuantity).',
          'Click + and −. Calling setQuantity makes React run the component again with the new value.',
          'The 1 in useState(1) is only the starting value. After that, only setQuantity changes it.',
        ],
      },
      {
        id: '05b',
        title: 'Rules of hooks',
        file: '05-hooks/05b-rules-of-hooks.jsx',
        Component: RulesOfHooks,
        steps: [
          'Left side: click Show gift note. It works.',
          'Right side: click Show gift note. The exercise crashes with "Rendered more hooks than during the previous render".',
          'On the right, useState sits inside an if. The first render called one hook; after the click it called two. React matches each piece of state to a hook by its position, so the order must never change.',
          'Rule: call hooks at the top of the component — never inside if, loops or nested functions. Click Restart exercise to bring it back.',
        ],
      },
    ],
  },
  {
    number: '06',
    title: 'State Rules',
    exercises: [
      {
        id: '06a',
        title: 'One source of truth',
        file: '06-state-rules/06a-one-source-of-truth.jsx',
        Component: OneSourceOfTruth,
        steps: [
          'Run vanilla/03 first: add three items, remove one — the badge says 3, the list shows 2.',
          'Do the same here. The badge is always right.',
          'The badge is cart.length and the list is cart.map(...). Both read the same state, so they cannot disagree.',
        ],
      },
      {
        id: '06b',
        title: 'Mutation vs replacement',
        file: '06-state-rules/06b-mutation-vs-replacement.jsx',
        Component: MutationVsReplacement,
        steps: [
          'Click "Add Desk Lamp (mutate)" three times. Nothing changes on screen.',
          'Now click "Add Ceramic Mug (replace)" once. The three Desk Lamps appear too.',
          'cart.push changed the array, but setCart(cart) passed the same array back, so React saw no change and skipped the re-render.',
          '[...cart, item] is a new array. A new array is what tells React something changed.',
        ],
      },
      {
        id: '06c',
        title: 'Derived values are not stored',
        file: '06-state-rules/06c-derived-not-stored.jsx',
        Component: DerivedNotStored,
        steps: [
          'Add three products. Both totals agree.',
          'Remove one. The stored total is now wrong; the computed total is right.',
          'removeFromCart forgot to call setStoredTotal. The computed total cannot be forgotten — it is recalculated from cart on every render.',
          'Rule: if a value can be calculated from state, calculate it. Do not keep it in its own useState.',
        ],
      },
      {
        id: '06d',
        title: 'State is a snapshot',
        file: '06-state-rules/06d-state-is-a-snapshot.jsx',
        Component: StateIsASnapshot,
        steps: [
          'Click "+3 using quantity + 1". It only goes up by 1.',
          'Inside one click, quantity is fixed. All three calls say "set it to 0 + 1".',
          'Click "+3 using an updater function". It goes up by 3, because each updater receives the latest value.',
        ],
      },
    ],
  },
  {
    number: '07',
    title: 'Reacting to the User',
    exercises: [
      {
        id: '07a',
        title: 'onClick survives re-renders',
        file: '07-reacting-to-the-user/07a-onclick-survives-rerender.jsx',
        Component: OnClickSurvivesRerender,
        steps: [
          'Run vanilla/04 first: the + button works once, then goes dead.',
          'Here, click + as many times as you like. It keeps working.',
          'onClick is part of the JSX, so every render describes the button and its handler together. React keeps them attached.',
        ],
      },
      {
        id: '07b',
        title: 'Controlled input',
        file: '07-reacting-to-the-user/07b-controlled-input.jsx',
        Component: ControlledInput,
        steps: [
          'Type in the search box. The list filters as you type, and searchText updates below it.',
          'The input shows value={searchText}, and every keystroke calls setSearchText. State is the single source for what the box contains.',
          'Click Clear — setting state to "" empties the box. The input follows state.',
        ],
      },
      {
        id: '07c',
        title: 'Passing arguments to handlers',
        file: '07-reacting-to-the-user/07c-passing-arguments.jsx',
        Component: PassingArguments,
        steps: [
          'Left list: click Remove on any item. Only that item goes.',
          'Right list: it is already empty, and nothing was clicked.',
          'onClick={() => handleRemove(item.id)} hands React a function to call later, on click. onClick={handleRemove(item.id)} calls handleRemove right away, while rendering, for every item.',
          'Click Reset both lists: the right one empties again straight away.',
        ],
      },
    ],
  },
  {
    number: '08',
    title: 'Fetching Data',
    exercises: [
      {
        id: '08a',
        title: 'Fetch with useEffect',
        file: '08-fetching-data/08a-fetch-with-useeffect.jsx',
        Component: FetchWithUseEffect,
        steps: [
          'Needs the backend running on port 4000.',
          'You see "Loading products…" briefly, then the product list from the real API.',
          'useEffect(..., []) runs once after the first render — the right place to start a fetch.',
          'Stop the backend and pick this exercise again: the error message appears instead.',
        ],
      },
      {
        id: '08b',
        title: 'The dependency array',
        file: '08-fetching-data/08b-dependency-array.jsx',
        Component: DependencyArray,
        steps: [
          'Open the browser console (F12), then pick this exercise again to see the first logs.',
          'Type in the box: the [searchText] effect and the no-array effect run.',
          'Click the button: only the no-array effect runs — searchText did not change.',
          'The [] effect never runs again. The array lists what the effect depends on.',
        ],
      },
    ],
  },
  {
    number: '09',
    title: 'Lists & Keys',
    exercises: [
      {
        id: '09a',
        title: 'Rendering lists',
        file: '09-lists-and-keys/09a-rendering-lists.jsx',
        Component: RenderingLists,
        steps: [
          'cart.map(...) turns an array of data into an array of <li> elements.',
          'Remove every item: the list is replaced by "Your cart is empty". That is a condition ? a : b inside JSX.',
          '"Put everything back" only appears when something was removed — condition && element.',
        ],
      },
      {
        id: '09b',
        title: 'Keys: index vs id',
        file: '09-lists-and-keys/09b-keys-index-vs-id.jsx',
        Component: KeysIndexVsId,
        steps: [
          'In both columns, set Wireless Mouse to 5.',
          'Click "Hide Wireless Mouse".',
          'Left column (key=index): Mechanical Keyboard now shows 5. Right column (key=id): it correctly shows 1.',
          'A key tells React which item is which between renders. An index is a position, not an item.',
        ],
      },
    ],
  },
  {
    number: '10',
    title: 'Lifting State Up',
    exercises: [
      {
        id: '10a',
        title: 'State stuck in siblings',
        file: '10-lifting-state-up/10a-state-stuck-in-siblings.jsx',
        Component: StateStuckInSiblings,
        steps: [
          'Click the Add buttons. ProductList\'s own count goes up. The badge stays at 0.',
          'CartBadge and ProductList each have their own state. Siblings cannot see each other\'s state.',
        ],
      },
      {
        id: '10b',
        title: 'Lifted state',
        file: '10-lifting-state-up/10b-lifted-state.jsx',
        Component: LiftedState,
        steps: [
          'Same screen, but now the badge updates.',
          'The cart moved up into the shared parent. The parent passes the count down as a prop, and passes handleAdd down so the child can ask for a change.',
          'Data flows down through props; requests to change it flow up through handler functions.',
        ],
      },
      {
        id: '10c',
        title: 'Local state stays local',
        file: '10-lifting-state-up/10c-local-state-stays-local.jsx',
        Component: LocalStateStaysLocal,
        steps: [
          'Set different quantities on the two cards, then add them.',
          'Each card owns its own stepper — nothing else needs to know about it until Add is clicked.',
          'The cart is shared, so it lives in the parent. Lift state only as high as the components that need it.',
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Structuring an App',
    exercises: [
      {
        id: '11a',
        title: 'A mini shop',
        file: '11-structuring-an-app/mini-shop/MiniShop.jsx',
        Component: MiniShop,
        steps: [
          'Everything from 01–10 in one small app, split into files: MiniShop, Header, ProductList, Cart, products.js.',
          'MiniShop owns the state and the handlers. The other components only receive props.',
          'lines, itemCount and total are computed during render — none of them are state.',
          'Next, open client-react/src/App.jsx: it is the same shape, just bigger.',
        ],
      },
    ],
  },
];
