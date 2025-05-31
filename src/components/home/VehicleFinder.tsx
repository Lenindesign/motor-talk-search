import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VehicleFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  
  const budgetOptions = ['Under $25,000', '$25,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', 'Over $100,000'];
  const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback', 'Wagon'];
  const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla', 'Porsche', 'Ferrari', 'Lamborghini'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', { searchQuery, budget, vehicleType, brand });
  };

  return (
    <section className="bg-white rounded-xl shadow-modern p-6 mb-8">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 typography-title text-neutral-1">
          <Search size={24} strokeWidth={1.5} />
          Vehicle Finder
        </h2>
      </div>

      <form onSubmit={handleSearch}>
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4" size={20} strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or keyword"
              className="w-full pl-12 pr-4 py-3.5 border border-neutral-6 rounded-lg typography-body text-neutral-1 focus:outline-none focus:ring-1 focus:ring-neutral-6 focus:border-neutral-6"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Budget Dropdown */}
          <div className="relative mb-2 sm:mb-0">
            <div className="relative">
              <select 
                value={budget} 
                onChange={e => setBudget(e.target.value)} 
                className="w-full appearance-none bg-white border border-neutral-6 rounded-lg px-4 py-3.5 typography-small text-neutral-2 focus:outline-none focus:ring-1 focus:ring-neutral-6 focus:border-neutral-6"
              >
                <option value="">Budget</option>
                {budgetOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-4" size={20} strokeWidth={1.5} />
            </div>
          </div>

          {/* Vehicle Type Dropdown */}
          <div className="relative mb-2 sm:mb-0">
            <div className="relative">
              <select 
                value={vehicleType} 
                onChange={e => setVehicleType(e.target.value)} 
                className="w-full appearance-none bg-white border border-neutral-6 rounded-lg px-4 py-3.5 typography-small text-neutral-2 focus:outline-none focus:ring-1 focus:ring-neutral-6 focus:border-neutral-6"
              >
                <option value="">Vehicle Type</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-4" size={20} strokeWidth={1.5} />
            </div>
          </div>

          {/* Brand Dropdown */}
          <div className="relative mb-2 sm:mb-0">
            <div className="relative">
              <select 
                value={brand} 
                onChange={e => setBrand(e.target.value)} 
                className="w-full appearance-none bg-white border border-neutral-6 rounded-lg px-4 py-3.5 typography-small text-neutral-2 focus:outline-none focus:ring-1 focus:ring-neutral-6 focus:border-neutral-6"
              >
                <option value="">Brand</option>
                {brands.map(brandOption => (
                  <option key={brandOption} value={brandOption}>{brandOption}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-4" size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Advanced Filters and Find Vehicles */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button 
            type="button" 
            variant="outline" 
            className="flex w-full sm:w-auto items-center justify-center gap-2 typography-small text-neutral-2 border-neutral-6 hover:bg-neutral-7 py-3.5"
          >
            <SlidersHorizontal size={20} strokeWidth={1.5} />
            Advanced Filters
          </Button>

          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-motortrend-red hover:bg-motortrend-red-hover text-white typography-small font-medium px-6 py-3.5"
          >
            Find Vehicles
          </Button>
        </div>
      </form>
    </section>
  );
};

export default VehicleFinder;