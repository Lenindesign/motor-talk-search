import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Star, 
  Zap, 
  Fuel, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  Table,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';
import ComparisonWidget from '@/components/ComparisonWidget';

interface VehicleComparisonData {
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
    acceleration: string;
    fuelType: string;
  };
  motorTrendScore: number;
  ranking: {
    overall: number;
    inClass: number;
    totalInClass: number;
  };
  bodyStyle: string;
  category: string;
  pros: string[];
  cons: string[];
}

interface ImprovedClassComparisonProps {
  vehicle: any;
  detailed?: boolean;
}

// Mock competitors data - in real app this would come from API
const getCompetitors = (vehicle: any): VehicleComparisonData[] => {
  const baseVehicle: VehicleComparisonData = {
    id: vehicle.id || '1',
    name: vehicle.name || `${vehicle.year || 2024} ${vehicle.make || 'Current'} ${vehicle.model || 'Vehicle'}`,
    make: vehicle.make || 'Current',
    model: vehicle.model || 'Vehicle',
    year: vehicle.year || 2024,
    imageUrl: vehicle.imageUrl || 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    price: {
      msrp: vehicle.price?.msrp || 45000,
      monthlyPayment: vehicle.price?.monthlyPayment || 625
    },
    specs: {
      horsepower: vehicle.specs?.horsepower || 250,
      torque: vehicle.specs?.torque || 280,
      mpg: {
        city: vehicle.specs?.mpg?.city || 28,
        highway: vehicle.specs?.mpg?.highway || 35,
        combined: vehicle.specs?.mpg?.combined || 31
      },
      acceleration: vehicle.specs?.acceleration || '6.5 sec',
      fuelType: vehicle.specs?.fuelType || 'gasoline'
    },
    motorTrendScore: vehicle.motorTrendScore || 8.2,
    ranking: {
      overall: vehicle.ranking?.overall || 2,
      inClass: vehicle.ranking?.inClass || 2,
      totalInClass: vehicle.ranking?.totalInClass || 8
    },
    bodyStyle: vehicle.bodyStyle || 'SUV',
    category: vehicle.category || 'Compact SUVs',
    pros: vehicle.pros || ['Great value', 'Reliable', 'Good features'],
    cons: vehicle.cons || ['Road noise', 'Interior materials']
  };

  const competitors: VehicleComparisonData[] = [
    baseVehicle,
    {
      id: '2',
      name: '2024 Toyota RAV4',
      make: 'Toyota',
      model: 'RAV4',
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      price: {
        msrp: 38000,
        monthlyPayment: 529
      },
      specs: {
        horsepower: 203,
        torque: 184,
        mpg: {
          city: 27,
          highway: 35,
          combined: 30
        },
        acceleration: '8.1 sec',
        fuelType: 'gasoline'
      },
      motorTrendScore: 7.8,
      ranking: {
        overall: 3,
        inClass: 3,
        totalInClass: 8
      },
      bodyStyle: 'SUV',
      category: 'Compact SUVs',
      pros: ['Reliability', 'Resale value', 'All-wheel drive standard'],
      cons: ['Road noise', 'CVT transmission', 'Interior space']
    },
    {
      id: '3',
      name: '2024 Honda CR-V',
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      price: {
        msrp: 40000,
        monthlyPayment: 558
      },
      specs: {
        horsepower: 190,
        torque: 179,
        mpg: {
          city: 28,
          highway: 34,
          combined: 31
        },
        acceleration: '8.8 sec',
        fuelType: 'gasoline'
      },
      motorTrendScore: 8.0,
      ranking: {
        overall: 1,
        inClass: 1,
        totalInClass: 8
      },
      bodyStyle: 'SUV',
      category: 'Compact SUVs',
      pros: ['Spacious interior', 'Good fuel economy', 'Strong reputation'],
      cons: ['Engine noise', 'Firm ride', 'Touch controls']
    }
  ];

  return competitors;
};

