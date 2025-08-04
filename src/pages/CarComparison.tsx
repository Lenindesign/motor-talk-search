import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Star, 
  Zap, 
  Fuel, 
  DollarSign, 
  Calculator,
  Award,
  TrendingUp,
  Shield,
  Sparkles,
  X,
  Plus
} from 'lucide-react';

interface CarSpec {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  price: {
    msrp: number;
    monthlyPayment: number;
  };
  specs: {
    horsepower: number;
    torque: number;
    mpg: {
      city: number;
      highway: number;
      combined: number;
    };
    acceleration: string; // 0-60 mph time
    topSpeed?: number;
    range?: number; // for EVs
    fuelType: 'gasoline' | 'hybrid' | 'electric' | 'diesel';
  };
  motorTrendScore: number;
  ranking: {
    overall: number;
    inClass: number;
    totalInClass: number;
  };
  bodyStyle: string;
  category: string;
}

// Mock data for demonstration
const mockCars: CarSpec[] = [
  {
    id: '1',
    name: '2024 Hyundai Ioniq 5',
    make: 'Hyundai',
    model: 'Ioniq 5',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    price: {
      msrp: 42250,
      monthlyPayment: 589
    },
    specs: {
      horsepower: 225,
      torque: 258,
      mpg: { city: 114, highway: 94, combined: 104 }, // MPGe for EVs
      acceleration: '7.4 sec',
      range: 303,
      fuelType: 'electric'
    },
    motorTrendScore: 8.5,
    ranking: {
      overall: 1,
      inClass: 1,
      totalInClass: 12
    },
    bodyStyle: 'SUV',
    category: 'Electric Compact SUVs'
  },
  {
    id: '2',
    name: '2024 Polestar 2',
    make: 'Polestar',
    model: '2',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    price: {
      msrp: 64800,
      monthlyPayment: 899
    },
    specs: {
      horsepower: 408,
      torque: 487,
      mpg: { city: 92, highway: 85, combined: 88 },
      acceleration: '4.2 sec',
      range: 270,
      fuelType: 'electric'
    },
    motorTrendScore: 7.8,
    ranking: {
      overall: 3,
      inClass: 3,
      totalInClass: 8
    },
    bodyStyle: 'Fastback',
    category: 'Luxury Electric Sedans'
  }
];

