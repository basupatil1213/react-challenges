/**
 * ToggleTheme Component
 * 
 * A theme toggle that demonstrates:
 * - useState for managing theme state
 * - Object lookup patterns for theme configuration
 * - Dynamic inline styles based on state
 * - Toggle functionality between two states
 */

import { useState } from 'react';

/**
 * Theme configuration object
 * Defines styles for each theme variant
 */
const themeConfig = {
  dark: {
    name: 'Dark',
    backgroundColor: '#1e293b',
    textColor: '#f1f5f9',
    buttonBg: '#334155',
    buttonText: '#f1f5f9',
    borderColor: '#475569',
    accentColor: '#3b82f6',
  },
  light: {
    name: 'Light',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    buttonBg: '#f1f5f9',
    buttonText: '#1e293b',
    borderColor: '#e2e8f0',
    accentColor: '#2563eb',
  },
};

const ToggleTheme = () => {
  // Initialize theme state with 'dark' as default
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Get current theme configuration
  const theme = themeConfig[currentTheme];

  /**
   * Toggles between light and dark themes
   */
  const handleToggle = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className="rounded-xl border p-8 transition-all duration-300"
      style={{
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor,
      }}
    >
      {/* Theme indicator */}
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: theme.buttonBg }}
        >
          <span className="text-2xl">{currentTheme === 'dark' ? '🌙' : '☀️'}</span>
          <span style={{ color: theme.textColor }} className="font-medium">
            {theme.name} Mode
          </span>
        </div>

        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: theme.textColor }}
        >
          Theme Toggle Demo
        </h3>
        <p
          className="text-sm opacity-80"
          style={{ color: theme.textColor }}
        >
          Click the button below to switch between themes
        </p>
      </div>

      {/* Sample content */}
      <div
        className="rounded-lg p-6 mb-6"
        style={{
          backgroundColor: theme.buttonBg,
          borderColor: theme.borderColor,
        }}
      >
        <p style={{ color: theme.textColor }} className="mb-4">
          This is sample content that changes appearance based on the selected theme. 
          Notice how all elements update their colors smoothly.
        </p>
        <div className="flex gap-3">
          <span
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: theme.accentColor,
              color: '#ffffff',
            }}
          >
            Tag One
          </span>
          <span
            className="px-3 py-1 rounded-full text-sm font-medium border"
            style={{
              borderColor: theme.borderColor,
              color: theme.textColor,
            }}
          >
            Tag Two
          </span>
        </div>
      </div>

      {/* Toggle button */}
      <div className="text-center">
        <button
          onClick={handleToggle}
          className="px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: theme.accentColor,
            color: '#ffffff',
          }}
        >
          Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default ToggleTheme;