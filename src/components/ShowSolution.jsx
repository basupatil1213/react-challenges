/**
 * ShowSolution Component
 * 
 * A collapsible component that reveals challenge solutions with
 * progressive hints and a link to the solution code on GitHub.
 * 
 * @module components/ShowSolution
 */

import { useState } from 'react';

/**
 * ChevronIcon Component
 * 
 * Animated chevron for expand/collapse indication.
 */
const ChevronIcon = ({ isOpen }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * HintCard Component
 * 
 * Displays a single hint with reveal functionality.
 */
const HintCard = ({ hint, index, isRevealed, onReveal }) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onReveal}
        className="w-full px-4 py-3 bg-bg-secondary flex items-center justify-between text-left hover:bg-bg-tertiary transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 bg-warning-light text-warning rounded-full flex items-center justify-center text-xs font-medium">
            {index + 1}
          </span>
          <span className="font-medium text-text-primary">
            {isRevealed ? hint.title : `Hint ${index + 1}`}
          </span>
        </span>
        {!isRevealed && (
          <span className="text-xs text-primary">Click to reveal</span>
        )}
      </button>
      {isRevealed && (
        <div className="px-4 py-3 bg-bg-primary">
          <p className="text-text-secondary text-sm">{hint.content}</p>
        </div>
      )}
    </div>
  );
};

/**
 * GitHubLink Component
 * 
 * Displays a link to view the solution code on GitHub.
 */
const GitHubLink = ({ url, filename }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 px-6 py-4 bg-[#24292e] text-white rounded-lg hover:bg-[#1b1f23] transition-colors"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
      <div className="text-left">
        <p className="font-medium">View Solution on GitHub</p>
        <p className="text-sm text-gray-400">{filename}</p>
      </div>
      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

/**
 * ShowSolution Component
 * 
 * Main component that manages solution visibility with hints.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.solution - Solution data object
 * @param {string} props.solution.explanation - Main explanation text
 * @param {Array} props.solution.hints - Array of hint objects
 * @param {string} props.solution.filename - Code filename
 * @param {string} props.solution.githubUrl - GitHub URL for the solution
 */
const ShowSolution = ({ solution }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);
  const [showCode, setShowCode] = useState(false);

  const toggleSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution) {
      setRevealedHints([]);
      setShowCode(false);
    }
  };

  const revealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const allHintsRevealed = solution.hints && revealedHints.length === solution.hints.length;

  return (
    <div className="mt-8 bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={toggleSolution}
        className="w-full px-6 py-4 flex items-center justify-between bg-bg-secondary hover:bg-bg-tertiary transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-text-primary">
              {showSolution ? 'Hide Solution' : 'Need Help?'}
            </h2>
            <p className="text-sm text-text-muted">
              {showSolution ? 'Click to collapse' : 'View hints and solution code'}
            </p>
          </div>
        </div>
        <ChevronIcon isOpen={showSolution} />
      </button>

      {/* Expandable content */}
      {showSolution && (
        <div className="p-6 space-y-6">
          {/* Explanation */}
          <div>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">
              Approach
            </h3>
            <p className="text-text-secondary">{solution.explanation}</p>
          </div>

          {/* Progressive hints */}
          {solution.hints && solution.hints.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                Hints ({revealedHints.length}/{solution.hints.length})
              </h3>
              <div className="space-y-2">
                {solution.hints.map((hint, index) => (
                  <HintCard
                    key={index}
                    hint={hint}
                    index={index}
                    isRevealed={revealedHints.includes(index)}
                    onReveal={() => revealHint(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Solution code link - only show after all hints revealed or if no hints */}
          {(allHintsRevealed || !solution.hints || solution.hints.length === 0) && (
            <div>
              {!showCode ? (
                <button
                  onClick={() => setShowCode(true)}
                  className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Reveal Solution
                </button>
              ) : (
                <div>
                  <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                    Solution Code
                  </h3>
                  <GitHubLink url={solution.githubUrl} filename={solution.filename} />
                </div>
              )}
            </div>
          )}

          {/* Show message if hints not all revealed */}
          {solution.hints && solution.hints.length > 0 && !allHintsRevealed && (
            <p className="text-sm text-text-muted text-center py-2">
              💡 Reveal all hints to unlock the solution code
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowSolution;
