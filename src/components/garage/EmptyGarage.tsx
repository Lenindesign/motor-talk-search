
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "lucide-react";
import CarSelector from "../CarSelector";

interface EmptyGarageProps {
  onAddCar: (carSelection: { makeId: string | null, modelId: string | null, year: number | null }, ownership: 'owned' | 'interested' | 'testDriven') => void;
  noMatchingCars?: boolean;
  activeTab?: string;
}

const EmptyGarage: React.FC<EmptyGarageProps> = ({ 
  onAddCar, 
  noMatchingCars = false,
  activeTab = 'all'
}) => {
  const [carSelection, setCarSelection] = useState<{makeId: string | null, modelId: string | null, year: number | null}>({
    makeId: null, modelId: null, year: null
  });
  const [newCarOwnership, setNewCarOwnership] = useState<'owned' | 'interested' | 'testDriven'>('interested');

  const handleAddCar = () => {
    onAddCar(carSelection, newCarOwnership);
  };

  return (
    <div className="text-center py-6 animate-fade-in">
      <Car size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        {noMatchingCars 
          ? `No ${activeTab !== 'all' ? activeTab : ''} cars found`
          : "Your garage is empty"}
      </h3>
      
      <Card className="max-w-md mx-auto mt-6 bg-gray-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-lg">Add a car to your garage</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="interested" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger 
                value="owned" 
                onClick={() => setNewCarOwnership('owned')}
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                Owned
              </TabsTrigger>
              <TabsTrigger 
                value="testDriven" 
                onClick={() => setNewCarOwnership('testDriven')}
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
              >
                Test Driven
              </TabsTrigger>
              <TabsTrigger 
                value="interested" 
                onClick={() => setNewCarOwnership('interested')}
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Interested
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <CarSelector onSelectionChange={setCarSelection} />
              <Button 
                onClick={handleAddCar} 
                className="w-full mt-4 transition-transform hover:scale-105"
              >
                Add to Garage
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyGarage;
