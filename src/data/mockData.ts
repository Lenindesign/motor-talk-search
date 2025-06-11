import { Car } from '../types/car';

export const mockNewCars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    bodyStyle: 'Sedan',
    trim: 'XSE',
    price: 35000,
    image: '/images/cars/toyota-camry.jpg'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    bodyStyle: 'SUV',
    trim: 'Touring',
    price: 38000,
    image: '/images/cars/honda-crv.jpg'
  }
];
