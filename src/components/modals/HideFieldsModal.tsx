import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface HideFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hiddenFields: string[];
  onToggleField: (field: string) => void;
}

const HideFieldsModal: React.FC<HideFieldsModalProps> = ({ 
  isOpen, 
  onClose, 
  hiddenFields, 
  onToggleField 
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Show/Hide Fields</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {fields.map(field => {
            const isHidden = hiddenFields.includes(field.key);
            return (
              <div key={field.key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{field.label}</span>
                <button
                  onClick={() => onToggleField(field.key)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-colors ${
                    isHidden 
                      ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{isHidden ? 'Hidden' : 'Visible'}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default HideFieldsModal;