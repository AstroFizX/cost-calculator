import React, { useState } from 'react';
import { Building, Plus, Trash2, Edit2, Check, X, ChevronDown, ChevronRight, Copy } from 'lucide-react';

const OfficeInputs = ({ values, onChange, currency = 'USD', onCopyToOther }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: '', cost: '' });
  const [collapsedHeadings, setCollapsedHeadings] = useState(new Set());

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'PKR' ? '₨' : currency;

  const addHeading = (type, name) => {
    if (!name.trim()) return;
    
    const heading = {
      id: Date.now(),
      name: name.trim(),
      type,
      isHeading: true
    };
    
    onChange({
      ...values,
      items: [...(values.items || []), heading]
    });
  };

  const addItem = (type, parentId, name, cost) => {
    if (!name.trim() || !cost) return;
    
    const newItem = {
      id: Date.now(),
      name: name.trim(),
      cost: parseFloat(cost),
      type,
      parentId
    };
    
    onChange({
      ...values,
      items: [...(values.items || []), newItem]
    });
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValues({ 
      name: item.name, 
      cost: item.isHeading ? '' : item.cost.toString() 
    });
  };

  const saveEdit = (id) => {
    if (!editValues.name.trim()) {
      cancelEdit();
      return;
    }
    
    const itemToUpdate = values.items.find(i => i.id === id);
    
    onChange({
      ...values,
      items: values.items.map(item =>
        item.id === id
          ? { 
              ...item, 
              name: editValues.name.trim(), 
              cost: itemToUpdate.isHeading ? undefined : parseFloat(editValues.cost || 0) 
            }
          : item
      )
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: '', cost: '' });
  };

  const removeItem = (id) => {
    onChange({
      ...values,
      items: values.items.filter(i => i.id !== id && i.parentId !== id)
    });
  };

  const toggleHeading = (id) => {
    setCollapsedHeadings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getHeadings = (type) => {
    return (values.items || []).filter(i => i.type === type && i.isHeading);
  };

  const getChildItems = (parentId) => {
    return (values.items || []).filter(i => i.parentId === parentId);
  };

  const copyItem = (item) => {
    if (onCopyToOther) {
      onCopyToOther([item]);
    }
  };

  const copyCategory = (headingId) => {
    if (onCopyToOther) {
      const heading = values.items.find(i => i.id === headingId);
      const children = getChildItems(headingId);
      onCopyToOther([heading, ...children]);
    }
  };

  const ItemRow = ({ item, showCopyCategory = false }) => (
    <div className="group flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-sm">
      {editingId === item.id ? (
        <>
          <div className="flex gap-3 flex-1">
            <input
              type="text"
              value={editValues.name}
              onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Item name"
              autoFocus
            />
            {!item.isHeading && (
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">{currencySymbol}</span>
                <input
                  type="number"
                  step="0.01"
                  value={editValues.cost}
                  onChange={(e) => setEditValues(prev => ({ ...prev, cost: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 ml-3">
            <button type="button" onClick={() => saveEdit(item.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <Check className="w-4 h-4" />
            </button>
            <button type="button" onClick={cancelEdit} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1">
            {item.isHeading && (
              <button type="button" onClick={() => toggleHeading(item.id)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                {collapsedHeadings.has(item.id) ? (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </button>
            )}
            <span className={`${item.isHeading ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
              {item.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!item.isHeading && (
              <span className="font-semibold text-gray-900">{currencySymbol}{item.cost.toLocaleString()}</span>
            )}
            {onCopyToOther && showCopyCategory && item.isHeading && (
              <button
                type="button"
                onClick={() => copyCategory(item.id)}
                className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Copy entire category to Co-working"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
            {onCopyToOther && !item.isHeading && (
              <button
                type="button"
                onClick={() => copyItem(item)}
                className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Copy to Co-working"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
            <button type="button" onClick={() => startEdit(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
              <Edit2 className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => removeItem(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );

  const AddHeadingForm = ({ type }) => {
    const [headingName, setHeadingName] = useState('');

    const handleSubmit = () => {
      addHeading(type, headingName);
      setHeadingName('');
    };

    return (
      <div className="mb-4 p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 rounded-xl border-2 border-indigo-200 shadow-sm">
        <div className="text-xs font-bold text-indigo-700 uppercase mb-3">+ Add New Category</div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., Office Space, Utilities, Equipment"
            value={headingName}
            onChange={(e) => setHeadingName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 font-semibold text-sm shadow-sm hover:shadow transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 inline mr-1" /> Add Category
          </button>
        </div>
      </div>
    );
  };

  const AddItemForm = ({ type, parentId }) => {
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');

    const handleSubmit = () => {
      addItem(type, parentId, itemName, itemCost);
      setItemName('');
      setItemCost('');
    };

    return (
      <div className="p-3 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Line item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="relative w-32">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">{currencySymbol}</span>
            <input
              type="number"
              step="0.01"
              placeholder="0"
              value={itemCost}
              onChange={(e) => setItemCost(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold whitespace-nowrap flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    );
  };

  const CategorySection = ({ type, title, color }) => {
    const headings = getHeadings(type);

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-1 h-6 ${color} rounded-full`}></div>
          <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{title}</h3>
        </div>
        
        <AddHeadingForm type={type} />

        <div className="space-y-3">
          {headings.map(heading => (
            <div key={heading.id} className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl p-4 border border-gray-200">
              <ItemRow item={heading} showCopyCategory={true} />
              {!collapsedHeadings.has(heading.id) && (
                <div className="ml-6 mt-3 space-y-2">
                  {getChildItems(heading.id).map(child => (
                    <ItemRow key={child.id} item={child} showCopyCategory={false} />
                  ))}
                  <AddItemForm type={type} parentId={heading.id} />
                </div>
              )}
            </div>
          ))}
        </div>

        {headings.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No categories yet. Add a category above to get started.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-100">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
          <Building className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Traditional Office</h2>
      </div>
      
      <CategorySection 
        type="opex" 
        title="Monthly Recurring (OpEx)" 
        color="bg-gradient-to-b from-emerald-500 to-emerald-600"
      />
      
      <CategorySection 
        type="capex" 
        title="Annual CapEx" 
        color="bg-gradient-to-b from-amber-500 to-orange-600"
      />
      
      <CategorySection 
        type="startup" 
        title="One-Time Startup Costs" 
        color="bg-gradient-to-b from-purple-500 to-indigo-600"
      />
    </div>
  );
};

export default OfficeInputs;
