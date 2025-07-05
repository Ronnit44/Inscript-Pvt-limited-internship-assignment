import React from 'react';
import { ChevronRight, Search, Bell } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  const handleBreadcrumbClick = (item: string) => {
    console.log(`Breadcrumb clicked: ${item}`);
  };

  const handleNotificationClick = () => {
    console.log('Notification bell clicked - Opening notifications panel');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked - Opening user profile menu');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <button 
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => handleBreadcrumbClick('Workspace')}
          >
            Workspace
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button 
            className="text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => handleBreadcrumbClick('Folder')}
          >
            Folder
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button 
            className="text-gray-900 font-medium"
            onClick={() => handleBreadcrumbClick('Spreadsheet 3')}
          >
            Spreadsheet 3
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search within sheet..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <button 
            className="relative hover:bg-gray-50 p-1 rounded transition-colors" 
            onClick={handleNotificationClick}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors" onClick={handleProfileClick}>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">RS</span>
            </div>
            <span className="text-sm text-gray-700">Ronnit Sagar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;