const CarComparison: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarSpec[]>([]);
  const [aiInsights, setAiInsights] = useState<string>('');

  useEffect(() => {
    // In a real app, you'd fetch cars based on IDs from searchParams
    const carIds = searchParams.get('cars')?.split(',') || [];
    
    // For demo, use mock data
    setCars(mockCars);
    
    // Generate AI insights
    generateAiInsights(mockCars);
  }, [searchParams]);

  const generateAiInsights = (carsToCompare: CarSpec[]) => {
    if (carsToCompare.length < 2) return;
    
    const insights = `Based on your comparison, the ${carsToCompare[0].name} offers better value with a lower starting price and excellent efficiency, while the ${carsToCompare[1].name} provides superior performance with faster acceleration. Both vehicles excel in their respective categories, with the Ioniq 5 being ideal for families seeking space and efficiency, and the Polestar 2 targeting performance-oriented drivers who want luxury and speed.`;
    
    setAiInsights(insights);
  };

  const removeCar = (carId: string) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    if (updatedCars.length > 0) {
      generateAiInsights(updatedCars);
    }
  };

  const getSpecIcon = (specType: string) => {
    switch (specType) {
      case 'horsepower': return <Zap className="w-4 h-4" />;
      case 'mpg': return <Fuel className="w-4 h-4" />;
      case 'price': return <DollarSign className="w-4 h-4" />;
      case 'payment': return <Calculator className="w-4 h-4" />;
      case 'score': return <Star className="w-4 h-4" />;
      case 'ranking': return <Award className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getBestValue = (cars: CarSpec[], metric: string) => {
    if (cars.length === 0) return null;
    
    switch (metric) {
      case 'price':
        return cars.reduce((min, car) => car.price.msrp < min.price.msrp ? car : min);
      case 'mpg':
        return cars.reduce((max, car) => car.specs.mpg.combined > max.specs.mpg.combined ? car : max);
      case 'horsepower':
        return cars.reduce((max, car) => car.specs.horsepower > max.specs.horsepower ? car : max);
      case 'score':
        return cars.reduce((max, car) => car.motorTrendScore > max.motorTrendScore ? car : max);
      default:
        return null;
    }
  };

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-7">
        <Container className="py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-1 mb-4">No vehicles to compare</h1>
            <Button onClick={() => navigate('/search')}>
              Find Vehicles to Compare
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-7">
      <Container className="py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-neutral-3 hover:text-neutral-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-neutral-1">Vehicle Comparison</h1>
              <p className="text-neutral-3 mt-1">Compare {cars.length} vehicles side by side</p>
            </div>
          </div>
          <Button onClick={() => navigate('/search')} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        {/* AI Insights */}
        {aiInsights && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-blue-900">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed">{aiInsights}</p>
            </CardContent>
          </Card>
        )}

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCar(car.id)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-neutral-1"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {car.bodyStyle}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-neutral-1 mb-1">{car.name}</h3>
                <p className="text-neutral-3 text-sm mb-3">{car.category}</p>
                
                {/* Key Specs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-3">MSRP</span>
                    <span className="font-semibold text-neutral-1">
                      ${car.price.msrp.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-3">Monthly</span>
                    <span className="font-semibold text-neutral-1">
                      ${car.price.monthlyPayment}/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-3">MT Score</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold text-neutral-1">
                        {car.motorTrendScore}/10
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-1">Specification</th>
                    {cars.map((car) => (
                      <th key={car.id} className="text-center py-3 px-4 font-semibold text-neutral-1 min-w-[200px]">
                        {car.make} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('price')}
                      <span className="ml-2 font-medium">MSRP</span>
                    </td>
                    {cars.map((car) => {
                      const bestPrice = getBestValue(cars, 'price');
                      const isBest = bestPrice?.id === car.id;
                      return (
                        <td key={car.id} className="py-3 px-4 text-center">
                          <div className={`font-semibold ${isBest ? 'text-green-600' : 'text-neutral-1'}`}>
                            ${car.price.msrp.toLocaleString()}
                            {isBest && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">Best Value</Badge>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Monthly Payment */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('payment')}
                      <span className="ml-2 font-medium">Est. Monthly Payment</span>
                    </td>
                    {cars.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center">
                        <span className="font-semibold text-neutral-1">
                          ${car.price.monthlyPayment}/mo
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Motor Trend Score */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('score')}
                      <span className="ml-2 font-medium">Motor Trend Score</span>
                    </td>
                    {cars.map((car) => {
                      const bestScore = getBestValue(cars, 'score');
                      const isBest = bestScore?.id === car.id;
                      return (
                        <td key={car.id} className="py-3 px-4 text-center">
                          <div className={`font-semibold ${isBest ? 'text-green-600' : 'text-neutral-1'}`}>
                            {car.motorTrendScore}/10
                            {isBest && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">Highest Rated</Badge>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Horsepower */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('horsepower')}
                      <span className="ml-2 font-medium">Horsepower</span>
                    </td>
                    {cars.map((car) => {
                      const bestHP = getBestValue(cars, 'horsepower');
                      const isBest = bestHP?.id === car.id;
                      return (
                        <td key={car.id} className="py-3 px-4 text-center">
                          <div className={`font-semibold ${isBest ? 'text-green-600' : 'text-neutral-1'}`}>
                            {car.specs.horsepower} hp
                            {isBest && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">Most Powerful</Badge>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* MPG/Efficiency */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('mpg')}
                      <span className="ml-2 font-medium">Efficiency (Combined)</span>
                    </td>
                    {cars.map((car) => {
                      const bestMPG = getBestValue(cars, 'mpg');
                      const isBest = bestMPG?.id === car.id;
                      const unit = car.specs.fuelType === 'electric' ? 'MPGe' : 'MPG';
                      return (
                        <td key={car.id} className="py-3 px-4 text-center">
                          <div className={`font-semibold ${isBest ? 'text-green-600' : 'text-neutral-1'}`}>
                            {car.specs.mpg.combined} {unit}
                            {isBest && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">Most Efficient</Badge>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* 0-60 Time */}
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      <TrendingUp className="w-4 h-4" />
                      <span className="ml-2 font-medium">0-60 mph</span>
                    </td>
                    {cars.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center">
                        <span className="font-semibold text-neutral-1">
                          {car.specs.acceleration}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Range (for EVs) */}
                  {cars.some(car => car.specs.range) && (
                    <tr className="border-b hover:bg-neutral-6">
                      <td className="py-3 px-4 flex items-center">
                        <Shield className="w-4 h-4" />
                        <span className="ml-2 font-medium">Range</span>
                      </td>
                      {cars.map((car) => (
                        <td key={car.id} className="py-3 px-4 text-center">
                          <span className="font-semibold text-neutral-1">
                            {car.specs.range ? `${car.specs.range} mi` : 'N/A'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  )}

                  {/* Class Ranking */}
                  <tr className="hover:bg-neutral-6">
                    <td className="py-3 px-4 flex items-center">
                      {getSpecIcon('ranking')}
                      <span className="ml-2 font-medium">Class Ranking</span>
                    </td>
                    {cars.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center">
                        <span className="font-semibold text-neutral-1">
                          #{car.ranking.inClass} of {car.ranking.totalInClass}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={() => navigate('/search')}>
            <Plus className="w-4 h-4 mr-2" />
            Add More Vehicles
          </Button>
          <Button>
            Save Comparison
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CarComparison;