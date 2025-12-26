/**
 * Modal Challenge Route
 * 
 * Demonstrates conditional rendering with a modal component using custom hooks.
 * Features open/close toggle functionality with accessible modal markup.
 * 
 * @module routes/challenges/modal
 */

import { createFileRoute, Link } from '@tanstack/react-router';
import { useToggle } from '../../hooks/use-toggle';

/**
 * Modal Component
 * 
 * A simple modal that demonstrates:
 * - Custom hooks (useToggle) for state management
 * - Conditional rendering based on boolean state
 * - Accessible modal markup with ARIA attributes
 * - Reusable component pattern with children prop
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the modal
 */
const Modal = ({ children }) => {
  // Use custom toggle hook for modal visibility state
  const [isOpen, toggleModal] = useToggle(false);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={toggleModal}
        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all duration-200"
        aria-expanded={isOpen}
        aria-controls="modal-content"
      >
        {isOpen ? 'Close Modal' : 'Open Modal'}
      </button>

      {/* Modal overlay and content */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleModal}
            aria-hidden="true"
          />
          
          {/* Modal content */}
          <section
            id="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 bg-bg-primary rounded-xl border border-border p-6 shadow-xl max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 id="modal-title" className="text-lg font-semibold text-text-primary">
                Modal Title
              </h3>
              <button
                onClick={toggleModal}
                className="text-text-muted hover:text-text-primary transition-colors p-1 rounded-lg hover:bg-bg-secondary"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-text-secondary">
              {children}
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-text-secondary hover:text-text-primary font-medium rounded-lg hover:bg-bg-secondary transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all duration-200"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

/**
 * ModalDemo Component
 * 
 * Demonstrates the Modal component with sample content
 */
const ModalDemo = () => {
  return (
    <div className="bg-bg-primary rounded-xl border border-border p-8">
      <div className="text-center">
        <p className="text-text-muted text-sm uppercase tracking-wider mb-4">
          Modal Demo
        </p>
        <p className="text-text-secondary mb-6">
          Click the button below to open the modal dialog.
        </p>
        
        <div className="flex justify-center">
          <Modal>
            <p className="mb-4">
              This is the modal content. You can put any content here, including forms, 
              images, or other interactive elements.
            </p>
            <p>
              Click outside the modal, press the close button, or use the action buttons 
              to dismiss it.
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

/**
 * Challenge Page Layout Component
 * 
 * Provides consistent layout for the Modal challenge page
 */
const ModalChallengePage = () => {
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
            <span className="text-text-primary font-medium">Modal</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🪟</span>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Modal Challenge</h1>
              <span className="inline-block mt-1 px-3 py-1 bg-success-light text-success text-xs font-medium rounded-full">
                Beginner
              </span>
            </div>
          </div>

          <p className="text-text-secondary">
            Learn conditional rendering and custom hooks by building a reusable modal 
            component with accessible markup and smooth animations.
          </p>
          <a
            href="https://github.com/basupatil1213/react-challenges/blob/main/src/challenges/Modal.jsx"
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
        <ModalDemo />

        {/* Learning points */}
        <div className="mt-8 bg-bg-primary rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Key Concepts Learned
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
              <div>
                <p className="font-medium text-text-primary">Custom Hooks</p>
                <p className="text-sm text-text-secondary">Create and use custom hooks like useToggle for reusable state logic.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
              <div>
                <p className="font-medium text-text-primary">Conditional Rendering</p>
                <p className="text-sm text-text-secondary">Show or hide elements based on state using logical && operator.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
              <div>
                <p className="font-medium text-text-primary">Accessible Modals</p>
                <p className="text-sm text-text-secondary">Implement ARIA attributes like role="dialog" and aria-modal for accessibility.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
              <div>
                <p className="font-medium text-text-primary">Children Prop Pattern</p>
                <p className="text-sm text-text-secondary">Create flexible, reusable components using the children prop for content injection.</p>
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
export const Route = createFileRoute('/challenges/modal')({
  component: ModalChallengePage,
});
