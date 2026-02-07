import React from 'react';
import { Building2, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Office vs Co-working Calculator
            </h1>
            <p className="text-blue-100 mt-1 text-sm font-medium">
              Make data-driven decisions for your workspace · Compare OpEx, CapEx & Startup Costs
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="text-white font-semibold text-sm">Smart Analytics</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
