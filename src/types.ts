/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Client {
  id: string;
  name: string;
  contact?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact?: string;
}

export interface MonthlyExchangeRate {
  id: string;
  month: string; // YYYY-MM
  rate: number;  // 1 EUR = ? NGN (e.g., 1600)
}

export interface Purchase {
  id: string;           // Acts as the primary Deal ID (e.g., "DEAL-001")
  date: string;
  supplierId: string;
  description: string;
  amountEUR: number;
  isLoan: boolean;
  loanPrincipal: number;
  loanRate: number;     // Annual rate as percentage (e.g., 5.5 for 5.5%)
  loanStartDate: string;
  loanTermDays: number;
  interestMethod: 'simple' | 'compound'; // Simple or Monthly Compound
  paidAmountEUR: number; // Cumulative amount paid back
}

export interface Sale {
  id: string;
  dealId: string;       // Foreign key pointing to Purchase.id
  date: string;
  clientId: string;
  amountNGN: number;
  collectedNGN: number;
  collectionDate: string;
}

export interface Expense {
  id: string;
  date: string;
  category: 'Logistics' | 'Rent' | 'Wages' | 'Marketing' | 'Other';
  amountEUR: number;
  description: string;
}

export interface FXTransaction {
  id: string;
  date: string;
  dealId: string;       // Foreign key to Deal ID
  amountNGN: number;    // Amount of NGN converted
  receivedEUR: number;  // Amount of EUR received
}

export interface AppState {
  clients: Client[];
  suppliers: Supplier[];
  exchangeRates: MonthlyExchangeRate[];
  purchases: Purchase[];
  sales: Sale[];
  expenses: Expense[];
  fxTransactions: FXTransaction[];
  lastSaved: string;
}
