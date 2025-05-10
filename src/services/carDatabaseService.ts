
import { supabase } from "@/integrations/supabase/client";

export interface CarMakeDB {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CarModelDB {
  id: string;
  make_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CarModelYearDB {
  id: string;
  model_id: string;
  year: number;
  created_at: string;
  updated_at: string;
}

// Fetch all car makes
export const fetchCarMakes = async (): Promise<CarMakeDB[]> => {
  const { data, error } = await supabase
    .from('car_makes')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching car makes:', error);
    throw error;
  }

  return data || [];
};

// Fetch car models by make ID
export const fetchCarModelsByMakeId = async (makeId: string): Promise<CarModelDB[]> => {
  const { data, error } = await supabase
    .from('car_models')
    .select('*')
    .eq('make_id', makeId)
    .order('name');

  if (error) {
    console.error(`Error fetching car models for make ${makeId}:`, error);
    throw error;
  }

  return data || [];
};

// Fetch years by model ID
export const fetchYearsByModelId = async (modelId: string): Promise<CarModelYearDB[]> => {
  const { data, error } = await supabase
    .from('car_model_years')
    .select('*')
    .eq('model_id', modelId)
    .order('year', { ascending: false });

  if (error) {
    console.error(`Error fetching years for model ${modelId}:`, error);
    throw error;
  }

  return data || [];
};

// Fetch detailed car info with make, model, year
export const fetchDetailedCarInfo = async () => {
  const { data, error } = await supabase
    .from('car_makes')
    .select(`
      id,
      name,
      car_models!inner (
        id, 
        name,
        car_model_years!inner (
          id,
          year
        )
      )
    `)
    .order('name');

  if (error) {
    console.error('Error fetching detailed car info:', error);
    throw error;
  }

  return data || [];
};

// Search cars by make, model, or year
export const searchCars = async (query: string) => {
  const { data, error } = await supabase
    .from('car_makes')
    .select(`
      id,
      name,
      car_models!inner (
        id, 
        name,
        car_model_years!inner (
          id,
          year
        )
      )
    `)
    .ilike('name', `%${query}%`)
    .order('name');

  if (error) {
    console.error('Error searching cars:', error);
    throw error;
  }

  return data || [];
};

// Get car make by ID
export const getCarMakeById = async (makeId: string): Promise<CarMakeDB | null> => {
  const { data, error } = await supabase
    .from('car_makes')
    .select('*')
    .eq('id', makeId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error(`Error fetching car make ${makeId}:`, error);
    throw error;
  }

  return data;
};

// Get car model by ID
export const getCarModelById = async (modelId: string): Promise<CarModelDB | null> => {
  const { data, error } = await supabase
    .from('car_models')
    .select('*')
    .eq('id', modelId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error(`Error fetching car model ${modelId}:`, error);
    throw error;
  }

  return data;
};
