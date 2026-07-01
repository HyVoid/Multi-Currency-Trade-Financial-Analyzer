/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState, Purchase, Sale, FXTransaction, MonthlyExchangeRate } from './types';

/**
 * Calculates days between two date strings (YYYY-MM-DD)
 */
export function getDaysBetween(startStr: string, endStr: string): number {
  if (!startStr || !endStr) return 0;
  const start = new Date(startStr);
  const end = new Date(endStr);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
}

/**
 * Gets the monthly exchange rate (1 EUR = ? NGN) from the rates config.
 * Falls back to 1600 if no rate is found.
 */
export function getMonthlyExchangeRate(dateStr: string, rates: MonthlyExchangeRate[]): number {
  if (!dateStr) return 1600;
  const month = dateStr.substring(0, 7); // "YYYY-MM"
  const rateObj = rates.find(r => r.month === month);
  return rateObj ? rateObj.rate : 1600;
}

/**
 * Formats a currency value.
 * EUR uses € and NGN uses ₦.
 */
export function formatCurrency(amount: number, currency: 'EUR' | 'NGN'): string {
  const rounded = Math.round((amount + Number.EPSILON) * 100) / 100;
  if (currency === 'EUR') {
    return '€' + rounded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return '₦' + Math.round(rounded).toLocaleString('en-US');
  }
}

/**
 * Computes interest and tracking details for a supplier loan.
 */
export interface LoanDetails {
  accruedInterestEUR: number;
  totalDebtEUR: number;
  remainingDebtEUR: number;
  daysAccrued: number;
  isOverdue: boolean;
  status: 'Clean' | 'Accruing' | 'Partially Paid' | 'Fully Paid' | 'Overdue';
}

export function calculateLoanDetails(purchase: Purchase, asOfDate: string): LoanDetails {
  if (!purchase.isLoan) {
    return {
      accruedInterestEUR: 0,
      totalDebtEUR: 0,
      remainingDebtEUR: 0,
      daysAccrued: 0,
      isOverdue: false,
      status: 'Clean'
    };
  }

  const { loanPrincipal, loanRate, loanStartDate, loanTermDays, paidAmountEUR } = purchase;
  const elapsedDays = getDaysBetween(loanStartDate, asOfDate);
  
  // Accrual ends either at the term limit, or continues if unpaid
  const daysAccrued = elapsedDays;
  
  // Accrued interest: Principal * Rate * Days / 365
  const accruedInterestEUR = loanPrincipal * (loanRate / 100) * (daysAccrued / 365);
  const totalDebtEUR = loanPrincipal + accruedInterestEUR;
  const remainingDebtEUR = Math.max(0, totalDebtEUR - paidAmountEUR);
  
  const isOverdue = elapsedDays > loanTermDays && remainingDebtEUR > 1;
  
  let status: 'Clean' | 'Accruing' | 'Partially Paid' | 'Fully Paid' | 'Overdue' = 'Accruing';
  if (remainingDebtEUR <= 1) {
    status = 'Fully Paid';
  } else if (isOverdue) {
    status = 'Overdue';
  } else if (paidAmountEUR > 0) {
    status = 'Partially Paid';
  }

  return {
    accruedInterestEUR,
    totalDebtEUR,
    remainingDebtEUR,
    daysAccrued,
    isOverdue,
    status
  };
}

/**
 * Deal-level calculation metrics compiled from all ledger sheets.
 */
export interface DealCalculations {
  dealId: string;
  purchaseDate: string;
  description: string;
  supplierId: string;
  supplierName: string;
  purchaseCostEUR: number;
  
  // Loan details
  isLoan: boolean;
  loanPrincipalEUR: number;
  loanRate: number;
  loanStartDate: string;
  accruedInterestEUR: number;
  paidLoanAmountEUR: number;
  remainingLoanDebtEUR: number;
  
  // Sales details
  clientId: string;
  clientName: string;
  saleDate: string;
  saleAmountNGN: number;
  collectedAmountNGN: number;
  uncollectedAmountNGN: number;
  uncollectedEUR: number; // Converted using monthly config rate
  
