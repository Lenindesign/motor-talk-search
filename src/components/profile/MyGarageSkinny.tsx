import React from "react";
import { Link } from "react-router-dom";
import { Car, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSavedItems } from "@/contexts/SavedItemsContext";
const MyGarageSkinny = () => {
  const {
    savedItems
  } = useSavedItems();

  // Filter car items only
  const savedCars = savedItems.filter(item => item.type === 'newCar' || item.type === 'usedCar').slice(0, 3);

  // Get research URL for a car - ensure this matches the format in CarCard.tsx
  const getResearchUrl = (carId: string) => {
    return `/research/${carId}`;
  };
  return;
};
export default MyGarageSkinny;