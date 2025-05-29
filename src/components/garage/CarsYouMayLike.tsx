import React from "react";
import CarCard, { CarData } from "../CarCard";

const newCars: CarData[] = [
  {
    id: "new1",
    title: "2025 Honda Accord",
    imageUrl: "/lovable-uploads/honda-accord-2025.jpg",
    price: "$29,500",
    category: "Sedan",
    year: "2025",
    isNew: true,
  },
  {
    id: "new2",
    title: "2025 Toyota RAV4",
    imageUrl: "/lovable-uploads/toyota-rav4-2025.jpg",
    price: "$31,200",
    category: "SUV",
    year: "2025",
    isNew: true,
  },
  {
    id: "new3",
    title: "2025 Ford F-150",
    imageUrl: "/lovable-uploads/ford-f150-2025.jpg",
    price: "$41,000",
    category: "Truck",
    year: "2025",
    isNew: true,
  },
];

const usedCars: CarData[] = [
  {
    id: "used1",
    title: "2022 Tesla Model 3",
    imageUrl: "/lovable-uploads/tesla-model3-2022.jpg",
    price: "$37,900",
    category: "EV",
    year: "2022",
    isNew: false,
  },
  {
    id: "used2",
    title: "2021 Jeep Wrangler",
    imageUrl: "/lovable-uploads/jeep-wrangler-2021.jpg",
    price: "$34,300",
    category: "SUV",
    year: "2021",
    isNew: false,
  },
  {
    id: "used3",
    title: "2020 BMW 3 Series",
    imageUrl: "/lovable-uploads/bmw-3series-2020.jpg",
    price: "$29,750",
    category: "Sedan",
    year: "2020",
    isNew: false,
  },
];

const CarsYouMayLike: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Cars You May Like</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">New Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {newCars.map(car => (
            <CarCard key={car.id} car={car} type="new" />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Used Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {usedCars.map(car => (
            <CarCard key={car.id} car={car} type="used" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsYouMayLike;