  // FX realized
  actualExchangedNGN: number;
  actualReceivedEUR: number;
  actualExchangeRate: number; // NGN per EUR
  collectedNotExchangedNGN: number;
  collectedNotExchangedEUR: number; // Converted using monthly config rate
  
  // Combined Totals
  totalRevenueEUR: number; // Realized FX received + Unexchanged Collected (est) + Uncollected (est)
  totalCostEUR: number;    // Purchase Cost + Accrued Loan Interest
  netProfitEUR: number;    // Total Revenue - Total Cost
  marginPercent: number;   // netProfitEUR / totalCostEUR (or totalRevenueEUR) - Let's use standard margin: profit / revenue
  status: 'Completed' | 'In Progress' | 'At Risk';
}

export function compileDealCalculations(state: AppState, asOfDate: string): DealCalculations[] {
  const { purchases, sales, fxTransactions, clients, suppliers, exchangeRates } = state;

  return purchases.map(purchase => {
    const dealId = purchase.id;
    const supplier = suppliers.find(s => s.id === purchase.supplierId);
    const supplierName = supplier ? supplier.name : 'Unknown Supplier';

    // Supplier Loan
    const loan = calculateLoanDetails(purchase, asOfDate);

    // Sales tied to this Deal
    const dealSales = sales.filter(s => s.dealId === dealId);
    const primarySale = dealSales[0]; // Assume one primary sale per Deal ID for simplicity
    const client = primarySale ? clients.find(c => c.id === primarySale.clientId) : null;
    const clientName = client ? client.name : 'No Client Registered';
    
    const saleAmountNGN = primarySale ? primarySale.amountNGN : 0;
    const collectedAmountNGN = primarySale ? primarySale.collectedNGN : 0;
    const uncollectedAmountNGN = Math.max(0, saleAmountNGN - collectedAmountNGN);
    
    const saleDate = primarySale ? primarySale.date : '';
    const saleMonthRate = getMonthlyExchangeRate(saleDate || purchase.date, exchangeRates);
    const uncollectedEUR = uncollectedAmountNGN / saleMonthRate;

    // FX Transactions tied to this Deal
    const dealFXs = fxTransactions.filter(f => f.dealId === dealId);
    const actualExchangedNGN = dealFXs.reduce((sum, fx) => sum + fx.amountNGN, 0);
    const actualReceivedEUR = dealFXs.reduce((sum, fx) => sum + fx.receivedEUR, 0);
    const actualExchangeRate = actualReceivedEUR > 0 ? actualExchangedNGN / actualReceivedEUR : 0;

    // Collected cash waiting to be converted
    const collectedNotExchangedNGN = Math.max(0, collectedAmountNGN - actualExchangedNGN);
    const collectedNotExchangedEUR = collectedNotExchangedNGN / saleMonthRate;

    // Total Revenue EUR (Realized received EUR + Converted pending EUR + Converted uncollected EUR)
    const totalRevenueEUR = actualReceivedEUR + collectedNotExchangedEUR + uncollectedEUR;
    
    // Total Cost EUR (Purchase cost + Accrued loan interest)
    const totalCostEUR = purchase.amountEUR + loan.accruedInterestEUR;
    const netProfitEUR = totalRevenueEUR - totalCostEUR;
    const marginPercent = totalRevenueEUR > 0 ? (netProfitEUR / totalRevenueEUR) * 100 : 0;

    // Status Determination
    // At Risk: Client outstanding is positive and sales date is > 30 days ago
    const isUncollectedOverdue = primarySale && uncollectedAmountNGN > 0 && getDaysBetween(primarySale.date, asOfDate) > 30;
    const isLoanOverdue = loan.isOverdue;
    
    let status: 'Completed' | 'In Progress' | 'At Risk' = 'In Progress';
    if (isUncollectedOverdue || isLoanOverdue) {
      status = 'At Risk';
    } else if (uncollectedAmountNGN <= 1 && collectedNotExchangedNGN <= 1 && (!purchase.isLoan || loan.remainingDebtEUR <= 1)) {
      status = 'Completed';
    }

    return {
      dealId,
      purchaseDate: purchase.date,
      description: purchase.description,
      supplierId: purchase.supplierId,
      supplierName,
      purchaseCostEUR: purchase.amountEUR,
      
      isLoan: purchase.isLoan,
      loanPrincipalEUR: purchase.loanPrincipal,
      loanRate: purchase.loanRate,
      loanStartDate: purchase.loanStartDate,
      accruedInterestEUR: loan.accruedInterestEUR,
      paidLoanAmountEUR: purchase.paidAmountEUR,
      remainingLoanDebtEUR: loan.remainingDebtEUR,
      
      clientId: primarySale ? primarySale.clientId : '',
      clientName,
      saleDate,
      saleAmountNGN,
      collectedAmountNGN,
      uncollectedAmountNGN,
      uncollectedEUR,
      
      actualExchangedNGN,
      actualReceivedEUR,
      actualExchangeRate,
      collectedNotExchangedNGN,
      collectedNotExchangedEUR,
      
      totalRevenueEUR,
      totalCostEUR,
      netProfitEUR,
      marginPercent,
      status
    };
  });
}