const ImprovedClassComparison: React.FC<ImprovedClassComparisonProps> = ({ 
  vehicle, 
  detailed = false 
}) => {
  const [viewMode, setViewMode] = useState<'widget' | 'detailed'>('widget');
  const competitors = getCompetitors(vehicle);
  
  // Convert to ComparisonWidget format
  const comparisonCars = competitors.map(car => ({
    id: car.id,
    name: car.name,
    imageUrl: car.imageUrl,
    price: car.price.msrp,
    monthlyPayment: car.price.monthlyPayment,
    horsepower: car.specs.horsepower,
    mpg: car.specs.mpg.combined,
    mpgUnit: car.specs.fuelType === 'electric' ? 'MPGe' : 'MPG',
    acceleration: car.specs.acceleration,
    motorTrendScore: car.motorTrendScore,
    bodyStyle: car.bodyStyle,
    isWinner: car.ranking.inClass === 1
  }));

  const aiInsight = `Based on current market analysis, the ${competitors[0].name} ranks #${competitors[0].ranking.inClass} in its class. Compared to top competitors, it offers ${competitors[0].specs.horsepower > 200 ? 'strong performance' : 'adequate power'} with competitive fuel economy. The ${competitors.find(c => c.ranking.inClass === 1)?.name || 'class leader'} currently leads with the best overall package of performance, efficiency, and value.`;

  if (!detailed && viewMode === 'widget') {
    return (
      <ComparisonWidget
        cars={comparisonCars.slice(0, 3)}
        title={`${competitors[0].category} Comparison`}
        aiInsight={aiInsight}
        onViewFullComparison={() => setViewMode('detailed')}
        className="w-full"
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            {competitors[0].category} Class Comparison
          </CardTitle>
          {!detailed && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setViewMode('widget')}
            >
              Simple View
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="specs" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Specifications
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center">
              <Table className="w-4 h-4 mr-2" />
              Detailed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Insights */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start">
                <Sparkles className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">AI Analysis</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {aiInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {competitors.map((car, index) => (
                <div key={car.id} className="relative">
                  <div className={`border-2 rounded-lg overflow-hidden ${index === 0 ? 'border-blue-500 bg-blue-50' : 'border-neutral-6'}`}>
                    <div className="relative">
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-white/90">
                          {car.bodyStyle}
                        </Badge>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-600 text-white">
                            Your Car
                          </Badge>
                        </div>
                      )}
                      {car.ranking.inClass === 1 && index !== 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600 text-white">
                            #1 in Class
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-neutral-1 mb-1">
                        {car.name}
                      </h4>
                      <p className="text-neutral-3 text-sm mb-3">
                        Rank #{car.ranking.inClass} of {car.ranking.totalInClass}
                      </p>
                      
                      {/* Key Specs */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-3 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            MSRP
                          </span>
                          <span className="font-semibold text-neutral-1">
                            ${car.price.msrp.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-3 flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            MT Score
                          </span>
                          <span className="font-semibold text-neutral-1">
                            {car.motorTrendScore}/10
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-3 flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            Power
                          </span>
                          <span className="font-semibold text-neutral-1">
                            {car.specs.horsepower} HP
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-3 flex items-center">
                            <Fuel className="w-4 h-4 mr-1" />
                            MPG
                          </span>
                          <span className="font-semibold text-neutral-1">
                            {car.specs.mpg.combined}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-1">Specification</th>
                    {competitors.map((car) => (
                      <th key={car.id} className="text-center py-3 px-4 font-semibold text-neutral-1 min-w-[150px]">
                        {car.make} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 font-medium">MSRP</td>
                    {competitors.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center font-semibold">
                        ${car.price.msrp.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 font-medium">Horsepower</td>
                    {competitors.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center font-semibold">
                        {car.specs.horsepower} HP
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 font-medium">MPG (Combined)</td>
                    {competitors.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center font-semibold">
                        {car.specs.mpg.combined}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-neutral-6">
                    <td className="py-3 px-4 font-medium">0-60 mph</td>
                    {competitors.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center font-semibold">
                        {car.specs.acceleration}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-neutral-6">
                    <td className="py-3 px-4 font-medium">MT Score</td>
                    {competitors.map((car) => (
                      <td key={car.id} className="py-3 px-4 text-center font-semibold">
                        {car.motorTrendScore}/10
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {competitors.map((car, index) => (
              <Card key={car.id} className={index === 0 ? 'border-blue-500' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {index === 0 && (
                        <Badge className="bg-blue-600 text-white">Your Car</Badge>
                      )}
                      <Badge variant="outline">
                        #{car.ranking.inClass} in Class
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-neutral-1 mb-2 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {car.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-1 mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {car.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-red-700 flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ImprovedClassComparison;