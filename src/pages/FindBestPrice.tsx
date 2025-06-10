import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import { mockNewCars } from '@/services/mockData';

interface Car {
  id: string;
  title: string;
  year?: string;
  make?: string;
  model?: string;
  price: string;
  imageUrl: string;
  fallbackImageUrl?: string;
}

interface PriceRequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  contactPreference: 'email' | 'phone' | 'text';
  timeframe: 'immediately' | '1-3months' | '3-6months' | 'researching';
}

const FindBestPrice = () => {
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const [step, setStep] = useState(1);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PriceRequestFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    contactPreference: 'email',
    timeframe: 'immediately'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (carId) {
      const fetchCarData = async () => {
        try {
          setLoading(true);
          
          console.log('Looking for carId:', carId);
          
          // First, try to find the car by ID in our mock data
          let foundCar = mockNewCars.find(car => car.id === carId);
          console.log('Direct ID match found:', foundCar?.title || 'none');
          
          // If not found by ID, try to match by generated URL pattern
          if (!foundCar) {
            console.log('Trying URL pattern matching...');
            foundCar = mockNewCars.find(car => {
              // CarSidebar generates URLs like: "2025 Rivian R1S" -> "2025-rivian-r1s-2025"
              const urlPattern = `${car.title.toLowerCase().replace(/ /g, '-')}-${car.year || '2025'}`;
              console.log(`Checking ${car.title} -> pattern: ${urlPattern} vs carId: ${carId}`);
              return carId === urlPattern;
            });
            console.log('URL pattern match found:', foundCar?.title || 'none');
          }
          
          if (foundCar) {
            // Convert our mock car data to the Car interface format
            const carData: Car = {
              id: foundCar.id,
              title: foundCar.title,
              year: '2025',
              make: foundCar.title.split(' ')[1] || '', // Extract make from title
              model: foundCar.title.split(' ').slice(2).join(' ') || '', // Extract model from title
              price: foundCar.price,
              imageUrl: foundCar.imageUrl || '/images/cars/placeholder.jpg',
              fallbackImageUrl: '/images/cars/placeholder.jpg'
            };
            
            console.log('Setting car data:', carData);
            setCar(carData);
          } else {
            console.warn('Car not found for carId:', carId);
            console.log('Available cars:', mockNewCars.map(car => ({ id: car.id, title: car.title })));
          }
        } catch (error) {
          console.error('Error fetching car data:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCarData();
    }
  }, [carId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log('Form submitted:', formData);
    // Navigate to success page
    navigate('/find-best-price/success');
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-[980px] mx-auto px-4">
          {car && (
            <div className="mb-8 bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-7">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src={car.imageUrl} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = car.fallbackImageUrl || '/images/cars/placeholder.jpg';
                    }}
                    alt={car.title} 
                    className="w-full h-48 md:h-full object-cover" 
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="typography-title text-neutral-1 mb-2">{car.year} {car.title}</h2>
                  <p className="typography-body-large text-neutral-2 mb-4">Get your best price on this {car.make} {car.model}</p>
                  <div className="typography-body text-neutral-3">
                    <p>Fill out the form below to connect with certified dealers in your area.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="max-w-2xl mx-auto">
            {step === 1 && (
              <Card className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-neutral-1 mb-6">
                  Get Your Best Price
                </h1>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 w-32"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPreference">Preferred Contact Method</Label>
                    <select
                      id="contactPreference"
                      name="contactPreference"
                      value={formData.contactPreference}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border border-neutral-6 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timeframe">When are you looking to purchase?</Label>
                    <select
                      id="timeframe"
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleInputChange}
                      className="mt-1 w-full rounded-md border border-neutral-6 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-motortrend-red focus:border-transparent"
                    >
                      <option value="immediately">As soon as possible</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="researching">Just researching</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={() => setStep(2)}
                      className="w-full bg-motortrend-red hover:bg-motortrend-red/90"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-neutral-1 mb-6">
                  Confirm Your Information
                </h1>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-neutral-3">First Name</div>
                      <div className="font-medium">{formData.firstName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-3">Last Name</div>
                      <div className="font-medium">{formData.lastName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-3">Email</div>
                      <div className="font-medium">{formData.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-3">Phone</div>
                      <div className="font-medium">{formData.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-3">ZIP Code</div>
                      <div className="font-medium">{formData.zipCode}</div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-3">Contact Preference</div>
                      <div className="font-medium capitalize">{formData.contactPreference}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-neutral-3">Purchase Timeframe</div>
                      <div className="font-medium">
                        {formData.timeframe === 'immediately' ? 'As soon as possible' :
                         formData.timeframe === '1-3months' ? '1-3 months' :
                         formData.timeframe === '3-6months' ? '3-6 months' :
                         'Just researching'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button 
                      onClick={handleSubmit}
                      className="w-full bg-motortrend-red hover:bg-motortrend-red/90"
                    >
                      Submit Request
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      Back to Edit
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FindBestPrice;
