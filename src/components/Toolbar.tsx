import React, { useState } from 'react';
import { EyeOff, ArrowUpDown, Filter, Upload, Download, Users, Plus, Trash2 } from 'lucide-react';

interface ToolbarProps {
  selectedRowsCount: number;
  onSort: () => void;
  onFilter: () => void;
  onImport: () => void;
  onExport: () => void;
  onNewAction: () => void;
  onDeleteSelected: () => void;
  onHideFields: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  selectedRowsCount, 
  onSort, 
  onFilter, 
  onImport, 
  onExport, 
  onNewAction,
  onDeleteSelected,
  onHideFields
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleShare = () => {
    console.log('Share clicked - Opening sharing options');
  };

  return (
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onMouseEnter={handleTooltipMouseEnter}
              onMouseLeave={handleTooltipMouseLeave}
              className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Tool tip
            </button>
            {showTooltip && (
              <div className="absolute top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10 whitespace-nowrap">
                Use toolbar actions to manage your spreadsheet data
              </div>
            )}
          </div>
          
          <button
            onClick={onHideFields}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-white rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            <EyeOff className="w-4 h-4" />
            <span>Hide Fields</span>
          </button>
          
          <button
            onClick={onSort}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-white rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
          
          <button
            onClick={onFilter}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-white rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {selectedRowsCount > 0 && (
            <button
              onClick={onDeleteSelected}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onImport}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-white rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-700 hover:bg-white rounded border border-transparent hover:border-gray-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <button
            onClick={onNewAction}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Action</span>
          </button>
        </div>
      </div>
      
      {selectedRowsCount > 0 && (
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm text-blue-700">
          {selectedRowsCount} row{selectedRowsCount > 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
};

export default Toolbar;