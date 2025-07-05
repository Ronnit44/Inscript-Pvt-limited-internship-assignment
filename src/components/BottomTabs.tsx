import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, onTabChange }) => {
  const [tabs, setTabs] = useState(['All Orders', 'Pending', 'Reviewed', 'Arrived']);
  const [showAddTab, setShowAddTab] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  const getTabCount = (tab: string) => {
    // Mock counts for demonstration
    switch (tab) {
      case 'All Orders': return 5;
      case 'Pending': return 2;
      case 'Reviewed': return 2;
      case 'Arrived': return 1;
      default: return 0;
    }
  };

  const handleTabClick = (tab: string) => {
    console.log(`Tab clicked: ${tab}`);
    onTabChange(tab);
  };

  const handleAddTabClick = () => {
    if (showAddTab && newTabName.trim()) {
      const trimmedName = newTabName.trim();
      const newTabs = [...tabs, trimmedName];
      setTabs(newTabs);
      onTabChange(trimmedName);
      setNewTabName('');
      setShowAddTab(false);
      console.log(`New tab added: ${trimmedName}`);
    } else {
      setShowAddTab(true);
      console.log('Add tab mode activated');
    }
  };

  const handleRemoveTab = (tabToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab !== tabToRemove);
      setTabs(newTabs);
      if (activeTab === tabToRemove) {
        onTabChange(newTabs[0]);
      }
      console.log(`Tab removed: ${tabToRemove}`);
    } else {
      console.log('Cannot remove last tab');
    }
  };

  const handleNewTabNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTabName(e.target.value);
  };

  const handleNewTabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTabName.trim()) {
      const trimmedName = newTabName.trim();
      const newTabs = [...tabs, trimmedName];
      setTabs(newTabs);
      onTabChange(trimmedName);
      setNewTabName('');
      setShowAddTab(false);
      console.log(`New tab created: ${trimmedName}`);
    }
  };

  const handleNewTabBlur = () => {
    if (!newTabName.trim()) {
      setShowAddTab(false);
      console.log('Add tab mode cancelled');
    }
  };

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="flex items-center">
        {tabs.map((tab) => {
          const count = getTabCount(tab);
          return (
            <div key={tab} className="relative group">
              <button
                onClick={() => handleTabClick(tab)}
                className={`px-6 py-3 text-sm font-medium border-r border-gray-200 transition-colors relative flex items-center space-x-2 ${
                  activeTab === tab
                    ? 'bg-yellow-400 text-gray-900 border-b-2 border-yellow-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab 
                    ? 'bg-gray-900 text-yellow-400' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleRemoveTab(tab, e)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-2 h-2" />
                  </button>
                )}
              </button>
            </div>
          );
        })}
        
        {showAddTab ? (
          <form 
            onSubmit={handleNewTabSubmit} 
            className="flex items-center px-2"
          >
            <input
              type="text"
              value={newTabName}
              onChange={handleNewTabNameChange}
              onBlur={handleNewTabBlur}
              placeholder="Tab name"
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="ml-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </form>
        ) : (
          <button 
            onClick={handleAddTabClick}
            className="px-4 py-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            title="Add new tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomTabs;