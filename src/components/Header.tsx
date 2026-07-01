/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { 
  TrendingUp, 
  Download, 
  Upload, 
  RotateCcw, 
  Clock, 
  Calendar 
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lastSaved: string;
  asOfDate: string;
  setAsOfDate: (date: string) => void;
  exportBackup: () => void;
  importBackup: (content: string) => void;
  resetData: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  lastSaved,
  asOfDate,
  setAsOfDate,
  exportBackup,
  importBackup,
  resetData
}: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importBackup(content);
      }
    };
    reader.readAsText(file);
    // Reset value so same file can be imported again
    e.target.value = '';
  };

  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD' },
    { id: 'purchases', label: 'PURCHASES & LOANS' },
    { id: 'sales', label: 'SALES & COLLECTIONS' },
    { id: 'expenses', label: 'EXPENSES & FX' },
    { id: 'calculations', label: 'CALCULATION ENGINE' },
    { id: 'config', label: 'CONFIG' }
  ];

  return (
    <header 
      id="app-header"
      className="sticky top-0 z-50 w-full h-[56px] bg-white border-b border-[#E8E8E6] custom-shadow-nav flex items-center justify-between px-10"
    >
      {/* Brand logo & title */}
      <div className="flex items-center space-x-3 select-none">
        <div className="w-8 h-8 rounded-lg bg-[#2251FF]/10 flex items-center justify-center text-[#2251FF]">
          <TrendingUp className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <span className="font-heading text-lg font-bold text-[#051C2C] leading-none tracking-tight">
            MCT Analyzer
          </span>
          <span className="hidden md:inline text-[11px] text-[#888888] font-mono ml-2 uppercase tracking-widest font-semibold">
            EURO-AFRICA LEDGER
          </span>
        </div>
      </div>

      {/* Tabs list */}
      <nav className="flex items-center h-full space-x-6">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              id={`tab-btn-${tab.id}`}
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`h-full border-b-[3px] text-xs font-semibold px-2 flex items-center justify-center transition-all duration-200 select-none ${
                isActive
                  ? 'border-[#2251FF] text-[#251C2C]'
                  : 'border-transparent text-[#051C2C]/45 hover:text-[#051C2C]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Actions & dynamic timestamp */}
      <div className="flex items-center space-x-4">
        {/* Save & Date Settings */}
        <div className="flex flex-col items-end mr-2">
          {/* Last Saved Stamp */}
          <div className="flex items-center text-[10px] text-[#888888] font-mono">
            <Clock className="w-3 h-3 mr-1 text-[#2251FF]" />
            <span>LAST SAVED: <strong className="text-[#051C2C]">{lastSaved || 'N/A'}</strong></span>
          </div>
          {/* As-Of System Date adjust */}
          <div className="flex items-center mt-1">
            <Calendar className="w-3 h-3 mr-1 text-[#888888]" />
            <span className="text-[10px] text-[#888888] font-semibold mr-1 font-mono uppercase">AS-OF:</span>
            <input
              id="system-date-picker"
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
              className="text-[11px] font-semibold font-mono bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-[#051C2C] outline-none cursor-pointer focus:border-[#2251FF] transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-1 border-l border-[#E8E8E6] pl-4">
          {/* Export Backup */}
          <button
            id="export-backup-btn"
            onClick={exportBackup}
            title="Export Excel Backup (JSON)"
            className="p-1.5 rounded-md hover:bg-[#F5F5F2] text-[#051C2C] hover:text-[#2251FF] active:scale-95 transition-all duration-150"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import Backup */}
          <button
            id="import-backup-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Import Excel Backup (JSON)"
            className="p-1.5 rounded-md hover:bg-[#F5F5F2] text-[#051C2C] hover:text-[#2251FF] active:scale-95 transition-all duration-150"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            id="import-backup-file-input"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          {/* Reset */}
          <button
            id="reset-data-btn"
            onClick={resetData}
            title="Reset Workbook to Initial Realistic Seed Data"
            className="p-1.5 rounded-md hover:bg-[#F5F5F2] text-[#D32F2F] hover:bg-red-50 active:scale-95 transition-all duration-150"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
