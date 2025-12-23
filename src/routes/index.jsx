/**
 * Home Page Route
 * 
 * Landing page for the React Practice application.
 * Displays an overview of the application and quick links to challenges.
 * 
 * @module routes/index
 */

import { createFileRoute, Link } from '@tanstack/react-router';

/**
 * Challenge cards data configuration
 * Each card represents a React concept with its metadata
 */
const challengeCards = [
  {
    id: 'counter',
    title: 'Counter',
    description: 'Learn useState hook with increment and decrement functionality.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Event Handling'],
    icon: '🔢',
  },
  {
    id: 'toggle-theme',
    title: 'Toggle Theme',
    description: 'Implement theme switching with state management.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Conditional Styling'],
    icon: '🌓',
  },
  {
    id: 'controlled-input',
    title: 'Controlled Input',
    description: 'Master controlled components with form inputs.',
    difficulty: 'Beginner',
    concepts: ['useState', 'Controlled Components'],
    icon: '📝',
  },
  {
    id: 'todo-list',
    title: 'Todo List',
    description: 'Build a full-featured todo application with CRUD operations.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useMemo', 'Array Methods'],
    icon: '✅',
  },
  {
    id: 'search',
    title: 'Search Filter',
    description: 'Implement real-time search with optimized filtering.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useMemo', 'Filtering'],
    icon: '🔍',
  },
  {
    id: 'timer',
    title: 'Timer',
    description: 'Create a timer with useEffect cleanup and useRef.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useEffect', 'useRef'],
    icon: '⏱️',
  },
  {
    id: 'window-resizer',
    title: 'Window Resizer',
    description: 'Track window dimensions with event listeners.',
    difficulty: 'Intermediate',
    concepts: ['useState', 'useEffect', 'Event Listeners'],
    icon: '📐',
  },
  {
    id: 'fetch-users',
    title: 'Fetch Users',
    description: 'Handle API calls with loading states and error handling.',
    difficulty: 'Advanced',
    concepts: ['useState', 'useEffect', 'Async/Await', 'AbortController'],
    icon: '👥',
  },
];

/**
 * Difficulty badge color mapping
 */
const difficultyColors = {
  Beginner: 'bg-success-light text-success',
  Intermediate: 'bg-warning-light text-warning',
  Advanced: 'bg-danger-light text-danger',
};

/**
 * ChallengeCard Component
 * 
 * Renders an individual challenge card with hover effects.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.challenge - Challenge data object
 */
const ChallengeCard = ({ challenge }) => {
  return (
    <Link
      to={`/challenges/${challenge.id}`}
      className="group block bg-bg-primary rounded-xl border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      {/* Card header with icon and difficulty */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{challenge.icon}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
      </div>

      {/* Card content */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
        {challenge.title}
      </h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {challenge.description}
      </p>

      {/* Concepts tags */}
      <div className="flex flex-wrap gap-2">
        {challenge.concepts.map((concept) => (
          <span
            key={concept}
            className="px-2 py-1 bg-bg-tertiary text-text-muted text-xs rounded-md"
          >
            {concept}
          </span>
        ))}
      </div>
    </Link>
  );
};

/**
 * Hero Section Component
 * 
 * Main hero section with title and call-to-action.
 */
const HeroSection = () => {
  return (
    <section className="bg-bg-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Master React Through
            <span className="text-primary"> Practical Challenges</span>
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            A collection of hands-on React exercises designed to strengthen your understanding 
            of hooks, state management, and component patterns.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/challenges"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              View All Challenges
            </Link>
            <a
              href="https://react.dev/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-text-primary font-medium rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              React Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Stats Section Component
 * 
 * Displays key statistics about the challenges.
 */
const StatsSection = () => {
  const stats = [
    { label: 'Challenges', value: '8' },
    { label: 'React Hooks', value: '4+' },
    { label: 'Difficulty Levels', value: '3' },
  ];

  return (
    <section className="bg-bg-primary border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Home Page Component
 * 
 * Main home page layout combining hero, stats, and challenge cards.
 */
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      
      {/* Challenge cards section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-primary">Featured Challenges</h2>
          <Link
            to="/challenges"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challengeCards.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>
    </div>
  );
};

/**
 * Route Definition
 * 
 * Creates the index route for the home page.
 */
export const Route = createFileRoute('/')({
  component: HomePage,
});
