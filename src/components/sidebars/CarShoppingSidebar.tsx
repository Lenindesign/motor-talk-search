import React, { useState } from 'react';
import { Search, TrendingUp, Calculator, Bookmark, Star, ChevronRight, Car, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CarShoppingSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBudget, setSelectedBudget] = useState('');

  const quickSearchCategories = [
    { name: 'Sedans', icon: '🚗', count: 847, path: '/cars?type=sedan' },
    { name: 'SUVs', icon: '🚙', count: 1243, path: '/cars?type=suv' },
    { name: 'Trucks', icon: '🛻', count: 567, path: '/cars?type=truck' },
    { name: 'Electric', icon: '⚡', count: 234, path: '/cars?type=electric' },
    { name: 'Luxury', icon: '✨', count: 456, path: '/cars?category=luxury' },
    { name: 'Hybrid', icon: '🌱', count: 178, path: '/cars?type=hybrid' },
  ];

  const budgetRanges = [
    { label: 'Under $20K', value: 'under-20k', count: 892 },
    { label: '$20K - $35K', value: '20k-35k', count: 1456 },
    { label: '$35K - $50K', value: '35k-50k', count: 987 },
    { label: '$50K - $75K', value: '50k-75k', count: 543 },
    { label: '$75K+', value: '75k-plus', count: 234 },
  ];

  const savedSearches = [
    { name: 'Tesla Model 3 in CA', alert: true, results: 23 },
    { name: 'BMW 3 Series < $40K', alert: false, results: 56 },
    { name: 'Toyota Prius 2023+', alert: true, results: 12 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Car className="w-5 h-5 text-red-600" />
          <h2 className="font-bold text-lg text-gray-900">Car Shopping</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Find your perfect car with our tools and recommendations
        </p>
        <Button 
          onClick={() => navigate('/cars')}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          <Search className="w-4 h-4 mr-2" />
          Search All Cars
        </Button>
      </div>

      {/* Quick Budget Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          Shop by Budget
        </h3>
        <div className="space-y-2">
          {budgetRanges.map((budget) => (
            <button
              key={budget.value}
              onClick={() => {
                setSelectedBudget(budget.value);
                navigate(`/cars?budget=${budget.value}`);
              }}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                selectedBudget === budget.value
                  ? 'bg-red-50 border border-red-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium">{budget.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{budget.count}</span>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Popular Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {quickSearchCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(category.path)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                {category.name}
              </span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Searches */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Bookmark className="w-4 h-4 mr-2 text-blue-600" />
            Saved Searches
          </h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {savedSearches.map((search, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900">
                    {search.name}
                  </span>
                  {search.alert && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className="text-xs text-gray-500">{search.results} results</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tools */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Tools</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/payment-calculator')}
            className="w-full justify-start"
          >
            <Calculator className="w-4 h-4 mr-3" />
            Payment Calculator
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/trade-in-value')}
            className="w-full justify-start"
          >
            <TrendingUp className="w-4 h-4 mr-3" />
            Trade-in Value
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/dealers-near-me')}
            className="w-full justify-start"
          >
            <MapPin className="w-4 h-4 mr-3" />
            Dealers Near Me
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/compare')}
            className="w-full justify-start"
          >
            <Star className="w-4 h-4 mr-3" />
            Compare Cars
          </Button>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 text-sm mb-1">
              Market Alert
            </h4>
            <p className="text-xs text-blue-700 mb-2">
              Electric vehicle prices dropped 8% this month. Great time to shop!
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              View EVs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarShoppingSidebar;
