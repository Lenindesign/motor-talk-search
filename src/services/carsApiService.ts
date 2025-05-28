
import { supabase } from "@/integrations/supabase/client";

const API_BASE_URL = 'https://api.api-ninjas.com/v1';

interface CarData {
  make: string;
  model: string;
  year: number;
  class?: string;
  cylinders?: number;
  displacement?: number;
  drive?: string;
  fuel_type?: string;
  highway_mpg?: number;
  city_mpg?: number;
  combination_mpg?: number;
  transmission?: string;
}

interface CarMakeData {
  make: string;
}

interface CarModelData {
  make: string;
  model: string;
}

// Helper function to get API key from Supabase secrets
const getApiKey = async (): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('get-cars-api-key');
  
  if (error) {
    console.error('Error fetching API key:', error);
    throw new Error('Failed to fetch API key');
  }
  
  return data.apiKey;
};

// Fetch car makes
export const fetchCarMakesFromApi = async (): Promise<string[]> => {
  try {
    const apiKey = await getApiKey();
    const response = await fetch(`${API_BASE_URL}/cars?limit=50`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const cars: CarData[] = await response.json();
    
    // Extract unique makes
    const uniqueMakes = [...new Set(cars.map(car => car.make))].sort();
    
    return uniqueMakes;
  } catch (error) {
    console.error('Error fetching car makes:', error);
    throw error;
  }
};

// Fetch car models by make
export const fetchCarModelsByMakeFromApi = async (make: string): Promise<CarModelData[]> => {
  try {
    const apiKey = await getApiKey();
    const response = await fetch(`${API_BASE_URL}/cars?make=${encodeURIComponent(make)}&limit=50`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const cars: CarData[] = await response.json();
    
    // Extract unique models for the given make
    const uniqueModels = [...new Set(cars.map(car => car.model))]
      .map(model => ({ make, model }))
      .sort((a, b) => a.model.localeCompare(b.model));
    
    return uniqueModels;
  } catch (error) {
    console.error('Error fetching car models:', error);
    throw error;
  }
};

// Fetch detailed car information
export const fetchCarDetailsFromApi = async (make?: string, model?: string, year?: number): Promise<CarData[]> => {
  try {
    const apiKey = await getApiKey();
    let url = `${API_BASE_URL}/cars?limit=50`;
    
    if (make) url += `&make=${encodeURIComponent(make)}`;
    if (model) url += `&model=${encodeURIComponent(model)}`;
    if (year) url += `&year=${year}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const cars: CarData[] = await response.json();
    return cars;
  } catch (error) {
    console.error('Error fetching car details:', error);
    throw error;
  }
};

// Search cars by query
export const searchCarsFromApi = async (query: string): Promise<CarData[]> => {
  try {
    const apiKey = await getApiKey();
    
    // Try searching by make first
    const makeResponse = await fetch(`${API_BASE_URL}/cars?make=${encodeURIComponent(query)}&limit=20`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (makeResponse.ok) {
      const makeResults: CarData[] = await makeResponse.json();
      if (makeResults.length > 0) {
        return makeResults;
      }
    }

    // If no results by make, try by model
    const modelResponse = await fetch(`${API_BASE_URL}/cars?model=${encodeURIComponent(query)}&limit=20`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (modelResponse.ok) {
      const modelResults: CarData[] = await modelResponse.json();
      return modelResults;
    }

    return [];
  } catch (error) {
    console.error('Error searching cars:', error);
    return [];
  }
};
