/**
 * Challenges Data
 * 
 * Central data store for all React challenge metadata.
 * Used across the application for consistent challenge information.
 * 
 * @module data/challenges
 */

/**
 * Complete challenge metadata
 * Contains all information needed to display challenge cards
 */
export const challenges = [
  {
    id: 'counter',
    title: 'Counter',
    description: 'Learn the fundamental useState hook by building a simple counter with increment, decrement, and boundary checking.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Event Handling', 'Conditional Rendering'],
    icon: '🔢',
    learningPoints: [
      'Initialize state with useState',
      'Update state based on previous value',
      'Disable buttons conditionally',
    ],
  },
  {
    id: 'toggle-theme',
    title: 'Toggle Theme',
    description: 'Implement a theme toggle between light and dark modes using state-driven styling.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Conditional Styling', 'Object Lookup'],
    icon: '🌓',
    learningPoints: [
      'Manage theme state',
      'Apply dynamic inline styles',
      'Toggle between states',
    ],
  },
  {
    id: 'controlled-input',
    title: 'Controlled Input',
    description: 'Master the controlled component pattern with text inputs and real-time display.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Controlled Components', 'Form Handling'],
    icon: '📝',
    learningPoints: [
      'Bind input value to state',
      'Handle onChange events',
      'Clear input programmatically',
    ],
  },
  {
    id: 'modal',
    title: 'Modal',
    description: 'Build a reusable modal component with custom hooks for conditional rendering and accessible markup.',
    difficulty: 'Beginner',
    concepts: ['Custom Hooks', 'Conditional Rendering', 'Children Prop', 'ARIA'],
    icon: '🪟',
    learningPoints: [
      'Create custom hooks for state logic',
      'Implement conditional rendering',
      'Build accessible modal dialogs',
    ],
  },
  {
    id: 'todo-list',
    title: 'Todo List',
    description: 'Build a complete todo application with add, delete, complete, and filter functionality.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useMemo', 'Array Methods', 'UUID Generation'],
    icon: '✅',
    learningPoints: [
      'Manage array state immutably',
      'Filter and map collections',
      'Optimize with useMemo',
    ],
  },
  {
    id: 'search',
    title: 'Search Filter',
    description: 'Create a real-time search filter with debouncing and memoized results for optimal performance.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useMemo', 'Custom Hooks', 'Debouncing'],
    icon: '🔍',
    learningPoints: [
      'Use custom useDebounce hook',
      'Memoize expensive computations',
      'Handle empty states',
    ],
  },
  {
    id: 'timer',
    title: 'Timer',
    description: 'Create a fully functional timer with start, pause, and reset controls using intervals.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useEffect', 'useRef', 'setInterval'],
    icon: '⏱️',
    learningPoints: [
      'Manage intervals with useRef',
      'Clean up effects properly',
      'Control async operations',
    ],
  },
  {
    id: 'window-resizer',
    title: 'Window Resizer',
    description: 'Track and display window dimensions in real-time using event listeners.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useEffect', 'Event Listeners', 'Cleanup'],
    icon: '📐',
    learningPoints: [
      'Add window event listeners',
      'Clean up on unmount',
      'Access window properties',
    ],
  },
  {
    id: 'fetch-users',
    title: 'Fetch Users',
    description: 'Handle asynchronous data fetching with loading states, error handling, and request cancellation.',
    difficulty: 'Advanced',
    concepts: ['useState', 'useEffect', 'Async/Await', 'AbortController'],
    icon: '👥',
    learningPoints: [
      'Fetch data in useEffect',
      'Handle loading and errors',
      'Cancel requests on unmount',
    ],
  },
];

/**
 * Difficulty configuration with colors and order
 */
export const difficultyConfig = {
  All: { color: 'bg-bg-tertiary text-text-primary', order: 0 },
  Beginner: { color: 'bg-success-light text-success', order: 1 },
  Intermediate: { color: 'bg-warning-light text-warning', order: 2 },
  Advanced: { color: 'bg-danger-light text-danger', order: 3 },
};

/**
 * Difficulty badge color mapping (simplified for card display)
 */
export const difficultyColors = {
  Beginner: 'bg-success-light text-success',
  Intermediate: 'bg-warning-light text-warning',
  Advanced: 'bg-danger-light text-danger',
};

/**
 * Get challenge statistics
 */
export const getChallengeStats = () => ({
  total: challenges.length,
  beginner: challenges.filter(c => c.difficulty === 'Beginner').length,
  intermediate: challenges.filter(c => c.difficulty === 'Intermediate').length,
  advanced: challenges.filter(c => c.difficulty === 'Advanced').length,
  hooks: ['useState', 'useEffect', 'useRef', 'useMemo'],
});
