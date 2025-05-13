
import React, { useMemo } from "react";
import CarReviews from "../reviews/CarReviews";
import { useSavedItems } from "@/contexts/SavedItemsContext";
import { UserReviewProps } from "../reviews/UserReview";

// Mock reviews data - in a real app this would come from an API
const mockReviews: UserReviewProps[] = [
  {
    id: "1",
    userName: "Sarah J.",
    userAvatar: "/lovable-uploads/930641e7-042c-4f43-a9f6-c81fa3a9a0c4.png",
    rating: 4.5,
    title: "Great daily driver with excellent fuel economy",
    content: "I've owned this car for about 6 months now and I'm very impressed with the fuel economy and comfort. The tech features are intuitive and work well. My only complaint is the road noise on the highway.",
    date: "2025-04-15T10:30:00Z",
    helpfulCount: 12,
    carId: "honda-civic-2025",
    carMake: "Honda",
    carModel: "Civic",
    carYear: "2025"
  },
  {
    id: "2",
    userName: "Michael T.",
    userAvatar: "/lovable-uploads/35ad1cf0-8807-4008-be7c-96fc7b43062b.png",
    rating: 5,
    title: "Performance beyond expectations",
    content: "The handling is exceptional and the acceleration is impressive for this class. Interior quality has improved dramatically over previous models. Definitely recommend the sport trim package.",
    date: "2025-04-02T14:22:00Z",
    helpfulCount: 8,
    carId: "honda-civic-2025",
    carMake: "Honda",
    carModel: "Civic",
    carYear: "2025"
  },
  {
    id: "3",
    userName: "Alex R.",
    rating: 3.5,
    title: "Mixed feelings about this EV",
    content: "The range is great for an EV in this price range, but I've had issues with the charging network. The interior tech is fantastic though and the acceleration is instant.",
    date: "2025-03-18T09:15:00Z",
    helpfulCount: 5,
    carId: "tesla-model3-2025",
    carMake: "Tesla",
    carModel: "Model 3",
    carYear: "2025"
  },
  {
    id: "4",
    userName: "Chris P.",
    rating: 4,
    title: "Solid luxury vehicle with minor flaws",
    content: "The ride quality is exceptional and the interior materials are top-notch. My only complaints are the somewhat confusing infotainment system and the fuel economy could be better.",
    date: "2025-02-28T16:40:00Z",
    helpfulCount: 3,
    carId: "bmw-3series-2025",
    carMake: "BMW",
    carModel: "3 Series",
    carYear: "2025"
  }
];

const UserReviews = () => {
  const { savedItems } = useSavedItems();
  
  // Filter car items only
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar');
  
  // Group reviews by car
  const reviewsByCarId = useMemo(() => {
    const groupedReviews: Record<string, UserReviewProps[]> = {};
    
    mockReviews.forEach(review => {
      if (!groupedReviews[review.carId]) {
        groupedReviews[review.carId] = [];
      }
      groupedReviews[review.carId].push(review);
    });
    
    return groupedReviews;
  }, []);
  
  // Find saved cars that have reviews
  const carsWithReviews = useMemo(() => {
    return savedCars.filter(car => {
      // Create a simplified ID from car title
      const simplifiedTitle = car.title.toLowerCase().replace(/\s+/g, '-');
      
      // Check if we have reviews for this car by checking multiple possible IDs
      const possibleIds = [
        simplifiedTitle,
        `${car.metadata?.year}-${car.title.toLowerCase().replace(/\s+/g, '-')}`,
        `${car.metadata?.year?.toLowerCase()}-${car.metadata?.make?.toLowerCase()}-${car.metadata?.model?.toLowerCase()}`,
      ];
      
      // Return true if any of the possible IDs match a car with reviews
      return possibleIds.some(id => reviewsByCarId[id]?.length > 0);
    });
  }, [savedCars, reviewsByCarId]);

  // Helper function to get reviews for a car
  const getReviewsForCar = (car: any) => {
    // Try various possible IDs to match this car with reviews
    const simplifiedTitle = car.title.toLowerCase().replace(/\s+/g, '-');
    const possibleIds = [
      simplifiedTitle,
      `${car.metadata?.make?.toLowerCase()}-${car.metadata?.model?.toLowerCase()}-${car.metadata?.year}`,
      `${car.metadata?.year?.toLowerCase()}-${car.metadata?.make?.toLowerCase()}-${car.metadata?.model?.toLowerCase()}`,
    ];
    
    // Return the first set of reviews we find, or empty array
    for (const id of possibleIds) {
      if (reviewsByCarId[id]) return reviewsByCarId[id];
    }
    
    // If no matches, try matching by just the car make and model in the title
    const carMakes = ["Honda", "Toyota", "Ford", "Chevrolet", "BMW", "Mercedes", "Tesla"];
    const carModels = ["Civic", "Accord", "Camry", "F-150", "Model 3", "3 Series"];
    
    for (const make of carMakes) {
      for (const model of carModels) {
        if (car.title.includes(make) && car.title.includes(model)) {
          const key = `${make.toLowerCase()}-${model.toLowerCase()}`.replace(/\s+/g, '-');
          if (reviewsByCarId[key]) return reviewsByCarId[key];
        }
      }
    }
    
    // As a fallback, if the title contains "civic" for example, try to match with honda-civic
    for (const model of carModels) {
      if (car.title.toLowerCase().includes(model.toLowerCase())) {
        const possibleMakes = carMakes.filter(make => 
          mockReviews.some(review => 
            review.carModel.toLowerCase() === model.toLowerCase() && 
            review.carMake.toLowerCase() === make.toLowerCase()
          )
        );
        
        for (const make of possibleMakes) {
          const key = `${make.toLowerCase()}-${model.toLowerCase()}`.replace(/\s+/g, '-');
          if (reviewsByCarId[key]) return reviewsByCarId[key];
        }
      }
    }
    
    return [];
  };
  
  if (carsWithReviews.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">User Reviews</h2>
      {carsWithReviews.map(car => (
        <CarReviews 
          key={car.id} 
          carId={car.id} 
          carName={car.title}
          reviews={getReviewsForCar(car)}
        />
      ))}
    </div>
  );
};

export default UserReviews;
