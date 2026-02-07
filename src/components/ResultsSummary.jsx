import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

const ResultsSummary = ({ officeTotal, coworkingTotal, timeHorizon, currencySymbol = '$' }) => {
  const difference = Math.abs(officeTotal - coworkingTotal);
  const isCoworkingCheaper = coworkingTotal < officeTotal;
  const savingsPercentage = Math.max(officeTotal, coworkingTotal) > 0
    ? ((difference / Math.max(officeTotal, coworkingTotal)) * 100).toFixed(1)
    : 0;
  
  const officeMonthly = Math.round(officeTotal / timeHorizon);
  const coworkingMonthly = Math.round(coworkingTotal / timeHorizon);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl p-8 border border-gray-700">
      <h2 className="text-xl font-bold mb-8 pb-4 border-b-2 border-gray-600">
        {timeHorizon / 12}-Year Total Cost Comparison
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 rounded-xl p-5 border-2 border-blue-700/50 hover:border-blue-500/70 transition-all">
          <p className="text-blue-200 text-sm font-medium mb-2">Traditional Office</p>
          <p className="text-2xl lg:text-3xl font-bold text-white break-words">{currencySymbol}{officeTotal.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">
            ~{currencySymbol}{officeMonthly.toLocaleString()}/mo avg
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 rounded-xl p-5 border-2 border-green-700/50 hover:border-green-500/70 transition-all">
          <p className="text-green-200 text-sm font-medium mb-2">Co-working Space</p>
          <p className="text-2xl lg:text-3xl font-bold text-white break-words">{currencySymbol}{coworkingTotal.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-2">
            ~{currencySymbol}{coworkingMonthly.toLocaleString()}/mo avg
          </p>
        </div>
      </div>

      <div className={clsx(
        "rounded-xl p-6 flex items-center gap-4 shadow-lg",
        isCoworkingCheaper
          ? "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-600"
          : "bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-2 border-blue-600"
      )}>
        <div className={clsx(
          "p-3 rounded-xl shadow-md",
          isCoworkingCheaper ? "bg-green-500/30" : "bg-blue-500/30"
        )}>
          {isCoworkingCheaper ? (
            <TrendingDown className="w-7 h-7 text-green-300" />
          ) : (
            <TrendingUp className="w-7 h-7 text-blue-300" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-200 font-medium mb-1">
            {isCoworkingCheaper ? "🎉 Co-working saves you" : "🎉 Traditional Office saves you"}
          </p>
          <p className={clsx(
            "text-3xl font-bold",
            isCoworkingCheaper ? "text-green-300" : "text-blue-300"
          )}>
            {currencySymbol}{difference.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {savingsPercentage}% cost reduction over {timeHorizon / 12} year{timeHorizon > 12 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
