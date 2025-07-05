import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (csvContent: string) => Promise<number>;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [csvContent, setCsvContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCsvContent(content);
        setError('');
      };
      reader.readAsText(file);
    } else {
      setError('Please select a valid CSV file');
    }
  };

  const handleImport = async () => {
    if (!csvContent.trim()) {
      setError('Please provide CSV content');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const importedCount = await onImport(csvContent);
      alert(`Successfully imported ${importedCount} rows`);
      setCsvContent('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleCsv = `Job Request,Submitted,Status,Submitter,Assigned,Priority,Due Date,Est. Value
"Create marketing materials",01-02-2025,Need to start,John Doe,www.example.com,High,05-02-2025,1000000
"Review website design",02-02-2025,In-progress,Jane Smith,www.design.com,Medium,10-02-2025,500000`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Import Data</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                <Upload className="w-4 h-4" />
                <span>Choose CSV File</span>
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Or paste CSV content below
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV Content
            </label>
            <textarea
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder="Paste your CSV content here..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Format
            </label>
            <pre className="text-xs bg-gray-50 p-2 rounded border overflow-x-auto">
              {sampleCsv}
            </pre>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleImport}
            disabled={isLoading || !csvContent.trim()}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Importing...' : 'Import Data'}
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

export default ImportModal;