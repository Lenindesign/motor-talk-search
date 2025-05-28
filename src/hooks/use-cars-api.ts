
import { useQuery } from '@tanstack/react-query';
import { 
  fetchCarMakesFromApi, 
  fetchCarModelsByMakeFromApi, 
  fetchCarDetailsFromApi,
  searchCarsFromApi
} from '../services/carsApiService';

export function useCarMakesApi() {
  return useQuery({
    queryKey: ['carMakesApi'],
    queryFn: fetchCarMakesFromApi,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}

export function useCarModelsByMakeApi(make: string | null) {
  return useQuery({
    queryKey: ['carModelsApi', make],
    queryFn: () => make ? fetchCarModelsByMakeFromApi(make) : Promise.resolve([]),
    enabled: !!make,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
}

export function useCarDetailsApi(make?: string, model?: string, year?: number) {
  return useQuery({
    queryKey: ['carDetailsApi', make, model, year],
    queryFn: () => fetchCarDetailsFromApi(make, model, year),
    enabled: !!(make || model || year),
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
}

export function useCarSearchApi(query: string) {
  return useQuery({
    queryKey: ['carSearchApi', query],
    queryFn: () => query ? searchCarsFromApi(query) : Promise.resolve([]),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
