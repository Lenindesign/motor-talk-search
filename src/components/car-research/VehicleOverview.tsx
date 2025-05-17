
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface VehicleOverviewProps {
  vehicle: any;
}

const VehicleOverview: React.FC<VehicleOverviewProps> = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Format vehicle name
  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-2 text-3xl font-bold">{vehicleName}</h1>
      <div className="mb-4 text-lg text-gray-600">{vehicle.type}</div>
      
      {/* Image Gallery */}
      <div className="relative mb-4">
        <Carousel className="w-full">
          <CarouselContent>
            {vehicle.photos.map((photo: string, index: number) => (
              <CarouselItem key={index}>
                <div className="h-[400px] w-full overflow-hidden rounded-md">
                  <img 
                    src={photo} 
                    alt={`${vehicleName} - View ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        {/* Thumbnails */}
        <div className="mt-4 flex space-x-2">
          {vehicle.photos.map((photo: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 transition ${
                currentImageIndex === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img 
                src={photo} 
                alt={`Thumbnail ${index + 1}`} 
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Brief Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">About this {vehicle.make} {vehicle.model}</h2>
        <p className="mt-2 text-gray-700">
          The {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim} combines efficiency, 
          technology and comfort in a stylish {vehicle.type.toLowerCase()} package.
          With its {vehicle.specs.engine} engine producing {vehicle.specs.horsepower} horsepower,
          this vehicle offers an excellent balance of performance and economy.
        </p>
      </div>
    </div>
  );
};

export default VehicleOverview;
