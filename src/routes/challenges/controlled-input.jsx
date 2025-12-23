/**
 * Controlled Input Challenge Route
 * 
 * Demonstrates the controlled component pattern with form inputs.
 * Shows how to manage input state and synchronize UI with React state.
 * 
 * @module routes/challenges/controlled-input
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

/**
 * ControlledInput Component
 * 
 * A controlled input that demonstrates:
 * - Binding input value to state
 * - Handling onChange events
 * - Two-way data binding pattern
 * - Programmatic input clearing
 */
const ControlledInput = () => {
  // State to hold the input value
  const [text, setText] = useState('');

  // Character count for display
  const charCount = text.length;
  const maxChars = 100;

  /**
   * Handles input change events
   * Updates state with the new input value
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event
   */
  const handleChange = (event) => {
    const value = event.target.value;
    // Optionally limit character count
    if (value.length <= maxChars) {
      setText(value);
    }
  };

  /**
   * Clears the input field
   */
  const handleClear = () => {
    setText('');
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-8">
      {/* Input section */}
      <div className="mb-6">
        <label
          htmlFor="controlled-input"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          Enter some text
        </label>
        <div className="relative">
          <input
            id="controlled-input"
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Type something..."
            className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          {text && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Clear input"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-xs text-text-muted">
            The input is controlled by React state
          </p>
          <p className={`text-xs ${charCount > maxChars * 0.8 ? 'text-warning' : 'text-text-muted'}`}>
            {charCount}/{maxChars}
          </p>
        </div>
      </div>

      {/* Live preview */}
      <div className="mb-6">
        <p className="text-sm font-medium text-text-primary mb-2">Live Preview:</p>
        <div className="p-4 bg-bg-secondary rounded-lg border border-border min-h-[60px]">
          {text ? (
            <p className="text-text-primary break-words">{text}</p>
          ) : (
            <p className="text-text-muted italic">Your text will appear here...</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleClear}
          disabled={!text}
          className="flex-1 px-4 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Clear Input
        </button>
        <button
          onClick={() => setText('Hello, React!')}
          className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all duration-200"
        >
          Set Sample Text
        </button>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const ControlledInputChallengePage = () => {
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
            <span className="text-text-primary font-medium">Controlled Input</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Controlled Input Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-success-light text-success text-xs font-medium rounded-full">
                Beginner
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Master the controlled component pattern with text inputs and real-time 
            display. Learn how React state drives form values.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/ControlledInput.jsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Source on GitHub
          </a>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ControlledInput />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Controlled Components</p>
                <p className="text-sm text-text-secondary">Form inputs where React state is the "single source of truth".</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Two-Way Data Binding</p>
                <p className="text-sm text-text-secondary">Synchronize UI display with state through value and onChange props.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Programmatic Control</p>
                <p className="text-sm text-text-secondary">Clear or set input values programmatically through state updates.</p>
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
export const Route = createFileRoute('/challenges/controlled-input')({
  component: ControlledInputChallengePage,
});
