import { useState, useMemo } from 'react';
import { SpreadsheetRow, SortConfig, FilterConfig } from '../types/spreadsheet';

const initialData: SpreadsheetRow[] = [
  {
    id: '1',
    jobRequest: 'Launch new media campaign for product launch and market penetration strategy',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Max Khan',
    assigned: 'www.fruitkart.com',
    priority: 'High',
    dueDate: '10-30-2024',
    estValue: '8,20,000'
  },
  {
    id: '2',
    jobRequest: 'Update press kit for company redesign and brand refresh initiative',
    submitted: '28-10-2024',
    status: 'In-progress',
    submitter: 'Mark Johnson',
    assigned: 'www.markjohns.com',
    priority: 'Medium',
    dueDate: '10-30-2024',
    estValue: '1,500,000'
  },
  {
    id: '3',
    jobRequest: 'Analyze user testing feedback for app improvement and optimization',
    submitted: '05-10-2024',
    status: 'Complete',
    submitter: 'Emily Green',
    assigned: 'www.marketgu.com',
    priority: 'Low',
    dueDate: '16-10-2024',
    estValue: '4,750,000'
  },
  {
    id: '4',
    jobRequest: 'Design new features for the website and mobile application',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Tom Wright',
    assigned: 'www.example.com',
    priority: 'Low',
    dueDate: '16-01-2025',
    estValue: '5,500,000'
  },
  {
    id: '5',
    jobRequest: 'Prepare financial report for Q4 and annual business review',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    assigned: 'www.jessicab.com',
    priority: 'High',
    dueDate: '30-01-2025',
    estValue: '2,800,000'
  }
];

export const useSpreadsheetData = () => {
  const [data, setData] = useState<SpreadsheetRow[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(row =>
        row.jobRequest.toLowerCase().includes(query) ||
        row.submitter.toLowerCase().includes(query) ||
        row.assigned.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        row.priority.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filterConfig.status && filterConfig.status.length > 0) {
      result = result.filter(row => filterConfig.status!.includes(row.status));
    }

    if (filterConfig.priority && filterConfig.priority.length > 0) {
      result = result.filter(row => filterConfig.priority!.includes(row.priority));
    }

    if (filterConfig.submitter) {
      result = result.filter(row => 
        row.submitter.toLowerCase().includes(filterConfig.submitter!.toLowerCase())
      );
    }

    if (filterConfig.dateRange) {
      const { start, end } = filterConfig.dateRange;
      result = result.filter(row => {
        const rowDate = new Date(row.submitted.split('-').reverse().join('-'));
        const startDate = new Date(start);
        const endDate = new Date(end);
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, sortConfig, filterConfig, searchQuery]);

  const addRow = (newRow: Omit<SpreadsheetRow, 'id'>) => {
    const id = (Math.max(...data.map(row => parseInt(row.id))) + 1).toString();
    const rowWithId = { ...newRow, id };
    setData(prev => [...prev, rowWithId]);
    return rowWithId;
  };

  const deleteRows = (rowIds: string[]) => {
    setData(prev => prev.filter(row => !rowIds.includes(row.id)));
  };

  const updateRow = (id: string, updates: Partial<SpreadsheetRow>) => {
    setData(prev => prev.map(row => 
      row.id === id ? { ...row, ...updates } : row
    ));
  };

  const exportData = () => {
    const csvContent = [
      // Header
      ['Job Request', 'Submitted', 'Status', 'Submitter', 'Assigned', 'Priority', 'Due Date', 'Est. Value'].join(','),
      // Data rows
      ...filteredAndSortedData.map(row => [
        `"${row.jobRequest}"`,
        row.submitted,
        row.status,
        row.submitter,
        row.assigned,
        row.priority,
        row.dueDate,
        row.estValue
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'spreadsheet-data.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const importData = (csvContent: string) => {
    try {
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',');
      
      const newRows: SpreadsheetRow[] = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(val => val.replace(/"/g, ''));
          return {
            id: (Math.max(...data.map(row => parseInt(row.id))) + index + 1).toString(),
            jobRequest: values[0] || '',
            submitted: values[1] || new Date().toLocaleDateString('en-GB'),
            status: (values[2] as SpreadsheetRow['status']) || 'Need to start',
            submitter: values[3] || '',
            assigned: values[4] || '',
            priority: (values[5] as SpreadsheetRow['priority']) || 'Medium',
            dueDate: values[6] || new Date().toLocaleDateString('en-GB'),
            estValue: values[7] || '0'
          };
        });

      setData(prev => [...prev, ...newRows]);
      return newRows.length;
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid CSV format');
    }
  };

  return {
    data: filteredAndSortedData,
    originalData: data,
    sortConfig,
    filterConfig,
    searchQuery,
    setSortConfig,
    setFilterConfig,
    setSearchQuery,
    addRow,
    deleteRows,
    updateRow,
    exportData,
    importData
  };
};