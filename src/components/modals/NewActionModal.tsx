import React, { useState } from 'react';
import { X } from 'lucide-react';
import { NewActionData } from '../../types/spreadsheet';

interface NewActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewActionData) => void;
}

const NewActionModal: React.FC<NewActionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<NewActionData>({
    jobRequest: '',
    submitter: '',
    assigned: '',
    priority: 'Medium',
    dueDate: '',
    estValue: ''
  });

  const handleChange = (field: keyof NewActionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.jobRequest.trim() && formData.submitter.trim()) {
      onSubmit(formData);
      setFormData({
        jobRequest: '',
        submitter: '',
        assigned: '',
        priority: 'Medium',
        dueDate: '',
        estValue: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">New Action</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Request *
            </label>
            <textarea
              value={formData.jobRequest}
              onChange={(e) => handleChange('jobRequest', e.target.value)}
              placeholder="Describe the job request..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Submitter *
            </label>
            <input
              type="text"
              value={formData.submitter}
              onChange={(e) => handleChange('submitter', e.target.value)}
              placeholder="Enter submitter name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned
            </label>
            <input
              type="text"
              value={formData.assigned}
              onChange={(e) => handleChange('assigned', e.target.value)}
              placeholder="Enter assigned person/URL"
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
              placeholder="e.g., 1,500,000"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-2 mt-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Create Action
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewActionModal;