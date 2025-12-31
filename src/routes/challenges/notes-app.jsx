/**
 * Notes App Challenge Route
 * 
 * Demonstrates building a persistent notes application using the
 * custom useLocalStorage hook for data persistence across page refreshes.
 * 
 * @module routes/challenges/notes-app
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import NotesApp from '../../challenges/NotesApp';
import ShowSolution from '../../components/ShowSolution';
import { getSolutionById } from '../../data/solutions';

/**
 * Challenge Page Layout Component
 * 
 * Provides consistent layout for all challenge pages
 */
const NotesAppChallengePage = () => {
  const solution = getSolutionById('notes-app');

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
            <span className="text-text-primary font-medium">Notes App</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Notes App Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary max-w-2xl">
            Build a persistent notes application using a custom useLocalStorage hook. 
            Notes are saved automatically and persist across page refreshes with cross-tab synchronization.
          </p>

          {/* Concepts tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['Custom Hooks', 'useLocalStorage', 'CRUD Operations', 'Data Persistence'].map((concept) => (
              <span
                key={concept}
                className="px-3 py-1 bg-bg-secondary text-text-secondary text-xs rounded-full border border-border"
              >
                {concept}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/NotesApp.jsx"
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Interactive Demo
          </h2>
          <p className="text-text-secondary">
            Create, edit, and delete notes. Try refreshing the page - your notes will still be there!
          </p>
        </div>

        <NotesApp />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Custom useLocalStorage Hook</p>
                <p className="text-sm text-text-secondary">Create a reusable hook that syncs state with localStorage, handling JSON serialization and cross-tab updates.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Lazy State Initialization</p>
                <p className="text-sm text-text-secondary">Use a function in useState to read from localStorage only on initial render, avoiding performance issues.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Cross-Tab Synchronization</p>
                <p className="text-sm text-text-secondary">Listen to the storage event to sync state across browser tabs when localStorage changes externally.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
              <div>
                <p className="font-medium text-text-primary">CRUD Operations with Persistence</p>
                <p className="text-sm text-text-secondary">Implement Create, Read, Update, Delete operations that automatically persist to localStorage.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Try it section */}
        <div className="mt-6 bg-bg-secondary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            🧪 Try These Experiments
          </h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Create a few notes, then refresh the page - they persist!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Open this page in two tabs and add a note in one - watch it appear in the other</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Open DevTools → Application → Local Storage to see the stored data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Try clearing your browser data and see notes disappear</span>
            </li>
          </ul>
        </div>

        {/* Solution section */}
        {solution && <ShowSolution solution={solution} />}
      </section>
    </div>
  );
};

/**
 * Route Definition
 */
export const Route = createFileRoute('/challenges/notes-app')({
  component: NotesAppChallengePage,
});
