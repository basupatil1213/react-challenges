/**
 * Root Route Component
 * 
 * This is the root layout component for the entire application.
 * It wraps all child routes and provides the common layout structure
 * including the header and footer that persist across all pages.
 * 
 * @module routes/__root
 */

import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

/**
 * Navigation items configuration
 * Centralized array of navigation links for easy maintenance
 */
const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/challenges', label: 'Challenges' },
];

/**
 * Header Component
 * 
 * Renders the main navigation header with responsive design.
 * Uses Tailwind CSS for styling with a clean, professional look.
 */
const Header = () => {
  return (
    <header className="bg-bg-primary border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-text-primary hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-semibold text-xl hidden sm:block">React Practice</span>
          </Link>

          {/* Navigation links */}
          <nav className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200 font-medium"
                activeProps={{
                  className: 'px-4 py-2 rounded-lg bg-primary-light text-primary font-medium',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

/**
 * Footer Component
 * 
 * Renders the site footer with copyright information.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} React Practice. Built for learning purposes.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              React Docs
            </a>
            <a
              href="https://tanstack.com/router"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              TanStack Router
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Root Layout Component
 * 
 * Provides the main layout structure for all pages.
 * Uses flexbox to ensure footer stays at the bottom.
 */
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-secondary">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * Root Route Definition
 * 
 * Creates the root route with the layout component.
 * All child routes will be rendered within the Outlet.
 */
export const Route = createRootRoute({
  component: RootLayout,
});
