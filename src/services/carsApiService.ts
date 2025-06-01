const API_BASE_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'f0c4c8d1-2d40-41dd-9786-1f9d5bd0c289';

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

// Fetch car makes
export const fetchCarMakesFromApi = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars?limit=50`, {
      headers: {
        'X-Api-Key': API_KEY,
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
    const response = await fetch(`${API_BASE_URL}/cars?make=${encodeURIComponent(make)}&limit=50`, {
      headers: {
        'X-Api-Key': API_KEY,
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
    let url = `${API_BASE_URL}/cars?limit=50`;
    
    if (make) url += `&make=${encodeURIComponent(make)}`;
    if (model) url += `&model=${encodeURIComponent(model)}`;
    if (year) url += `&year=${year}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY,
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
  // If query is too short, don't search
  if (!query || query.trim().length < 3) {
    console.log('Query too short, skipping search');
    return [];
  }

  try {
    console.log('Starting search for:', query);
    
    // Map common abbreviations to full names
    const makeMapping: { [key: string]: string[] } = {
      'vw': ['volkswagen'],
      'benz': ['mercedes-benz'],
      'merc': ['mercedes-benz'],
      'bmw': ['bmw'],
      'audi': ['audi'],
      'ford': ['ford'],
      'toyota': ['toyota'],
      'honda': ['honda'],
      'nissan': ['nissan'],
      'hyundai': ['hyundai'],
      'kia': ['kia'],
      'mazda': ['mazda'],
      'subaru': ['subaru'],
      'volvo': ['volvo'],
      'lexus': ['lexus'],
      'acura': ['acura'],
      'infiniti': ['infiniti'],
      'cadillac': ['cadillac'],
      'buick': ['buick'],
      'chevrolet': ['chevrolet'],
      'chevy': ['chevrolet'],
      'dodge': ['dodge'],
      'jeep': ['jeep'],
      'ram': ['ram'],
      'chrysler': ['chrysler'],
      'gmc': ['gmc'],
      'lincoln': ['lincoln'],
      'tesla': ['tesla'],
      'porsche': ['porsche'],
      'jaguar': ['jaguar'],
      'land rover': ['land rover'],
      'mini': ['mini'],
      'fiat': ['fiat'],
      'alfa romeo': ['alfa romeo'],
      'maserati': ['maserati'],
      'ferrari': ['ferrari'],
      'lamborghini': ['lamborghini'],
      'bentley': ['bentley'],
    };
    
    // Convert query to lowercase for matching
    const lowerQuery = query.toLowerCase().trim();
    
    // Check if query matches any make abbreviation
    const matchingMakes = Object.entries(makeMapping)
      .filter(([abbr]) => lowerQuery.includes(abbr))
      .flatMap(([_, makes]) => makes);
    
    // If we have matching makes, search for those specifically
    if (matchingMakes.length > 0) {
      console.log('Found matching makes:', matchingMakes);
      
      // Create queries for each matching make
      const makeQueries = matchingMakes.map(make => 
        `${API_BASE_URL}/cars?make=${encodeURIComponent(make)}&limit=50`
      );
      
      try {
        const responses = await Promise.all(
          makeQueries.map(url => fetch(url, {
            headers: {
              'X-Api-Key': API_KEY,
            },
          }))
        );
        
        // Check if all responses are ok
        const failedResponses = responses.filter(res => !res.ok);
        if (failedResponses.length > 0) {
          console.error('Some API requests failed:', failedResponses.map(res => res.statusText));
        }
        
        // Process successful responses
        const validResponses = responses.filter(res => res.ok);
        const results = await Promise.all(
          validResponses.map(res => res.json())
        );
        
        // Flatten and deduplicate results
        const allCars = results.flat();
        console.log(`Found ${allCars.length} cars for makes:`, matchingMakes);
        
        const uniqueCars = [...new Map(allCars.map(car => 
          [`${car.make} ${car.model} ${car.year}`, car]
        )).values()];
        
        return uniqueCars;
      } catch (error) {
        console.error('Error fetching by make:', error);
        // Fall back to general search if make-specific search fails
      }
    }

    // If no make match or make search failed, do a general search
    console.log('Performing general search for:', query);
    try {
      // Try exact match first
      const exactMatchResponse = await fetch(`${API_BASE_URL}/cars?make=${encodeURIComponent(lowerQuery)}&limit=50`, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      
      if (exactMatchResponse.ok) {
        const exactMatchCars: CarData[] = await exactMatchResponse.json();
        if (exactMatchCars.length > 0) {
          console.log(`Found ${exactMatchCars.length} cars with exact make match`);
          return exactMatchCars;
        }
      }
      
      // Then try model search
      const modelSearchResponse = await fetch(`${API_BASE_URL}/cars?model=${encodeURIComponent(lowerQuery)}&limit=50`, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      
      if (modelSearchResponse.ok) {
        const modelMatchCars: CarData[] = await modelSearchResponse.json();
        if (modelMatchCars.length > 0) {
          console.log(`Found ${modelMatchCars.length} cars with model match`);
          return modelMatchCars;
        }
      }
      
      // Finally try general search
      const generalSearchResponse = await fetch(`${API_BASE_URL}/cars?limit=50`, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      
      if (!generalSearchResponse.ok) {
        throw new Error(`API request failed: ${generalSearchResponse.statusText}`);
      }
      
      const allCars: CarData[] = await generalSearchResponse.json();
      
      // Filter results client-side based on query
      const filteredCars = allCars.filter(car => {
        const makeModel = `${car.make} ${car.model}`.toLowerCase();
        return makeModel.includes(lowerQuery);
      });
      
      console.log(`Found ${filteredCars.length} cars with general search and filtering`);
      return filteredCars;
    } catch (error) {
      console.error('Error in general search:', error);
      return [];
    }
  } catch (error) {
    console.error('Error in search process:', error);
    return [];
  }
};
