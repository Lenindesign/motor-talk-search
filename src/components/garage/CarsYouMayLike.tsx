import React from "react";
import CarCard, { CarData } from "../CarCard";

const newCars: CarData[] = [
  {
    id: "new1",
    title: "2025 Honda Accord",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",
    price: "$29,500",
    category: "Sedan",
    year: "2025",
    isNew: true,
  },
  {
    id: "new2",
    title: "2025 Toyota RAV4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67085deec30a8c000841b88a/1-2025-toyota-rav4-front-view.jpg",
    price: "$31,200",
    category: "SUV",
    year: "2025",
    isNew: true,
  },
  {
    id: "new3",
    title: "2025 Ford F-150",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/675b76362025cd0008d6d19e/007-2025-ford-f-150-raptor.jpg",
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
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ed591fb4e70008536b0a/2022-tesla-model-y-dual-motor-performance-12.jpg",
    price: "$37,900",
    category: "EV",
    year: "2022",
    isNew: false,
  },
  {
    id: "used2",
    title: "2021 Jeep Wrangler",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c80a5bf9293d0008e6af89/2021-jeep-wrangler-high-altitude-1.jpg",
    price: "$34,300",
    category: "SUV",
    year: "2021",
    isNew: false,
  },
  {
    id: "used3",
    title: "2020 BMW 3 Series",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c27f411d18020008241114/2020-bmw-2-series-gran-coupe-m240i-in-snapper-rocks-blue-3.jpg",
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
