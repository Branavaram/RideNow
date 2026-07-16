import { useState } from 'react';
import { Save, Plus } from 'lucide-react';

interface PricingRule {
  vehicleType: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  minimumFare: number;
  commission: number;
}

const initialPricing: PricingRule[] = [
  {
    vehicleType: 'Bike',
    baseFare: 2.50,
    perKm: 0.50,
    perMinute: 0.15,
    minimumFare: 3.00,
    commission: 20
  },
  {
    vehicleType: 'Tuk Tuk',
    baseFare: 3.50,
    perKm: 0.75,
    perMinute: 0.20,
    minimumFare: 4.00,
    commission: 20
  },
  {
    vehicleType: 'Car',
    baseFare: 5.00,
    perKm: 1.00,
    perMinute: 0.25,
    minimumFare: 6.00,
    commission: 20
  },
  {
    vehicleType: 'Mini Van',
    baseFare: 8.00,
    perKm: 1.50,
    perMinute: 0.35,
    minimumFare: 10.00,
    commission: 20
  }
];

const surgeMultipliers = [
  { id: '1', name: 'No Surge', multiplier: 1.0, active: true },
  { id: '2', name: 'Low Demand', multiplier: 1.2, active: false },
  { id: '3', name: 'Medium Demand', multiplier: 1.5, active: false },
  { id: '4', name: 'High Demand', multiplier: 2.0, active: false },
  { id: '5', name: 'Peak Hours', multiplier: 2.5, active: false }
];

export function AdminPricing() {
  const [pricing, setPricing] = useState<PricingRule[]>(initialPricing);
  const [surge, setSurge] = useState(surgeMultipliers);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handlePricingChange = (index: number, field: keyof PricingRule, value: number) => {
    const newPricing = [...pricing];
    newPricing[index] = { ...newPricing[index], [field]: value };
    setPricing(newPricing);
  };

  const handleSave = () => {
    // Simulate save
    alert('Pricing rules saved successfully!');
    setEditingIndex(null);
  };

  const toggleSurge = (id: string) => {
    setSurge(surge.map(s => ({
      ...s,
      active: s.id === id
    })));
  };

  const calculateSampleFare = (rule: PricingRule) => {
    const distance = 10; // km
    const duration = 20; // minutes
    const activeSurge = surge.find(s => s.active)?.multiplier || 1;
    const fare = (rule.baseFare + (distance * rule.perKm) + (duration * rule.perMinute)) * activeSurge;
    return Math.max(fare, rule.minimumFare);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-gray-800 text-3xl mb-2">Pricing Management</h1>
        <p className="text-gray-600">Configure fare rates and pricing rules for all vehicle types</p>
      </div>

      {/* Surge Pricing */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-gray-800 text-xl mb-4">Surge Pricing</h2>
        <p className="text-gray-600 text-sm mb-4">
          Adjust pricing multiplier based on demand. Active multiplier applies to all rides.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {surge.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSurge(s.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                s.active
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="text-gray-800 mb-1">{s.name}</p>
              <p className={`text-2xl ${s.active ? 'text-purple-600' : 'text-gray-600'}`}>
                {s.multiplier}x
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Pricing */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b">
          <h2 className="text-gray-800 text-xl">Vehicle Type Pricing</h2>
          <p className="text-gray-600 text-sm mt-1">
            Configure base fare, per kilometer rate, and per minute rate for each vehicle type
          </p>
        </div>

        <div className="divide-y">
          {pricing.map((rule, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800 text-lg">{rule.vehicleType}</h3>
                <div className="flex items-center gap-2">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="px-4 py-2 text-purple-600 hover:text-purple-700"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-2">Base Fare</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={rule.baseFare}
                      onChange={(e) => handlePricingChange(index, 'baseFare', parseFloat(e.target.value))}
                      disabled={editingIndex !== index}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">Per Kilometer</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={rule.perKm}
                      onChange={(e) => handlePricingChange(index, 'perKm', parseFloat(e.target.value))}
                      disabled={editingIndex !== index}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">Per Minute</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={rule.perMinute}
                      onChange={(e) => handlePricingChange(index, 'perMinute', parseFloat(e.target.value))}
                      disabled={editingIndex !== index}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">Minimum Fare</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={rule.minimumFare}
                      onChange={(e) => handlePricingChange(index, 'minimumFare', parseFloat(e.target.value))}
                      disabled={editingIndex !== index}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-2">Commission %</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={rule.commission}
                      onChange={(e) => handlePricingChange(index, 'commission', parseFloat(e.target.value))}
                      disabled={editingIndex !== index}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-gray-50"
                      step="1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </div>

              {/* Sample Calculation */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-2">Sample Fare (10km, 20 mins):</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Base: ${rule.baseFare.toFixed(2)} + Distance: ${(10 * rule.perKm).toFixed(2)} + Time: ${(20 * rule.perMinute).toFixed(2)} × Surge: {surge.find(s => s.active)?.multiplier}x
                  </div>
                  <div className="text-2xl text-purple-600">
                    ${calculateSampleFare(rule).toFixed(2)}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between text-sm">
                  <span className="text-gray-600">Driver Earnings ({100 - rule.commission}%):</span>
                  <span className="text-green-600">${(calculateSampleFare(rule) * (100 - rule.commission) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee ({rule.commission}%):</span>
                  <span className="text-gray-600">${(calculateSampleFare(rule) * rule.commission / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-gray-800 text-xl mb-4">Additional Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-800">Cancellation Fee</p>
              <p className="text-gray-600 text-sm">Fee charged when passenger cancels after driver accepts</p>
            </div>
            <input
              type="number"
              defaultValue={2.00}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              step="0.01"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-800">Waiting Time Charge</p>
              <p className="text-gray-600 text-sm">Additional charge per minute of waiting time</p>
            </div>
            <input
              type="number"
              defaultValue={0.50}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              step="0.01"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-800">Peak Hour Start</p>
              <p className="text-gray-600 text-sm">Start time for peak hour pricing</p>
            </div>
            <input
              type="time"
              defaultValue="17:00"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-800">Peak Hour End</p>
              <p className="text-gray-600 text-sm">End time for peak hour pricing</p>
            </div>
            <input
              type="time"
              defaultValue="21:00"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
          <Save className="w-5 h-5" />
          Save All Settings
        </button>
      </div>
    </div>
  );
}
