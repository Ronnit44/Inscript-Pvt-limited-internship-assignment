import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

interface ExtractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExtractModal: React.FC<ExtractModalProps> = ({ isOpen, onClose }) => {
  const [extractType, setExtractType] = useState('emails');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<string[]>([]);

  const extractOptions = [
    { value: 'emails', label: 'Email Addresses', description: 'Extract all email addresses from the data' },
    { value: 'urls', label: 'URLs/Websites', description: 'Extract all website URLs and links' },
    { value: 'dates', label: 'Dates', description: 'Extract all date values' },
    { value: 'numbers', label: 'Numbers/Values', description: 'Extract all numeric values' },
    { value: 'names', label: 'Names', description: 'Extract all person names' }
  ];

  const handleExtract = () => {
    setIsExtracting(true);
    
    // Simulate extraction process
    setTimeout(() => {
      let mockData: string[] = [];
      
      switch (extractType) {
        case 'emails':
          mockData = ['max.khan@company.com', 'mark.johnson@design.com', 'emily.green@market.com'];
          break;
        case 'urls':
          mockData = ['www.fruitkart.com', 'www.markjohns.com', 'www.marketgu.com', 'www.example.com'];
          break;
        case 'dates':
          mockData = ['28-10-2024', '05-10-2024', '10-01-2025', '25-01-2025'];
          break;
        case 'numbers':
          mockData = ['8,20,000', '1,500,000', '4,750,000', '5,500,000', '2,800,000'];
          break;
        case 'names':
          mockData = ['Max Khan', 'Mark Johnson', 'Emily Green', 'Tom Wright', 'Jessica Brown'];
          break;
      }
      
      setExtractedData(mockData);
      setIsExtracting(false);
    }, 1500);
  };

  const handleDownload = () => {
    const content = extractedData.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted-${extractType}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setExtractedData([]);
    setIsExtracting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Extract Data</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to extract?
            </label>
            <div className="space-y-2">
              {extractOptions.map(option => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="extractType"
                    value={option.value}
                    checked={extractType === option.value}
                    onChange={(e) => setExtractType(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {extractedData.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-orange-800">
                  Extracted {extractedData.length} items:
                </h4>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-1 text-xs text-orange-700 hover:text-orange-900"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
              <div className="max-h-32 overflow-y-auto">
                {extractedData.map((item, index) => (
                  <div key={index} className="text-xs text-orange-700 py-1 border-b border-orange-100 last:border-b-0">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleExtract}
            disabled={isExtracting}
            className="flex-1 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isExtracting ? 'Extracting...' : 'Extract Data'}
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtractModal;