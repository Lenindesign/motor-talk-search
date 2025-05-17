
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CarImage from '../car-specs/CarImage';

interface SimilarVehiclesProps {
  vehicle: any;
  limit?: number;
}

const SimilarVehicles: React.FC<SimilarVehiclesProps> = ({ vehicle, limit }) => {
  const navigate = useNavigate();
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Get competitors (limited if specified)
  const competitors = vehicle.competitors.slice(0, limit || vehicle.competitors.length);
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Similar Vehicles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {competitors.map((competitor: any) => (
            <div key={competitor.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="relative h-48">
                <CarImage 
                  imageUrl={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3`}
                  title={`${competitor.year} ${competitor.make} ${competitor.model}`}
                  price={formatPrice(competitor.price)}
                  isNew={true}
                />
              </div>
              
              <div className="p-4">
                <h3 className="line-clamp-1 font-bold">
                  {competitor.year} {competitor.make} {competitor.model}
                </h3>
                
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div>
                    <span className="text-gray-500">Price:</span> {formatPrice(competitor.price)}
                  </div>
                  <div>
                    <span className="text-gray-500">MPG:</span> {competitor.mpg}
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Rating:</span> {competitor.overallRating}/10
                  </div>
                </div>
                
                <div className="mt-3 text-xs">
                  <span className="font-medium text-gray-700">Key Difference:</span>
                  <p className="mt-1 text-gray-600">{competitor.key_difference}</p>
                </div>
                
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => navigate(`/research/${competitor.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {limit && vehicle.competitors.length > limit && (
          <div className="mt-4 text-center">
            <Button variant="outline">
              See All Similar Vehicles
            </Button>
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">How They Compare</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-4 py-2 text-xs font-medium text-gray-500">Vehicle</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">MPG</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gray-50 font-medium">
                  <td className="px-4 py-2 text-sm">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </td>
                  <td className="px-4 py-2 text-right text-sm">{formatPrice(vehicle.price.base)}</td>
                  <td className="px-4 py-2 text-right text-sm">{vehicle.specs.mpg.combined}</td>
                  <td className="px-4 py-2 text-right text-sm">{vehicle.ratings.expert.overall}</td>
                </tr>
                {vehicle.competitors.slice(0, 4).map((competitor: any, idx: number) => (
                  <tr key={competitor.id} className={idx % 2 === 0 ? 'border-b' : 'border-b bg-gray-50'}>
                    <td className="px-4 py-2 text-sm">
                      {competitor.year} {competitor.make} {competitor.model}
                    </td>
                    <td className="px-4 py-2 text-right text-sm">{formatPrice(competitor.price)}</td>
                    <td className="px-4 py-2 text-right text-sm">{competitor.mpg}</td>
                    <td className="px-4 py-2 text-right text-sm">{competitor.overallRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarVehicles;
