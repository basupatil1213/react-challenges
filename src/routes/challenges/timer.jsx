/**
 * Timer Challenge Route
 * 
 * Demonstrates useEffect cleanup and useRef for interval management.
 * Shows proper handling of side effects and mutable references.
 * 
 * @module routes/challenges/timer
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect, useRef } from 'react';

/**
 * Timer Component
 * 
 * A stopwatch timer that demonstrates:
 * - useRef for storing interval IDs without triggering re-renders
 * - useEffect for managing side effects with proper cleanup
 * - Start, pause, and reset functionality
 * - Proper interval cleanup to prevent memory leaks
 */
const Timer = () => {
  // Time in seconds
  const [time, setTime] = useState(0);
  // Whether the timer is currently running
  const [isRunning, setIsRunning] = useState(false);
  // Ref to store the interval ID (doesn't cause re-renders when changed)
  const intervalRef = useRef(null);

  /**
   * Effect to manage the timer interval
   * Creates interval when running, cleans up when stopped or unmounted
   */
  useEffect(() => {
    if (isRunning) {
      // Start the interval and store ID in ref
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup function - runs when isRunning changes or component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  /**
   * Formats seconds into HH:MM:SS format
   * 
   * @param {number} totalSeconds - Total seconds to format
   * @returns {Object} Object with hours, minutes, seconds
   */
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const formattedTime = formatTime(time);

  /**
   * Starts the timer
   */
  const handleStart = () => {
    setIsRunning(true);
  };

  /**
   * Pauses the timer
   */
  const handlePause = () => {
    setIsRunning(false);
  };

  /**
   * Resets the timer to zero and stops it
   */
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-8">
      {/* Timer display */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* Hours */}
          <div className="bg-bg-secondary rounded-lg p-4 min-w-[80px]">
            <p className="text-4xl font-bold text-text-primary font-mono">
              {formattedTime.hours}
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
              Hours
            </p>
          </div>

          <span className="text-4xl font-bold text-text-muted">:</span>

          {/* Minutes */}
          <div className="bg-bg-secondary rounded-lg p-4 min-w-[80px]">
            <p className="text-4xl font-bold text-text-primary font-mono">
              {formattedTime.minutes}
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
              Minutes
            </p>
          </div>

          <span className="text-4xl font-bold text-text-muted">:</span>

          {/* Seconds */}
          <div className="bg-bg-secondary rounded-lg p-4 min-w-[80px]">
            <p className="text-4xl font-bold text-text-primary font-mono">
              {formattedTime.seconds}
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
              Seconds
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isRunning ? 'bg-success animate-pulse' : 'bg-text-muted'
            }`}
          />
          <span className="text-sm text-text-muted">
            {isRunning ? 'Running' : time > 0 ? 'Paused' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-success text-white font-medium rounded-lg hover:bg-success-hover transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {time > 0 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-8 py-3 bg-warning text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
            Pause
          </button>
        )}

        <button
          onClick={handleReset}
          disabled={time === 0 && !isRunning}
          className="px-8 py-3 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const TimerChallengePage = () => {
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
            <span className="text-text-primary font-medium">Timer</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">⏱️</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Timer Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Create a fully functional timer with start, pause, and reset controls. 
            Learn useEffect cleanup and useRef for interval management.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Timer.jsx"
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
        <Timer />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">useRef for Mutable Values</p>
                <p className="text-sm text-text-secondary">Store interval IDs in refs to persist across renders without causing re-renders.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">useEffect Cleanup</p>
                <p className="text-sm text-text-secondary">Return a cleanup function to clear intervals and prevent memory leaks.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Dependency Array</p>
                <p className="text-sm text-text-secondary">Control when effects run by specifying the correct dependencies.</p>
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
export const Route = createFileRoute('/challenges/timer')({
  component: TimerChallengePage,
});
