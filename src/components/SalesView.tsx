/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, Sale } from '../types';
import { formatCurrency, getDaysBetween } from '../utils';
import { Plus, Trash2, Edit2, AlertCircle, CheckCircle, TrendingUp, Info } from 'lucide-react';

interface SalesViewProps {
  state: AppState;
  asOfDate: string;
  addSale: (s: Omit<Sale, 'id'>) => void;
  editSale: (s: Sale) => void;
  deleteSale: (id: string) => void;
}

export default function SalesView({
  state,
  asOfDate,
  addSale,
  editSale,
  deleteSale
}: SalesViewProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for new sales record
  const [dealId, setDealId] = useState(state.purchases[0]?.id || '');
  const [date, setDate] = useState('2026-07-01');
  const [clientId, setClientId] = useState(state.clients[0]?.id || '');
  const [amountNGN, setAmountNGN] = useState('');
  const [collectedNGN, setCollectedNGN] = useState('');
  const [collectionDate, setCollectionDate] = useState('2026-07-01');

  // Form states for editing sales record
  const [editDate, setEditDate] = useState('');
  const [editClientId, setEditClientId] = useState('');
  const [editAmountNGN, setEditAmountNGN] = useState('');
  const [editCollectedNGN, setEditCollectedNGN] = useState('');
  const [editCollectionDate, setEditCollectionDate] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealId || !clientId || !amountNGN || !collectedNGN) {
      alert('Please fill out all required fields: Deal ID, Client, Sale Amount, and Collected Amount.');
      return;
    }

    // Check if Deal ID already has a sale
    const alreadySold = state.sales.some(s => s.dealId === dealId);
    if (alreadySold) {
      if (!window.confirm(`Warning: Deal "${dealId}" already has a registered sales contract. Are you sure you want to log an additional sales record?`)) {
        return;
      }
    }

    const saleVal = parseFloat(amountNGN);
    const collectedVal = parseFloat(collectedNGN);

    if (collectedVal > saleVal) {
      alert('Warning: Collected amount cannot exceed total sale invoice amount.');
      return;
    }

    addSale({
      dealId,
      date,
      clientId,
      amountNGN: isNaN(saleVal) ? 0 : saleVal,
      collectedNGN: isNaN(collectedVal) ? 0 : collectedVal,
      collectionDate: collectedVal > 0 ? collectionDate : ''
    });

    // Reset Form
    setAmountNGN('');
    setCollectedNGN('');
  };

  const startEdit = (s: Sale) => {
    setEditingId(s.id);
    setEditDate(s.date);
    setEditClientId(s.clientId);
    setEditAmountNGN(s.amountNGN.toString());
    setEditCollectedNGN(s.collectedNGN.toString());
    setEditCollectionDate(s.collectionDate || '');
  };

  const saveEdit = (id: string, originalDealId: string) => {
    const saleVal = parseFloat(editAmountNGN);
    const collectedVal = parseFloat(editCollectedNGN);

    if (collectedVal > saleVal) {
      alert('Warning: Collected amount cannot exceed total sale invoice amount.');
      return;
    }

    const updatedSale: Sale = {
      id,
      dealId: originalDealId, // preserve deal attachment
      date: editDate,
      clientId: editClientId,
      amountNGN: isNaN(saleVal) ? 0 : saleVal,
      collectedNGN: isNaN(collectedVal) ? 0 : collectedVal,
      collectionDate: collectedVal > 0 ? editCollectionDate : ''
    };

    editSale(updatedSale);
    setEditingId(null);
  };

  // Calculations for Totals Summary Row
  const totalSalesNGN = state.sales.reduce((sum, s) => sum + s.amountNGN, 0);
  const totalCollectedNGN = state.sales.reduce((sum, s) => sum + s.collectedNGN, 0);
  const totalOutstandingNGN = Math.max(0, totalSalesNGN - totalCollectedNGN);

  return (
    <div id="sales-view" className="animate-fade-up flex flex-col space-y-10">
      
      {/* View Header */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          African Sales & Client Collections Ledger
        </h1>
        <p className="text-sm text-[#888888]">
          Track wholesale sales in West-African NGN currencies, monitor client payment installments, and audit outstanding customer exposures.
        </p>
      </div>

      {/* Form & Table Row layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Form: Add Sale Record */}
        <div className="xl:col-span-1 bg-white p-6 rounded-lg custom-shadow-md flex flex-col space-y-4 h-fit">
          <div className="flex items-center space-x-2 border-b border-[#E8E8E6] pb-2 text-[#051C2C]">
            <TrendingUp className="w-5 h-5 text-[#2251FF]" />
            <h2 className="font-heading text-lg font-bold">New Distribution Sale</h2>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            
            {/* Associated Deal Selector */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                ATTACH TO DEAL (EUR CARGO) *
              </label>
              {state.purchases.length === 0 ? (
                <div className="text-xs text-red-500 font-bold p-2 bg-red-50 rounded border border-red-200">
                  No active Deals found. Create a procurement purchase first to generate a Deal ID.
                </div>
              ) : (
                <select
                  id="form-sale-deal-id"
                  required
                  value={dealId}
                  onChange={(e) => setDealId(e.target.value)}
                  className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Deal ID...</option>
                  {state.purchases.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.id} ({p.description})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Sale Date */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                SALE INVOICE DATE *
              </label>
              <input
                id="form-sale-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all cursor-pointer"
              />
            </div>

            {/* Client Select */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                DISTRIBUTION CLIENT *
              </label>
              {state.clients.length === 0 ? (
                <div className="text-xs text-red-500 font-bold p-2 bg-red-50 rounded border border-red-200">
                  No clients registered. Register them in Config tab first.
                </div>
              ) : (
                <select
                  id="form-sale-client-id"
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all cursor-pointer"
                >
                  <option value="" disabled>Select Client...</option>
                  {state.clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Total Sale Value NGN */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                TOTAL INVOICED VALUE (NGN ₦) *
              </label>
              <input
                id="form-amount-ngn"
                type="number"
                required
                value={amountNGN}
                onChange={(e) => setAmountNGN(e.target.value)}
                placeholder="e.g. 75000000"
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all"
              />
            </div>

            {/* Collected NGN */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                COLLECTED INSTALMENTS (NGN ₦) *
              </label>
              <input
                id="form-collected-ngn"
                type="number"
                required
                value={collectedNGN}
                onChange={(e) => setCollectedNGN(e.target.value)}
                placeholder="e.g. 50000000"
                className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-bold focus:border-[#2251FF] transition-all"
              />
            </div>

            {/* Collection Date */}
            {parseFloat(collectedNGN) > 0 && (
              <div className="animate-fade-up">
                <label className="block text-[10px] font-mono font-bold text-[#888888] tracking-wider uppercase mb-1">
                  LAST COLLECTION DATE *
                </label>
                <input
                  id="form-collection-date"
                  type="date"
                  required
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all cursor-pointer"
                />
              </div>
            )}

            {/* Submit */}
            <button
              id="add-sale-submit"
              type="submit"
              className="w-full py-2.5 bg-[#051C2C] hover:bg-[#2251FF] text-white font-semibold text-xs rounded-md flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              RECORD DISTRIBUTION SALE
            </button>
          </form>
        </div>

        {/* Right Ledger Table (3/4 cols) */}
        <div className="xl:col-span-3 bg-white p-6 rounded-lg custom-shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold text-[#051C2C]">
              African Sales & Credit Outstanding Ledger (NGN)
            </h2>
            <div className="text-[10px] font-mono text-[#888888] uppercase">
              EXPOSURES ARE CALCULATED INSTANTLY
            </div>
          </div>

          <table className="w-full text-left text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-[#E8E8E6] pb-2 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
                <th className="pb-2">DEAL ATTACHED</th>
                <th className="pb-2">CLIENT / INVOICED</th>
                <th className="pb-2 text-right">INVOICED AMOUNT (NGN)</th>
                <th className="pb-2 text-right">COLLECTED CASH (NGN)</th>
                <th className="pb-2 text-right font-bold text-[#2251FF]">OUTSTANDING CREDIT</th>
                <th className="pb-2 text-center">AGING STATUS</th>
                <th className="pb-2 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {state.sales.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#888888] font-mono uppercase">
                    No Sales Records registered in ledger.
                  </td>
                </tr>
              ) : (
                state.sales.map((s) => {
                  const client = state.clients.find(c => c.id === s.clientId);
                  const isEditing = editingId === s.id;
                  const outstandingNGN = Math.max(0, s.amountNGN - s.collectedNGN);
                  const elapsedDays = getDaysBetween(s.date, asOfDate);
                  
                  const isOverdue = outstandingNGN > 1 && elapsedDays > 30;

                  return (
                    <tr 
                      key={s.id} 
                      className={`hover:bg-[#F5F5F2]/40 transition-colors ${
                        isOverdue ? 'bg-red-50/15' : ''
                      }`}
                    >
                      {/* Deal ID */}
                      <td className="py-3 font-mono font-bold text-[#051C2C]">
                        {s.dealId}
                        {isEditing ? (
                          <div className="mt-1 flex flex-col space-y-1">
                            <span className="text-[9px] text-[#888888] font-mono uppercase">DATE:</span>
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                            />
                          </div>
                        ) : (
                          <div className="text-[10px] text-[#888888] font-normal">{s.date}</div>
                        )}
                      </td>

                      {/* Client info */}
                      <td className="py-3">
                        {isEditing ? (
                          <select
                            value={editClientId}
                            onChange={(e) => setEditClientId(e.target.value)}
                            className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-1"
                          >
                            {state.clients.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        ) : (
                          <>
                            <div className="font-semibold text-[#051C2C]">{client?.name || 'Unknown Client'}</div>
                            <div className="text-[10px] text-[#888888] font-mono uppercase">Standard Credit: 30d</div>
                          </>
                        )}
                      </td>

                      {/* Invoiced Amount NGN */}
                      <td className="py-3 text-right font-mono font-semibold text-[#051C2C]">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editAmountNGN}
                            onChange={(e) => setEditAmountNGN(e.target.value)}
                            className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 w-24 text-right font-mono"
                          />
                        ) : (
                          formatCurrency(s.amountNGN, 'NGN')
                        )}
                      </td>

                      {/* Collected NGN */}
                      <td className="py-3 text-right font-mono text-emerald-600 font-semibold">
                        {isEditing ? (
                          <div className="flex flex-col items-end space-y-1">
                            <input
                              type="number"
                              value={editCollectedNGN}
                              onChange={(e) => setEditCollectedNGN(e.target.value)}
                              className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 w-24 text-right font-mono"
                            />
                            <div className="flex items-center space-x-1 mt-0.5">
                              <span className="text-[9px] text-[#888888]">COL_DATE:</span>
                              <input
                                type="date"
                                value={editCollectionDate}
                                onChange={(e) => setEditCollectionDate(e.target.value)}
                                className="text-[10px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1 py-0.5"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            {formatCurrency(s.collectedNGN, 'NGN')}
                            {s.collectedNGN > 0 && s.collectionDate && (
                              <span className="text-[9px] text-[#888888] font-mono block">
                                Coll: {s.collectionDate}
                              </span>
                            )}
                          </>
                        )}
                      </td>

                      {/* Outstanding Debt NGN */}
                      <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                        {formatCurrency(outstandingNGN, 'NGN')}
                      </td>

                      {/* Aging Status Badge */}
                      <td className="py-3 text-center">
                        {outstandingNGN <= 1 ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-mono font-bold rounded-full inline-flex items-center">
                            <CheckCircle className="w-3 h-3 mr-0.5" />
                            RECOUPED
                          </span>
                        ) : isOverdue ? (
                          <span className="px-2 py-0.5 bg-red-50 text-[#D32F2F] border border-red-200 text-[9px] font-mono font-bold rounded-full inline-flex items-center animate-pulse">
                            <AlertCircle className="w-3 h-3 mr-0.5" />
                            OVERDUE ({elapsedDays}d)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-blue-50 text-[#2251FF] border border-blue-100 text-[9px] font-mono font-bold rounded-full inline-flex items-center">
                            ACTIVE ({elapsedDays}d)
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEdit(s.id, s.dealId)}
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
                                onClick={() => startEdit(s)}
                                className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                                title="Edit Record"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this distribution sales record?')) {
                                    deleteSale(s.id);
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

              {/* Excel Aggregate Row */}
              <tr className="bg-[#051C2C]/3 font-semibold border-t-2 border-[#051C2C]">
                <td colSpan={2} className="py-3 pl-2 font-heading text-xs font-bold text-[#051C2C] uppercase tracking-wider">
                  Workbook Total Summary (NGN)
                </td>
                <td className="py-3 text-right font-mono font-bold text-[#051C2C]">
                  {formatCurrency(totalSalesNGN, 'NGN')}
                </td>
                <td className="py-3 text-right font-mono font-semibold text-emerald-700">
                  {formatCurrency(totalCollectedNGN, 'NGN')}
                </td>
                <td className="py-3 text-right font-mono font-bold text-[#2251FF]">
                  {formatCurrency(totalOutstandingNGN, 'NGN')}
                </td>
                <td colSpan={2} className="py-3"></td>
              </tr>
            </tbody>
          </table>

          {/* Formulas and notes */}
          <div className="mt-6 flex items-start space-x-2 bg-[#2251FF]/4 p-3.5 rounded border-l-3 border-[#2251FF]">
            <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#051C2C] leading-relaxed">
              <strong>Aging Formula:</strong> Invoices with outstanding balances (Outstanding &gt; 0) where the date gap exceeds 30 standard credit days (<code>Elapsed Days = System Date - Invoice Date</code>) are labeled as <strong>OVERDUE</strong> in red. They are highlighted on the Executive Dashboard as active capital exposures.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
