/**
 * Solutions Data
 * 
 * Contains solution hints, explanations, and code for each challenge.
 * Used by the ShowSolution component to provide progressive help.
 * 
 * @module data/solutions
 */

export const solutions = {
  counter: {
    explanation: 'The Counter uses useState to manage a numeric value. The key insight is using the functional update form (prev => prev + 1) to ensure correct state updates, and conditionally disabling buttons at boundaries.',
    hints: [
      {
        title: 'Initialize State',
        content: 'Use useState(0) to create a count state variable initialized to 0, along with a setCount function to update it.',
      },
      {
        title: 'Functional Updates',
        content: 'When updating state based on previous state, use the functional form: setCount(prev => prev + 1). This ensures you always have the latest state value.',
      },
      {
        title: 'Boundary Checking',
        content: 'Use the disabled attribute on buttons: disabled={count <= MIN_VALUE} prevents going below minimum, and similar logic for maximum.',
      },
    ],
    filename: 'Counter.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Counter.jsx',
  },

  'toggle-theme': {
    explanation: 'Theme toggling uses useState to track the current theme and applies conditional styling based on that state. An object lookup pattern keeps the code clean and extensible.',
    hints: [
      {
        title: 'Theme State',
        content: "Create a boolean or string state: useState('light') or useState(false) for isDarkMode.",
      },
      {
        title: 'Style Object',
        content: 'Define a themes object with light and dark properties, each containing backgroundColor and color values.',
      },
      {
        title: 'Toggle Logic',
        content: "Toggle with setTheme(prev => prev === 'light' ? 'dark' : 'light') or setIsDark(prev => !prev).",
      },
    ],
    filename: 'ToggleTheme.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/ToggleTheme.jsx',
  },

  'controlled-input': {
    explanation: 'A controlled input syncs its value with React state. The input\'s value attribute is set to state, and onChange updates state with the new value, giving React full control over the form element.',
    hints: [
      {
        title: 'State for Input',
        content: "Initialize state for the input value: const [text, setText] = useState('')",
      },
      {
        title: 'Bind Value',
        content: "Set the input's value attribute to your state: value={text}",
      },
      {
        title: 'Handle Changes',
        content: 'Use onChange to update state: onChange={(e) => setText(e.target.value)}',
      },
    ],
    filename: 'ControlledInput.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/ControlledInput.jsx',
  },

  modal: {
    explanation: 'The Modal pattern uses a custom hook (useToggle) to manage open/close state, and renders conditionally based on that state. The children prop allows flexible content.',
    hints: [
      {
        title: 'Custom Hook',
        content: 'Create useToggle that returns [isOpen, toggle, setOpen] for managing boolean state with a toggle function.',
      },
      {
        title: 'Conditional Rendering',
        content: 'Only render the modal overlay when isOpen is true: {isOpen && <ModalContent />}',
      },
      {
        title: 'Children Prop',
        content: 'Accept children prop in Modal component to render any content inside: {children}',
      },
    ],
    filename: 'Modal.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Modal.jsx',
  },

  'todo-list': {
    explanation: 'The Todo List manages an array of objects in state. Key patterns include immutable updates (spread operator, filter, map), unique IDs for keys, and useMemo for filtered views.',
    hints: [
      {
        title: 'Array State',
        content: 'Initialize with useState([]). Each todo is an object: { id, text, completed }.',
      },
      {
        title: 'Immutable Updates',
        content: 'Add: [...todos, newTodo]. Remove: todos.filter(t => t.id !== id). Toggle: todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)',
      },
      {
        title: 'Memoized Filtering',
        content: 'Use useMemo to filter todos by status: useMemo(() => todos.filter(...), [todos, filter])',
      },
    ],
    filename: 'TodoList.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/TodoList.jsx',
  },

  search: {
    explanation: 'The Search component combines debouncing (to reduce computation) with useMemo (to cache results). The custom useDebounce hook delays the search value, preventing filtering on every keystroke.',
    hints: [
      {
        title: 'Debounce Hook',
        content: 'useDebounce returns a delayed value: const debouncedSearch = useDebounce(searchText, 500). It uses useEffect with setTimeout internally.',
      },
      {
        title: 'Memoized Filter',
        content: 'Use useMemo with debouncedSearch as dependency: useMemo(() => items.filter(...), [debouncedSearch])',
      },
      {
        title: 'Case-Insensitive Match',
        content: 'Convert both search and item text to lowercase: item.name.toLowerCase().includes(search.toLowerCase())',
      },
    ],
    filename: 'Search.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Search.jsx',
  },

  timer: {
    explanation: 'The Timer uses useRef to store the interval ID (persists across renders without causing re-renders) and useEffect for cleanup. useState tracks time and running state.',
    hints: [
      {
        title: 'Ref for Interval',
        content: 'Use useRef(null) to store the interval ID. This persists across renders without triggering re-renders.',
      },
      {
        title: 'Start/Stop Logic',
        content: 'Start: intervalRef.current = setInterval(...). Stop: clearInterval(intervalRef.current).',
      },
      {
        title: 'Cleanup Effect',
        content: 'useEffect cleanup clears interval on unmount: useEffect(() => { return () => clearInterval(intervalRef.current); }, []);',
      },
    ],
    filename: 'Timer.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Timer.jsx',
  },

  'window-resizer': {
    explanation: 'Window Resizer adds a resize event listener in useEffect and cleans it up on unmount. State tracks the current dimensions, updated by the event handler.',
    hints: [
      {
        title: 'Initial Dimensions',
        content: 'Initialize state with current window size: useState({ width: window.innerWidth, height: window.innerHeight })',
      },
      {
        title: 'Event Listener',
        content: 'In useEffect, add listener: window.addEventListener("resize", handleResize)',
      },
      {
        title: 'Cleanup',
        content: 'Return cleanup function: return () => window.removeEventListener("resize", handleResize)',
      },
    ],
    filename: 'WindowResizer.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/WindowResizer.jsx',
  },

  'fetch-users': {
    explanation: 'Data fetching uses useEffect with async/await, managing loading and error states. AbortController cancels in-flight requests when the component unmounts, preventing state updates on unmounted components.',
    hints: [
      {
        title: 'Multiple States',
        content: 'Track three states: data (users array), loading (boolean), and error (string or null).',
      },
      {
        title: 'Async in useEffect',
        content: 'Define async function inside useEffect and call it immediately. Set loading before fetch, update data/error after.',
      },
      {
        title: 'AbortController',
        content: 'Create controller, pass signal to fetch, call controller.abort() in cleanup. Check if error is AbortError before setting error state.',
      },
    ],
    filename: 'FetchUsers.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/FetchUsers.jsx',
  },

  table: {
    explanation: 'The Table (Tabbed Content) component uses useState to track the active tab index. When a tab is clicked, the index updates and the corresponding content is shown using conditional rendering with the hidden attribute.',
    hints: [
      {
        title: 'Track Active Tab',
        content: 'Use useState(0) to store the index of the currently active tab. Initialize to 0 to show the first tab by default.',
      },
      {
        title: 'Dynamic Styling',
        content: 'Apply conditional styles based on whether the current index matches activeTab: style={{ color: activeTab === idx ? "green" : "black" }}',
      },
      {
        title: 'Show/Hide Content',
        content: 'Use the hidden attribute to show only the active content: hidden={idx !== activeTab}. This keeps all content in the DOM but only displays the selected one.',
      },
    ],
    filename: 'Table.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Table.jsx',
  },

  pagination: {
    explanation: 'Pagination uses useMemo to efficiently calculate which items to display based on the current page and items per page. The component manages multiple state values and handles boundary conditions for navigation.',
    hints: [
      {
        title: 'Calculate Page Bounds',
        content: 'Calculate startIndex as (currentPage - 1) * itemsPerPage. Use array.slice(startIndex, startIndex + itemsPerPage) to get visible items.',
      },
      {
        title: 'Memoize Visible Rows',
        content: 'Wrap the calculation in useMemo with [data, itemsPerPage, currentPage] as dependencies to avoid recalculating on every render.',
      },
      {
        title: 'Boundary Checking',
        content: 'Disable Previous when currentPage <= 1. Calculate totalPages as Math.ceil(data.length / itemsPerPage) and disable Next when currentPage >= totalPages.',
      },
    ],
    filename: 'Pagination.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Pagination.jsx',
  },

  'shopping-cart': {
    explanation: 'The Shopping Cart uses useReducer for managing complex cart state with multiple actions (add, remove, update, clear). useMemo optimizes total price and item count calculations.',
    hints: [
      {
        title: 'useReducer Setup',
        content: 'Use useReducer(cartReducer, []) instead of useState for complex state. The reducer handles actions like ADD_ITEM, REMOVE_ITEM based on action.type.',
      },
      {
        title: 'Handling Duplicate Items',
        content: 'In ADD_ITEM action, first check if item exists with state.find(). If it does, map over state and update quantity. If not, spread and add new item.',
      },
      {
        title: 'Memoized Totals',
        content: 'Use useMemo with cartItems as dependency: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) for efficient total calculation.',
      },
    ],
    filename: 'ShoppingCart.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/ShoppingCart.jsx',
  },

  'form-validation': {
    explanation: 'Form Validation uses useState for form data and touched state, useMemo for efficient validation and password strength calculation, and proper accessibility attributes.',
    hints: [
      {
        title: 'Touched State Pattern',
        content: 'Track which fields have been touched with a separate state object. Only show errors for touched fields to avoid overwhelming users on initial render.',
      },
      {
        title: 'Memoized Validation',
        content: 'Use useMemo to compute validation errors: useMemo(() => ({ name: validateField("name", formData.name), ... }), [formData]). This avoids recalculating on every render.',
      },
      {
        title: 'Password Strength',
        content: 'Calculate strength by checking multiple regex patterns (uppercase, lowercase, number, special char). Return a score object with checks, score (0-5), label, and color.',
      },
      {
        title: 'Accessibility',
        content: 'Use aria-invalid on inputs, role="alert" for error messages, aria-describedby to link inputs to their requirements, and proper label associations.',
      },
    ],
    filename: 'FormWithValidation.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/FormWithValidation.jsx',
  },

  'product-filters': {
    explanation: 'Product Filters uses useReducer for managing multiple filter states (search, category, stock) in a predictable way. The debounced search prevents excessive re-filtering, and useMemo optimizes the filtered results calculation.',
    hints: [
      {
        title: 'useReducer for Filters',
        content: 'Use useReducer to manage filter state with actions like SET_SEARCH, SET_CATEGORY, TOGGLE_IN_STOCK, CLEAR_FILTERS. This makes state updates predictable and easier to debug.',
      },
      {
        title: 'Debounced Search',
        content: 'Pass the search text through useDebounce hook: const debouncedSearch = useDebounce(state.searchText, 300). Use the debounced value in your filter logic to reduce computations.',
      },
      {
        title: 'Combined Filters',
        content: 'Chain filter conditions: products.filter(p => matchesSearch(p) && matchesCategory(p) && matchesStock(p)). Each condition checks against the relevant filter state.',
      },
      {
        title: 'Memoized Results',
        content: 'Wrap filtered products in useMemo with filter state as dependencies: useMemo(() => products.filter(...), [debouncedSearch, category, inStockOnly]). This prevents recalculation on unrelated re-renders.',
      },
    ],
    filename: 'ProductFilters.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/ProductFilters.jsx',
  },

  'notes-app': {
    explanation: 'The Notes App demonstrates building a custom useLocalStorage hook that syncs React state with browser localStorage. The hook handles JSON serialization, lazy initialization, and cross-tab synchronization via the storage event.',
    hints: [
      {
        title: 'Lazy Initialization',
        content: 'Use a function in useState to read from localStorage only once: useState(() => { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : initialValue; })',
      },
      {
        title: 'Sync on Update',
        content: 'Create an updateValue function that both updates React state and writes to localStorage: setValue(newValue); localStorage.setItem(key, JSON.stringify(newValue));',
      },
      {
        title: 'Cross-Tab Sync',
        content: 'Listen to the "storage" event in useEffect: window.addEventListener("storage", (e) => { if (e.key === key) setValue(JSON.parse(e.newValue)); }). Clean up on unmount.',
      },
      {
        title: 'Error Handling',
        content: 'Wrap localStorage operations in try-catch blocks to handle cases where localStorage is unavailable (private browsing, storage quota exceeded, etc.).',
      },
    ],
    filename: 'NotesApp.jsx',
    githubUrl: 'https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/NotesApp.jsx',
  },
};

/**
 * Get solution by challenge ID
 */
export const getSolutionById = (id) => solutions[id] || null;
