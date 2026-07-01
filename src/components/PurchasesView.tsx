/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, Purchase } from '../types';
import { calculateLoanDetails, formatCurrency, getDaysBetween } from '../utils';
import { Plus, Trash2, Edit2, AlertCircle, CheckCircle, Calculator, Info } from 'lucide-react';

interface PurchasesViewProps {
  state: AppState;
  asOfDate: string;
  addPurchase: (p: Purchase) => void;
  editPurchase: (p: Purchase) => void;
  deletePurchase: (id: string) => void;
}

export default function PurchasesView({
  state,
  asOfDate,
  addPurchase,
  editPurchase,
  deletePurchase
}: PurchasesViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Suggested next Deal ID
  const getSuggestedDealId = () => {
    const existing = state.purchases.map(p => {
      const num = parseInt(p.id.replace('DEAL-', ''));
      return isNaN(num) ? 0 : num;
    });
    const maxNum = existing.length > 0 ? Math.max(...existing) : 0;
    const nextNum = maxNum + 1;
    return `DEAL-${nextNum.toString().padStart(3, '0')}`;
  };

  // Form states for new purchase
  const [dealId, setDealId] = useState(getSuggestedDealId());
  const [date, setDate] = useState('2026-07-01');
  const [supplierId, setSupplierId] = useState(state.suppliers[0]?.id || '');
  const [description, setDescription] = useState('');
  const [amountEUR, setAmountEUR] = useState('');
  const [isLoan, setIsLoan] = useState(false);
  const [loanPrincipal, setLoanPrincipal] = useState('');
  const [loanRate, setLoanRate] = useState('6.0');
  const [loanTermDays, setLoanTermDays] = useState('90');
  const [interestMethod, setInterestMethod] = useState<'simple' | 'compound'>('simple');
  const [paidAmountEUR, setPaidAmountEUR] = useState('0');

  // Form states for editing purchase
  const [editDate, setEditDate] = useState('');
  const [editSupplierId, setEditSupplierId] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAmountEUR, setEditAmountEUR] = useState('');
  const [editIsLoan, setEditIsLoan] = useState(false);
  const [editLoanPrincipal, setEditLoanPrincipal] = useState('');
  const [editLoanRate, setEditLoanRate] = useState('');
  const [editLoanTermDays, setEditLoanTermDays] = useState('');
  const [editInterestMethod, setEditInterestMethod] = useState<'simple' | 'compound'>('simple');
  const [editPaidAmountEUR, setEditPaidAmountEUR] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealId.trim() || !supplierId || !amountEUR) {
      alert('Please fill out all required fields: Deal ID, Supplier, and Purchase Amount.');
      return;
    }

    // Check unique Deal ID
    if (state.purchases.some(p => p.id === dealId.trim())) {
      alert(`Deal ID "${dealId.trim()}" already exists. Please choose a unique Deal ID.`);
      return;
    }

    const cost = parseFloat(amountEUR);
    const principal = isLoan ? parseFloat(loanPrincipal) || 0 : 0;
    const rate = isLoan ? parseFloat(loanRate) || 0 : 0;
    const term = isLoan ? parseInt(loanTermDays) || 0 : 0;
    const repaid = isLoan ? parseFloat(paidAmountEUR) || 0 : 0;

    const newPurchase: Purchase = {
      id: dealId.trim().toUpperCase(),
      date,
      supplierId,
      description: description.trim() || 'Imported Goods cargo',
      amountEUR: isNaN(cost) ? 0 : cost,
      isLoan,
      loanPrincipal: isNaN(principal) ? 0 : principal,
      loanRate: isNaN(rate) ? 0 : rate,
      loanStartDate: date, // Loan starts on purchase date
      loanTermDays: isNaN(term) ? 0 : term,
      interestMethod,
      paidAmountEUR: isNaN(repaid) ? 0 : repaid
    };

    addPurchase(newPurchase);

    // Reset Form
    setDealId('');
    setDescription('');
    setAmountEUR('');
    setIsLoan(false);
    setLoanPrincipal('');
    setPaidAmountEUR('0');

    // Suggest next
    setTimeout(() => {
      setDealId(getSuggestedDealId());
    }, 50);
  };

  const startEdit = (p: Purchase) => {
    setEditingId(p.id);
    setEditDate(p.date);
    setEditSupplierId(p.supplierId);
    setEditDescription(p.description);
    setEditAmountEUR(p.amountEUR.toString());
    setEditIsLoan(p.isLoan);
    setEditLoanPrincipal(p.loanPrincipal.toString());
    setEditLoanRate(p.loanRate.toString());
    setEditLoanTermDays(p.loanTermDays.toString());
    setEditInterestMethod(p.interestMethod);
    setEditPaidAmountEUR(p.paidAmountEUR.toString());
  };

  const saveEdit = (id: string) => {
    const cost = parseFloat(editAmountEUR);
    const principal = editIsLoan ? parseFloat(editLoanPrincipal) || 0 : 0;
    const rate = editIsLoan ? parseFloat(editLoanRate) || 0 : 0;
    const term = editIsLoan ? parseInt(editLoanTermDays) || 0 : 0;
    const repaid = editIsLoan ? parseFloat(editPaidAmountEUR) || 0 : 0;

    const updatedPurchase: Purchase = {
      id,
      date: editDate,
      supplierId: editSupplierId,
      description: editDescription,
      amountEUR: isNaN(cost) ? 0 : cost,
      isLoan: editIsLoan,
      loanPrincipal: isNaN(principal) ? 0 : principal,
      loanRate: isNaN(rate) ? 0 : rate,
      loanStartDate: editDate,
      loanTermDays: isNaN(term) ? 0 : term,
      interestMethod: editInterestMethod,
      paidAmountEUR: isNaN(repaid) ? 0 : repaid
    };

    editPurchase(updatedPurchase);
    setEditingId(null);
  };

  // Calculations for Totals Summary Row
  const totalPurchasesEUR = state.purchases.reduce((sum, p) => sum + p.amountEUR, 0);
  const totalPrincipalEUR = state.purchases.reduce((sum, p) => sum + (p.isLoan ? p.loanPrincipal : 0), 0);
  
  const loanDetailsList = state.purchases.map(p => calculateLoanDetails(p, asOfDate));
  const totalAccruedInterestEUR = loanDetailsList.reduce((sum, l) => sum + l.accruedInterestEUR, 0);
  const totalRepaidEUR = state.purchases.reduce((sum, p) => sum + (p.isLoan ? p.paidAmountEUR : 0), 0);
  const totalOutstandingDebtEUR = loanDetailsList.reduce((sum, l) => sum + l.remainingDebtEUR, 0);

  return (
    <div id="purchases-view" className="animate-fade-up flex flex-col space-y-10">
      
      {/* View Header */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          Procurement & Supplier Loan Ledger
        </h1>
        <p className="text-sm text-[#888888]">
          Log international purchase costs in EUR, initialize supplier financing credit agreements, and record loan repayments.
        </p>
      </div>

      {/* Two columns: Form (left) + Table (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Form (1/4 columns) */}
        <div className="xl:col-span-1 bg-white p-6 rounded-lg custom-shadow-md flex flex-col space-y-4 h-fit">
          <div className="flex items-center space-x-2 border-b border-[#E8E8E6] pb-2 text-[#051C2C]">
            <Calculator className="w-5 h-5 text-[#2251FF]" />
            <h2 className="font-heading text-lg font-bold">New Procurement Cargo</h2>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            
            {/* Deal ID */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                DEAL ID (UNIQUE) *
              </label>
              <input
                id="form-deal-id"
                type="text"
                required
                value={dealId}
                onChange={(e) => setDealId(e.target.value)}
                placeholder="e.g. DEAL-005"
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all uppercase"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                PURCHASE DATE *
              </label>
              <input
                id="form-purchase-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all cursor-pointer"
              />
            </div>

            {/* Supplier select */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                SUPPLIER *
              </label>
              {state.suppliers.length === 0 ? (
                <div className="text-xs text-red-500 font-bold p-2 bg-red-50 rounded border border-red-200 flex items-center">
                  No suppliers registered. Please add them in Config tab.
                </div>
              ) : (
                <select
                  id="form-supplier-id"
                  required
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Supplier...</option>
                  {state.suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Goods description */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                GOODS DESCRIPTION
              </label>
              <input
                id="form-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Tractor Parts Cargo, Raw Feedstock"
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
              />
            </div>

            {/* Purchase Cost EUR */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                PURCHASE COST (EUR) *
              </label>
              <input
                id="form-amount-eur"
                type="number"
                step="0.01"
                required
                value={amountEUR}
                onChange={(e) => setAmountEUR(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all"
              />
            </div>

            {/* Is Associated Loan Switch */}
            <div className="pt-2 border-t border-[#E8E8E6]">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  id="form-is-loan"
                  type="checkbox"
                  checked={isLoan}
                  onChange={(e) => {
                    setIsLoan(e.target.checked);
                    if (e.target.checked && !loanPrincipal) {
                      setLoanPrincipal(amountEUR); // default principal to amountEUR
                    }
                  }}
                  className="w-4 h-4 text-[#2251FF] border-[#E8E8E6] rounded focus:ring-0"
                />
                <span className="text-xs font-bold text-[#051C2C]">
                  Funded by Supplier Loan?
                </span>
              </label>
            </div>

            {/* Conditional Loan Fields */}
            {isLoan && (
              <div className="space-y-4 p-3 bg-[#F5F5F2] rounded-md border border-[#E8E8E6] animate-fade-up">
                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                    LOAN PRINCIPAL (EUR)
                  </label>
                  <input
                    id="form-loan-principal"
                    type="number"
                    step="0.01"
                    value={loanPrincipal}
                    onChange={(e) => setLoanPrincipal(e.target.value)}
                    placeholder="Principal sum..."
                    className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-bold focus:border-[#2251FF] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                      ANNUAL RATE %
                    </label>
                    <input
                      id="form-loan-rate"
                      type="number"
                      step="0.01"
                      value={loanRate}
                      onChange={(e) => setLoanRate(e.target.value)}
                      className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-bold focus:border-[#2251FF] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                      TERM (DAYS)
                    </label>
                    <input
                      id="form-loan-term"
                      type="number"
                      value={loanTermDays}
                      onChange={(e) => setLoanTermDays(e.target.value)}
                      className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-bold focus:border-[#2251FF] transition-all"
                    />
                  </div>
                </div>

                {/* Interest accrual method */}
                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                    INTEREST METHOD
                  </label>
                  <select
                    id="form-interest-method"
                    value={interestMethod}
                    onChange={(e) => setInterestMethod(e.target.value as 'simple' | 'compound')}
                    className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1.5 outline-none font-semibold focus:border-[#2251FF] transition-all cursor-pointer"
                  >
                    <option value="simple">Simple Interest (Daily)</option>
                    <option value="compound" disabled>Monthly Compound (In Development)</option>
                  </select>
                </div>

                {/* Already repaid EUR */}
                <div>
                  <label className="block text-[9px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                    INITIAL PAID EUR
                  </label>
                  <input
                    id="form-paid-amount"
                    type="number"
                    step="0.01"
                    value={paidAmountEUR}
                    onChange={(e) => setPaidAmountEUR(e.target.value)}
                    placeholder="repaid..."
                    className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-semibold focus:border-[#2251FF] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="add-purchase-submit"
              type="submit"
              className="w-full py-2.5 bg-[#051C2C] hover:bg-[#2251FF] text-white font-semibold text-xs rounded-md flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              CREATE DEAL PROCUREMENT
            </button>
          </form>
        </div>

        {/* Right Ledger Table (3/4 columns) */}
        <div className="xl:col-span-3 bg-white p-6 rounded-lg custom-shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold text-[#051C2C]">
              Procurement & Loans Ledger (EUR)
            </h2>
            <div className="text-[10px] font-mono text-[#888888] uppercase">
              REPAYMENT RATIOS SHOWN IN METERS
            </div>
          </div>

          <table className="w-full text-left text-xs min-w-[800px]">
            <thead>
              <tr className="border-b border-[#E8E8E6] pb-2 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
                <th className="pb-2">DEAL ID / DATE</th>
                <th className="pb-2">SUPPLIER / DESCRIPTION</th>
                <th className="pb-2 text-right">PURCHASE COST</th>
                <th className="pb-2 text-center">FINANCING</th>
                <th className="pb-2 text-right">ACCRUED INTEREST</th>
                <th className="pb-2 text-right font-bold text-[#2251FF]">OUTSTANDING DEBT</th>
                <th className="pb-2 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {state.purchases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#888888] font-mono uppercase">
                    No Procurement Records logged.
                  </td>
                </tr>
              ) : (
                state.purchases.map((p) => {
                  const loan = calculateLoanDetails(p, asOfDate);
                  const supplier = state.suppliers.find(s => s.id === p.supplierId);
                  const isEditing = editingId === p.id;

                  return (
                    <tr 
                      key={p.id} 
                      className={`hover:bg-[#F5F5F2]/40 transition-colors ${
                        loan.isOverdue ? 'bg-red-50/15' : ''
                      }`}
                    >
                      {/* Deal ID / Date */}
                      <td className="py-3">
                        <div className="font-mono font-bold text-[#051C2C] text-xs">
                          {p.id}
                        </div>
                        {isEditing ? (
                          <input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="mt-1 text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                          />
                        ) : (
                          <div className="text-[11px] text-[#888888] font-mono">{p.date}</div>
                        )}
                      </td>

                      {/* Supplier / description */}
                      <td className="py-3 max-w-[200px]">
                        {isEditing ? (
                          <div className="flex flex-col space-y-1">
                            <select
                              value={editSupplierId}
                              onChange={(e) => setEditSupplierId(e.target.value)}
                              className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-1"
                            >
                              {state.suppliers.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-2 py-0.5"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="font-semibold text-[#051C2C]">{supplier?.name || 'Unknown'}</div>
                            <div className="text-[11px] text-[#888888] truncate">{p.description}</div>
                          </>
                        )}
                      </td>

                      {/* Purchase Cost EUR */}
                      <td className="py-3 text-right font-mono font-semibold text-[#051C2C]">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editAmountEUR}
                            onChange={(e) => setEditAmountEUR(e.target.value)}
                            className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 w-20 text-right font-mono"
                          />
                        ) : (
                          formatCurrency(p.amountEUR, 'EUR')
                        )}
                      </td>

                      {/* Financing Flag */}
                      <td className="py-3 text-center">
                        {isEditing ? (
                          <label className="flex items-center justify-center space-x-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editIsLoan}
                              onChange={(e) => setEditIsLoan(e.target.checked)}
                              className="w-3.5 h-3.5"
                            />
                            <span className="text-[11px]">Loan?</span>
                          </label>
                        ) : p.isLoan ? (
                          <div className="inline-flex flex-col items-center">
                            <span className="text-[9px] font-mono font-bold bg-[#2251FF]/10 text-[#2251FF] px-1.5 py-0.5 rounded-full mb-1">
                              LOAN ACTIVE
                            </span>
                            <div className="w-16 h-1.5 bg-[#051C2C]/10 rounded-sm overflow-hidden" title={`Repaid: €${p.paidAmountEUR} / Principal: €${p.loanPrincipal}`}>
                              <div 
                                className="h-full bg-emerald-500" 
                                style={{ width: `${Math.min(100, (p.paidAmountEUR / (p.loanPrincipal || 1)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-[#888888] uppercase font-semibold">
                            CASH PAID
                          </span>
                        )}
                      </td>

                      {/* Accrued Interest EUR */}
                      <td className="py-3 text-right font-mono text-amber-600 font-semibold">
                        {p.isLoan ? (
                          isEditing ? (
                            <div className="flex flex-col items-end space-y-1">
                              <div className="flex items-center space-x-1">
                                <span className="text-[9px] text-[#888888]">Rate%:</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editLoanRate}
                                  onChange={(e) => setEditLoanRate(e.target.value)}
                                  className="text-[10px] bg-[#FFFDE7] border border-[#E8E8E6] rounded w-10 text-right font-mono"
                                />
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-[9px] text-[#888888]">Term:</span>
                                <input
                                  type="number"
                                  value={editLoanTermDays}
                                  onChange={(e) => setEditLoanTermDays(e.target.value)}
                                  className="text-[10px] bg-[#FFFDE7] border border-[#E8E8E6] rounded w-10 text-right font-mono"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              {formatCurrency(loan.accruedInterestEUR, 'EUR')}
                              <span className="text-[9px] text-[#888888] block font-mono">
                                {loan.daysAccrued}d elapsed @ {p.loanRate}%
                              </span>
                            </>
                          )
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Outstanding Debt EUR */}
                      <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                        {p.isLoan ? (
                          isEditing ? (
                            <div className="flex flex-col items-end space-y-1">
                              <span className="text-[9px] text-[#888888] uppercase">Principal:</span>
                              <input
                                type="number"
                                step="0.01"
                                value={editLoanPrincipal}
                                onChange={(e) => setEditLoanPrincipal(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 w-20 text-right font-mono"
                              />
                              <span className="text-[9px] text-[#888888] uppercase mt-1">Paid Amount:</span>
                              <input
                                type="number"
                                step="0.01"
                                value={editPaidAmountEUR}
                                onChange={(e) => setEditPaidAmountEUR(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 w-20 text-right font-mono"
                              />
                            </div>
                          ) : (
                            <>
                              {formatCurrency(loan.remainingDebtEUR, 'EUR')}
                              {loan.remainingDebtEUR <= 1 ? (
                                <span className="text-[9px] text-emerald-600 font-mono font-bold block flex items-center justify-end">
                                  <CheckCircle className="w-2.5 h-2.5 mr-0.5 text-emerald-600" />
                                  CLEARED
                                </span>
                              ) : loan.isOverdue ? (
                                <span className="text-[9px] text-[#D32F2F] font-mono font-bold block flex items-center justify-end animate-pulse">
                                  <AlertCircle className="w-2.5 h-2.5 mr-0.5 text-[#D32F2F]" />
                                  OVERDUE
                                </span>
                              ) : (
                                <span className="text-[9px] text-amber-500 font-mono font-bold block">
                                  REPAID: {formatCurrency(p.paidAmountEUR, 'EUR')}
                                </span>
                              )}
                            </>
                          )
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center space-x-1 shrink-0">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEdit(p.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                              >
                                SAVE
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 bg-[#888888] hover:bg-slate-400 text-white rounded text-[10px] font-bold"
                              >
                                CANCEL
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(p)}
                                className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                                title="Edit Ledger Record"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete Deal ${p.id}? This will also delete associated Sales and FX Transactions.`)) {
                                    deletePurchase(p.id);
                                  }
                                }}
                                className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}

              {/* Excel Summary Row */}
              <tr className="bg-[#051C2C]/3 font-semibold border-t-2 border-[#051C2C]">
                <td colSpan={2} className="py-3 pl-2 font-heading text-xs font-bold text-[#051C2C] uppercase tracking-wider">
                  Workbook Total Summary (EUR)
                </td>
                <td className="py-3 text-right font-mono font-bold text-[#051C2C]">
                  {formatCurrency(totalPurchasesEUR, 'EUR')}
                </td>
                <td className="py-3 text-center font-mono text-[10px] text-[#888888]">
                  PRINCIPAL: {formatCurrency(totalPrincipalEUR, 'EUR')}
                </td>
                <td className="py-3 text-right font-mono font-semibold text-amber-700">
                  {formatCurrency(totalAccruedInterestEUR, 'EUR')}
                </td>
                <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                  {formatCurrency(totalOutstandingDebtEUR, 'EUR')}
                  <span className="text-[9px] text-emerald-600 block font-normal font-mono">
                    REPAID: {formatCurrency(totalRepaidEUR, 'EUR')}
                  </span>
                </td>
                <td className="py-3"></td>
              </tr>
            </tbody>
          </table>

          {/* Guidelines notes */}
          <div className="mt-6 flex items-start space-x-2 bg-[#2251FF]/4 p-3.5 rounded border-l-3 border-[#2251FF]">
            <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#051C2C] leading-relaxed">
              <strong>Formulas & Aggregations:</strong> Outstanding Debt balances are computed dynamically as: <code>Remaining = (Principal + Accrued Interest) - Repaid Amount</code>. Interest accumulates in real-time until repaid, based on the custom <strong>As-Of System Date</strong> at the top-right toolbar. Simple Interest assumes a standard 365-day fiscal year.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
