import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import DealerChat from '@/components/chat/DealerChat';
import { MessageSquare, DollarSign, ThumbsUp } from 'lucide-react';

const mockDealers = [
  {
    id: 1,
    name: "Sarah Miller",
    dealership: "Audi Downtown LA",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4.9,
    responseTime: "< 5 min",
    deals: 128
  },
  {
    id: 2,
    name: "Michael Chen",
    dealership: "Audi Beverly Hills",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4.8,
    responseTime: "< 10 min",
    deals: 156
  }
];

const carDetails = {
  make: "Audi",
  model: "RS e-tron GT",
  year: 2024,
  trim: "Premium Plus",
  msrp: 147800,
  image: "https://media.ed.edmunds-media.com/audi/rs-e-tron-gt/2024/oem/2024_audi_rs-e-tron-gt_sedan_base_fq_oem_1_1600.jpg"
};

const AudiRsPricing = () => {
  const [selectedDealer, setSelectedDealer] = useState<typeof mockDealers[0] | null>(null);
  const [showChat, setShowChat] = useState(false);

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          {!showChat ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Car Details Section */}
              <Card className="p-6">
                <img 
                  src={carDetails.image} 
                  alt={`${carDetails.year} ${carDetails.make} ${carDetails.model}`}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h1 className="text-2xl font-bold text-neutral-1 mb-2">
                  {carDetails.year} {carDetails.make} {carDetails.model}
                </h1>
                <p className="text-lg text-neutral-2 mb-4">{carDetails.trim}</p>
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg mb-6">
                  <div>
                    <p className="text-sm text-neutral-2">MSRP Starting at</p>
                    <p className="text-2xl font-bold text-neutral-1">
                      ${carDetails.msrp.toLocaleString()}
                    </p>
                  </div>
                  <Button 
                    className="bg-motortrend-red hover:bg-motortrend-red/90"
                    onClick={() => setShowChat(true)}
                  >
                    Get Your Price
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-2">Range</p>
                    <p className="font-bold">232 mi</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-2">Power</p>
                    <p className="font-bold">637 hp</p>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-2">0-60</p>
                    <p className="font-bold">3.1 sec</p>
                  </div>
                </div>
              </Card>

              {/* Dealers Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-neutral-1 mb-4">
                  Chat with Top-Rated Dealers
                </h2>
                {mockDealers.map(dealer => (
                  <Card 
                    key={dealer.id}
                    className={`p-6 cursor-pointer transition-all ${
                      selectedDealer?.id === dealer.id 
                        ? 'ring-2 ring-motortrend-red' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedDealer(dealer)}
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={dealer.avatar}
                        alt={dealer.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-neutral-1">
                          {dealer.name}
                        </h3>
                        <p className="text-neutral-2 mb-3">{dealer.dealership}</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4 text-motortrend-red" />
                            <span className="text-sm">{dealer.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-motortrend-red" />
                            <span className="text-sm">{dealer.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-motortrend-red" />
                            <span className="text-sm">{dealer.deals} deals</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button 
                  className="w-full bg-motortrend-red hover:bg-motortrend-red/90"
                  disabled={!selectedDealer}
                  onClick={() => setShowChat(true)}
                >
                  Start Chat with {selectedDealer?.name}
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <Button 
                variant="outline"
                onClick={() => setShowChat(false)}
                className="mb-6"
              >
                ← Back to Dealers
              </Button>
              <DealerChat 
                dealer={{
                  name: selectedDealer!.name,
                  dealership: selectedDealer!.dealership,
                  avatar: selectedDealer!.avatar
                }}
                carDetails={carDetails}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AudiRsPricing;
