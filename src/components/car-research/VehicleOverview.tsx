
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  RotateCw,
  Video,
  Play,
  PanelTop
} from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface VehicleOverviewProps {
  vehicle: any;
}

const VehicleOverview: React.FC<VehicleOverviewProps> = ({ vehicle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | '360' | 'interior'>('gallery');
  
  // Format vehicle name
  const vehicleName = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`;
  
  // Simulate 360° view angles
  const view360Angles = Array.from({ length: 8 }, (_, i) => 
    vehicle.photos[i % vehicle.photos.length]
  );
  
  // Simulate interior views
  const interiorViews = [
    vehicle.photos[0],
    vehicle.photos[1],
    vehicle.photos[2]
  ];
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h1 className="text-3xl font-bold">{vehicleName}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Great Deal
          </Badge>
          <span className="text-sm text-gray-500">
            $1,245 below market avg
          </span>
        </div>
      </div>
      <div className="mb-4 text-lg text-gray-600">{vehicle.type}</div>
      
      {/* View Mode Selector */}
      <div className="mb-4">
        <Tabs defaultValue="gallery" value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery" className="flex items-center gap-1">
              <PanelTop className="h-4 w-4" />
              <span>Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="360" className="flex items-center gap-1">
              <RotateCw className="h-4 w-4" />
              <span>360° View</span>
            </TabsTrigger>
            <TabsTrigger value="interior" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Interior</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Image Gallery */}
      <div className="relative mb-4">
        {viewMode === 'gallery' && (
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
        )}
        
        {/* 360° View */}
        {viewMode === '360' && (
          <div className="relative">
            <div className="h-[400px] w-full overflow-hidden rounded-md relative">
              <img 
                src={view360Angles[currentImageIndex]} 
                alt={`${vehicleName} - 360° View`} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button variant="outline" size="icon" className="bg-white/80" onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? view360Angles.length - 1 : prev - 1))}>
                  <RotateCcw className="h-6 w-6" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/80" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % view360Angles.length)}>
                  <RotateCw className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  Drag to rotate | {currentImageIndex + 1} / {view360Angles.length}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <input
                type="range"
                min="0"
                max={view360Angles.length - 1}
                value={currentImageIndex}
                onChange={(e) => setCurrentImageIndex(Number(e.target.value))}
                className="w-full max-w-md"
              />
            </div>
          </div>
        )}
        
        {/* Interior View */}
        {viewMode === 'interior' && (
          <Carousel className="w-full">
            <CarouselContent>
              {interiorViews.map((photo: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="h-[400px] w-full overflow-hidden rounded-md relative">
                    <img 
                      src={photo} 
                      alt={`${vehicleName} - Interior View ${index + 1}`} 
                      className="h-full w-full object-cover"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full h-16 w-16"
                      onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="mt-2 text-center text-sm font-medium">
                    {index === 0 ? 'Driver View' : index === 1 ? 'Rear Seats' : 'Cargo Area'}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        
        {/* Thumbnails */}
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {vehicle.photos.map((photo: string, index: number) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setViewMode('gallery');
              }}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 transition flex-shrink-0 ${
                currentImageIndex === index && viewMode === 'gallery' ? 'border-primary' : 'border-transparent'
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
        <div className="mt-4 flex flex-wrap gap-2">
          {["Fuel Efficient", "Advanced Safety", "Spacious Interior", "Smooth Ride"].map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleOverview;
