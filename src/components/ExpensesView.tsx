/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, Expense, FXTransaction } from '../types';
import { formatCurrency } from '../utils';
import { Plus, Trash2, Edit2, Wallet, Coins, Calculator, Info } from 'lucide-react';

interface ExpensesViewProps {
  state: AppState;
  addExpense: (e: Omit<Expense, 'id'>) => void;
  editExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
  addFXTransaction: (fx: Omit<FXTransaction, 'id'>) => void;
  editFXTransaction: (fx: FXTransaction) => void;
  deleteFXTransaction: (id: string) => void;
}

export default function ExpensesView({
  state,
  addExpense,
  editExpense,
  deleteExpense,
  addFXTransaction,
  editFXTransaction,
  deleteFXTransaction
}: ExpensesViewProps) {
  // Overhead Edit states
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expDate, setExpDate] = useState('2026-07-01');
  const [expCategory, setExpCategory] = useState<'Logistics' | 'Rent' | 'Wages' | 'Marketing' | 'Other'>('Logistics');
  const [expAmountEUR, setExpAmountEUR] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const [editExpDate, setEditExpDate] = useState('');
  const [editExpCategory, setEditExpCategory] = useState<'Logistics' | 'Rent' | 'Wages' | 'Marketing' | 'Other'>('Logistics');
  const [editExpAmountEUR, setEditExpAmountEUR] = useState('');
  const [editExpDesc, setEditExpDesc] = useState('');

  // FX Edit states
  const [editingFxId, setEditingFxId] = useState<string | null>(null);
  const [fxDate, setFxDate] = useState('2026-07-01');
  const [fxDealId, setFxDealId] = useState(state.purchases[0]?.id || '');
  const [fxAmountNGN, setFxAmountNGN] = useState('');
  const [fxReceivedEUR, setFxReceivedEUR] = useState('');

  const [editFxDate, setEditFxDate] = useState('');
  const [editFxDealId, setEditFxDealId] = useState('');
  const [editFxAmountNGN, setEditFxAmountNGN] = useState('');
  const [editFxReceivedEUR, setEditFxReceivedEUR] = useState('');

  // Handlers
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(expAmountEUR);
    if (!expDate || isNaN(val) || val <= 0) {
      alert('Please fill out all required fields with positive numeric amount.');
      return;
    }
    addExpense({
      date: expDate,
      category: expCategory,
      amountEUR: val,
      description: expDesc.trim() || 'General operations expense'
    });
    setExpAmountEUR('');
    setExpDesc('');
  };

  const handleAddFX = (e: React.FormEvent) => {
    e.preventDefault();
    const ngnVal = parseFloat(fxAmountNGN);
    const eurVal = parseFloat(fxReceivedEUR);
    if (!fxDate || !fxDealId || isNaN(ngnVal) || ngnVal <= 0 || isNaN(eurVal) || eurVal <= 0) {
      alert('Please fill out all required fields with positive conversion sums.');
      return;
    }
    addFXTransaction({
      date: fxDate,
      dealId: fxDealId,
      amountNGN: ngnVal,
      receivedEUR: eurVal
    });
    setFxAmountNGN('');
    setFxReceivedEUR('');
  };

  const startEditExp = (e: Expense) => {
    setEditingExpId(e.id);
    setEditExpDate(e.date);
    setEditExpCategory(e.category);
    setEditExpAmountEUR(e.amountEUR.toString());
    setEditExpDesc(e.description);
  };

  const saveEditExp = (id: string) => {
    const val = parseFloat(editExpAmountEUR);
    if (!editExpDate || isNaN(val) || val <= 0) return;
    editExpense({
      id,
      date: editExpDate,
      category: editExpCategory,
      amountEUR: val,
      description: editExpDesc
    });
    setEditingExpId(null);
  };

  const startEditFx = (fx: FXTransaction) => {
    setEditingFxId(fx.id);
    setEditFxDate(fx.date);
    setEditFxDealId(fx.dealId);
    setEditFxAmountNGN(fx.amountNGN.toString());
    setEditFxReceivedEUR(fx.receivedEUR.toString());
  };

  const saveEditFx = (id: string) => {
    const ngnVal = parseFloat(editFxAmountNGN);
    const eurVal = parseFloat(editFxReceivedEUR);
    if (!editFxDate || !editFxDealId || isNaN(ngnVal) || ngnVal <= 0 || isNaN(eurVal) || eurVal <= 0) return;
    editFXTransaction({
      id,
      date: editFxDate,
      dealId: editFxDealId,
      amountNGN: ngnVal,
      receivedEUR: eurVal
    });
    setEditingFxId(null);
  };

  // Summaries
  const totalOverheadEUR = state.expenses.reduce((sum, e) => sum + e.amountEUR, 0);
  const totalExchangedNGN = state.fxTransactions.reduce((sum, f) => sum + f.amountNGN, 0);
  const totalReceivedEUR = state.fxTransactions.reduce((sum, f) => sum + f.receivedEUR, 0);
  const averageConversionRate = totalReceivedEUR > 0 ? totalExchangedNGN / totalReceivedEUR : 0;

  return (
    <div id="expenses-view" className="animate-fade-up flex flex-col space-y-12">
      
      {/* Overview */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          Overhead Operating Expenses & FX Conversions
        </h1>
        <p className="text-sm text-[#888888]">
          Log corporate overhead expenses in Europe/Africa, and audit bank liquidation transactions exchanging NGN collections back to EUR reserves.
        </p>
      </div>

      {/* Grid: 2 sections stacked or split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* SECTION A: Indirect Operating Expenses */}
        <div className="bg-white p-6 rounded-lg custom-shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-[#E8E8E6] pb-2 text-[#051C2C] mb-4">
              <Wallet className="w-5 h-5 text-[#2251FF]" />
              <h2 className="font-heading text-lg font-bold">Overhead Operating Expenses (EUR)</h2>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4 bg-[#F5F5F2]/50 p-3 rounded-md border border-[#E8E8E6]">
              <input
                id="exp-form-date"
                type="date"
                required
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 cursor-pointer outline-none font-semibold focus:border-[#2251FF]"
              />
              <select
                id="exp-form-category"
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value as any)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1.5 cursor-pointer outline-none font-semibold focus:border-[#2251FF]"
              >
                <option value="Logistics">Logistics / Port</option>
                <option value="Rent">Office Rent</option>
                <option value="Wages">Staff Wages</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other Operational</option>
              </select>
              <input
                id="exp-form-amount"
                type="number"
                step="0.01"
                required
                placeholder="Amount (EUR)..."
                value={expAmountEUR}
                onChange={(e) => setExpAmountEUR(e.target.value)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-semibold focus:border-[#2251FF]"
              />
              <div className="flex space-x-2">
                <input
                  id="exp-form-desc"
                  type="text"
                  placeholder="Memo description..."
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-semibold focus:border-[#2251FF]"
                />
                <button
                  id="exp-form-submit"
                  type="submit"
                  className="px-2.5 py-1.5 bg-[#051C2C] hover:bg-[#2251FF] text-white rounded font-bold text-xs shrink-0 transition-all cursor-pointer"
                  title="Add Expense"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Table list */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E6] pb-1.5 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
                    <th className="pb-1.5">DATE</th>
                    <th className="pb-1.5">CATEGORY</th>
                    <th className="pb-1.5">DESCRIPTION</th>
                    <th className="pb-1.5 text-right">COST (EUR)</th>
                    <th className="pb-1.5 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]">
                  {state.expenses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-[#888888] font-mono uppercase">
                        No indirect overhead costs recorded
                      </td>
                    </tr>
                  ) : (
                    state.expenses.map((e) => {
                      const isEditing = editingExpId === e.id;
                      return (
                        <tr key={e.id} className="hover:bg-[#F5F5F2]/40 transition-colors">
                          <td className="py-2">
                            {isEditing ? (
                              <input
                                type="date"
                                value={editExpDate}
                                onChange={(e) => setEditExpDate(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-0.5"
                              />
                            ) : (
                              <span className="font-mono text-[11px]">{e.date}</span>
                            )}
                          </td>
                          <td className="py-2 font-semibold">
                            {isEditing ? (
                              <select
                                value={editExpCategory}
                                onChange={(e) => setEditExpCategory(e.target.value as any)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-0.5"
                              >
                                <option value="Logistics">Logistics</option>
                                <option value="Rent">Rent</option>
                                <option value="Wages">Wages</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Other">Other</option>
                              </select>
                            ) : (
                              <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-mono text-[#051C2C]">
                                {e.category.toUpperCase()}
                              </span>
                            )}
                          </td>
                          <td className="py-2 text-[#888888] max-w-[150px] truncate">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editExpDesc}
                                onChange={(e) => setEditExpDesc(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5"
                              />
                            ) : (
                              e.description
                            )}
                          </td>
                          <td className="py-2 text-right font-mono font-bold text-[#051C2C]">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.01"
                                value={editExpAmountEUR}
                                onChange={(e) => setEditExpAmountEUR(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-right w-16"
                              />
                            ) : (
                              formatCurrency(e.amountEUR, 'EUR')
                            )}
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => saveEditExp(e.id)}
                                    className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                                  >
                                    OK
                                  </button>
                                  <button
                                    onClick={() => setEditingExpId(null)}
                                    className="p-0.5 text-red-600 hover:bg-red-50 rounded"
                                  >
                                    ESC
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => startEditExp(e)}
                                    className="p-0.5 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteExpense(e.id)}
                                    className="p-0.5 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}

                  {/* Summary Total row */}
                  <tr className="bg-slate-50 border-t border-[#051C2C] font-semibold">
                    <td colSpan={3} className="py-2 font-semibold">Overhead Totals:</td>
                    <td className="py-2 text-right font-mono font-bold text-[#051C2C]">
                      {formatCurrency(totalOverheadEUR, 'EUR')}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 border-t border-[#E8E8E6] pt-4 flex items-start space-x-2 bg-[#2251FF]/4 p-3 rounded">
            <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#051C2C] leading-relaxed">
              Operating costs represent indirect overhead leaks not associated with a specific Deal ID. They deduct from general trade profit in the monthly consolidated view.
            </p>
          </div>
        </div>

        {/* SECTION B: Actual FX Conversions */}
        <div className="bg-white p-6 rounded-lg custom-shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 border-b border-[#E8E8E6] pb-2 text-[#051C2C] mb-4">
              <Coins className="w-5 h-5 text-[#2251FF]" />
              <h2 className="font-heading text-lg font-bold">Actual Foreign Exchange (FX) Ledger</h2>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddFX} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4 bg-[#F5F5F2]/50 p-3 rounded-md border border-[#E8E8E6]">
              <input
                id="fx-form-date"
                type="date"
                required
                value={fxDate}
                onChange={(e) => setFxDate(e.target.value)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 cursor-pointer outline-none font-semibold focus:border-[#2251FF]"
              />
              <select
                id="fx-form-deal-id"
                required
                value={fxDealId}
                onChange={(e) => setFxDealId(e.target.value)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1.5 cursor-pointer outline-none font-bold focus:border-[#2251FF]"
              >
                <option value="" disabled>Select Deal...</option>
                {state.purchases.map(p => (
                  <option key={p.id} value={p.id}>{p.id}</option>
                ))}
              </select>
              <input
                id="fx-form-amount-ngn"
                type="number"
                required
                placeholder="Exchanged (NGN ₦)..."
                value={fxAmountNGN}
                onChange={(e) => setFxAmountNGN(e.target.value)}
                className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-semibold focus:border-[#2251FF]"
              />
              <div className="flex space-x-2">
                <input
                  id="fx-form-received-eur"
                  type="number"
                  step="0.01"
                  required
                  placeholder="Received (EUR €)..."
                  value={fxReceivedEUR}
                  onChange={(e) => setFxReceivedEUR(e.target.value)}
                  className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2.5 py-1.5 outline-none font-semibold focus:border-[#2251FF]"
                />
                <button
                  id="fx-form-submit"
                  type="submit"
                  className="px-2.5 py-1.5 bg-[#051C2C] hover:bg-[#2251FF] text-white rounded font-bold text-xs shrink-0 transition-all cursor-pointer"
                  title="Add FX Conversion"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Table list */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8E6] pb-1.5 text-[10px] font-mono text-[#888888] tracking-widest uppercase font-semibold">
                    <th className="pb-1.5">DATE</th>
                    <th className="pb-1.5">DEAL</th>
                    <th className="pb-1.5 text-right">EXCHANGED NGN</th>
                    <th className="pb-1.5 text-right">RECEIVED EUR</th>
                    <th className="pb-1.5 text-right">RATE (NGN/EUR)</th>
                    <th className="pb-1.5 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]">
                  {state.fxTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#888888] font-mono uppercase">
                        No FX liquidations recorded
                      </td>
                    </tr>
                  ) : (
                    state.fxTransactions.map((fx) => {
                      const isEditing = editingFxId === fx.id;
                      const calculatedRate = fx.receivedEUR > 0 ? fx.amountNGN / fx.receivedEUR : 0;
                      return (
                        <tr key={fx.id} className="hover:bg-[#F5F5F2]/40 transition-colors">
                          <td className="py-2">
                            {isEditing ? (
                              <input
                                type="date"
                                value={editFxDate}
                                onChange={(e) => setEditFxDate(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-0.5"
                              />
                            ) : (
                              <span className="font-mono text-[11px]">{fx.date}</span>
                            )}
                          </td>
                          <td className="py-2 font-mono font-bold text-[#051C2C]">
                            {isEditing ? (
                              <select
                                value={editFxDealId}
                                onChange={(e) => setEditFxDealId(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded p-0.5"
                              >
                                {state.purchases.map(p => (
                                  <option key={p.id} value={p.id}>{p.id}</option>
                                ))}
                              </select>
                            ) : (
                              fx.dealId
                            )}
                          </td>
                          <td className="py-2 text-right font-mono">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editFxAmountNGN}
                                onChange={(e) => setEditFxAmountNGN(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-right w-20"
                              />
                            ) : (
                              formatCurrency(fx.amountNGN, 'NGN')
                            )}
                          </td>
                          <td className="py-2 text-right font-mono font-bold text-[#2251FF]">
                            {isEditing ? (
                              <input
                                type="number"
                                step="0.01"
                                value={editFxReceivedEUR}
                                onChange={(e) => setEditFxReceivedEUR(e.target.value)}
                                className="text-[11px] bg-[#FFFDE7] border border-[#E8E8E6] rounded px-1.5 py-0.5 text-right w-16"
                              />
                            ) : (
                              formatCurrency(fx.receivedEUR, 'EUR')
                            )}
                          </td>
                          <td className="py-2 text-right font-mono font-semibold text-[#051C2C]/75">
                            {isEditing ? (
                              <span className="text-gray-400">—</span>
                            ) : (
                              `1€ = ${Math.round(calculatedRate).toLocaleString()} ₦`
                            )}
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => saveEditFx(fx.id)}
                                    className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                                  >
                                    OK
                                  </button>
                                  <button
                                    onClick={() => setEditingFxId(null)}
                                    className="p-0.5 text-red-600 hover:bg-red-50 rounded"
                                  >
                                    ESC
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => startEditFx(fx)}
                                    className="p-0.5 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteFXTransaction(fx.id)}
                                    className="p-0.5 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}

                  {/* Summary row */}
                  <tr className="bg-slate-50 border-t border-[#051C2C] font-semibold">
                    <td colSpan={2} className="py-2 font-semibold">FX Totals:</td>
                    <td className="py-2 text-right font-mono text-[#051C2C]">
                      {formatCurrency(totalExchangedNGN, 'NGN')}
                    </td>
                    <td className="py-2 text-right font-mono font-bold text-[#2251FF]">
                      {formatCurrency(totalReceivedEUR, 'EUR')}
                    </td>
                    <td className="py-2 text-right font-mono text-[10px] text-[#888888]">
                      AVG: 1€ = {Math.round(averageConversionRate).toLocaleString()} ₦
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 border-t border-[#E8E8E6] pt-4 flex items-start space-x-2 bg-[#2251FF]/4 p-3 rounded">
            <Info className="w-4 h-4 text-[#2251FF] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#051C2C] leading-relaxed">
              FX Transactions trace real conversion events. Unlike pre-estimated valuations using configured reference rates, this tracks money actually settled and brought back to European banks.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
