/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState } from './types';

export const INITIAL_STATE: AppState = {
  clients: [
    { id: 'cli-1', name: 'Afro-Trade Wholesale Ltd', contact: 'Lagos Head Office (Lekki)' },
    { id: 'cli-2', name: 'Sahara Logistics & Retail', contact: 'Abuja Distribution Hub' },
    { id: 'cli-3', name: 'Nile Basin Distributors', contact: 'Cairo & Lagos Ports' }
  ],
  suppliers: [
    { id: 'sup-1', name: 'Hamburg Machinery & Co.', contact: 'Hamburg, Germany' },
    { id: 'sup-2', name: 'Rotterdam Agri-Tech Group', contact: 'Rotterdam, Netherlands' },
    { id: 'sup-3', name: 'Marseille Port Supplier S.A.', contact: 'Marseille, France' }
  ],
  exchangeRates: [
    { id: 'rate-1', month: '2026-04', rate: 1500 },
    { id: 'rate-2', month: '2026-05', rate: 1550 },
    { id: 'rate-3', month: '2026-06', rate: 1600 },
    { id: 'rate-4', month: '2026-07', rate: 1650 }
  ],
  purchases: [
    {
      id: 'DEAL-001',
      date: '2026-04-10',
      supplierId: 'sup-1',
      description: 'Premium Mill Parts & Bearings',
      amountEUR: 25000,
      isLoan: true,
      loanPrincipal: 20000,
      loanRate: 6.0,
      loanStartDate: '2026-04-10',
      loanTermDays: 90,
      interestMethod: 'simple',
      paidAmountEUR: 20300 // cleared loan with interest of ~295.89 EUR
    },
    {
      id: 'DEAL-002',
      date: '2026-05-15',
      supplierId: 'sup-2',
      description: 'Agricultural Feedstock Bulk Cargo',
      amountEUR: 42000,
      isLoan: true,
      loanPrincipal: 30000,
      loanRate: 8.5,
      loanStartDate: '2026-05-15',
      loanTermDays: 120,
      interestMethod: 'simple',
      paidAmountEUR: 0 // active, accruing interest
    },
    {
      id: 'DEAL-003',
      date: '2026-06-02',
      supplierId: 'sup-3',
      description: 'Irrigation Valves & Heavy Pumps',
      amountEUR: 15000,
      isLoan: false,
      loanPrincipal: 0,
      loanRate: 0,
      loanStartDate: '',
      loanTermDays: 0,
      interestMethod: 'simple',
      paidAmountEUR: 0
    },
    {
      id: 'DEAL-004',
      date: '2026-06-20',
      supplierId: 'sup-1',
      description: 'Heavy Duty Tractor Tyres',
      amountEUR: 58000,
      isLoan: true,
      loanPrincipal: 40000,
      loanRate: 7.2,
      loanStartDate: '2026-06-20',
      loanTermDays: 180,
      interestMethod: 'simple',
      paidAmountEUR: 10000 // partially paid
    }
  ],
  sales: [
    {
      id: 'sale-1',
      dealId: 'DEAL-001',
      date: '2026-04-15',
      clientId: 'cli-1',
      amountNGN: 45000000,
      collectedNGN: 45000000,
      collectionDate: '2026-05-20'
    },
    {
      id: 'sale-2',
      dealId: 'DEAL-002',
      date: '2026-05-20',
      clientId: 'cli-2',
      amountNGN: 78000000,
      collectedNGN: 50000000,
      collectionDate: '2026-06-15'
    },
    {
      id: 'sale-3',
      dealId: 'DEAL-003',
      date: '2026-06-05',
      clientId: 'cli-3',
      amountNGN: 27000000,
      collectedNGN: 27000000,
      collectionDate: '2026-06-28'
    },
    {
      id: 'sale-4',
      dealId: 'DEAL-004',
      date: '2026-06-25',
      clientId: 'cli-1',
      amountNGN: 105000000,
      collectedNGN: 40000000,
      collectionDate: '2026-06-30'
    }
  ],
  expenses: [
    {
      id: 'exp-1',
      date: '2026-04-30',
      category: 'Logistics',
      amountEUR: 4500,
      description: 'Customs clearance & Marseille port handling'
    },
    {
      id: 'exp-2',
      date: '2026-05-28',
      category: 'Wages',
      amountEUR: 2500,
      description: 'Lagos Operations Staff - Monthly Wages'
    },
    {
      id: 'exp-3',
      date: '2026-06-15',
      category: 'Logistics',
      amountEUR: 3800,
      description: 'Rotterdam shipping charter to Lagos Port'
    },
    {
      id: 'exp-4',
      date: '2026-06-29',
      category: 'Rent',
      amountEUR: 1500,
      description: 'Hamburg headquarter monthly rental'
    }
  ],
  fxTransactions: [
    {
      id: 'fx-1',
      date: '2026-05-22',
      dealId: 'DEAL-001',
      amountNGN: 45000000,
      receivedEUR: 29200 // Actual FX conversion rate of 1541.1 NGN per EUR
    },
    {
      id: 'fx-2',
      date: '2026-06-20',
      dealId: 'DEAL-002',
      amountNGN: 30000000,
      receivedEUR: 19350 // Actual FX conversion rate of 1550.4 NGN per EUR
    },
    {
      id: 'fx-3',
      date: '2026-07-02',
      dealId: 'DEAL-003',
      amountNGN: 20000000,
      receivedEUR: 12500 // Converted collected NGN
    }
  ],
  lastSaved: '2026-07-01 00:52:00'
};
