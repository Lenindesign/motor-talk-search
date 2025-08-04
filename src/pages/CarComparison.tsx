import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Container } from '@/components/ui/container';
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
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6740c7c6bcb30700085b0217/2024-hyundai-ioniq-6-se-long-range-yearlong-review-update-1-5-a.jpg',
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
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/659f1978d022910008f126f7/2024-polestar-2-4.png',
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-1 mb-4">No vehicles to compare</h1>
            <Button onClick={() => navigate('/search')}>
              Find Vehicles to Compare
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-7">
      <div className="max-w-7xl mx-auto px-4 py-8">
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
          <Card className="mb-8 border-gray-200 bg-white">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="flex items-center text-gray-900 text-xl">
                <Sparkles className="w-5 h-5 mr-2 text-red-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Summary Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  The {cars[0]?.name} excels in value and efficiency, while the {cars[1]?.name} stands out for performance and luxury features.
                </p>
              </div>

              {/* Overview Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span> – A practical electric SUV with excellent efficiency ratings and spacious interior.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <span className="font-medium text-blue-600 underline cursor-pointer">{cars[1]?.name}</span> – A stylish electric fastback with advanced tech and a sporty driving experience.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Comparison Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Comparison</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{cars[0]?.make} {cars[0]?.model} - Practicality with spacious interior</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{cars[1]?.make} {cars[1]?.model} - High-tech features and modern design</span>
                  </li>
                </ul>
              </div>

              {/* Best For Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Best For</h3>
                <div className="space-y-1 text-sm">
                  <div><span className="text-gray-600">Best Overall Value:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                  <div><span className="text-gray-600">Best Fuel Efficiency:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                  <div><span className="text-gray-600">Most Reliable:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                  <div><span className="text-gray-600">Best Safety Features:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                  <div><span className="text-gray-600">Performance:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[1]?.name}</span></div>
                  <div><span className="text-gray-600">Most Comfortable:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                  <div><span className="text-gray-600">Best for Tech:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[1]?.name}</span></div>
                  <div><span className="text-gray-600">Best Resale Value:</span> <span className="font-medium text-blue-600 underline cursor-pointer">{cars[0]?.name}</span></div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-xs text-gray-500 mb-6 border-t border-gray-100 pt-4">
                AI Insights are powered by our own editorial expertise, vehicle testing data and car ratings.
              </div>

              {/* Interactive Chat Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  Still have questions? I can help! Ask me anything about the {cars[0]?.name} vs {cars[1]?.name}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about cars..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white px-4">
                    <span className="text-white">▶</span>
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Powered by OpenAI. Chats are recorded and used for moderation, user safety, and to operate and improve our services. By using chat, you agree to this use of data. The chatbot can make mistakes. Please verify important information. Give us your{' '}
                  <span className="text-blue-600 underline cursor-pointer">Feedback</span>
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default CarComparison;