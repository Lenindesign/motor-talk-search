import React, { useState } from 'react';
import { Shield, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dealer } from '../types';
import ChatInterface from './ChatInterface';

interface DealerChatCardProps {
  dealer: Dealer;
  isSelected: boolean;
  onSelect: (dealer: Dealer) => void;
}

const DealerChatCard = ({ dealer, isSelected, onSelect }: DealerChatCardProps) => {
  const [isChatting, setIsChatting] = useState(false);

  return (
    <div className={`bg-white border rounded-lg transition-all ${isSelected ? 'border-motortrend-red shadow-lg' : 'border-gray-200'}`}>
      <div className="p-4">
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
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{dealer.address}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isChatting ? "default" : "outline"}
            className="flex-1"
            onClick={() => {
              setIsChatting(!isChatting);
              onSelect(dealer);
            }}
          >
            {isChatting ? 'Close Chat' : 'Chat'}
          </Button>
          <Button variant="outline" className="flex-1">
            Call
          </Button>
        </div>
      </div>

      {isChatting && (
        <div className="border-t border-gray-200">
          <ChatInterface dealer={dealer} />
        </div>
      )}
    </div>
  );
};

export default DealerChatCard;
