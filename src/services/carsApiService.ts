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
  try {
    
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
    const lowerQuery = query.toLowerCase();
    
    // Check if query matches any make abbreviation
    const matchingMakes = Object.entries(makeMapping)
      .filter(([abbr]) => lowerQuery.includes(abbr))
      .flatMap(([_, makes]) => makes);
    
    // If we have matching makes, search for those specifically
    if (matchingMakes.length > 0) {
      const makeQueries = matchingMakes.map(make => 
        `${API_BASE_URL}/cars?make=${encodeURIComponent(make)}&limit=50`
      );
      
      const responses = await Promise.all(
        makeQueries.map(url => fetch(url, {
          headers: {
            'X-Api-Key': API_KEY,
          },
        }))
      );
      
      const results = await Promise.all(
        responses.map(res => res.json())
      );
      
      // Flatten and deduplicate results
      const allCars = results.flat();
      const uniqueCars = [...new Map(allCars.map(car => 
        [`${car.make} ${car.model} ${car.year}`, car]
      )).values()];
      
      return uniqueCars;
    }

    // If no make match, do a general search
    try {
      console.log('Searching for:', query);
      const response = await fetch(`${API_BASE_URL}/cars?search=${encodeURIComponent(query)}&limit=50`, {
        headers: {
          'X-Api-Key': API_KEY,
        },
      });
      console.log('API Response Status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const cars: CarData[] = await response.json();
      return cars;
    } catch (error) {
      console.error('Error searching cars:', error);
      return [];
    }
  } catch (error) {
    console.error('Error searching cars:', error);
    return [];
  }
};
