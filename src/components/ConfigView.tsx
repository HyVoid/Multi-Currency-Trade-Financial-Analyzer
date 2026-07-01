/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, Client, Supplier, MonthlyExchangeRate } from '../types';
import { Plus, Trash2, Edit2, Check, X, ShieldAlert, Compass } from 'lucide-react';

interface ConfigViewProps {
  state: AppState;
  addClient: (c: Omit<Client, 'id'>) => void;
  editClient: (c: Client) => void;
  deleteClient: (id: string) => void;
  addSupplier: (s: Omit<Supplier, 'id'>) => void;
  editSupplier: (s: Supplier) => void;
  deleteSupplier: (id: string) => void;
  addExchangeRate: (r: Omit<MonthlyExchangeRate, 'id'>) => void;
  editExchangeRate: (r: MonthlyExchangeRate) => void;
  deleteExchangeRate: (id: string) => void;
}

export default function ConfigView({
  state,
  addClient,
  editClient,
  deleteClient,
  addSupplier,
  editSupplier,
  deleteSupplier,
  addExchangeRate,
  editExchangeRate,
  deleteExchangeRate
}: ConfigViewProps) {
  // Client edit states
  const [newClientName, setNewClientName] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editingClientName, setEditingClientName] = useState('');
  const [editingClientContact, setEditingClientContact] = useState('');

  // Supplier edit states
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newSupplierContact, setNewSupplierContact] = useState('');
  const [editingSupplierId, setEditingSupplierId] = useState<string | null>(null);
  const [editingSupplierName, setEditingSupplierName] = useState('');
  const [editingSupplierContact, setEditingSupplierContact] = useState('');

  // Exchange rate edit states
  const [newRateMonth, setNewRateMonth] = useState('2026-08');
  const [newRateValue, setNewRateValue] = useState('');
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [editingRateMonth, setEditingRateMonth] = useState('');
  const [editingRateValue, setEditingRateValue] = useState('');

  // Form Submissions
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;
    addClient({ name: newClientName.trim(), contact: newClientContact.trim() });
    setNewClientName('');
    setNewClientContact('');
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplierName.trim()) return;
    addSupplier({ name: newSupplierName.trim(), contact: newSupplierContact.trim() });
    setNewSupplierName('');
    setNewSupplierContact('');
  };

  const handleAddRate = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedVal = parseFloat(newRateValue);
    if (!newRateMonth || isNaN(parsedVal) || parsedVal <= 0) return;
    
    // Check if month already exists
    const exists = state.exchangeRates.some(r => r.month === newRateMonth);
    if (exists) {
      alert(`An exchange rate for month ${newRateMonth} already exists. Please edit the existing entry instead.`);
      return;
    }

    addExchangeRate({ month: newRateMonth, rate: parsedVal });
    setNewRateValue('');
  };

  // Inline Editors
  const startEditClient = (c: Client) => {
    setEditingClientId(c.id);
    setEditingClientName(c.name);
    setEditingClientContact(c.contact || '');
  };

  const saveEditClient = () => {
    if (!editingClientName.trim()) return;
    editClient({ id: editingClientId!, name: editingClientName.trim(), contact: editingClientContact.trim() });
    setEditingClientId(null);
  };

  const startEditSupplier = (s: Supplier) => {
    setEditingSupplierId(s.id);
    setEditingSupplierName(s.name);
    setEditingSupplierContact(s.contact || '');
  };

  const saveEditSupplier = () => {
    if (!editingSupplierName.trim()) return;
    editSupplier({ id: editingSupplierId!, name: editingSupplierName.trim(), contact: editingSupplierContact.trim() });
    setEditingSupplierId(null);
  };

  const startEditRate = (r: MonthlyExchangeRate) => {
    setEditingRateId(r.id);
    setEditingRateMonth(r.month);
    setEditingRateValue(r.rate.toString());
  };

  const saveEditRate = () => {
    const parsedVal = parseFloat(editingRateValue);
    if (!editingRateMonth || isNaN(parsedVal) || parsedVal <= 0) return;
    editExchangeRate({ id: editingRateId!, month: editingRateMonth, rate: parsedVal });
    setEditingRateId(null);
  };

  return (
    <div id="config-view" className="animate-fade-up flex flex-col space-y-10">
      
      {/* Title block */}
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051C2C] mb-2">
          System Parameter Configuration
        </h1>
        <p className="text-sm text-[#888888]">
          Configure base parameters: West-African trade accounts, European manufacturing suppliers, and monthly standard reference rates.
        </p>
      </div>

      {/* Info Panel / Warning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg custom-shadow-md">
          <h2 className="font-heading text-lg font-bold text-[#051C2C] mb-2">Configuring Foreign Exchange (FX) References</h2>
          <p className="text-xs text-[#051C2C] leading-relaxed">
            The monthly exchange rate table maps reference evaluations of West-African NGN currencies against 1 EUR. 
            When outstanding invoices remain uncollected or are collected but have not yet been exchanged via actual bank transactions, 
            the <strong>Calculation Engine</strong> dynamically pulls these monthly rates to estimate their EUR liquidation value.
          </p>
        </div>

        {/* Dynamic Insight Banner */}
        <div className="bg-white rounded-lg p-6 custom-shadow-md flex flex-col justify-center border-l-3 border-[#2251FF] bg-[#2251FF]/4">
          <h3 className="font-heading text-md font-bold text-[#051C2C] mb-1 flex items-center">
            <Compass className="w-4 h-4 mr-1 text-[#2251FF]" />
            Formula Rules
          </h3>
          <p className="text-xs text-[#051C2C] leading-relaxed">
            Deleting a client, supplier, or exchange rate month will remove references across all ledger books. Update existing names to preserve operational histories.
          </p>
        </div>
      </div>

      {/* Grid of configurations */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 1. Client Configurations */}
        <div className="bg-white p-6 rounded-lg custom-shadow-md flex flex-col space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-2">
            Client Accounts List
          </h2>

          {/* Quick Add Form */}
          <form onSubmit={handleAddClient} className="space-y-2">
            <input
              id="new-client-name"
              type="text"
              placeholder="Add New Client Name..."
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
            />
            <div className="flex space-x-2">
              <input
                id="new-client-contact"
                type="text"
                placeholder="Contact Details / Location..."
                value={newClientContact}
                onChange={(e) => setNewClientContact(e.target.value)}
                className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
              />
              <button
                id="add-client-submit"
                type="submit"
                className="px-3 py-2 bg-[#051C2C] hover:bg-[#2251FF] text-white rounded-md text-xs font-semibold flex items-center transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Render List */}
          <div className="overflow-y-auto max-h-[300px] divide-y divide-[#E8E8E6] pr-1">
            {state.clients.length === 0 ? (
              <p className="text-center py-6 text-[#888888] text-xs font-mono uppercase">No Clients Configured</p>
            ) : (
              state.clients.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between">
                  {editingClientId === c.id ? (
                    <div className="flex-1 flex flex-col space-y-1.5 mr-2">
                      <input
                        type="text"
                        value={editingClientName}
                        onChange={(e) => setEditingClientName(e.target.value)}
                        className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none font-bold focus:border-[#2251FF]"
                      />
                      <input
                        type="text"
                        value={editingClientContact}
                        onChange={(e) => setEditingClientContact(e.target.value)}
                        className="text-[11px] bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none focus:border-[#2251FF]"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 truncate pr-2">
                      <h4 className="font-semibold text-xs text-[#051C2C]">{c.name}</h4>
                      <p className="text-[11px] text-[#888888] font-mono uppercase truncate">{c.contact || 'No Contact Listed'}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center space-x-1 shrink-0">
                    {editingClientId === c.id ? (
                      <>
                        <button
                          onClick={saveEditClient}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingClientId(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditClient(c)}
                          className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteClient(c.id)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Supplier Configurations */}
        <div className="bg-white p-6 rounded-lg custom-shadow-md flex flex-col space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-2">
            Supplier Accounts List
          </h2>

          {/* Quick Add Form */}
          <form onSubmit={handleAddSupplier} className="space-y-2">
            <input
              id="new-supplier-name"
              type="text"
              placeholder="Add New Supplier Name..."
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              className="w-full text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
            />
            <div className="flex space-x-2">
              <input
                id="new-supplier-contact"
                type="text"
                placeholder="Country / Contact..."
                value={newSupplierContact}
                onChange={(e) => setNewSupplierContact(e.target.value)}
                className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
              />
              <button
                id="add-supplier-submit"
                type="submit"
                className="px-3 py-2 bg-[#051C2C] hover:bg-[#2251FF] text-white rounded-md text-xs font-semibold flex items-center transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Render List */}
          <div className="overflow-y-auto max-h-[300px] divide-y divide-[#E8E8E6] pr-1">
            {state.suppliers.length === 0 ? (
              <p className="text-center py-6 text-[#888888] text-xs font-mono uppercase">No Suppliers Configured</p>
            ) : (
              state.suppliers.map((s) => (
                <div key={s.id} className="py-2.5 flex items-center justify-between">
                  {editingSupplierId === s.id ? (
                    <div className="flex-1 flex flex-col space-y-1.5 mr-2">
                      <input
                        type="text"
                        value={editingSupplierName}
                        onChange={(e) => setEditingSupplierName(e.target.value)}
                        className="text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none font-bold focus:border-[#2251FF]"
                      />
                      <input
                        type="text"
                        value={editingSupplierContact}
                        onChange={(e) => setEditingSupplierContact(e.target.value)}
                        className="text-[11px] bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none focus:border-[#2251FF]"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 truncate pr-2">
                      <h4 className="font-semibold text-xs text-[#051C2C]">{s.name}</h4>
                      <p className="text-[11px] text-[#888888] font-mono uppercase truncate">{s.contact || 'No Contact Listed'}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center space-x-1 shrink-0">
                    {editingSupplierId === s.id ? (
                      <>
                        <button
                          onClick={saveEditSupplier}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingSupplierId(null)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditSupplier(s)}
                          className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSupplier(s.id)}
                          className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Exchange Rate Configurations */}
        <div className="bg-white p-6 rounded-lg custom-shadow-md flex flex-col space-y-4">
          <h2 className="font-heading text-xl font-bold text-[#051C2C] border-b border-[#E8E8E6] pb-2">
            Monthly Base Rates (1 EUR = ? NGN)
          </h2>

          {/* Quick Add Form */}
          <form onSubmit={handleAddRate} className="space-y-2">
            <div className="flex space-x-2">
              <input
                id="new-rate-month"
                type="month"
                value={newRateMonth}
                onChange={(e) => setNewRateMonth(e.target.value)}
                className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all cursor-pointer"
              />
              <input
                id="new-rate-val"
                type="number"
                step="0.01"
                placeholder="Exchange rate (e.g. 1650)..."
                value={newRateValue}
                onChange={(e) => setNewRateValue(e.target.value)}
                className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded-md px-3 py-2 outline-none font-semibold focus:border-[#2251FF] transition-all"
              />
              <button
                id="add-rate-submit"
                type="submit"
                className="px-3 py-2 bg-[#051C2C] hover:bg-[#2251FF] text-white rounded-md text-xs font-semibold flex items-center transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Render List */}
          <div className="overflow-y-auto max-h-[300px] divide-y divide-[#E8E8E6] pr-1">
            {state.exchangeRates.length === 0 ? (
              <p className="text-center py-6 text-[#888888] text-xs font-mono uppercase">No Base Rates Set</p>
            ) : (
              state.exchangeRates
                .slice()
                .sort((a, b) => b.month.localeCompare(a.month))
                .map((r) => (
                  <div key={r.id} className="py-2.5 flex items-center justify-between">
                    {editingRateId === r.id ? (
                      <div className="flex-1 flex space-x-2 mr-2">
                        <input
                          type="month"
                          value={editingRateMonth}
                          onChange={(e) => setEditingRateMonth(e.target.value)}
                          className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none font-bold focus:border-[#2251FF]"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={editingRateValue}
                          onChange={(e) => setEditingRateValue(e.target.value)}
                          className="flex-1 text-xs bg-[#FFFDE7] text-[#051C2C] border border-[#E8E8E6] rounded px-2 py-1 outline-none font-bold focus:border-[#2251FF]"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between pr-4">
                        <div className="font-mono text-xs font-bold text-[#051C2C]">
                          {r.month}
                        </div>
                        <div className="font-mono text-xs font-semibold text-[#2251FF]">
                          1 EUR = {r.rate.toLocaleString()} NGN
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center space-x-1 shrink-0">
                      {editingRateId === r.id ? (
                        <>
                          <button
                            onClick={saveEditRate}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingRateId(null)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditRate(r)}
                            className="p-1 text-[#888888] hover:text-[#2251FF] hover:bg-[#F5F5F2] rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteExchangeRate(r.id)}
                            className="p-1 text-[#888888] hover:text-[#D32F2F] hover:bg-[#F5F5F2] rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
