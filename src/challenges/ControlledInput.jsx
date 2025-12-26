/**
 * ControlledInput Component
 * 
 * A controlled input that demonstrates:
 * - Binding input value to state
 * - Handling onChange events
 * - Two-way data binding pattern
 * - Programmatic input clearing
 */

import { useState } from 'react';

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

export default ControlledInput;