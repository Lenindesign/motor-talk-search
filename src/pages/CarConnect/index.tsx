
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DealerList from './components/DealerList';
import ChatInterface from './components/ChatInterface';
import { useCarContext } from '@/contexts/CarContext';
import { carMakes } from '@/services/carData';
import { useOptimizedImageLoader } from '@/hooks/useOptimizedImageLoader';

interface Dealer {
  id: string;
  name: string;
  rating: number;
  distance: string;
  address: string;
  hasUnreadMessages: boolean;
  image: string;
}

const CarConnect = () => {
  const { carId } = useParams<{ carId: string }>();
  const { selectedCar, setSelectedCar } = useCarContext();
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [dealersLoaded, setDealersLoaded] = useState(false);

  useEffect(() => {
    if (carId) {
      // Parse the car ID format: make-model-year
      const [make, model, year] = carId.split('-');
      
      // Find the car in carMakes data
      const makeData = carMakes.find(m => m.name.toLowerCase() === make);
      if (makeData) {
        const modelData = makeData.models.find(
          m => m.name.toLowerCase() === model && m.year.toString() === year
        );
        if (modelData) {
          setSelectedCar({ make: makeData, model: modelData });
        }
      }
    }
  }, [carId, setSelectedCar]);

  // Handle auto-selecting first dealer when dealers are loaded
  const handleDealersLoaded = (dealers: Dealer[]) => {
    if (dealers.length > 0 && !selectedDealer) {
      setSelectedDealer(dealers[0]);
    }
    setDealersLoaded(true);
  };

  const { currentImage } = useOptimizedImageLoader({
    imageUrl: selectedCar?.model?.imageUrl || selectedCar?.make?.imageUrl || 'https://d2kde5ohu8qb21.cloudfront.net/files/67b8d2d9e5f2c20008e9d8c9/2025-rivian-r1s-front-view.jpg',
    priority: true
  });

  return (
    <div className="container mx-auto px-0 py-8">
      <div className="max-w-5xl mx-auto">
        {selectedCar?.make && selectedCar?.model && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Car Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={currentImage}
                    alt={`${selectedCar.make.name} ${selectedCar.model.name}`}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </div>

                {/* Car Details */}
                <div className="w-full md:w-1/2 space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {selectedCar.make.name} {selectedCar.model.name} {selectedCar.model.year}
                  </h1>

                  {selectedCar.model.motorTrendScore && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-motortrend-red">
                        {selectedCar.model.motorTrendScore}
                      </span>
                      <span className="text-gray-600">MT Score</span>
                    </div>
                  )}

                  {selectedCar.model.rank && (
                    <div className="text-sm text-gray-600">
                      {selectedCar.model.rank}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {selectedCar.model.msrp && (
                      <div>
                        <div className="text-sm text-gray-600">MSRP</div>
                        <div className="text-lg font-semibold">
                          ${selectedCar.model.msrp.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {selectedCar.model.estPayment && (
                      <div>
                        <div className="text-sm text-gray-600">Est. Payment</div>
                        <div className="text-lg font-semibold">
                          ${selectedCar.model.estPayment}/mo
                        </div>
                      </div>
                    )}

                    {selectedCar.model.range && (
                      <div>
                        <div className="text-sm text-gray-600">Range</div>
                        <div className="text-lg font-semibold">
                          {selectedCar.model.range} miles
                        </div>
                      </div>
                    )}

                    {selectedCar.model.mpge && (
                      <div>
                        <div className="text-sm text-gray-600">MPGe</div>
                        <div className="text-lg font-semibold">
                          {selectedCar.model.mpge}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MotorTrend Guaranteed Banner */}
        <div className="p-4 bg-white rounded-lg mt-6 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">MotorTrend Guaranteed</h2>
            <p className="text-gray-600 mt-1">
              Get the best price from our network of certified dealers.
            </p>
          </div>
          {selectedCar?.make && selectedCar?.model && (
            <div className="flex items-center gap-3">
              <img
                src={currentImage}
                alt={`${selectedCar.make.name} ${selectedCar.model.name}`}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {selectedCar.make.name} {selectedCar.model.name}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedCar.model.year}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dealer List Section */}
          <div className="lg:col-span-1">
            <DealerList
              carId={carId}
              selectedDealer={selectedDealer}
              onDealerSelect={setSelectedDealer}
              onDealersLoaded={handleDealersLoaded}
            />
          </div>

          {/* Chat Interface Section */}
          <div className="lg:col-span-2">
            {selectedDealer ? (
              <ChatInterface dealer={selectedDealer} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Select a Dealer to Start Chat
                </h3>
                <p className="text-gray-600">
                  Choose a dealer from the list to begin your conversation about this vehicle.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarConnect;
