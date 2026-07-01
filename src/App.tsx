/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppState } from './useAppState';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import PurchasesView from './components/PurchasesView';
import SalesView from './components/SalesView';
import ExpensesView from './components/ExpensesView';
import CalculationEngineView from './components/CalculationEngineView';
import ConfigView from './components/ConfigView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const {
    state,
    asOfDate,
    setAsOfDate,
    addClient,
    editClient,
    deleteClient,
    addSupplier,
    editSupplier,
    deleteSupplier,
    addExchangeRate,
    editExchangeRate,
    deleteExchangeRate,
    addPurchase,
    editPurchase,
    deletePurchase,
    addSale,
    editSale,
    deleteSale,
    addExpense,
    editExpense,
    deleteExpense,
    addFXTransaction,
    editFXTransaction,
    deleteFXTransaction,
    resetData,
    exportBackup,
    importBackup
  } = useAppState();

  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            state={state} 
            asOfDate={asOfDate} 
          />
        );
      case 'purchases':
        return (
          <PurchasesView
            state={state}
            asOfDate={asOfDate}
            addPurchase={addPurchase}
            editPurchase={editPurchase}
            deletePurchase={deletePurchase}
          />
        );
      case 'sales':
        return (
          <SalesView
            state={state}
            asOfDate={asOfDate}
            addSale={addSale}
            editSale={editSale}
            deleteSale={deleteSale}
          />
        );
      case 'expenses':
        return (
          <ExpensesView
            state={state}
            addExpense={addExpense}
            editExpense={editExpense}
            deleteExpense={deleteExpense}
            addFXTransaction={addFXTransaction}
            editFXTransaction={editFXTransaction}
            deleteFXTransaction={deleteFXTransaction}
          />
        );
      case 'calculations':
        return (
          <CalculationEngineView 
            state={state} 
            asOfDate={asOfDate} 
          />
        );
      case 'config':
        return (
          <ConfigView
            state={state}
            addClient={addClient}
            editClient={editClient}
            deleteClient={deleteClient}
            addSupplier={addSupplier}
            editSupplier={editSupplier}
            deleteSupplier={deleteSupplier}
            addExchangeRate={addExchangeRate}
            editExchangeRate={editExchangeRate}
            deleteExchangeRate={deleteExchangeRate}
          />
        );
      default:
        return <div className="text-center py-20 text-xs">View Not Found</div>;
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F5F5F2] text-[#1A1A2E] flex flex-col justify-between">
      
      {/* Top Sticky Navigation Bar (56px) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lastSaved={state.lastSaved}
        asOfDate={asOfDate}
        setAsOfDate={setAsOfDate}
        exportBackup={exportBackup}
        importBackup={importBackup}
        resetData={resetData}
      />

      {/* Main Content Area: Max Width 1400px Centered, 40px left/right margins */}
      <main id="app-main-content" className="flex-grow w-full max-w-[1400px] mx-auto px-10 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.0, 0.0, 0.2, 1.0] }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer bar */}
      <footer id="app-footer" className="w-full bg-white border-t border-[#E8E8E6] py-4 text-center select-none shrink-0">
        <div className="max-w-[1400px] mx-auto px-10 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-[#888888] font-medium tracking-wide uppercase">
          <span>
            Multi-Currency Trade Financial Analyzer & Ledger © 2026
          </span>
          <span className="mt-1 sm:mt-0 text-[#2251FF] hover:underline cursor-pointer select-all">
            Fully Operational Client-Side SaaS Workbook
          </span>
        </div>
      </footer>

    </div>
  );
}
