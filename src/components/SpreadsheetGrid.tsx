import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { SpreadsheetRow } from '../types/spreadsheet';

interface SpreadsheetGridProps {
  data: SpreadsheetRow[];
  selectedRows: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
  onAddRow: () => void;
  onEditRow: (row: SpreadsheetRow) => void;
  hiddenFields: string[];
  onAbcClick: () => void;
  onAnswerQuestionClick: () => void;
  onExtractClick: () => void;
}

const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({
  data,
  selectedRows,
  onSelectionChange,
  onAddRow,
  onEditRow,
  hiddenFields,
  onAbcClick,
  onAnswerQuestionClick,
  onExtractClick
}) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Need to start':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowSelect = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
      console.log(`Row ${rowId} deselected`);
    } else {
      newSelected.add(rowId);
      console.log(`Row ${rowId} selected`);
    }
    onSelectionChange(newSelected);
  };

  const handleSelectAll = () => {
    const allRowIds = data.map(row => row.id);
    const allSelected = allRowIds.every(id => selectedRows.has(id));
    
    if (allSelected) {
      console.log('All rows deselected');
      onSelectionChange(new Set());
    } else {
      console.log('All rows selected');
      onSelectionChange(new Set(allRowIds));
    }
  };

  const handleAddColumn = () => {
    console.log('Add column clicked - Creating new column');
  };

  const handleRowDoubleClick = (row: SpreadsheetRow) => {
    onEditRow(row);
  };

  const allSelected = data.length > 0 && data.every(row => selectedRows.has(row.id));
  const someSelected = data.some(row => selectedRows.has(row.id));

  const isFieldVisible = (field: string) => !hiddenFields.includes(field);

  return (
    <div className="h-full overflow-auto">
      {/* Special header row */}
      <div className="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="w-8 flex items-center justify-center border-r border-gray-200 bg-gray-50">
          <span className="text-xs text-gray-500">#</span>
        </div>
        
        <div className="w-20 flex items-center justify-center border-r border-gray-200 bg-blue-50">
          <button 
            onClick={onAbcClick}
            className="flex items-center space-x-1 text-sm text-blue-700 hover:text-blue-900 transition-colors"
          >
            <span>ABC</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="w-32 flex items-center justify-center border-r border-gray-200 bg-purple-50">
          <button
            onClick={onAnswerQuestionClick}
            className="text-sm text-purple-700 hover:text-purple-900 transition-colors px-2 py-1 rounded"
          >
            Answer a question
          </button>
        </div>

        <div className="w-24 flex items-center justify-center border-r border-gray-200 bg-orange-50">
          <button
            onClick={onExtractClick}
            className="text-sm text-orange-700 hover:text-orange-900 transition-colors px-2 py-1 rounded"
          >
            Extract
          </button>
        </div>

        <div className="w-12 flex items-center justify-center border-r border-gray-200">
          <button 
            onClick={handleAddColumn}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-12">
          <tr>
            <th className="w-8 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r bg-gray-50">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded" 
                checked={allSelected}
                ref={input => {
                  if (input) input.indeterminate = someSelected && !allSelected;
                }}
                onChange={handleSelectAll}
              />
            </th>
            {isFieldVisible('jobRequest') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[300px]">
                Job Request
              </th>
            )}
            {isFieldVisible('submitted') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[100px]">
                Submitted
              </th>
            )}
            {isFieldVisible('status') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[120px]">
                Status
              </th>
            )}
            {isFieldVisible('submitter') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[120px]">
                Submitter
              </th>
            )}
            {isFieldVisible('assigned') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[140px]">
                Assigned
              </th>
            )}
            {isFieldVisible('priority') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[100px]">
                Priority
              </th>
            )}
            {isFieldVisible('dueDate') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[100px]">
                Due Date
              </th>
            )}
            {isFieldVisible('estValue') && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 bg-gray-50 min-w-[100px]">
                Est. Value
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                No data found. Try adjusting your search or filters.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr 
                key={row.id} 
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedRows.has(row.id) ? 'bg-blue-50' : ''
                }`}
                onDoubleClick={() => handleRowDoubleClick(row)}
              >
                <td className="w-8 px-2 py-4 text-center text-xs text-gray-500 border-r">
                  {index + 1}
                </td>
                {isFieldVisible('jobRequest') && (
                  <td className="px-4 py-4 border-r border-gray-100">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded" 
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleRowSelect(row.id)}
                      />
                      <span className="text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis">
                        {row.jobRequest}
                      </span>
                    </div>
                  </td>
                )}
                {isFieldVisible('submitted') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className="text-sm text-gray-700">{row.submitted}</span>
                  </td>
                )}
                {isFieldVisible('status') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                )}
                {isFieldVisible('submitter') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className="text-sm text-gray-700">{row.submitter}</span>
                  </td>
                )}
                {isFieldVisible('assigned') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer truncate">
                      {row.assigned}
                    </span>
                  </td>
                )}
                {isFieldVisible('priority') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityStyle(row.priority)}`}>
                      {row.priority}
                    </span>
                  </td>
                )}
                {isFieldVisible('dueDate') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className="text-sm text-gray-700">{row.dueDate}</span>
                  </td>
                )}
                {isFieldVisible('estValue') && (
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-100">
                    <span className="text-sm text-gray-700">{row.estValue}</span>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Add row button */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={onAddRow}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Row</span>
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetGrid;