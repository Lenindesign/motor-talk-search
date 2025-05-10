
import { useQuery } from '@tanstack/react-query';
import { 
  fetchCarMakes, 
  fetchCarModelsByMakeId, 
  fetchYearsByModelId, 
  fetchDetailedCarInfo,
  searchCars,
  getCarMakeById,
  getCarModelById,
  CarMakeDB,
  CarModelDB,
  CarModelYearDB
} from '../services/carDatabaseService';

export function useCarMakes() {
  return useQuery({
    queryKey: ['carMakes'],
    queryFn: fetchCarMakes
  });
}

export function useCarModelsByMakeId(makeId: string | null) {
  return useQuery({
    queryKey: ['carModels', makeId],
    queryFn: () => makeId ? fetchCarModelsByMakeId(makeId) : Promise.resolve([]),
    enabled: !!makeId
  });
}

export function useYearsByModelId(modelId: string | null) {
  return useQuery({
    queryKey: ['carYears', modelId],
    queryFn: () => modelId ? fetchYearsByModelId(modelId) : Promise.resolve([]),
    enabled: !!modelId
  });
}

export function useDetailedCarInfo() {
  return useQuery({
    queryKey: ['detailedCarInfo'],
    queryFn: fetchDetailedCarInfo
  });
}

export function useCarSearch(query: string) {
  return useQuery({
    queryKey: ['carSearch', query],
    queryFn: () => query ? searchCars(query) : Promise.resolve([]),
    enabled: query.length > 2
  });
}

export function useCarMakeById(makeId: string | null) {
  return useQuery({
    queryKey: ['carMake', makeId],
    queryFn: () => makeId ? getCarMakeById(makeId) : Promise.resolve(null),
    enabled: !!makeId
  });
}

export function useCarModelById(modelId: string | null) {
  return useQuery({
    queryKey: ['carModel', modelId],
    queryFn: () => modelId ? getCarModelById(modelId) : Promise.resolve(null),
    enabled: !!modelId
  });
}

// Helper function to combine data from multiple queries
export function useCompleteCarData(makeId: string | null, modelId: string | null) {
  const makesQuery = useCarMakes();
  const modelsQuery = useCarModelsByMakeId(makeId);
  const yearsQuery = useYearsByModelId(modelId);
  
  return {
    isLoading: makesQuery.isLoading || modelsQuery.isLoading || yearsQuery.isLoading,
    error: makesQuery.error || modelsQuery.error || yearsQuery.error,
    makes: makesQuery.data || [],
    models: modelsQuery.data || [],
    years: yearsQuery.data || []
  };
}
