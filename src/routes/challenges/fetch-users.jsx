/**
 * Fetch Users Challenge Route
 * 
 * Demonstrates asynchronous data fetching with proper error handling.
 * Shows loading states, error handling, and request cancellation.
 * 
 * @module routes/challenges/fetch-users
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

/**
 * API endpoint for fetching users
 */
const API_ENDPOINT = 'https://dummyjson.com/users?limit=12';

/**
 * FetchUsers Component
 * 
 * Fetches and displays users from an API that demonstrates:
 * - useEffect for data fetching
 * - AbortController for request cancellation
 * - Loading and error states
 * - Async/await pattern in effects
 */
const FetchUsers = () => {
  // State for users data
  const [users, setUsers] = useState([]);
  // Loading state indicator
  const [isLoading, setIsLoading] = useState(true);
  // Error state for failed requests
  const [error, setError] = useState(null);

  /**
   * Effect to fetch users data on component mount
   * Uses AbortController to cancel request if component unmounts
   */
  useEffect(() => {
    // Create AbortController for request cancellation
    const controller = new AbortController();

    /**
     * Async function to fetch users
     * Handles loading, success, and error states
     */
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Make API request with abort signal
        const response = await fetch(API_ENDPOINT, {
          signal: controller.signal,
        });

        // Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        // Ignore abort errors (component unmounted)
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Cleanup function - abort request on unmount
    return () => {
      controller.abort();
    };
  }, []); // Empty dependency array = run once on mount

  /**
   * Handler to refetch users
   */
  const handleRefetch = () => {
    setIsLoading(true);
    setError(null);
    
    fetch(API_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  // Loading state UI
  if (isLoading) {
    return (
      <div className="bg-bg-primary rounded-xl border border-border p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-text-secondary">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="bg-bg-primary rounded-xl border border-border p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">⚠️</span>
          <p className="text-danger font-medium mb-2">Error loading users</p>
          <p className="text-text-muted text-sm mb-4">{error}</p>
          <button
            onClick={handleRefetch}
            className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state UI
  if (users.length === 0) {
    return (
      <div className="bg-bg-primary rounded-xl border border-border p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">👥</span>
          <p className="text-text-primary font-medium mb-2">No users found</p>
          <p className="text-text-muted text-sm">The API returned no user data.</p>
        </div>
      </div>
    );
  }

  // Success state UI
  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-bg-secondary px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-text-primary">Users Directory</h3>
          <p className="text-sm text-text-muted">{users.length} users loaded</p>
        </div>
        <button
          onClick={handleRefetch}
          className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Users grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * UserCard Component
 * 
 * Displays individual user information in a card format.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User data object
 */
const UserCard = ({ user }) => {
  return (
    <div className="bg-bg-secondary rounded-lg p-4 hover:bg-bg-tertiary transition-colors">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-12 h-12 rounded-full object-cover bg-bg-tertiary"
        />

        {/* User info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-text-primary truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-text-muted truncate">
            {user.email}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 bg-bg-primary text-text-muted text-xs rounded-full border border-border">
              {user.company?.department || 'N/A'}
            </span>
            <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded-full">
              Age: {user.age}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 */
const FetchUsersChallengePage = () => {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-bg-primary border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link to="/challenges" className="text-text-muted hover:text-primary transition-colors">
              Challenges
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-text-primary font-medium">Fetch Users</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">👥</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Fetch Users Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-danger-light text-danger text-xs font-medium rounded-full">
                Advanced
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Handle asynchronous data fetching with loading states, error handling, 
            and request cancellation using AbortController.
          </p>
        </div>
      </section>

      {/* Challenge content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FetchUsers />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Data Fetching in useEffect</p>
                <p className="text-sm text-text-secondary">Fetch API data on component mount using async functions inside useEffect.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">AbortController</p>
                <p className="text-sm text-text-secondary">Cancel in-flight requests when component unmounts to prevent state updates on unmounted components.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Loading & Error States</p>
                <p className="text-sm text-text-secondary">Manage multiple UI states for loading, success, error, and empty scenarios.</p>
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
export const Route = createFileRoute('/challenges/fetch-users')({
  component: FetchUsersChallengePage,
});
