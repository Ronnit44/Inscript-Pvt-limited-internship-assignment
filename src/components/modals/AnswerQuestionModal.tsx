import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface AnswerQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnswerQuestionModal: React.FC<AnswerQuestionModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockAnswers = [
        "Based on the data, there are 5 total actions with 2 high priority items that need immediate attention.",
        "The average estimated value across all projects is approximately 4.5 million.",
        "Most pending items are assigned to external contractors (www.* domains).",
        "There's a good distribution of priorities with 40% high, 40% medium, and 20% low priority items."
      ];
      
      const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
      setAnswer(randomAnswer);
      setIsProcessing(false);
    }, 2000);
  };

  const handleClose = () => {
    setQuestion('');
    setAnswer('');
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Ask AI Assistant</h3>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to know about your data?
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., How many high priority items do I have? What's the average project value?"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
          </div>

          {answer && (
            <div className="bg-purple-50 border border-purple-200 rounded-md p-3">
              <h4 className="text-sm font-medium text-purple-800 mb-2">AI Response:</h4>
              <p className="text-sm text-purple-700">{answer}</p>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-6">
          <button
            onClick={handleAskQuestion}
            disabled={!question.trim() || isProcessing}
            className="flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Ask Question'}
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

export default AnswerQuestionModal;