/**
 * Toggle Theme Challenge Route
 * 
 * Demonstrates state-driven styling with a theme toggle feature.
 * Shows how to manage theme state and apply conditional styles.
 * 
 * @module routes/challenges/toggle-theme
 */

import { createFileRoute, Link } from '@tanstack/react-router';
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

/**
 * ToggleTheme Component
 * 
 * A theme toggle that demonstrates:
 * - useState for managing theme state
 * - Object lookup patterns for theme configuration
 * - Dynamic inline styles based on state
 * - Toggle functionality between two states
 */
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

/**
 * Challenge Page Layout Component
 */
const ToggleThemeChallengePage = () => {
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
            <span className="text-text-primary font-medium">Toggle Theme</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🌓</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Toggle Theme Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-success-light text-success text-xs font-medium rounded-full">
                Beginner
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Implement a theme toggle between light and dark modes using state-driven 
            styling and conditional rendering.
          </p>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToggleTheme />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">State-Driven Styling</p>
                <p className="text-sm text-text-secondary">Apply styles dynamically based on component state.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Object Lookup Pattern</p>
                <p className="text-sm text-text-secondary">Use configuration objects to manage multiple theme variants.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Toggle Logic</p>
                <p className="text-sm text-text-secondary">Implement binary toggle between two states using ternary operators.</p>
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
export const Route = createFileRoute('/challenges/toggle-theme')({
  component: ToggleThemeChallengePage,
});
