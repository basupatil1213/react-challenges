/**
 * Challenges Index Route
 * 
 * Displays all available React challenges in a grid layout.
 * Allows users to filter challenges by difficulty level.
 * 
 * @module routes/challenges/index
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';

/**
 * Complete challenge metadata
 * Contains all information needed to display challenge cards
 */
const challenges = [
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
    description: 'Create a real-time search filter with memoized results for optimal performance.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useMemo', 'String Methods', 'Filtering'],
    icon: '🔍',
    learningPoints: [
      'Implement search logic',
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
const difficultyConfig = {
  All: { color: 'bg-bg-tertiary text-text-primary', order: 0 },
  Beginner: { color: 'bg-success-light text-success', order: 1 },
  Intermediate: { color: 'bg-warning-light text-warning', order: 2 },
  Advanced: { color: 'bg-danger-light text-danger', order: 3 },
};

/**
 * ChallengeCard Component
 * 
 * Detailed challenge card with learning points preview.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.challenge - Challenge data object
 */
const ChallengeCard = ({ challenge }) => {
  const diffColor = difficultyConfig[challenge.difficulty]?.color || difficultyConfig.Beginner.color;

  return (
    <Link
      to={`/challenges/${challenge.id}`}
      className="group flex flex-col bg-bg-primary rounded-xl border border-border overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      {/* Card header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{challenge.icon}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${diffColor}`}>
            {challenge.difficulty}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {challenge.title}
        </h3>
        <p className="text-text-secondary text-sm line-clamp-2">
          {challenge.description}
        </p>
      </div>

      {/* Learning points */}
      <div className="px-6 pb-4 flex-1">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          What you'll learn
        </p>
        <ul className="space-y-1">
          {challenge.learningPoints.slice(0, 3).map((point, index) => (
            <li key={index} className="text-text-secondary text-sm flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Concepts footer */}
      <div className="px-6 py-4 bg-bg-secondary border-t border-border">
        <div className="flex flex-wrap gap-2">
          {challenge.concepts.slice(0, 3).map((concept) => (
            <span
              key={concept}
              className="px-2 py-1 bg-bg-primary text-text-muted text-xs rounded-md border border-border"
            >
              {concept}
            </span>
          ))}
          {challenge.concepts.length > 3 && (
            <span className="px-2 py-1 text-text-muted text-xs">
              +{challenge.concepts.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

/**
 * FilterButton Component
 * 
 * Button for filtering challenges by difficulty.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Button label
 * @param {boolean} props.isActive - Whether this filter is active
 * @param {Function} props.onClick - Click handler
 * @param {number} props.count - Number of challenges matching this filter
 */
const FilterButton = ({ label, isActive, onClick, count }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2';
  const activeClasses = isActive
    ? 'bg-primary text-white'
    : 'bg-bg-primary border border-border text-text-secondary hover:border-primary hover:text-primary';

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {label}
      <span className={`text-xs ${isActive ? 'bg-white/20' : 'bg-bg-tertiary'} px-2 py-0.5 rounded-full`}>
        {count}
      </span>
    </button>
  );
};

/**
 * Challenges Page Component
 * 
 * Main challenges listing page with filtering capability.
 */
const ChallengesPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Memoized filtered challenges for performance
  const filteredChallenges = useMemo(() => {
    if (selectedDifficulty === 'All') return challenges;
    return challenges.filter((c) => c.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  // Count challenges by difficulty
  const difficultyCounts = useMemo(() => ({
    All: challenges.length,
    Beginner: challenges.filter((c) => c.difficulty === 'Beginner').length,
    Intermediate: challenges.filter((c) => c.difficulty === 'Intermediate').length,
    Advanced: challenges.filter((c) => c.difficulty === 'Advanced').length,
  }), []);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            React Challenges
          </h1>
          <p className="text-text-secondary max-w-2xl">
            Explore our collection of React challenges designed to help you master 
            hooks, state management, and modern React patterns. Each challenge includes 
            practical examples and learning objectives.
          </p>
        </div>
      </section>

      {/* Filters and content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(difficultyConfig).map((difficulty) => (
            <FilterButton
              key={difficulty}
              label={difficulty}
              isActive={selectedDifficulty === difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              count={difficultyCounts[difficulty]}
            />
          ))}
        </div>

        {/* Challenge grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>

        {/* Empty state */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No challenges found for this filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};

/**
 * Route Definition
 */
export const Route = createFileRoute('/challenges/')({
  component: ChallengesPage,
});
