import React, { useState } from 'react';
import Header from './Header';
import Toolbar from './Toolbar';
import SpreadsheetGrid from './SpreadsheetGrid';
import BottomTabs from './BottomTabs';
import SortModal from './modals/SortModal';
import FilterModal from './modals/FilterModal';
import NewActionModal from './modals/NewActionModal';
import ImportModal from './modals/ImportModal';
import HideFieldsModal from './modals/HideFieldsModal';
import EditRowModal from './modals/EditRowModal';
import AnswerQuestionModal from './modals/AnswerQuestionModal';
import ExtractModal from './modals/ExtractModal';
import AbcModal from './modals/AbcModal';
import { useSpreadsheetData } from '../hooks/useSpreadsheetData';
import { SpreadsheetRow } from '../types/spreadsheet';

const SpreadsheetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showNewActionModal, setShowNewActionModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showHideFieldsModal, setShowHideFieldsModal] = useState(false);
  const [showEditRowModal, setShowEditRowModal] = useState(false);
  const [showAnswerQuestionModal, setShowAnswerQuestionModal] = useState(false);
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [showAbcModal, setShowAbcModal] = useState(false);
  const [editingRow, setEditingRow] = useState<SpreadsheetRow | null>(null);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);

  const {
    data,
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
  } = useSpreadsheetData();

  const handleTabChange = (tab: string) => {
    console.log(`Tab changed to: ${tab}`);
    setActiveTab(tab);
    setSelectedRows(new Set());
  };

  const handleSelectionChange = (selected: Set<string>) => {
    setSelectedRows(selected);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.size > 0) {
      const confirmed = window.confirm(`Are you sure you want to delete ${selectedRows.size} selected row(s)?`);
      if (confirmed) {
        deleteRows(Array.from(selectedRows));
        setSelectedRows(new Set());
        console.log(`Deleted ${selectedRows.size} rows`);
      }
    }
  };

  const handleNewAction = (actionData: any) => {
    const newRow = {
      ...actionData,
      submitted: new Date().toLocaleDateString('en-GB'),
      status: 'Need to start' as const
    };
    const addedRow = addRow(newRow);
    console.log('New action created:', addedRow);
  };

  const handleAddRow = () => {
    setShowNewActionModal(true);
  };

  const handleExport = () => {
    exportData();
    console.log('Data exported to CSV');
  };

  const handleImport = async (csvContent: string) => {
    const importedCount = await importData(csvContent);
    console.log(`Imported ${importedCount} rows`);
    return importedCount;
  };

  const handleEditRow = (row: SpreadsheetRow) => {
    setEditingRow(row);
    setShowEditRowModal(true);
  };

  const handleSaveRow = (updatedRow: SpreadsheetRow) => {
    updateRow(updatedRow.id, updatedRow);
    console.log('Row updated:', updatedRow);
  };

  const handleToggleField = (field: string) => {
    setHiddenFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Toolbar 
        selectedRowsCount={selectedRows.size}
        onSort={() => setShowSortModal(true)}
        onFilter={() => setShowFilterModal(true)}
        onImport={() => setShowImportModal(true)}
        onExport={handleExport}
        onNewAction={() => setShowNewActionModal(true)}
        onDeleteSelected={handleDeleteSelected}
        onHideFields={() => setShowHideFieldsModal(true)}
      />
      <div className="flex-1 overflow-hidden">
        <SpreadsheetGrid 
          data={data}
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
          onAddRow={handleAddRow}
          onEditRow={handleEditRow}
          hiddenFields={hiddenFields}
          onAbcClick={() => setShowAbcModal(true)}
          onAnswerQuestionClick={() => setShowAnswerQuestionModal(true)}
          onExtractClick={() => setShowExtractModal(true)}
        />
      </div>
      <BottomTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Modals */}
      <SortModal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        currentSort={sortConfig}
        onSort={setSortConfig}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        currentFilter={filterConfig}
        onFilter={setFilterConfig}
      />

      <NewActionModal
        isOpen={showNewActionModal}
        onClose={() => setShowNewActionModal(false)}
        onSubmit={handleNewAction}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />

      <HideFieldsModal
        isOpen={showHideFieldsModal}
        onClose={() => setShowHideFieldsModal(false)}
        hiddenFields={hiddenFields}
        onToggleField={handleToggleField}
      />

      <EditRowModal
        isOpen={showEditRowModal}
        onClose={() => setShowEditRowModal(false)}
        row={editingRow}
        onSave={handleSaveRow}
      />

      <AnswerQuestionModal
        isOpen={showAnswerQuestionModal}
        onClose={() => setShowAnswerQuestionModal(false)}
      />

      <ExtractModal
        isOpen={showExtractModal}
        onClose={() => setShowExtractModal(false)}
      />

      <AbcModal
        isOpen={showAbcModal}
        onClose={() => setShowAbcModal(false)}
      />
    </div>
  );
};

export default SpreadsheetView;