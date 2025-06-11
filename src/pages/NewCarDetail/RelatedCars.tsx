import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedCar {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  date: string;
}

interface RelatedCarsProps {
  cars: RelatedCar[];
}

export const RelatedCars: React.FC<RelatedCarsProps> = ({ cars }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="typography-title text-neutral-1">Other Cars You Should Research</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cars.map((car) => (
            <Link 
              key={car.id}
              to={`/cars/${car.id}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-24 h-16 overflow-hidden rounded-md flex-shrink-0">
                <img 
                  src={car.imageUrl} 
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div>
                <h3 className="typography-body-large text-neutral-1 group-hover:text-motortrend-red transition-colors duration-200">
                  {car.title}
                </h3>
                <p className="typography-caption text-neutral-3">
                  {car.author} | {car.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
