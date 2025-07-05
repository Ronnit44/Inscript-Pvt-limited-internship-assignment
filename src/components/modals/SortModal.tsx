import React, { useState } from 'react';
import { X, ArrowUp, ArrowDown } from 'lucide-react';
import { SortConfig } from '../../types/spreadsheet';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortConfig | null;
  onSort: (config: SortConfig | null) => void;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, currentSort, onSort }) => {
  const [selectedField, setSelectedField] = useState<string>(currentSort?.key || '');
  const [direction, setDirection] = useState<'asc' | 'desc'>(currentSort?.direction || 'asc');

  const fields = [
    { key: 'jobRequest', label: 'Job Request' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status', label: 'Status' },
    { key: 'submitter', label: 'Submitter' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'priority', label: 'Priority' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'estValue', label: 'Est. Value' }
  ];

  const handleApply = () => {
    if (selectedField) {
      onSort({
        key: selectedField as keyof SortConfig['key'],
        direction
      });
    }
    onClose();
  };

  const handleClear = () => {
    onSort(null);
    setSelectedField('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Sort Data</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by field
            </label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select field...</option>
              {fields.map(field => (
                <option key={field.key} value={field.key}>
                  {field.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direction
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setDirection('asc')}
                className={`flex items-center space-x-2 px-3 py-2 rounded border ${
                  direction === 'asc' 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <ArrowUp className="w-4 h-4" />
                <span>Ascending</span>
              </button>
              <button
                onClick={() => setDirection('desc')}
                className={`flex items-center space-x-2 px-3 py-2 rounded border ${
                  direction === 'desc' 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <ArrowDown className="w-4 h-4" />
                <span>Descending</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleApply}
            disabled={!selectedField}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Apply Sort
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;