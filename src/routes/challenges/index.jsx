/**
 * Challenges Index Route
 * 
 * Displays all available React challenges in a grid layout.
 * Allows users to filter challenges by difficulty level and category.
 * 
 * @module routes/challenges/index
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { challenges, difficultyConfig, categoryConfig, getCategoryCounts } from '../../data/challenges';

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
 * Button for filtering challenges by difficulty or category.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Button label
 * @param {boolean} props.isActive - Whether this filter is active
 * @param {Function} props.onClick - Click handler
 * @param {number} props.count - Number of challenges matching this filter
 * @param {string} props.icon - Optional icon for the button
 */
const FilterButton = ({ label, isActive, onClick, count, icon }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2';
  const activeClasses = isActive
    ? 'bg-primary text-white'
    : 'bg-bg-primary border border-border text-text-secondary hover:border-primary hover:text-primary';

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {icon && <span>{icon}</span>}
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
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get category counts
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  // Memoized filtered challenges for performance
  const filteredChallenges = useMemo(() => {
    return challenges.filter((c) => {
      const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      return matchesDifficulty && matchesCategory;
    });
  }, [selectedDifficulty, selectedCategory]);

  // Count challenges by difficulty (respecting category filter)
  const difficultyCounts = useMemo(() => {
    const baseList = selectedCategory === 'All' 
      ? challenges 
      : challenges.filter(c => c.category === selectedCategory);
    return {
      All: baseList.length,
      Beginner: baseList.filter((c) => c.difficulty === 'Beginner').length,
      Intermediate: baseList.filter((c) => c.difficulty === 'Intermediate').length,
      Advanced: baseList.filter((c) => c.difficulty === 'Advanced').length,
    };
  }, [selectedCategory]);

  // Reset difficulty when switching categories if current selection has no results
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newFiltered = challenges.filter(c => 
      (category === 'All' || c.category === category) && 
      (selectedDifficulty === 'All' || c.difficulty === selectedDifficulty)
    );
    if (newFiltered.length === 0) {
      setSelectedDifficulty('All');
    }
  };

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
        {/* Category filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-muted mb-3">Category</h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(categoryConfig).map((category) => (
              <FilterButton
                key={category}
                label={category}
                icon={categoryConfig[category]?.icon}
                isActive={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
                count={categoryCounts[category] || 0}
              />
            ))}
          </div>
        </div>

        {/* Difficulty filters */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-text-muted mb-3">Difficulty</h3>
          <div className="flex flex-wrap gap-3">
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
