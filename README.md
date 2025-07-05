# Pixel-Perfect Spreadsheet Interface

A modern, AI-powered spreadsheet application built with React and TypeScript that replicates Google Sheets/Excel functionality with advanced data management features.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Ronnit44/Inscript-Pvt-limited-internship-assignment.git
cd spreadsheet-interface

# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check
```

## 🎯 Features

### Core Spreadsheet Functionality
- **Pixel-perfect UI** matching Figma design specifications
- **Excel-like experience** with sortable, filterable data grid
- **Real-time search** across all columns
- **Row selection** with bulk operations
- **Import/Export** CSV functionality

## 🏗️ Architecture

### Tech Stack
- **React 18** with TypeScript (strict mode)
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **Custom Hooks** for state management

### Project Structure
```
src/
├── components/           # React components
│   ├── modals/          # Modal dialogs
│   ├── Header.tsx       # Top navigation
│   ├── Toolbar.tsx      # Action buttons
│   ├── SpreadsheetGrid.tsx  # Main data grid
│   └── SpreadsheetView.tsx  # Main container
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
└── main.tsx            # Application entry point
```


