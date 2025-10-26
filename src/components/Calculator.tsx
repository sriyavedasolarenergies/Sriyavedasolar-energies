import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Zap, Home, TrendingUp, Download, ArrowRight } from 'lucide-react';

interface CalculationResult {
  systemSize: number;
  totalCost: number;
  monthlyBill: number;
  monthlySavings: number;
  yearlySavings: number;
  paybackPeriod: number;
  carbonOffset: number;
}

const Calculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3000);
  const [roofArea, setRoofArea] = useState<number>(500);
  const [location, setLocation] = useState<string>('bangalore');
  const [systemType, setSystemType] = useState<string>('grid-tie');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const locations = [
    { value: 'bangalore', label: 'Bangalore', sunHours: 5.2 },
    { value: 'mumbai', label: 'Mumbai', sunHours: 5.5 },
    { value: 'delhi', label: 'Delhi', sunHours: 5.1 },
    { value: 'chennai', label: 'Chennai', sunHours: 5.8 },
    { value: 'hyderabad', label: 'Hyderabad', sunHours: 5.3 },
    { value: 'pune', label: 'Pune', sunHours: 5.4 }
  ];

  const systemTypes = [
    { value: 'grid-tie', label: 'Grid-Tie System', multiplier: 1 },
    { value: 'hybrid', label: 'Hybrid System', multiplier: 1.3 },
    { value: 'off-grid', label: 'Off-Grid System', multiplier: 1.6 }
  ];

  const calculateSystem = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const selectedLocation = locations.find(loc => loc.value === location);
      const selectedSystem = systemTypes.find(sys => sys.value === systemType);
      
      if (!selectedLocation || !selectedSystem) return;

      // Solar calculations
      const unitsPerMonth = monthlyBill / 6; // Assuming ₹6 per unit
      const dailyUnits = unitsPerMonth / 30;
      const systemSize = Math.ceil((dailyUnits / selectedLocation.sunHours) * 1.2); // 20% buffer
      const maxSystemSize = Math.floor(roofArea / 100); // 100 sq ft per kW
      const finalSystemSize = Math.min(systemSize, maxSystemSize);
      
      const costPerKW = systemType === 'grid-tie' ? 65000 : systemType === 'hybrid' ? 85000 : 105000;
      const totalCost = finalSystemSize * costPerKW;
      const generatedUnits = finalSystemSize * selectedLocation.sunHours * 30;
      const monthlySavings = Math.min(generatedUnits * 6, monthlyBill * 0.95);
      const yearlySavings = monthlySavings * 12;
      const paybackPeriod = totalCost / yearlySavings;
      const carbonOffset = finalSystemSize * 1.5; // Tons of CO2 per year

      setResult({
        systemSize: finalSystemSize,
        totalCost,
        monthlyBill,
        monthlySavings,
        yearlySavings,
        paybackPeriod,
        carbonOffset
      });
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (monthlyBill > 0 && roofArea > 0) {
      const timer = setTimeout(() => {
        calculateSystem();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [monthlyBill, roofArea, location, systemType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Solar Savings{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calculate your potential savings and see how solar can benefit your home or business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <CalcIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Enter Your Details</h3>
            </div>

            <div className="space-y-6">
              {/* Monthly Bill */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Monthly Electricity Bill
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>₹1,000</span>
                    <span className="text-orange-400 font-bold text-lg">
                      {formatCurrency(monthlyBill)}
                    </span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>

              {/* Roof Area */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Available Roof Area (sq ft)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-2">
                    <span>200 sq ft</span>
                    <span className="text-teal-400 font-bold text-lg">
                      {roofArea} sq ft
                    </span>
                    <span>5,000 sq ft</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label} ({loc.sunHours} sun hours/day)
                    </option>
                  ))}
                </select>
              </div>

              {/* System Type */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  System Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {systemTypes.map((system) => (
                    <button
                      key={system.value}
                      onClick={() => setSystemType(system.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        systemType === system.value
                          ? 'border-orange-400 bg-orange-500/20 text-orange-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-sm font-semibold">{system.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {isCalculating ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white text-lg">Calculating your solar savings...</p>
                </div>
              </div>
            ) : result ? (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Solar Benefits</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-400">{result.systemSize} kW</div>
                    <div className="text-gray-300 text-sm">System Size</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <Home className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(result.totalCost)}</div>
                    <div className="text-gray-300 text-sm">System Cost</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Monthly Savings</span>
                    <span className="text-teal-400 font-bold text-lg">{formatCurrency(result.monthlySavings)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Yearly Savings</span>
                    <span className="text-green-400 font-bold text-lg">{formatCurrency(result.yearlySavings)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">Payback Period</span>
                    <span className="text-yellow-400 font-bold text-lg">{result.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl">
                    <span className="text-gray-300">CO₂ Offset (per year)</span>
                    <span className="text-emerald-400 font-bold text-lg">{result.carbonOffset.toFixed(1)} tons</span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Get Detailed Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-500/20 flex items-center justify-center h-96">
                <p className="text-gray-400 text-lg text-center">
                  Adjust the values above to see your solar savings calculation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f97316, #eab308);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Calculator;