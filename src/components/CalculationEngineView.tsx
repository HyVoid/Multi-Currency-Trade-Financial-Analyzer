/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState } from '../types';
import { compileDealCalculations, formatCurrency, getMonthlyExchangeRate, DealCalculations } from '../utils';
import { Search, Info, SlidersHorizontal, ArrowUpRight, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';

interface CalculationEngineViewProps {
  state: AppState;
  asOfDate: string;
}

export default function CalculationEngineView({ state, asOfDate }: CalculationEngineViewProps) {
  const deals = compileDealCalculations(state, asOfDate);

  // Search/Filters states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Selected Deal for Drilldown Detail Modal/Drawer
  const [selectedDealId, setSelectedDealId] = useState<string | null>(deals[0]?.dealId || null);

  const filteredDeals = deals.filter(d => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      d.dealId.toLowerCase().includes(query) ||
      d.clientName.toLowerCase().includes(query) ||
      d.supplierName.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedDeal = deals.find(d => d.dealId === selectedDealId);

  // Aggregated totals of the filtered set
  const aggPurchasesEUR = filteredDeals.reduce((sum, d) => sum + d.purchaseCostEUR, 0);
  const aggInterestEUR = filteredDeals.reduce((sum, d) => sum + d.accruedInterestEUR, 0);
  const aggTotalCostEUR = filteredDeals.reduce((sum, d) => sum + d.totalCostEUR, 0);
  const aggRevenueEUR = filteredDeals.reduce((sum, d) => sum + d.totalRevenueEUR, 0);
  const aggNetProfitEUR = filteredDeals.reduce((sum, d) => sum + d.netProfitEUR, 0);
  const aggAverageMargin = aggRevenueEUR > 0 ? (aggNetProfitEUR / aggRevenueEUR) * 100 : 0;

  return (
    <div id="calculations-view" className="animate-fade-up flex flex-col space-y-10">
      
      {/* View Header */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          Deal-Level Calculation Engine & Audit Ledger
        </h1>
        <p className="text-sm text-[#888888]">
          穿透式审计：Unify cost elements, accrued liabilities, collection metrics, and actual conversion rates for every active Deal ID.
        </p>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="bg-white p-4 rounded-lg custom-shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="engine-search-bar"
            type="text"
            placeholder="Search by Deal ID, Client, Supplier, or Goods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-10 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-[#888888]" />
          <span className="text-[11px] font-mono font-bold text-[#888888] uppercase tracking-wider">FILTER:</span>
          <div className="inline-flex rounded-md shadow-xs bg-[#F5F5F2] p-1 font-mono text-[10px] font-bold">
            {['ALL', 'In Progress', 'Completed', 'At Risk'].map((status) => {
              const isActive = statusFilter === status;
              return (
                <button
                  id={`filter-btn-${status.replace(' ', '-')}`}
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded transition-all select-none cursor-pointer ${
                    isActive 
                      ? 'bg-white text-[#051C2C] shadow-xs' 
                      : 'text-[#051C2C]/50 hover:text-[#051C2C]'
                  }`}
                >
                  {status.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Audit Matrix Table */}
      <div className="bg-white rounded-lg p-6 custom-shadow-md overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading text-lg font-bold text-[#051C2C]">
            Interactive Calculation Sheet (EUR Base)
          </h2>
          <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
            CLICK ON A ROW FOR ADVANCED AUDIT DRILLDOWN
          </span>
        </div>

        <table className="w-full text-left text-xs min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#E8E8E6] pb-2 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
              <th className="pb-2 pl-1">DEAL ID</th>
              <th className="pb-2">SUPPLIER & CLIENT</th>
              <th className="pb-2 text-right">PURCHASE COST</th>
              <th className="pb-2 text-right">ACCRUED LOAN INT.</th>
              <th className="pb-2 text-right">TOTAL DEAL COST (A)</th>
              <th className="pb-2 text-right">ACTUAL EXCHANGED (B)</th>
              <th className="pb-2 text-right">EST. UNEXCHANGED (C)</th>
              <th className="pb-2 text-right">EST. UNCOLLECTED (D)</th>
              <th className="pb-2 text-right font-bold text-[#2251FF]">TOTAL REV. (B+C+D)</th>
              <th className="pb-2 text-right font-bold">NET PROFIT</th>
              <th className="pb-2 text-right">MARGIN %</th>
              <th className="pb-2 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E6]">
            {filteredDeals.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center py-12 text-[#888888] font-mono uppercase">
                  No match found in calculated portfolio.
                </td>
              </tr>
            ) : (
              filteredDeals.map((d) => {
                const isSelected = selectedDealId === d.dealId;
                
                return (
                  <tr 
                    key={d.dealId} 
                    onClick={() => setSelectedDealId(d.dealId)}
                    className={`cursor-pointer transition-all duration-150 select-none ${
                      isSelected 
                        ? 'bg-[#2251FF]/5 hover:bg-[#2251FF]/8' 
                        : 'hover:bg-[#F5F5F2]/50'
                    }`}
                  >
                    {/* Deal ID */}
                    <td className="py-3 pl-1 font-mono font-bold text-[#051C2C] flex items-center">
                      <div className={`w-1.5 h-6 rounded-xs mr-2 shrink-0 ${
                        isSelected ? 'bg-[#2251FF]' : 'bg-transparent'
                      }`} />
                      {d.dealId}
                    </td>

                    {/* Parties */}
                    <td className="py-3 text-[11px]">
                      <div className="font-semibold text-[#051C2C]">S: {d.supplierName}</div>
                      <div className="text-[#888888]">C: {d.clientName}</div>
                    </td>

                    {/* Purchase Cost EUR */}
                    <td className="py-3 text-right font-mono font-medium text-slate-700">
                      {formatCurrency(d.purchaseCostEUR, 'EUR')}
                    </td>

                    {/* Accrued Interest EUR */}
                    <td className="py-3 text-right font-mono text-amber-600">
                      {d.isLoan ? formatCurrency(d.accruedInterestEUR, 'EUR') : '—'}
                    </td>

                    {/* Total Cost EUR */}
                    <td className="py-3 text-right font-mono font-semibold text-[#051C2C]">
                      {formatCurrency(d.totalCostEUR, 'EUR')}
                    </td>

                    {/* Actual EUR Received via conversions */}
                    <td className="py-3 text-right font-mono text-emerald-600" title={`Converted NGN ${d.actualExchangedNGN.toLocaleString()}`}>
                      {formatCurrency(d.actualReceivedEUR, 'EUR')}
                    </td>

                    {/* Est Collected awaiting exchange */}
                    <td className="py-3 text-right font-mono text-slate-500" title={`Pending Exchange NGN ${d.collectedNotExchangedNGN.toLocaleString()}`}>
                      {d.collectedNotExchangedEUR > 0 ? formatCurrency(d.collectedNotExchangedEUR, 'EUR') : '—'}
                    </td>

                    {/* Est Uncollected outstanding invoice */}
                    <td className="py-3 text-right font-mono text-slate-400" title={`Receivable Invoice NGN ${d.uncollectedAmountNGN.toLocaleString()}`}>
                      {d.uncollectedEUR > 0 ? formatCurrency(d.uncollectedEUR, 'EUR') : '—'}
                    </td>

                    {/* Total estimated Revenue */}
                    <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                      {formatCurrency(d.totalRevenueEUR, 'EUR')}
                    </td>

                    {/* Net Profit EUR */}
                    <td className={`py-3 text-right font-mono font-bold text-xs ${
                      d.netProfitEUR >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'
                    }`}>
                      {formatCurrency(d.netProfitEUR, 'EUR')}
                    </td>

                    {/* Margin % */}
                    <td className="py-3 text-right font-mono font-semibold">
                      {d.marginPercent.toFixed(1)}%
                    </td>

                    {/* Status badge */}
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        d.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : d.status === 'At Risk'
                          ? 'bg-red-50 text-[#D32F2F] border-red-200 animate-pulse'
                          : 'bg-blue-50 text-[#2251FF] border-blue-100'
                      }`}>
                        {d.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}

            {/* Combined aggregates sheet row */}
            <tr className="bg-[#051C2C]/3 font-semibold border-t-2 border-[#051C2C] text-[#051C2C]">
              <td colSpan={2} className="py-3 pl-3 font-heading text-xs font-bold uppercase tracking-wider">
                Current Filtered Sheet Aggregates (EUR)
              </td>
              <td className="py-3 text-right font-mono font-bold">
                {formatCurrency(aggPurchasesEUR, 'EUR')}
              </td>
              <td className="py-3 text-right font-mono font-semibold text-amber-700">
                {formatCurrency(aggInterestEUR, 'EUR')}
              </td>
              <td className="py-3 text-right font-mono font-bold">
                {formatCurrency(aggTotalCostEUR, 'EUR')}
              </td>
              <td colSpan={3} className="py-3 text-center text-[10px] text-[#888888] font-mono">
                CONVERSIONS AND VALUATION ASSESSMENTS COMPLETED
              </td>
              <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                {formatCurrency(aggRevenueEUR, 'EUR')}
              </td>
              <td className={`py-3 text-right font-mono font-bold text-xs ${aggNetProfitEUR >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'}`}>
                {formatCurrency(aggNetProfitEUR, 'EUR')}
              </td>
              <td className="py-3 text-right font-mono font-bold">
                {aggAverageMargin.toFixed(1)}%
              </td>
              <td className="py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Advanced Audit Drilldown Section (Only shown if a deal is selected) */}
      {selectedDeal && (
        <div className="bg-white rounded-lg p-6 custom-shadow-md border-l-3 border-[#2251FF] bg-[#2251FF]/4 animate-fade-up">
          <div className="flex justify-between items-start border-b border-[#E8E8E6] pb-3 mb-4">
            <div>
              <span className="text-[10px] font-mono text-[#2251FF] font-bold block uppercase tracking-wider">
                DEAL AUDIT AUDIENCE LOG
              </span>
              <h2 className="font-heading text-xl font-bold text-[#051C2C]">
                Interactive Formulas and linked ledger records for Deal ID: <span className="font-mono text-[#2251FF]">{selectedDeal.dealId}</span>
              </h2>
            </div>
            <button
              onClick={() => setSelectedDealId(null)}
              className="text-xs font-mono font-semibold text-[#888888] hover:text-[#051C2C] hover:underline"
            >
              CLOSE AUDIT DRILLDOWN
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#051C2C]">
            
            {/* Procurement Math Card */}
            <div className="bg-white p-4 rounded-md custom-shadow-sm border border-[#E8E8E6]">
              <h3 className="font-bold font-heading text-sm text-[#051C2C] mb-2 border-b border-[#E8E8E6] pb-1 uppercase tracking-wider">
                1. Procurement Costs
              </h3>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li className="flex justify-between">
                  <span className="text-[#888888]">Goods description:</span>
                  <strong className="truncate max-w-[120px]" title={selectedDeal.description}>{selectedDeal.description}</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#888888]">Purchase (EUR):</span>
                  <strong>{formatCurrency(selectedDeal.purchaseCostEUR, 'EUR')}</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#888888]">Is Loan:</span>
                  <strong>{selectedDeal.isLoan ? 'YES' : 'NO'}</strong>
                </li>
                {selectedDeal.isLoan && (
                  <>
                    <li className="flex justify-between text-amber-700">
                      <span>Loan Interest Rate:</span>
                      <strong>{selectedDeal.loanRate}% p.a.</strong>
                    </li>
                    <li className="flex justify-between text-amber-700">
                      <span>Interest Accrued:</span>
                      <strong>{formatCurrency(selectedDeal.accruedInterestEUR, 'EUR')}</strong>
                    </li>
                    <li className="flex justify-between border-t border-[#E8E8E6] pt-1 mt-1 font-bold">
                      <span>Net Deal Cost:</span>
                      <span>{formatCurrency(selectedDeal.totalCostEUR, 'EUR')}</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Invoicing and Collection NGN */}
            <div className="bg-white p-4 rounded-md custom-shadow-sm border border-[#E8E8E6]">
              <h3 className="font-bold font-heading text-sm text-[#051C2C] mb-2 border-b border-[#E8E8E6] pb-1 uppercase tracking-wider">
                2. Client Collections
              </h3>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li className="flex justify-between">
                  <span className="text-[#888888]">Client account:</span>
                  <strong className="truncate max-w-[120px]">{selectedDeal.clientName}</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#888888]">Invoice Date:</span>
                  <strong>{selectedDeal.saleDate || 'N/A'}</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#888888]">Sale Invoice:</span>
                  <strong>{formatCurrency(selectedDeal.saleAmountNGN, 'NGN')}</strong>
                </li>
                <li className="flex justify-between text-emerald-600">
                  <span>Collected sum:</span>
                  <strong>{formatCurrency(selectedDeal.collectedAmountNGN, 'NGN')}</strong>
                </li>
                <li className="flex justify-between text-[#D32F2F] border-t border-[#E8E8E6] pt-1 mt-1 font-bold">
                  <span>Client Balance:</span>
                  <span>{formatCurrency(selectedDeal.uncollectedAmountNGN, 'NGN')}</span>
                </li>
              </ul>
            </div>

            {/* Liquidation Exchanged and Pending */}
            <div className="bg-white p-4 rounded-md custom-shadow-sm border border-[#E8E8E6]">
              <h3 className="font-bold font-heading text-sm text-[#051C2C] mb-2 border-b border-[#E8E8E6] pb-1 uppercase tracking-wider">
                3. Bank Exchanging (EUR)
              </h3>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li className="flex justify-between text-emerald-600">
                  <span>Actual Exchanged NGN:</span>
                  <strong>{formatCurrency(selectedDeal.actualExchangedNGN, 'NGN')}</strong>
                </li>
                <li className="flex justify-between text-emerald-600">
                  <span>EUR Reserves Recd:</span>
                  <strong>{formatCurrency(selectedDeal.actualReceivedEUR, 'EUR')}</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#888888]">Exchanged rate:</span>
                  <strong>{selectedDeal.actualExchangeRate > 0 ? `1€ = ${Math.round(selectedDeal.actualExchangeRate).toLocaleString()} ₦` : 'N/A'}</strong>
                </li>
                <li className="flex justify-between text-slate-500 border-t border-[#E8E8E6] pt-1 mt-1 font-bold">
                  <span>Awaiting Exch (NGN):</span>
                  <span>{formatCurrency(selectedDeal.collectedNotExchangedNGN, 'NGN')}</span>
                </li>
              </ul>
            </div>

            {/* Total Math Formula Audit */}
            <div className="bg-white p-4 rounded-md custom-shadow-sm border border-[#E8E8E6]">
              <h3 className="font-bold font-heading text-sm text-[#051C2C] mb-2 border-b border-[#E8E8E6] pb-1 uppercase tracking-wider">
                4. Audit Ledger Math
              </h3>
              <div className="space-y-2 text-[11px] leading-relaxed">
                <div className="p-2 bg-[#F5F5F2] rounded text-[10px] font-mono text-slate-700">
                  <div><strong>Total EUR Revenue Formula:</strong></div>
                  <div className="mt-1 font-bold text-[#2251FF]">
                    Received (EUR) + Est. Collected (EUR) + Est. Uncollected (EUR)
                  </div>
                  <div className="mt-1 text-right text-black font-semibold">
                    €{selectedDeal.actualReceivedEUR.toLocaleString()} + €{Math.round(selectedDeal.collectedNotExchangedEUR).toLocaleString()} + €{Math.round(selectedDeal.uncollectedEUR).toLocaleString()} = <span className="text-[#2251FF]">€{Math.round(selectedDeal.totalRevenueEUR).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-2 bg-[#F5F5F2] rounded text-[10px] font-mono text-slate-700">
                  <div><strong>Deal Profit Formula:</strong></div>
                  <div className="mt-1 font-bold text-black">
                    Total Revenue EUR - Total Cost EUR
                  </div>
                  <div className="mt-1 text-right text-black font-semibold">
                    €{Math.round(selectedDeal.totalRevenueEUR).toLocaleString()} - €{Math.round(selectedDeal.totalCostEUR).toLocaleString()} = <span className={selectedDeal.netProfitEUR >= 0 ? 'text-[#051C2C]' : 'text-[#D32F2F]'}>€{Math.round(selectedDeal.netProfitEUR).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
