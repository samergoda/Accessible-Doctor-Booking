import React from 'react';

interface TabNavigationProps {
  activeTab: 'doctors' | 'appointments';
  onTabChange: (tab: 'doctors' | 'appointments') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => onTabChange('doctors')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
            ${activeTab === 'doctors'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          `}
          aria-current={activeTab === 'doctors' ? 'page' : undefined}
        >
          Find Doctors
        </button>
        
        <button
          onClick={() => onTabChange('appointments')}
          className={`
            py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
            ${activeTab === 'appointments'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
          `}
          aria-current={activeTab === 'appointments' ? 'page' : undefined}
        >
          My Appointments
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;