
import React, { useState } from 'react';
import { Gauge, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SpecificationsProps {
  vehicle: any;
}

const Specifications: React.FC<SpecificationsProps> = ({ vehicle }) => {
  const [activeSection, setActiveSection] = useState('engine');
  
  // Format engine specs
  const engineSpecs = [
    { label: 'Engine Type', value: vehicle.specs.engine },
    { label: 'Horsepower', value: `${vehicle.specs.horsepower} hp` },
    { label: 'Torque', value: `${vehicle.specs.torque} lb-ft` },
    { label: 'Transmission', value: vehicle.specs.transmission },
    { label: 'Acceleration (0-60)', value: `${vehicle.specs.acceleration} seconds` },
    { label: 'Drivetrain', value: vehicle.specs.drivetrains.join(', ') },
    { label: 'Fuel Type', value: vehicle.specs.fuel },
    { label: 'MPG (City/Hwy/Combined)', value: `${vehicle.specs.mpg.city}/${vehicle.specs.mpg.highway}/${vehicle.specs.mpg.combined}` },
  ];
  
  // Format interior specs
  const interiorSpecs = [
    { label: 'Seating Capacity', value: vehicle.specs.seating },
    { label: 'Cargo Volume', value: `${vehicle.specs.dimensions.cargo} ft³` },
    { label: 'Interior Volume', value: `${vehicle.specs.dimensions.cargo + 100} ft³` },
    { label: 'Front Legroom', value: '42.3 in' },
    { label: 'Rear Legroom', value: '40.4 in' },
    { label: 'Front Headroom', value: '39.5 in' },
    { label: 'Rear Headroom', value: '37.2 in' },
  ];
  
  // Format exterior specs
  const exteriorSpecs = [
    { label: 'Length', value: `${vehicle.specs.dimensions.length} in` },
    { label: 'Width', value: `${vehicle.specs.dimensions.width} in` },
    { label: 'Height', value: `${vehicle.specs.dimensions.height} in` },
    { label: 'Wheelbase', value: `${vehicle.specs.dimensions.wheelbase} in` },
    { label: 'Curb Weight', value: `${vehicle.specs.dimensions.weight} lbs` },
    { label: 'Ground Clearance', value: '5.7 in' },
  ];
  
  // Format safety specs
  const safetySpecs = [
    { label: 'NHTSA Overall Rating', value: '5 stars' },
    { label: 'NHTSA Frontal Crash', value: '5 stars' },
    { label: 'NHTSA Side Crash', value: '5 stars' },
    { label: 'NHTSA Rollover', value: '5 stars' },
    { label: 'IIHS Small Overlap Front', value: 'Good' },
    { label: 'IIHS Moderate Overlap Front', value: 'Good' },
    { label: 'IIHS Side Impact', value: 'Good' },
    { label: 'IIHS Roof Strength', value: 'Good' },
  ];
  
  // Format warranty specs
  const warrantySpecs = [
    { label: 'Basic', value: vehicle.ownership.warranty.basic },
    { label: 'Powertrain', value: vehicle.ownership.warranty.powertrain },
    { label: 'Hybrid Components', value: vehicle.ownership.warranty.hybrid },
    { label: 'Roadside Assistance', value: '3 years / 36,000 miles' },
    { label: 'Corrosion', value: '5 years / Unlimited miles' },
  ];
  
  // Get current specs to display
  const getCurrentSpecs = () => {
    switch(activeSection) {
      case 'engine':
        return engineSpecs;
      case 'interior':
        return interiorSpecs;
      case 'exterior':
        return exteriorSpecs;
      case 'safety':
        return safetySpecs;
      case 'warranty':
        return warrantySpecs;
      default:
        return engineSpecs;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="engine">Engine & Performance</TabsTrigger>
            <TabsTrigger value="interior">Interior</TabsTrigger>
            <TabsTrigger value="exterior">Exterior</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeSection} className="mt-0 w-full">
            <div className="rounded-lg bg-gray-50 p-4">
              <table className="w-full">
                <tbody>
                  {getCurrentSpecs().map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-2 pl-3 text-sm font-medium">{spec.label}</td>
                      <td className="py-2 pr-3 text-right text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {activeSection === 'engine' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium">Standard Features</h3>
                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {vehicle.features.standard.slice(0, 8).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm">
                      <ArrowRight size={16} className="mr-1 mt-0.5 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <h3 className="mt-4 text-sm font-medium">Optional Features</h3>
                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  {vehicle.features.optional.slice(0, 6).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm">
                      <ArrowRight size={16} className="mr-1 mt-0.5 text-gray-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Specifications;
