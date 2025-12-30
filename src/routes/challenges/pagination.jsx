/**
 * Pagination Challenge Route
 * 
 * Demonstrates building a pagination component with dynamic page navigation.
 * Features configurable items per page and prev/next controls.
 * 
 * @module routes/challenges/pagination
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import Pagination from '../../challenges/Pagination';
import ShowSolution from '../../components/ShowSolution';
import { getSolutionById } from '../../data/solutions';

/**
 * Challenge Page Layout Component
 * 
 * Provides consistent layout for all challenge pages
 */
const PaginationChallengePage = () => {
  const solution = getSolutionById('pagination');

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
            <span className="text-text-primary font-medium">Pagination</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📄</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Pagination Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-warning-light text-warning text-xs font-medium rounded-full">
                Intermediate
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Build a pagination component that displays data in pages with navigation controls.
            Learn about array slicing, memoization, and state-driven UI updates.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Pagination.tsx"
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
        <div className="bg-bg-secondary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Interactive Demo
          </h2>
          <p className="text-text-secondary mb-4">
            Navigate through the paginated list using the Previous/Next buttons:
          </p>
          <Pagination />
        </div>

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">useMemo for Performance</p>
                <p className="text-sm text-text-secondary">Memoize the visible rows calculation to avoid unnecessary re-computations.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Array Slicing</p>
                <p className="text-sm text-text-secondary">Calculate start and end indices to extract the correct subset of data for each page.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">State Management</p>
                <p className="text-sm text-text-secondary">Track current page and items per page using useState hooks.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
              <div>
                <p className="font-medium text-text-primary">Boundary Checking</p>
                <p className="text-sm text-text-secondary">Disable navigation buttons when at the first or last page to prevent invalid states.</p>
              </div>
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
export const Route = createFileRoute('/challenges/pagination')({
  component: PaginationChallengePage,
});
