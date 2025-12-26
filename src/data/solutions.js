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
    code: `const Counter = () => {
  const [count, setCount] = useState(0);
  const MIN = 0;
  const MAX = 10;

  return (
    <div>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(prev => prev - 1)}
        disabled={count <= MIN}
      >
        Decrement
      </button>
      <button 
        onClick={() => setCount(prev => prev + 1)}
        disabled={count >= MAX}
      >
        Increment
      </button>
    </div>
  );
};`,
    filename: 'Counter.jsx',
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
    code: `const ToggleTheme = () => {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: { backgroundColor: '#ffffff', color: '#000000' },
    dark: { backgroundColor: '#1a1a1a', color: '#ffffff' },
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={themes[theme]}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};`,
    filename: 'ToggleTheme.jsx',
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
    code: `const ControlledInput = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};`,
    filename: 'ControlledInput.jsx',
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
    code: `// useToggle hook
export const useToggle = (initial = false) => {
  const [state, setState] = useState(initial);
  const toggle = () => setState(prev => !prev);
  return [state, toggle, setState];
};

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};`,
    filename: 'Modal.jsx',
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
    code: `const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { 
      id: crypto.randomUUID(), 
      text: input, 
      completed: false 
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => 
      t.id === id ? {...t, completed: !t.completed} : t
    ));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  return (/* JSX */);
};`,
    filename: 'TodoList.jsx',
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
    code: `// useDebounce hook
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// Search component
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);

  const filteredItems = useMemo(() => {
    const search = debouncedSearch.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(search)
    );
  }, [debouncedSearch]);

  return (/* JSX */);
};`,
    filename: 'Search.jsx',
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
    code: `const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (/* JSX */);
};`,
    filename: 'Timer.jsx',
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
    code: `const WindowResizer = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <p>Width: {dimensions.width}px</p>
      <p>Height: {dimensions.height}px</p>
    </div>
  );
};`,
    filename: 'WindowResizer.jsx',
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
    code: `const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal }
        );
        const data = await res.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (/* render users */);
};`,
    filename: 'FetchUsers.jsx',
  },
};

/**
 * Get solution by challenge ID
 */
export const getSolutionById = (id) => solutions[id] || null;
