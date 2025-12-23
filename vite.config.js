import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite Configuration
 * 
 * This configuration sets up:
 * - TanStack Router for file-based routing with automatic code splitting
 * - React plugin for JSX transformation and Fast Refresh
 * - Tailwind CSS v4 for utility-first styling
 * 
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [
    // TanStack Router plugin for automatic route generation
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
    // Tailwind CSS v4 Vite plugin
    tailwindcss(),
    // React plugin with Fast Refresh
    react(),
  ],
})
