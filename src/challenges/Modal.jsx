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

import { useToggle } from '../hooks/use-toggle';

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

export default Modal;