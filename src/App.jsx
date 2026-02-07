import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import OfficeInputs from './components/OfficeInputs';
import CoworkingInputs from './components/CoworkingInputs';
import ResultsSummary from './components/ResultsSummary';
import CostChart from './components/CostChart';

function App() {
  const [timeHorizon, setTimeHorizon] = useState(12); // Months
  const [growthRate, setGrowthRate] = useState(0); // Annual %
  const [currency, setCurrency] = useState('USD');

  const [officeValues, setOfficeValues] = useState({
    items: []
  });

  const [coworkingValues, setCoworkingValues] = useState({
    items: []
  });

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency;

  const totals = useMemo(() => {
    // Helper to sum items by type
    const sumByType = (items, type) => items
      .filter(i => i.type === type)
      .reduce((acc, curr) => acc + (parseFloat(curr.cost) || 0), 0);

    // Office Costs
    const officeMonthlyOpEx = sumByType(officeValues.items, 'opex');
    const officeAnnualCapEx = sumByType(officeValues.items, 'capex');
    const officeStartupCosts = sumByType(officeValues.items, 'startup');

    // Coworking Costs
    const coworkingMonthlyOpEx = sumByType(coworkingValues.items, 'opex');
    const coworkingAnnualCapEx = sumByType(coworkingValues.items, 'capex');
    const coworkingStartupCosts = sumByType(coworkingValues.items, 'startup');

    // Projection Logic
    const projection = [];
    let cumulativeOffice = officeStartupCosts;
    let cumulativeCoworking = coworkingStartupCosts;

    for (let month = 1; month <= 60; month++) {
      // Add monthly OpEx
      cumulativeOffice += officeMonthlyOpEx;
      cumulativeCoworking += coworkingMonthlyOpEx;

      // Add CapEx annually (at month 12, 24, 36, etc.)
      if (month % 12 === 0) {
        cumulativeOffice += officeAnnualCapEx;
        cumulativeCoworking += coworkingAnnualCapEx;
      }

      projection.push({
        month,
        office: Math.round(cumulativeOffice),
        coworking: Math.round(cumulativeCoworking)
      });
    }

    return {
      projection,
      officeMonthlyOpEx,
      officeAnnualCapEx,
      officeStartupCosts,
      coworkingMonthlyOpEx,
      coworkingAnnualCapEx,
      coworkingStartupCosts
    };
  }, [officeValues, coworkingValues]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Global Settings Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Time Horizon</label>
              <select 
                value={timeHorizon} 
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="block w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 font-medium transition-all"
              >
                <option value={12}>1 Year</option>
                <option value={36}>3 Years</option>
                <option value={60}>5 Years</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Annual Team Growth</label>
              <div className="relative">
                <input
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="block w-full px-4 py-2.5 pr-12 rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">%</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="block w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 font-medium transition-all"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (₨)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            <OfficeInputs
              values={officeValues}
              onChange={setOfficeValues}
              currency={currency}
              onCopyToOther={(itemsToCopy) => {
                // Copy from Office to Coworking
                setCoworkingValues(prev => {
                  const idMap = new Map();
                  const headings = itemsToCopy.filter(item => item.isHeading);
                  const children = itemsToCopy.filter(item => !item.isHeading);
                  const newItems = [];
                  
                  // If copying only children without headings, create a default category
                  if (children.length > 0 && headings.length === 0) {
                    const defaultHeadingId = Date.now() + Math.random() * 1000;
                    const firstChild = children[0];
                    
                    newItems.push({
                      id: defaultHeadingId,
                      name: "Copied Items",
                      type: firstChild.type,
                      isHeading: true
                    });
                    
                    children.forEach(item => {
                      newItems.push({
                        ...item,
                        id: Date.now() + Math.random() * 1000,
                        parentId: defaultHeadingId
                      });
                    });
                  } else {
                    // Process headings first
                    headings.forEach(item => {
                      const newId = Date.now() + Math.random() * 1000;
                      idMap.set(item.id, newId);
                      newItems.push({
                        ...item,
                        id: newId,
                        parentId: undefined
                      });
                    });
                    
                    // Then children
                    children.forEach(item => {
                      newItems.push({
                        ...item,
                        id: Date.now() + Math.random() * 1000,
                        parentId: item.parentId && idMap.has(item.parentId) ? idMap.get(item.parentId) : undefined
                      });
                    });
                  }
                  
                  return {
                    ...prev,
                    items: [...(prev.items || []), ...newItems]
                  };
                });
              }}
            />
            <CoworkingInputs
              values={coworkingValues}
              onChange={setCoworkingValues}
              currency={currency}
              onCopyToOther={(itemsToCopy) => {
                // Copy from Coworking to Office
                setOfficeValues(prev => {
                  const idMap = new Map();
                  const headings = itemsToCopy.filter(item => item.isHeading);
                  const children = itemsToCopy.filter(item => !item.isHeading);
                  const newItems = [];
                  
                  // If copying only children without headings, create a default category
                  if (children.length > 0 && headings.length === 0) {
                    const defaultHeadingId = Date.now() + Math.random() * 1000;
                    const firstChild = children[0];
                    
                    newItems.push({
                      id: defaultHeadingId,
                      name: "Copied Items",
                      type: firstChild.type,
                      isHeading: true
                    });
                    
                    children.forEach(item => {
                      newItems.push({
                        ...item,
                        id: Date.now() + Math.random() * 1000,
                        parentId: defaultHeadingId
                      });
                    });
                  } else {
                    // Process headings first
                    headings.forEach(item => {
                      const newId = Date.now() + Math.random() * 1000;
                      idMap.set(item.id, newId);
                      newItems.push({
                        ...item,
                        id: newId,
                        parentId: undefined
                      });
                    });
                    
                    // Then children
                    children.forEach(item => {
                      newItems.push({
                        ...item,
                        id: Date.now() + Math.random() * 1000,
                        parentId: item.parentId && idMap.has(item.parentId) ? idMap.get(item.parentId) : undefined
                      });
                    });
                  }
                  
                  return {
                    ...prev,
                    items: [...(prev.items || []), ...newItems]
                  };
                });
              }}
            />
          </div>

          {/* Right Column: Results (Sticky on Desktop) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <ResultsSummary 
                officeTotal={totals.projection[timeHorizon - 1].office} 
                coworkingTotal={totals.projection[timeHorizon - 1].coworking}
                timeHorizon={timeHorizon}
                currencySymbol={currencySymbol}
              />
              <CostChart 
                data={totals.projection}
                timeHorizon={timeHorizon}
                currencySymbol={currencySymbol}
              />
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                <p className="font-bold text-blue-900 mb-2">Cost Breakdown Analysis</p>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Startup costs are applied once at the beginning</p>
                  <p>• Annual CapEx is applied every 12 months</p>
                  <p>• Monthly OpEx compounds over the time horizon</p>
                  {totals.projection[timeHorizon - 1].office < totals.projection[timeHorizon - 1].coworking 
                    ? <p className="font-semibold mt-3 text-blue-900">✓ Traditional Office is more cost-effective over {timeHorizon / 12} year(s)</p>
                    : <p className="font-semibold mt-3 text-blue-900">✓ Co-working is more cost-effective over {timeHorizon / 12} year(s)</p>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
