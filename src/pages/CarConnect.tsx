import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { ArrowLeft, ExternalLink, Phone, Mail } from 'lucide-react';

const CarConnect: React.FC = () => {
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();

  // Default car data for 2025 Lucid Air Grand Touring
  const carData = {
    id: '2025-lucid-air-grand-touring-2025',
    make: 'Lucid',
    model: 'Air',
    trim: 'Grand Touring',
    year: '2025',
    price: '$125,600',
    imageUrl: 'https://images.motortrend.com/izmo-jato/vehicles/2023/lucid/air/sedan/touring/5dr_hb_touring_luxury_pkg/5/2023_lucid_air_angularfront.jpg',
    description: 'The 2025 Lucid Air Grand Touring combines luxury with cutting-edge electric performance. With up to 516 miles of range and 819 horsepower, it redefines what\'s possible in the luxury EV segment.',
    dealers: [
      {
        name: 'Lucid Motors San Francisco',
        address: '340 Grant Ave, San Francisco, CA 94108',
        phone: '(415) 508-4455',
        email: 'sf@lucidmotors.com',
        distance: '12 miles'
      },
      {
        name: 'Lucid Motors Millbrae',
        address: '1 Murchison Dr, Millbrae, CA 94030',
        phone: '(650) 204-7900',
        email: 'millbrae@lucidmotors.com',
        distance: '18 miles'
      },
      {
        name: 'Lucid Motors San Jose',
        address: '2855 Stevens Creek Blvd, Santa Clara, CA 95050',
        phone: '(408) 345-1710',
        email: 'sanjose@lucidmotors.com',
        distance: '42 miles'
      }
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className="py-8">
      <Button 
        variant="ghost" 
        onClick={handleBack} 
        className="mb-6 text-neutral-4 hover:text-motortrend-red"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to car details
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Information Section */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center">
            <img 
              src={carData.imageUrl} 
              alt={`${carData.year} ${carData.make} ${carData.model} ${carData.trim}`}
              className="w-full h-auto rounded-lg mb-4 object-cover"
            />
            <h1 className="typography-title text-center mb-2">
              {carData.year} {carData.make} {carData.model}
            </h1>
            <h2 className="typography-subtitle text-center mb-4 text-neutral-4">
              {carData.trim}
            </h2>
            <div className="typography-body-large font-semibold text-motortrend-red mb-2">
              {carData.price}
            </div>
            <p className="typography-body text-neutral-3 text-center mb-6">
              {carData.description}
            </p>
            <Button className="w-full mb-2">
              Request Best Price
            </Button>
            <Button variant="outline" className="w-full">
              Schedule Test Drive
            </Button>
          </div>
        </Card>

        {/* Dealers Section */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="typography-title mb-6">Dealers Near You</h2>
          <div className="space-y-4">
            {carData.dealers.map((dealer, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="typography-subtitle mb-2">{dealer.name}</h3>
                    <p className="typography-body text-neutral-3 mb-1">{dealer.address}</p>
                    <p className="typography-body-small text-neutral-4 mb-4">{dealer.distance} away</p>
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <Button size="sm" className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Dealer
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Dealer
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button variant="link" className="flex items-center text-motortrend-red p-0">
                      View Inventory
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CarConnect;
