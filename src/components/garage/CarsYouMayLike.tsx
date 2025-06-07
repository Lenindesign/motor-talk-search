import React from "react";
import CarCard, { CarData } from "../CarCard";

// Enhanced new cars with complete specs
const newCars: CarData[] = [{
  id: "new-1",
  title: "2025 Honda Accord",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg",
  price: "$29,500",
  msrp: "$29,500",
  category: "Sedan",
  year: "2025",
  isNew: true,
  fuelType: "Gasoline",
  mpg: "30 city / 38 hwy",
  engine: "1.5L Turbo 4-cylinder",
  horsepower: "192 hp",
  transmission: "CVT",
  motorTrendScore: "8.8",
  motorTrendRank: "2",
  motorTrendCategoryRank: true
}, {
  id: "new2",
  title: "2025 Toyota RAV4",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67085deec30a8c000841b88a/1-2025-toyota-rav4-front-view.jpg",
  price: "$31,200",
  msrp: "$36,446",
  category: "SUV",
  year: "2025",
  isNew: true,
  fuelType: "Gasoline",
  mpg: "28 city / 36 hwy",
  engine: "2.0L 4-cylinder",
  horsepower: "200 hp",
  transmission: "8-speed automatic",
  motorTrendScore: "8.1",
  motorTrendRank: "9",
  motorTrendCategoryRank: true
}, {
  id: "new3",
  title: "2025 Ford F-150",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/675b76362025cd0008d6d19e/007-2025-ford-f-150-raptor.jpg",
  price: "$41,000",
  msrp: "$41,000",
  category: "Truck",
  year: "2025",
  isNew: true,
  fuelType: "Gasoline",
  mpg: "20 city / 25 hwy",
  engine: "3.5L V6 EcoBoost",
  horsepower: "400 hp",
  transmission: "10-speed automatic",
  motorTrendScore: "8.5",
  motorTrendRank: "1",
  motorTrendCategoryRank: true
}];

// Enhanced used cars with appropriate specs
const usedCars: CarData[] = [{
  id: "used-1",
  title: "2022 Tesla Model 3",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ed591fb4e70008536b0a/2022-tesla-model-y-dual-motor-performance-12.jpg",
  price: "$37,900",
  msrp: "$46,990",
  category: "EV",
  year: "2022",
  isNew: false,
  fuelType: "Electric",
  range: "358 miles",
  mpge: "132 MPGe",
  horsepower: "283 hp",
  transmission: "Single-speed",
  mileage: "24,500 miles"
}, {
  id: "used2",
  title: "2021 Jeep Wrangler",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c80a5bf9293d0008e6af89/2021-jeep-wrangler-high-altitude-1.jpg",
  price: "$34,300",
  msrp: "$40,795",
  category: "SUV",
  year: "2021",
  isNew: false,
  fuelType: "Gasoline",
  mpg: "17 city / 25 hwy",
  engine: "3.6L V6",
  horsepower: "285 hp",
  transmission: "8-speed automatic",
  mileage: "32,450 miles",
  drivetrain: "4WD"
}, {
  id: "used3",
  title: "2020 BMW 3 Series",
  imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c27f411d18020008241114/2020-bmw-2-series-gran-coupe-m240i-in-snapper-rocks-blue-3.jpg",
  price: "$29,750",
  msrp: "$41,250",
  category: "Sedan",
  year: "2020",
  isNew: false,
  fuelType: "Gasoline",
  mpg: "26 city / 36 hwy",
  engine: "2.0L Turbo 4-cylinder",
  horsepower: "255 hp",
  transmission: "8-speed automatic",
  mileage: "38,750 miles",
  drivetrain: "RWD"
}];
const CarsYouMayLike: React.FC = () => {
  return <div className="mt-8">
      <h2 className="typography-title mb-4">Cars You May Like</h2>
      <div className="mb-6">
        <h3 className="typography-subtitle mb-2">New Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {newCars.map(car => <CarCard key={car.id} car={car} type="new" />)}
        </div>
      </div>
      <div>
        <h3 className="typography-subtitle mb-2">Used Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {usedCars.map(car => <CarCard key={car.id} car={car} type="used" />)}
        </div>
      </div>
    </div>;
};
export default CarsYouMayLike;