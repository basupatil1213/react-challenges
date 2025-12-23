/**
 * Counter Challenge Route
 * 
 * Demonstrates the useState hook with a simple counter implementation.
 * Features increment, decrement, and boundary checking.
 * 
 * @module routes/challenges/counter
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

/**
 * Counter Component
 * 
 * A simple counter that demonstrates:
 * - useState hook for managing numeric state
 * - Event handlers for user interactions
 * - Conditional button disabling
 * - Functional state updates
 */
const Counter = () => {
  // Initialize counter state with default value of 0
  const [count, setCount] = useState(0);

  /**
   * Decrements the counter by 1
   * Uses functional update to ensure correct value with rapid clicks
   */
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  /**
   * Increments the counter by 1
   * Uses functional update to ensure correct value with rapid clicks
   */
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  /**
   * Resets the counter to 0
   */
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-8">
      {/* Counter display */}
      <div className="text-center mb-8">
        <p className="text-text-muted text-sm uppercase tracking-wider mb-2">
          Current Count
        </p>
        <p className="text-6xl font-bold text-text-primary tabular-nums">
          {count}
        </p>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={count <= 0}
          className="px-6 py-3 bg-danger text-white font-medium rounded-lg hover:bg-danger-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Decrement counter"
        >
          − Decrement
        </button>
        
        <button
          onClick={handleReset}
          disabled={count === 0}
          className="px-6 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label="Reset counter"
        >
          Reset
        </button>
        
        <button
          onClick={handleIncrement}
          className="px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-success-hover transition-all duration-200"
          aria-label="Increment counter"
        >
          + Increment
        </button>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 * 
 * Provides consistent layout for all challenge pages
 */
const CounterChallengePage = () => {
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
            <span className="text-text-primary font-medium">Counter</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🔢</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Counter Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-success-light text-success text-xs font-medium rounded-full">
                Beginner
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Learn the fundamental useState hook by building a simple counter with 
            increment, decrement, and boundary checking functionality.
          </p>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Counter />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">useState Hook</p>
                <p className="text-sm text-text-secondary">Initialize and manage component state with the useState hook.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Functional Updates</p>
                <p className="text-sm text-text-secondary">Use the functional form of setState to ensure correct updates based on previous state.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Conditional Disabling</p>
                <p className="text-sm text-text-secondary">Disable buttons based on state to prevent invalid actions.</p>
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
export const Route = createFileRoute('/challenges/counter')({
  component: CounterChallengePage,
});
