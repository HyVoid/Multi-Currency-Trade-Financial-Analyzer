/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AppState, Client, Supplier, MonthlyExchangeRate, Purchase, Sale, Expense, FXTransaction } from './types';
import { INITIAL_STATE } from './initialData';

const LOCAL_STORAGE_KEY = 'multi_currency_trade_analyzer_state';

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.purchases)) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved state, resetting to default', e);
      }
    }
    return INITIAL_STATE;
  });

  const [asOfDate, setAsOfDate] = useState<string>('2026-07-01');

  // Helper to format date
  const getNowString = (): string => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // Save to local storage on state change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((updater: (prev: AppState) => Partial<AppState>) => {
    setState((prev) => {
      const partial = updater(prev);
      return {
        ...prev,
        ...partial,
        lastSaved: getNowString()
      };
    });
  }, []);

  // Clients
  const addClient = useCallback((client: Omit<Client, 'id'>) => {
    updateState((prev) => {
      const id = 'cli-' + Date.now();
      return { clients: [...prev.clients, { ...client, id }] };
    });
  }, [updateState]);

  const editClient = useCallback((client: Client) => {
    updateState((prev) => ({
      clients: prev.clients.map((c) => (c.id === client.id ? client : c))
    }));
  }, [updateState]);

  const deleteClient = useCallback((id: string) => {
    updateState((prev) => ({
      clients: prev.clients.filter((c) => c.id !== id)
    }));
  }, [updateState]);

  // Suppliers
  const addSupplier = useCallback((supplier: Omit<Supplier, 'id'>) => {
    updateState((prev) => {
      const id = 'sup-' + Date.now();
      return { suppliers: [...prev.suppliers, { ...supplier, id }] };
    });
  }, [updateState]);

  const editSupplier = useCallback((supplier: Supplier) => {
    updateState((prev) => ({
      suppliers: prev.suppliers.map((s) => (s.id === supplier.id ? supplier : s))
    }));
  }, [updateState]);

  const deleteSupplier = useCallback((id: string) => {
    updateState((prev) => ({
      suppliers: prev.suppliers.filter((s) => s.id !== id)
    }));
  }, [updateState]);

  // Exchange Rates
  const addExchangeRate = useCallback((rate: Omit<MonthlyExchangeRate, 'id'>) => {
    updateState((prev) => {
      const id = 'rate-' + Date.now();
      return { exchangeRates: [...prev.exchangeRates, { ...rate, id }] };
    });
  }, [updateState]);

  const editExchangeRate = useCallback((rate: MonthlyExchangeRate) => {
    updateState((prev) => ({
      exchangeRates: prev.exchangeRates.map((r) => (r.id === rate.id ? rate : r))
    }));
  }, [updateState]);

  const deleteExchangeRate = useCallback((id: string) => {
    updateState((prev) => ({
      exchangeRates: prev.exchangeRates.filter((r) => r.id !== id)
    }));
  }, [updateState]);

  // Purchases
  const addPurchase = useCallback((purchase: Purchase) => {
    updateState((prev) => ({
      purchases: [...prev.purchases, purchase]
    }));
  }, [updateState]);

  const editPurchase = useCallback((purchase: Purchase) => {
    updateState((prev) => ({
      purchases: prev.purchases.map((p) => (p.id === purchase.id ? purchase : p))
    }));
  }, [updateState]);

  const deletePurchase = useCallback((id: string) => {
    updateState((prev) => ({
      purchases: prev.purchases.filter((p) => p.id !== id),
      sales: prev.sales.filter((s) => s.dealId !== id),
      fxTransactions: prev.fxTransactions.filter((f) => f.dealId !== id)
    }));
  }, [updateState]);

  // Sales
  const addSale = useCallback((sale: Omit<Sale, 'id'>) => {
    updateState((prev) => {
      const id = 'sale-' + Date.now();
      return { sales: [...prev.sales, { ...sale, id }] };
    });
  }, [updateState]);

  const editSale = useCallback((sale: Sale) => {
    updateState((prev) => ({
      sales: prev.sales.map((s) => (s.id === sale.id ? sale : s))
    }));
  }, [updateState]);

  const deleteSale = useCallback((id: string) => {
    updateState((prev) => ({
      sales: prev.sales.filter((s) => s.id !== id)
    }));
  }, [updateState]);

  // Expenses
  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    updateState((prev) => {
      const id = 'exp-' + Date.now();
      return { expenses: [...prev.expenses, { ...expense, id }] };
    });
  }, [updateState]);

  const editExpense = useCallback((expense: Expense) => {
    updateState((prev) => ({
      expenses: prev.expenses.map((e) => (e.id === expense.id ? expense : e))
    }));
  }, [updateState]);

  const deleteExpense = useCallback((id: string) => {
    updateState((prev) => ({
      expenses: prev.expenses.filter((e) => e.id !== id)
    }));
  }, [updateState]);

  // FX Transactions
  const addFXTransaction = useCallback((fx: Omit<FXTransaction, 'id'>) => {
    updateState((prev) => {
      const id = 'fx-' + Date.now();
      return { fxTransactions: [...prev.fxTransactions, { ...fx, id }] };
    });
  }, [updateState]);

  const editFXTransaction = useCallback((fx: FXTransaction) => {
    updateState((prev) => ({
      fxTransactions: prev.fxTransactions.map((f) => (f.id === fx.id ? fx : f))
    }));
  }, [updateState]);

  const deleteFXTransaction = useCallback((id: string) => {
    updateState((prev) => ({
      fxTransactions: prev.fxTransactions.filter((f) => f.id !== id)
    }));
  }, [updateState]);

  // Reset Data to Default
  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all data to default initial trade ledger? Any unsaved changes will be lost.')) {
      setState({
        ...INITIAL_STATE,
        lastSaved: getNowString()
      });
    }
  }, []);

  // Export state to backup file
  const exportBackup = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mct_financial_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  // Import state from backup file
  const importBackup = useCallback((fileContent: string) => {
    try {
      const parsed = JSON.parse(fileContent);
      if (parsed && Array.isArray(parsed.purchases) && Array.isArray(parsed.sales)) {
        setState({
          ...parsed,
          lastSaved: getNowString()
        });
        alert('Backup imported successfully! All ledgers have been updated.');
        return true;
      } else {
        alert('Invalid file format. Please upload a valid JSON backup exported from this analyzer.');
        return false;
      }
    } catch (e) {
      alert('Failed to parse the backup file. Please ensure it is a valid JSON file.');
      console.error(e);
      return false;
    }
  }, []);

  return {
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
  };
}
export type AppStateHook = ReturnType<typeof useAppState>;
