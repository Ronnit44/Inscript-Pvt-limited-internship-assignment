import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FilterConfig } from '../../types/spreadsheet';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilter: FilterConfig;
  onFilter: (config: FilterConfig) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, currentFilter, onFilter }) => {
  const [status, setStatus] = useState<string[]>(currentFilter.status || []);
  const [priority, setPriority] = useState<string[]>(currentFilter.priority || []);
  const [submitter, setSubmitter] = useState(currentFilter.submitter || '');
  const [dateRange, setDateRange] = useState(currentFilter.dateRange || { start: '', end: '' });

  const statusOptions = ['Need to start', 'In-progress', 'Complete', 'Blocked'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  const handleStatusChange = (value: string) => {
    setStatus(prev => 
      prev.includes(value) 
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const handlePriorityChange = (value: string) => {
    setPriority(prev => 
      prev.includes(value) 
        ? prev.filter(p => p !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    const filterConfig: FilterConfig = {};
    
    if (status.length > 0) filterConfig.status = status;
    if (priority.length > 0) filterConfig.priority = priority;
    if (submitter.trim()) filterConfig.submitter = submitter.trim();
    if (dateRange.start && dateRange.end) filterConfig.dateRange = dateRange;

    onFilter(filterConfig);
    onClose();
  };

  const handleClear = () => {
    setStatus([]);
    setPriority([]);
    setSubmitter('');
    setDateRange({ start: '', end: '' });
    onFilter({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filter Data</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={status.includes(option)}
                    onChange={() => handleStatusChange(option)}
                    className="mr-2"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="space-y-2">
              {priorityOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={priority.includes(option)}
                    onChange={() => handlePriorityChange(option)}
                    className="mr-2"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submitter
            </label>
            <input
              type="text"
              value={submitter}
              onChange={(e) => setSubmitter(e.target.value)}
              placeholder="Filter by submitter name..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleApply}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;