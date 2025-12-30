/**
 * Table Component (Tabbed Content)
 * 
 * A tabbed content component that demonstrates:
 * - useState hook for managing active tab index
 * - Dynamic styling based on state
 * - Conditional rendering with hidden attribute
 * - Array mapping for dynamic content
 */

import { useState } from 'react';

/**
 * Sample data for demonstration
 */
const defaultHeaders = ['Profile', 'Settings', 'Notifications'];
const defaultDataRows = [
  'This is the Profile tab content. View and manage your personal information, update your bio, and customize your profile picture.',
  'This is the Settings tab content. Configure your preferences, manage privacy settings, and adjust application behavior.',
  'This is the Notifications tab content. View recent alerts, manage notification preferences, and check your activity log.',
];

const Table = ({ headers = defaultHeaders, dataRows = defaultDataRows }) => {
  // Track which tab is currently active
  const [activeTab, setActiveTab] = useState(0);

  /**
   * Handles tab click to switch active content
   * @param {number} index - The index of the clicked tab
   */
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      {/* Tab headers */}
      <nav className="flex border-b border-border bg-bg-secondary" role="tablist">
        {headers &&
          headers.map((header, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`tabpanel-${idx}`}
              onClick={() => handleTabClick(idx)}
              className={`
                flex-1 px-6 py-4 text-sm font-medium transition-all duration-200
                border-b-2 -mb-px cursor-pointer
                ${
                  activeTab === idx
                    ? 'text-primary border-primary bg-bg-primary'
                    : 'text-text-muted border-transparent hover:text-text-primary hover:bg-bg-tertiary'
                }
              `}
            >
              {header}
            </button>
          ))}
      </nav>

      {/* Tab content panels */}
      <div className="p-6">
        {dataRows &&
          dataRows.map((content, idx) => (
            <div
              key={idx}
              id={`tabpanel-${idx}`}
              role="tabpanel"
              aria-labelledby={`tab-${idx}`}
              hidden={idx !== activeTab}
              className={`
                transition-opacity duration-200
                ${idx === activeTab ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <p className="text-text-secondary leading-relaxed">{content}</p>
            </div>
          ))}
      </div>

      {/* Tab indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            Tab {activeTab + 1} of {headers?.length || 0}
          </span>
          <div className="flex gap-1">
            {headers?.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  idx === activeTab ? 'bg-primary' : 'bg-bg-tertiary'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;