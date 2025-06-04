import React, { useState, useEffect } from 'react';
import { Circle, Star, MapPin, Clock, MessageSquare, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dealer } from '../types';
import { mockDealers } from '../mockData';
import DealerReviews from './DealerReviews';

interface DealerListProps {
  carId?: string;
  selectedDealer: Dealer | null;
  onDealerSelect: (dealer: Dealer) => void;
}

const DealerList = ({ carId, selectedDealer, onDealerSelect }: DealerListProps) => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviews, setShowReviews] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchDealers = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDealers(mockDealers);
      } catch (error) {
        console.error('Error fetching dealers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, [carId]);

  if (loading) {
    return (
      <div className="w-full space-y-4 overflow-y-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 overflow-y-auto">
      <div className="p-4 bg-white rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-motortrend-red" />
          <span className="font-semibold text-sm">MotorTrend Guaranteed</span>
        </div>
        <p className="text-gray-600 text-xs">Your purchase is protected up to $2,500. Terms apply.</p>
      </div>
      {dealers.map((dealer) => (
        <div
          key={dealer.id}
          className={`relative p-4 bg-white border rounded-lg cursor-pointer transition-all ${selectedDealer?.id === dealer.id ? 'border-motortrend-red shadow-lg' : 'border-gray-200'}`}
          onClick={() => onDealerSelect(dealer)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={dealer.image} 
                  alt={dealer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-base flex items-center">
                  {dealer.name}
                  {dealer.verified && (
                    <svg className="w-4 h-4 ml-1.5 text-motortrend-red" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </h3>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-motortrend-red mr-1" />
                  <span className="font-medium">{dealer.rating.toFixed(1)}</span>
                  <span className="text-gray-400 mx-1">·</span>
                  <span className="text-gray-600">{dealer.distance}</span>
                </div>
              </div>
            </div>
            {dealer.hasUnreadMessages && (
              <div className="w-2 h-2 bg-motortrend-red rounded-full" />
            )}
          </div>
          <p className="text-gray-600 text-sm mb-4">{dealer.address}</p>
          <div className="mt-4">
            <button
              onClick={() => setShowReviews(showReviews === dealer.id ? null : dealer.id)}
              className="text-sm text-motortrend-red hover:text-motortrend-dark transition-colors"
            >
              {showReviews === dealer.id ? 'Hide Reviews' : 'Show Reviews'}
            </button>
            {showReviews === dealer.id && (
              <div className="mt-4">
                <DealerReviews dealer={dealer} />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedDealer?.id === dealer.id ? "default" : "outline"}
              className="flex-1 h-9"
              onClick={(e) => {
                e.stopPropagation();
                onDealerSelect(dealer);
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {selectedDealer?.id === dealer.id ? 'Chatting' : 'Chat'}
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-9"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DealerList;
