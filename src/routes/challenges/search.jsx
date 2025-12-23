/**
 * Search Challenge Route
 * 
 * Demonstrates real-time search filtering with memoization.
 * Shows optimized filtering patterns and empty state handling.
 * 
 * @module routes/challenges/search
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';

/**
 * Sample data for searching
 * In a real application, this would come from an API
 */
const FRUITS_DATA = [
  { id: 1, name: 'Apple', emoji: '🍎', color: 'Red', season: 'Fall' },
  { id: 2, name: 'Banana', emoji: '🍌', color: 'Yellow', season: 'Year-round' },
  { id: 3, name: 'Orange', emoji: '🍊', color: 'Orange', season: 'Winter' },
  { id: 4, name: 'Mango', emoji: '🥭', color: 'Yellow', season: 'Summer' },
  { id: 5, name: 'Pineapple', emoji: '🍍', color: 'Yellow', season: 'Spring' },
  { id: 6, name: 'Grapes', emoji: '🍇', color: 'Purple', season: 'Fall' },
  { id: 7, name: 'Strawberry', emoji: '🍓', color: 'Red', season: 'Spring' },
  { id: 8, name: 'Blueberry', emoji: '🫐', color: 'Blue', season: 'Summer' },
  { id: 9, name: 'Watermelon', emoji: '🍉', color: 'Green', season: 'Summer' },
  { id: 10, name: 'Peach', emoji: '🍑', color: 'Orange', season: 'Summer' },
  { id: 11, name: 'Cherry', emoji: '🍒', color: 'Red', season: 'Summer' },
  { id: 12, name: 'Kiwi', emoji: '🥝', color: 'Green', season: 'Fall' },
];

/**
 * Search Component
 * 
 * A search filter that demonstrates:
 * - Real-time filtering with useState
 * - Memoization with useMemo for performance
 * - Case-insensitive search
 * - Empty state handling
 */
const Search = () => {
  // Search input state
  const [searchText, setSearchText] = useState('');

  /**
   * Memoized filtered results
   * Only recalculates when searchText changes
   * Searches across name, color, and season fields
   */
  const filteredData = useMemo(() => {
    const query = searchText.toLowerCase().trim();
    
    if (!query) return FRUITS_DATA;

    return FRUITS_DATA.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query) ||
      item.season.toLowerCase().includes(query)
    );
  }, [searchText]);

  /**
   * Handles search input changes
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - Change event
   */
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  /**
   * Clears the search input
   */
  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Search header */}
      <div className="p-6 border-b border-border">
        <div className="relative">
          {/* Search icon */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Search input */}
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search by name, color, or season..."
            className="w-full pl-12 pr-12 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />

          {/* Clear button */}
          {searchText && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search stats */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-primary">{filteredData.length}</span> of{' '}
            <span className="font-medium text-text-primary">{FRUITS_DATA.length}</span> results
          </p>
          {searchText && (
            <p className="text-sm text-text-muted">
              Searching for: <span className="font-medium text-primary">"{searchText}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="p-6">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredData.map((item) => (
              <FruitCard key={item.id} fruit={item} searchQuery={searchText} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-text-primary font-medium mb-2">No results found</p>
            <p className="text-text-muted text-sm">
              Try searching for a different term or{' '}
              <button onClick={handleClear} className="text-primary hover:underline">
                clear the search
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * FruitCard Component
 * 
 * Displays individual fruit information in a card format.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.fruit - Fruit data object
 * @param {string} props.searchQuery - Current search query for highlighting
 */
const FruitCard = ({ fruit, searchQuery }) => {
  /**
   * Highlights matching text in the string
   * 
   * @param {string} text - Text to highlight
   * @returns {JSX.Element} Text with highlighted matches
   */
  const highlightMatch = (text) => {
    if (!searchQuery.trim()) return text;

    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-primary-light text-primary rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-bg-secondary rounded-lg p-4 hover:bg-bg-tertiary transition-colors">
      <span className="text-4xl block text-center mb-3">{fruit.emoji}</span>
      <p className="font-medium text-text-primary text-center mb-2">
        {highlightMatch(fruit.name)}
      </p>
      <div className="space-y-1 text-xs text-text-muted text-center">
        <p>Color: {highlightMatch(fruit.color)}</p>
        <p>Season: {highlightMatch(fruit.season)}</p>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const SearchChallengePage = () => {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-bg-primary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link to="/challenges" className="text-text-muted hover:text-primary transition-colors">
              Challenges
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">Search Filter</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🔍</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Search Filter Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Create a real-time search filter with memoized results for optimal 
            performance. Learn filtering patterns and empty state handling.
          </p>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Search />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Real-time Filtering</p>
                <p className="text-sm text-text-secondary">Filter data instantly as the user types using controlled inputs.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">useMemo for Performance</p>
                <p className="text-sm text-text-secondary">Memoize filter computations to prevent unnecessary recalculations on re-renders.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Empty State UX</p>
                <p className="text-sm text-text-secondary">Handle and display meaningful empty states when no results match.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

/**
 * Route Definition
 */
export const Route = createFileRoute('/challenges/search')({
  component: SearchChallengePage,
});
