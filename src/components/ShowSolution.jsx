/**
 * ShowSolution Component
 * 
 * A collapsible component that reveals challenge solutions with
 * progressive hints and code display.
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
 * CodeBlock Component
 * 
 * Displays formatted code with syntax highlighting placeholder.
 */
const CodeBlock = ({ code, filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-border">
        <span className="text-sm text-text-muted font-mono">{filename}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 bg-[#1e1e1e] overflow-x-auto">
        <code className="text-sm text-gray-200 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
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
 * @param {string} props.solution.code - Solution code
 * @param {string} props.solution.filename - Code filename
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

          {/* Solution code - only show after all hints revealed or if no hints */}
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
                  Reveal Solution Code
                </button>
              ) : (
                <div>
                  <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                    Solution Code
                  </h3>
                  <CodeBlock code={solution.code} filename={solution.filename} />
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
