import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VehicleFinder: React.FC = () => {
  const [budget, setBudget] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const budgetOptions = ['Under $25,000', '$25,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', 'Over $100,000'];
  const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Wagon'];
  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla', 'Porsche', 'Ferrari', 'Lamborghini'];

  return (
    <section className="bg-white rounded-2xl shadow-modern p-8 mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Search size={24} />
          Vehicle Finder
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Budget Dropdown */}
        <div className="relative">
          <label className="block typography-caption text-neutral-2 mb-2 font-medium">
            Budget
          </label>
          <div className="relative">
            <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full appearance-none bg-neutral-7 border border-neutral-6 rounded-xl px-4 py-3 typography-body text-neutral-2 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent">
              <option value="">Select budget range</option>
              {budgetOptions.map(option => <option key={option} value={option}>
                  {option}
                </option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-4" size={20} />
          </div>
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="relative">
          <label className="block typography-caption text-neutral-2 mb-2 font-medium">
            Vehicle Type
          </label>
          <div className="relative">
            <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="w-full appearance-none bg-neutral-7 border border-neutral-6 rounded-xl px-4 py-3 typography-body text-neutral-2 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent">
              <option value="">Select vehicle type</option>
              {vehicleTypes.map(type => <option key={type} value={type}>
                  {type}
                </option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-4" size={20} />
          </div>
        </div>

        {/* Brand Dropdown */}
        <div className="relative">
          <label className="block typography-caption text-neutral-2 mb-2 font-medium">
            Brand
          </label>
          <div className="relative">
            <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full appearance-none bg-neutral-7 border border-neutral-6 rounded-xl px-4 py-3 typography-body text-neutral-2 focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent">
              <option value="">Select brand</option>
              {brands.map(brandOption => <option key={brandOption} value={brandOption}>
                  {brandOption}
                </option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-4" size={20} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-motortrend-red hover:bg-motortrend-red/90 text-white font-semibold px-12 py-3 rounded-xl shadow-modern transition-all duration-200 hover:shadow-modern-lg">
          Find Vehicles
        </Button>
      </div>
    </section>
  );
};
export default VehicleFinder;