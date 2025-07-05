import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SpreadsheetRow } from '../../types/spreadsheet';

interface EditRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  row: SpreadsheetRow | null;
  onSave: (updatedRow: SpreadsheetRow) => void;
}

const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onClose, row, onSave }) => {
  const [formData, setFormData] = useState<SpreadsheetRow | null>(row);
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    setFormData(row);
    setHasChanges(false);
  }, [row]);

  const handleChange = (field: keyof SpreadsheetRow, value: string) => {
    if (!formData) return;
    
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (formData && hasChanges) {
      onSave(formData);
      setHasChanges(false);
      onClose();
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close without saving?');
      if (confirmed) {
        setHasChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Edit Action</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Request
            </label>
            <textarea
              value={formData.jobRequest}
              onChange={(e) => handleChange('jobRequest', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Submitter
            </label>
            <input
              type="text"
              value={formData.submitter}
              onChange={(e) => handleChange('submitter', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Need to start">Need to start</option>
              <option value="In-progress">In-progress</option>
              <option value="Complete">Complete</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned
            </label>
            <input
              type="text"
              value={formData.assigned}
              onChange={(e) => handleChange('assigned', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Value
            </label>
            <input
              type="text"
              value={formData.estValue}
              onChange={(e) => handleChange('estValue', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleSave}
            className={`flex-1 py-2 px-4 rounded transition-colors ${
              hasChanges 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasChanges ? 'Save Changes' : 'No Changes'}
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRowModal;