
import React from 'react';

interface GarageFilterTabsProps {
  activeTab: 'all' | 'owned' | 'interested' | 'testDriven';
  setActiveTab: (tab: 'all' | 'owned' | 'interested' | 'testDriven') => void;
  countAll: number;
  countOwned: number;
  countTestDriven: number;
  countInterested: number;
}

const GarageFilterTabs: React.FC<GarageFilterTabsProps> = ({
  activeTab,
  setActiveTab,
  countAll,
  countOwned,
  countTestDriven,
  countInterested
}) => {
  return (
    <div className="flex mb-6 border-b overflow-x-auto scrollbar-none">
      <button
        onClick={() => setActiveTab('all')}
        className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
          activeTab === 'all' 
            ? 'border-motortrend-red text-motortrend-red font-medium' 
            : 'border-transparent hover:text-gray-700'
        }`}
      >
        All Cars ({countAll})
      </button>
      <button
        onClick={() => setActiveTab('owned')}
        className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
          activeTab === 'owned' 
            ? 'border-motortrend-red text-motortrend-red font-medium' 
            : 'border-transparent hover:text-gray-700'
        }`}
      >
        Owned ({countOwned})
      </button>
      <button
        onClick={() => setActiveTab('testDriven')}
        className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
          activeTab === 'testDriven' 
            ? 'border-motortrend-red text-motortrend-red font-medium' 
            : 'border-transparent hover:text-gray-700'
        }`}
      >
        Test Driven ({countTestDriven})
      </button>
      <button
        onClick={() => setActiveTab('interested')}
        className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
          activeTab === 'interested' 
            ? 'border-motortrend-red text-motortrend-red font-medium' 
            : 'border-transparent hover:text-gray-700'
        }`}
      >
        Interested ({countInterested})
      </button>
    </div>
  );
};

export default GarageFilterTabs;
