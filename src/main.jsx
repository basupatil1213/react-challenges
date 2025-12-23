/**
 * Application Entry Point
 * 
 * This file bootstraps the React application with TanStack Router.
 * It creates the router instance and renders the app with StrictMode enabled.
 * 
 * @module main
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import global styles with Tailwind CSS
import './index.css';

// Import the generated route tree from TanStack Router
import { routeTree } from './routeTree.gen';

/**
 * Create the router instance
 * 
 * The router is created with:
 * - The generated route tree from file-based routing
 * - Default preloading on hover for better UX
 */
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

/**
 * Render the application
 * 
 * StrictMode is enabled to:
 * - Highlight potential problems in the application
 * - Warn about deprecated lifecycle methods
 * - Detect unexpected side effects
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
