import React, { useState } from 'react';
import { X, Type, Hash, Calendar, Link, Mail } from 'lucide-react';

interface AbcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AbcModal: React.FC<AbcModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('text');

  const columnTypes = [
    { 
      value: 'text', 
      label: 'Text', 
      icon: Type, 
      description: 'Regular text content',
      example: 'Job Request, Names, Descriptions'
    },
    { 
      value: 'number', 
      label: 'Number', 
      icon: Hash, 
      description: 'Numeric values and calculations',
      example: 'Est. Value, Quantities, Scores'
    },
    { 
      value: 'date', 
      label: 'Date', 
      icon: Calendar, 
      description: 'Date and time values',
      example: 'Due Date, Submitted, Created'
    },
    { 
      value: 'url', 
      label: 'URL/Link', 
      icon: Link, 
      description: 'Website links and URLs',
      example: 'Assigned links, References'
    },
    { 
      value: 'email', 
      label: 'Email', 
      icon: Mail, 
      description: 'Email addresses',
      example: 'Contact emails, Notifications'
    }
  ];

  const handleApplyType = () => {
    console.log(`Column type changed to: ${selectedType}`);
    alert(`Column type set to: ${columnTypes.find(t => t.value === selectedType)?.label}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Column Data Type</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Choose the data type for this column to enable better formatting and validation.
          </p>
          
          {columnTypes.map(type => {
            const IconComponent = type.icon;
            return (
              <label key={type.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded border hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name="columnType"
                  value={type.value}
                  checked={selectedType === type.value}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="mt-1"
                />
                <IconComponent className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{type.label}</div>
                  <div className="text-xs text-gray-500 mb-1">{type.description}</div>
                  <div className="text-xs text-blue-600">Example: {type.example}</div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleApplyType}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Apply Type
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AbcModal;