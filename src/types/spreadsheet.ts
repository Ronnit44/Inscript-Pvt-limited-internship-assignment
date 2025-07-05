export interface SpreadsheetRow {
  id: string;
  jobRequest: string;
  submitted: string;
  status: 'Need to start' | 'In-progress' | 'Complete' | 'Blocked';
  submitter: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
}

export interface TabData {
  name: string;
  count: number;
}

export interface SortConfig {
  key: keyof SpreadsheetRow;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  status?: string[];
  priority?: string[];
  submitter?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface NewActionData {
  jobRequest: string;
  submitter: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
}