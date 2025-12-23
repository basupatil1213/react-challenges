/**
 * Window Resizer Challenge Route
 * 
 * Demonstrates window event listeners with proper cleanup.
 * Shows how to track and display browser dimensions in real-time.
 * 
 * @module routes/challenges/window-resizer
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

/**
 * WindowResizer Component
 * 
 * Tracks and displays window dimensions that demonstrates:
 * - useEffect for adding window event listeners
 * - Proper cleanup to remove listeners on unmount
 * - Real-time state updates from browser events
 * - Accessing window properties
 */
const WindowResizer = () => {
  // State for window dimensions
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  /**
   * Effect to set up window resize listener
   * Adds listener on mount, removes on unmount
   */
  useEffect(() => {
    /**
     * Handler for window resize events
     * Updates state with new dimensions
     */
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function - remove listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array = run once on mount

  /**
   * Determines the device category based on width
   * 
   * @param {number} width - Window width in pixels
   * @returns {Object} Device info with name and icon
   */
  const getDeviceInfo = (width) => {
    if (width < 640) {
      return { name: 'Mobile', icon: '📱', color: 'text-danger' };
    } else if (width < 768) {
      return { name: 'Small Tablet', icon: '📱', color: 'text-warning' };
    } else if (width < 1024) {
      return { name: 'Tablet', icon: '📋', color: 'text-warning' };
    } else if (width < 1280) {
      return { name: 'Laptop', icon: '💻', color: 'text-success' };
    } else {
      return { name: 'Desktop', icon: '🖥️', color: 'text-primary' };
    }
  };

  const deviceInfo = getDeviceInfo(windowWidth);

  /**
   * Calculates the aspect ratio
   * 
   * @returns {string} Aspect ratio string
   */
  const getAspectRatio = () => {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(windowWidth, windowHeight);
    return `${windowWidth / divisor}:${windowHeight / divisor}`;
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Main display */}
      <div className="p-8 text-center">
        {/* Device indicator */}
        <div className="mb-6">
          <span className="text-6xl block mb-2">{deviceInfo.icon}</span>
          <p className={`text-lg font-semibold ${deviceInfo.color}`}>
            {deviceInfo.name}
          </p>
        </div>

        {/* Dimension cards */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Width */}
          <div className="bg-bg-secondary rounded-xl p-6 min-w-[140px]">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-1">
              Width
            </p>
            <p className="text-3xl font-bold text-text-primary font-mono">
              {windowWidth}
              <span className="text-lg text-text-muted ml-1">px</span>
            </p>
          </div>

          {/* Separator */}
          <span className="text-3xl text-text-muted">×</span>

          {/* Height */}
          <div className="bg-bg-secondary rounded-xl p-6 min-w-[140px]">
            <p className="text-text-muted text-sm uppercase tracking-wider mb-1">
              Height
            </p>
            <p className="text-3xl font-bold text-text-primary font-mono">
              {windowHeight}
              <span className="text-lg text-text-muted ml-1">px</span>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <p className="text-text-muted text-sm">
          Aspect Ratio: <span className="font-mono font-medium text-text-primary">{getAspectRatio()}</span>
        </p>
      </div>

      {/* Breakpoint indicators */}
      <div className="bg-bg-secondary border-t border-border px-6 py-4">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
          Tailwind Breakpoints
        </p>
        <div className="flex items-center gap-2">
          {[
            { name: 'sm', min: 640, active: windowWidth >= 640 },
            { name: 'md', min: 768, active: windowWidth >= 768 },
            { name: 'lg', min: 1024, active: windowWidth >= 1024 },
            { name: 'xl', min: 1280, active: windowWidth >= 1280 },
            { name: '2xl', min: 1536, active: windowWidth >= 1536 },
          ].map((bp) => (
            <div
              key={bp.name}
              className={`flex-1 text-center py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                bp.active
                  ? 'bg-primary text-white'
                  : 'bg-bg-primary text-text-muted border border-border'
              }`}
            >
              <span className="block font-semibold">{bp.name}</span>
              <span className="text-xs opacity-75">{bp.min}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="px-6 py-4 bg-primary-light border-t border-border">
        <p className="text-sm text-primary text-center">
          👆 Try resizing your browser window to see the values update in real-time
        </p>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const WindowResizerChallengePage = () => {
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
            <span className="text-text-primary font-medium">Window Resizer</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📐</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Window Resizer Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Track and display window dimensions in real-time using event listeners. 
            Learn proper cleanup patterns for browser events.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/WindowResizer.jsx"
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
        <WindowResizer />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Window Event Listeners</p>
                <p className="text-sm text-text-secondary">Add event listeners to the window object using addEventListener.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Cleanup on Unmount</p>
                <p className="text-sm text-text-secondary">Remove event listeners in the cleanup function to prevent memory leaks.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Browser APIs</p>
                <p className="text-sm text-text-secondary">Access browser properties like window.innerWidth and window.innerHeight.</p>
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
export const Route = createFileRoute('/challenges/window-resizer')({
  component: WindowResizerChallengePage,
});
