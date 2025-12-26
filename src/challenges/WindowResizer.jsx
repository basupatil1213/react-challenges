/**
 * WindowResizer Component
 * 
 * Tracks and displays window dimensions that demonstrates:
 * - useEffect for adding window event listeners
 * - Proper cleanup to remove listeners on unmount
 * - Real-time state updates from browser events
 * - Accessing window properties
 */

import { useState, useEffect } from 'react';

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

export default WindowResizer;