/**
 * Compiles aggregated global stats.
 */
export interface GlobalStats {
  cashBalanceEUR: number;
  totalReceivablesEUR: number;
  totalPayablesEUR: number;
  totalNetProfitEUR: number;
  workingCapitalEUR: number;
  totalExpensesEUR: number;
}

export function computeGlobalStats(state: AppState, asOfDate: string): GlobalStats {
  const deals = compileDealCalculations(state, asOfDate);
  const totalExpensesEUR = state.expenses.reduce((sum, exp) => sum + exp.amountEUR, 0);

  // Cash Balance EUR: Realized FX Cash - Purchase Costs Paid - Overhead Expenses Paid
  // To keep it simple, let's calculate: 
  // cash = FX received (EUR) - Purchases Cost (EUR, if paid/funded) - overhead expenses.
  // Actually, let's track Cash Balance as a running sum:
  // Initial capital + FX received EUR - Purchase cost EUR - overhead expenses EUR - loan paidAmountEUR.
  // Let's assume a healthy initial starting cash pool of 100,000 EUR to avoid negative bank balances.
  const initialCapitalEUR = 100000;
  const totalReceivedFXEUR = state.fxTransactions.reduce((sum, fx) => sum + fx.receivedEUR, 0);
  const totalPurchaseCostEUR = state.purchases.reduce((sum, pur) => sum + pur.amountEUR, 0);
  const totalLoansRepaidEUR = state.purchases.reduce((sum, pur) => sum + pur.paidAmountEUR, 0);
  
  // Cash position = Initial capital + Received from conversions - Total purchase investments - Overheads - Repaid Loan cash
  // Wait, if a purchase was funded by a loan, the cash out was (Purchase cost - Loan principal).
  // Cash Outflow = (Purchase Cost - Loan Principal) + Loan Repaid + Overhead Expenses
  const netCashPaidForPurchases = state.purchases.reduce((sum, pur) => {
    const fundedDebt = pur.isLoan ? pur.loanPrincipal : 0;
    return sum + (pur.amountEUR - fundedDebt);
  }, 0);

  const cashBalanceEUR = initialCapitalEUR + totalReceivedFXEUR - netCashPaidForPurchases - totalLoansRepaidEUR - totalExpensesEUR;

  // Total outstanding client receivables (converted to EUR)
  const totalReceivablesEUR = deals.reduce((sum, d) => sum + d.uncollectedEUR, 0);

  // Total outstanding supplier payables (including accrued interest)
  const totalPayablesEUR = deals.reduce((sum, d) => sum + d.remainingLoanDebtEUR, 0);

  // Total net profit = Total Deal Profit - Overhead Expenses
  const totalDealProfitEUR = deals.reduce((sum, d) => sum + d.netProfitEUR, 0);
  const totalNetProfitEUR = totalDealProfitEUR - totalExpensesEUR;

  // Working Capital = Cash Balance + Receivables - Payables
  const workingCapitalEUR = cashBalanceEUR + totalReceivablesEUR - totalPayablesEUR;

  return {
    cashBalanceEUR,
    totalReceivablesEUR,
    totalPayablesEUR,
    totalNetProfitEUR,
    workingCapitalEUR,
    totalExpensesEUR
  };
}
