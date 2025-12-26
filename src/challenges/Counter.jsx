/**
 * Counter Component
 * 
 * A simple counter that demonstrates:
 * - useState hook for managing numeric state
 * - Event handlers for user interactions
 * - Conditional button disabling
 * - Functional state updates
 */

import { useState } from 'react';

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

export default Counter;