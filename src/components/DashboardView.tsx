/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState } from '../types';
import { 
  computeGlobalStats, 
  compileDealCalculations, 
  formatCurrency, 
  getDaysBetween 
} from '../utils';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Briefcase, 
  Users, 
  ArrowUpRight, 
  ShieldAlert,
  Compass
} from 'lucide-react';

interface DashboardViewProps {
  state: AppState;
  asOfDate: string;
}

export default function DashboardView({ state, asOfDate }: DashboardViewProps) {
  const stats = computeGlobalStats(state, asOfDate);
  const deals = compileDealCalculations(state, asOfDate);

  // State for active month hovered in SVG chart
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // 1. Process data for monthly chart
  // We want to combine purchases (EUR) and sales (converted to EUR) by month
  const monthlyMap: Record<string, { purchasesEUR: number; salesEUR: number }> = {};
  
  // Initialize with some months to guarantee a nice timeline
  const defaultMonths = ['2026-04', '2026-05', '2026-06', '2026-07'];
  defaultMonths.forEach(m => {
    monthlyMap[m] = { purchasesEUR: 0, salesEUR: 0 };
  });

  // Accumulate Purchases
  state.purchases.forEach(p => {
    const month = p.date.substring(0, 7);
    if (!monthlyMap[month]) {
      monthlyMap[month] = { purchasesEUR: 0, salesEUR: 0 };
    }
    monthlyMap[month].purchasesEUR += p.amountEUR;
  });

  // Accumulate Sales (converted using the exchange rate at the sale date)
  deals.forEach(d => {
    if (d.saleDate) {
      const month = d.saleDate.substring(0, 7);
      if (!monthlyMap[month]) {
        monthlyMap[month] = { purchasesEUR: 0, salesEUR: 0 };
      }
      // Sale volume in EUR is estimated via total sale NGN / exchange rate
      // or using uncollectedEUR + collectedNotExchangedEUR + actualReceivedEUR.
      // Let's use d.totalRevenueEUR as the true deal sale value in EUR
      monthlyMap[month].salesEUR += d.totalRevenueEUR;
    }
  });

  const chartData = Object.entries(monthlyMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, data]) => ({
      month,
      monthLabel: new Date(month + '-02').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      purchases: Math.round(data.purchasesEUR),
      sales: Math.round(data.salesEUR)
    }));

  // Find max value in chart data to scale SVG height
  const maxVal = Math.max(
    ...chartData.map(d => Math.max(d.purchases, d.sales)),
    10000 // default min height scale
  );

  // 2. Identify top debtor balances
  const clientOutstandingMap: Record<string, { name: string; outstandingNGN: number; outstandingEUR: number }> = {};
  deals.forEach(d => {
    if (d.clientId && d.uncollectedAmountNGN > 0) {
      if (!clientOutstandingMap[d.clientId]) {
        clientOutstandingMap[d.clientId] = {
          name: d.clientName,
          outstandingNGN: 0,
          outstandingEUR: 0
        };
      }
      clientOutstandingMap[d.clientId].outstandingNGN += d.saleAmountNGN - d.collectedAmountNGN;
      clientOutstandingMap[d.clientId].outstandingEUR += d.uncollectedEUR;
    }
  });

  const topDebtors = Object.values(clientOutstandingMap)
    .sort((a, b) => b.outstandingEUR - a.outstandingEUR)
    .slice(0, 5);

  const maxOutstandingEUR = topDebtors.length > 0 ? Math.max(...topDebtors.map(d => d.outstandingEUR)) : 1;

  // 3. Loans summary / critical focus
  const activeLoans = deals
    .filter(d => d.isLoan && d.remainingLoanDebtEUR > 1)
    .map(d => {
      const pObj = state.purchases.find(p => p.id === d.dealId)!;
      const elapsedDays = getDaysBetween(pObj.loanStartDate, asOfDate);
      const isOverdue = elapsedDays > pObj.loanTermDays;
      return {
        dealId: d.dealId,
        supplierName: d.supplierName,
        principal: d.loanPrincipalEUR,
        remaining: d.remainingLoanDebtEUR,
        accruedInterest: d.accruedInterestEUR,
        startDate: pObj.loanStartDate,
        rate: pObj.loanRate,
        daysElapsed: elapsedDays,
        termDays: pObj.loanTermDays,
        isOverdue
      };
    });

  const overdueLoansCount = activeLoans.filter(l => l.isOverdue).length;

  return (
    <div id="dashboard-view" className="animate-fade-up flex flex-col space-y-10">
      
      {/* Executive Overview Header */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          Executive Portfolio Dashboard
        </h1>
        <p className="text-sm text-[#888888]">
          Real-time cross-border asset monitoring, currency exposures, and accrued interest metrics as of <span className="font-mono font-semibold text-[#051C2C]">{asOfDate}</span>.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Card 1: Cash Balance */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md interactive-card relative overflow-hidden flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest uppercase">CASH BALANCE</span>
            <div className="p-1 rounded bg-[#2251FF]/5 text-[#2251FF]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-[#051C2C] -ml-0.5">
              {formatCurrency(stats.cashBalanceEUR, 'EUR')}
            </h3>
            <p className="text-[10px] text-[#888888] font-mono mt-1 uppercase">EUR Reserve Fund (Inc. 100k Capital)</p>
          </div>
        </div>

        {/* Card 2: Receivables */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md interactive-card relative overflow-hidden flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest uppercase">RECEIVABLES</span>
            <div className="p-1 rounded bg-[#2251FF]/5 text-[#2251FF]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-[#051C2C] -ml-0.5">
              {formatCurrency(stats.totalReceivablesEUR, 'EUR')}
            </h3>
            <p className="text-[10px] text-[#888888] font-mono mt-1 uppercase">Client Balances Converted</p>
          </div>
        </div>

        {/* Card 3: Payables */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md interactive-card relative overflow-hidden flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest uppercase">PAYABLES (LOANS)</span>
            <div className="p-1 rounded bg-[#2251FF]/5 text-[#2251FF]">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-[#051C2C] -ml-0.5">
              {formatCurrency(stats.totalPayablesEUR, 'EUR')}
            </h3>
            <p className="text-[10px] text-[#888888] font-mono mt-1 uppercase">Accruing Debt Principal + Interest</p>
          </div>
        </div>

        {/* Card 4: Net Profit */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md interactive-card relative overflow-hidden flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest uppercase">NET REVENUE PROFIT</span>
            <div className="p-1 rounded bg-[#2251FF]/5 text-[#2251FF]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className={`font-heading text-2xl font-bold tracking-tight -ml-0.5 ${stats.totalNetProfitEUR >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'}`}>
              {formatCurrency(stats.totalNetProfitEUR, 'EUR')}
            </h3>
            <p className="text-[10px] text-[#888888] font-mono mt-1 uppercase">Excl. {formatCurrency(stats.totalExpensesEUR, 'EUR')} Overhead Costs</p>
          </div>
        </div>

        {/* Card 5: Working Capital */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md interactive-card relative overflow-hidden flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest uppercase">WORKING CAPITAL</span>
            <div className="p-1 rounded bg-[#2251FF]/5 text-[#2251FF]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-[#2251FF] -ml-0.5">
              {formatCurrency(stats.workingCapitalEUR, 'EUR')}
            </h3>
            <p className="text-[10px] text-[#888888] font-mono mt-1 uppercase">Liquid Capital Position</p>
          </div>
        </div>

      </div>

      {/* Main Core Section: Chart & Debtor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Monthly Trade Trends Chart Card (3/5 columns) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg custom-shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h2 className="font-heading text-lg font-bold tracking-tight text-[#051C2C]">
                Monthly Capital Flow Trends
              </h2>
              <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">ALL VALUE IN EUR</span>
            </div>
            <p className="text-xs text-[#888888] mb-6">
              Visual ledger representing month-on-month Purchase Inflows (invested capital) vs Sales Outflows (including uncollected valuations).
            </p>
          </div>

          {/* Custom SVG Dual Bar Chart */}
          <div className="relative w-full h-[220px]">
            <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
                const y = 20 + p * 160;
                const gridVal = Math.round(maxVal * (1 - p));
                return (
                  <g key={i} className="opacity-40">
                    <line 
                      x1="45" 
                      y1={y} 
                      x2="480" 
                      y2={y} 
                      stroke="#E8E8E6" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                    />
                    <text 
                      x="38" 
                      y={y + 3} 
                      textAnchor="end" 
                      className="font-mono text-[9px] fill-[#888888]"
                    >
                      {gridVal >= 1000 ? (gridVal / 1000) + 'k' : gridVal}
                    </text>
                  </g>
                );
              })}

              {/* Render Bar sets for each month */}
              {chartData.map((d, index) => {
                const step = (430 / chartData.length);
                const xCenter = 60 + index * step;
                
                // Scale heights based on maxVal
                const barHeightPurchases = (d.purchases / maxVal) * 160;
                const barHeightSales = (d.sales / maxVal) * 160;

                const yPurchases = 180 - barHeightPurchases;
                const ySales = 180 - barHeightSales;

                const isHovered = hoveredMonth === d.month;

                return (
                  <g 
                    key={d.month}
                    onMouseEnter={() => setHoveredMonth(d.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    className="cursor-pointer transition-all duration-150"
                  >
                    {/* Background hit area box */}
                    <rect 
                      x={xCenter - 15} 
                      y="15" 
                      width="50" 
                      height="175" 
                      fill="transparent" 
                    />

                    {/* Purchases Bar (Brand color #051C2C) */}
                    <rect 
                      x={xCenter - 12} 
                      y={yPurchases} 
                      width="10" 
                      height={barHeightPurchases} 
                      fill="#051C2C" 
                      rx="2"
                      className="transition-all duration-300 hover:opacity-85"
                    />

                    {/* Sales Bar (Accent color #2251FF) */}
                    <rect 
                      x={xCenter + 2} 
                      y={ySales} 
                      width="10" 
                      height={barHeightSales} 
                      fill="#2251FF" 
                      rx="2"
                      className="transition-all duration-300 hover:opacity-85"
                    />

                    {/* Month Label */}
                    <text 
                      x={xCenter} 
                      y="198" 
                      textAnchor="middle" 
                      className={`font-mono text-[10px] font-semibold ${isHovered ? 'fill-[#2251FF]' : 'fill-[#051C2C]'}`}
                    >
                      {d.monthLabel}
                    </text>

                    {/* Dynamic Mini Tooltip popover when hovered */}
                    {isHovered && (
                      <g className="animate-fade-up">
                        {/* Tooltip Background */}
                        <rect 
                          x={xCenter - 60} 
                          y={Math.min(yPurchases, ySales) - 45} 
                          width="120" 
                          height="36" 
                          fill="#051C2C" 
                          rx="4" 
                        />
                        <text 
                          x={xCenter} 
                          y={Math.min(yPurchases, ySales) - 33} 
                          textAnchor="middle" 
                          fill="#FFFFFF" 
                          className="font-mono text-[8px] font-bold"
                        >
                          P: €{d.purchases.toLocaleString()}
                        </text>
                        <text 
                          x={xCenter} 
                          y={Math.min(yPurchases, ySales) - 22} 
                          textAnchor="middle" 
                          fill="#2251FF" 
                          className="font-mono text-[8px] font-bold"
                        >
                          S: €{d.sales.toLocaleString()}
                        </text>
                        {/* Little triangle pointing down */}
                        <polygon 
                          points={`${xCenter-4},${Math.min(yPurchases, ySales)-9} ${xCenter+4},${Math.min(yPurchases, ySales)-9} ${xCenter},${Math.min(yPurchases, ySales)-5}`}
                          fill="#051C2C"
                        />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Bottom Baseline axis */}
              <line x1="30" y1="180" x2="480" y2="180" stroke="#051C2C" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Legend indicator */}
          <div className="flex justify-center space-x-6 mt-4 font-mono text-[10px] uppercase font-semibold">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-[#051C2C] rounded-sm mr-1.5" />
              <span className="text-[#051C2C]">Purchases Cost (EUR)</span>
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-[#2251FF] rounded-sm mr-1.5" />
              <span className="text-[#2251FF]">Sales Valuation (EUR)</span>
            </div>
          </div>
        </div>

        {/* Top Debtors Rank List Card (2/5 columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg custom-shadow-md flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h2 className="font-heading text-lg font-bold tracking-tight text-[#051C2C]">
                Top Client Exposures (Outstanding)
              </h2>
            </div>
            <p className="text-xs text-[#888888] mb-6">
              Active accounts and cumulative outstanding debt. Priority collections list.
            </p>

            {/* List */}
            {topDebtors.length === 0 ? (
              <div className="text-center py-10 text-[#888888] font-mono text-xs uppercase">
                No Outstanding Exposures Active
              </div>
            ) : (
              <div className="space-y-4">
                {topDebtors.map((debtor, idx) => {
                  const percentageWidth = Math.min(100, Math.max(10, (debtor.outstandingEUR / maxOutstandingEUR) * 100));
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-[#051C2C]">
                        <span className="truncate max-w-[170px]">{debtor.name}</span>
                        <div className="text-right font-mono font-bold text-[#2251FF]">
                          {formatCurrency(debtor.outstandingEUR, 'EUR')}
                          <span className="text-[10px] text-[#888888] font-normal block">
                            {formatCurrency(debtor.outstandingNGN, 'NGN')}
                          </span>
                        </div>
                      </div>

                      {/* Inline Data bar */}
                      <div className="w-full h-2 bg-[#051C2C]/10 rounded-sm overflow-hidden relative">
                        <div 
                          className="h-full bg-[#2251FF] rounded-sm transition-all duration-500 ease-out" 
                          style={{ width: `${percentageWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#E8E8E6] mt-4">
            <span className="text-[10px] text-[#888888] font-mono block uppercase">
              REVENUE INVOICE EXPIRY TARGETS:
            </span>
            <p className="text-xs text-[#051C2C] font-semibold mt-0.5">
              Standard credit duration is set to 30 days. Unpaid amounts beyond this trigger risk-tier changes.
            </p>
          </div>
        </div>

      </div>

      {/* Supplier Loans Alert Center */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Loan Alert Monitor (2/3 cols) */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg custom-shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold tracking-tight text-[#051C2C]">
              Supplier Debt & Accruing Interest Panel
            </h2>
            {overdueLoansCount > 0 ? (
              <span className="px-2.5 py-0.5 bg-red-50 text-[#D32F2F] text-[10px] font-mono font-bold rounded-full flex items-center border border-red-200">
                <ShieldAlert className="w-3.5 h-3.5 mr-1 text-[#D32F2F]" />
                {overdueLoansCount} OVERDUE LOANS
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-slate-50 text-[#051C2C]/60 text-[10px] font-mono font-bold rounded-full">
                ALL CREDITS ACTIVE
              </span>
            )}
          </div>

          {activeLoans.length === 0 ? (
            <div className="text-center py-10 text-[#888888] font-mono text-xs uppercase">
              No active supplier financing records in ledger
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E6] pb-2 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
                    <th className="pb-2">DEAL / SUPPLIER</th>
                    <th className="pb-2 text-right">PRINCIPAL</th>
                    <th className="pb-2 text-right">ACCRUED INTEREST</th>
                    <th className="pb-2 text-right">OUTSTANDING DEBT</th>
                    <th className="pb-2 text-center">ELAPSED / TERM</th>
                    <th className="pb-2 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]">
                  {activeLoans.map((loan) => (
                    <tr 
                      key={loan.dealId} 
                      className={`hover:bg-[#F5F5F2]/40 transition-colors ${
                        loan.isOverdue ? 'bg-red-50/20' : ''
                      }`}
                    >
                      <td className="py-2.5">
                        <div className="font-bold text-[#051C2C]">{loan.dealId}</div>
                        <div className="text-[11px] text-[#888888]">{loan.supplierName}</div>
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold text-[#051C2C]">
                        {formatCurrency(loan.principal, 'EUR')}
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold text-amber-600">
                        {formatCurrency(loan.accruedInterest, 'EUR')}
                        <span className="text-[9px] text-[#888888] block font-mono">@{loan.rate}% rate</span>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-[#2251FF]">
                        {formatCurrency(loan.remaining, 'EUR')}
                      </td>
                      <td className="py-2.5 text-center font-mono text-[#051C2C]">
                        <span className={`font-bold ${loan.isOverdue ? 'text-[#D32F2F]' : ''}`}>
                          {loan.daysElapsed}
                        </span>
                        <span className="text-[#888888]"> / {loan.termDays} Days</span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                          loan.isOverdue 
                            ? 'bg-red-50 text-[#D32F2F] border border-red-200' 
                            : 'bg-blue-50 text-[#2251FF] border border-blue-100'
                        }`}>
                          {loan.isOverdue ? 'OVERDUE' : 'ACCRUING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Business Insights & Recommendations (1/3 col) */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold tracking-tight text-[#051C2C] mb-3 flex items-center">
              <Compass className="w-5 h-5 mr-1.5 text-[#2251FF]" />
              Capital Insights
            </h2>
            
            {/* Shaded insight block with left border */}
            <div className="p-4 bg-[#2251FF]/4 border-l-3 border-[#2251FF] rounded-r-md mb-4">
              <span className="text-[10px] font-mono text-[#2251FF] font-bold block uppercase tracking-wider mb-1">
                Lending & Overdue Risk
              </span>
              <p className="text-xs text-[#051C2C] leading-relaxed">
                {overdueLoansCount > 0 
                  ? `There are currently ${overdueLoansCount} supplier loans outstanding past their agreed term. Consolidate NGN receivables and schedule FX conversions to settle high-interest liabilities immediately.`
                  : "All supplier debt operations are currently running within their active contractual window. Current NGN-EUR exchange rates are favorable for partial pre-payments."
                }
              </p>
            </div>

            <div className="p-4 bg-[#2251FF]/4 border-l-3 border-[#2251FF] rounded-r-md">
              <span className="text-[10px] font-mono text-[#2251FF] font-bold block uppercase tracking-wider mb-1">
                Working Capital Safety
              </span>
              <p className="text-xs text-[#051C2C] leading-relaxed">
                {stats.workingCapitalEUR > 20000 
                  ? "Liquid portfolio status is currently strong. Working Capital is comfortably positive, meaning active trade positions exceed imminent liabilities."
                  : "Caution: Low Working Capital buffer. Acceleration of cash collections in West Africa is advised to cover European procurement cost cycles."
                }
              </p>
            </div>
          </div>

          <div className="text-[11px] text-[#888888] font-mono uppercase text-right pt-4 border-t border-[#E8E8E6] mt-4">
            Financial Health Score: 
            <strong className="text-[#2251FF] ml-1">
              {stats.workingCapitalEUR > 50000 && overdueLoansCount === 0 ? 'A (Excellent)' : stats.workingCapitalEUR > 15000 ? 'B (Favorable)' : 'C (Exposed)'}
            </strong>
          </div>
        </div>

      </div>

    </div>
  );
}
