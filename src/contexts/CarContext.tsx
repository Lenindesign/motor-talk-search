import React, { createContext, useContext, useState } from 'react';
import { carMakes, CarMake, CarModel } from '../services/carData';

interface CarContextType {
  selectedCar: {
    make: CarMake | null;
    model: CarModel | null;
  };
  setSelectedCar: (car: { make: CarMake | null; model: CarModel | null }) => void;
}

const CarContext = createContext<CarContextType>({
  selectedCar: { make: null, model: null },
  setSelectedCar: () => {},
});

export const useCarContext = () => useContext(CarContext);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('[CarProvider] Initializing...');
  
  const [selectedCar, setSelectedCar] = useState<{ make: CarMake | null; model: CarModel | null }>({
    make: null,
    model: null,
  });

  return (
    <CarContext.Provider value={{ selectedCar, setSelectedCar }}>
      {children}
    </CarContext.Provider>
  );
};
