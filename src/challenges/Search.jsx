/**
 * Search Component
 * 
 * A search filter that demonstrates:
 * - Real-time filtering with useState
 * - Debouncing with custom useDebounce hook
 * - Memoization with useMemo for performance
 * - Case-insensitive search
 * - Empty state handling
 */

import { useState, useMemo } from 'react';
import { useDebounce } from '../hooks/use-debounce';

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

const Search = () => {
  // Search input state
  const [searchText, setSearchText] = useState('');

  const debouncedValue = useDebounce(searchText, 1000);

  /**
   * Memoized filtered results
   * Only recalculates when debouncedValue changes
   * Searches across name, color, and season fields
   */
  const filteredData = useMemo(() => {
    const query = debouncedValue.toLowerCase().trim();
    
    if (!query) return FRUITS_DATA;

    return FRUITS_DATA.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query) ||
      item.season.toLowerCase().includes(query)
    );
  }, [debouncedValue]);

  /**
   * Handles search input changes
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
 */
const FruitCard = ({ fruit, searchQuery }) => {
  /**
   * Highlights matching text in the string
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

export default Search;
