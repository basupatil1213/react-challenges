/**
 * useToggle Hook
 * 
 * A simple hook for managing boolean toggle state.
 * Provides a value and a function to toggle it.
 * 
 * @param {boolean} initialValue - The initial toggle state
 * @returns {[boolean, Function]} Tuple of [value, toggleFunction]
 * 
 * @example
 * const [isOpen, toggleOpen] = useToggle(false);
 * 
 * return (
 *   <button onClick={toggleOpen}>
 *     {isOpen ? 'Close' : 'Open'}
 *   </button>
 * );
 */

import { useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle];
};
