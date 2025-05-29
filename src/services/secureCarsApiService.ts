
import { supabase } from '@/integrations/supabase/client';

interface CarSearchParams {
  make?: string;
  model?: string;
  year?: string;
  price_min?: string;
  price_max?: string;
  limit?: string;
}

class SecureCarsApiService {
  private async makeSecureRequest(endpoint: string, searchParams?: CarSearchParams) {
    try {
      const { data, error } = await supabase.functions.invoke('secure-cars-api', {
        body: {
          endpoint,
          searchParams
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`API request failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Secure API request failed:', error);
      throw error;
    }
  }

  async searchCars(params: CarSearchParams = {}) {
    // Set default limit and validate parameters
    const sanitizedParams = {
      ...params,
      limit: params.limit || '20'
    };

    // Remove empty parameters
    Object.keys(sanitizedParams).forEach(key => {
      if (!sanitizedParams[key as keyof CarSearchParams]) {
        delete sanitizedParams[key as keyof CarSearchParams];
      }
    });

    return this.makeSecureRequest('cars', sanitizedParams);
  }

  async getCarMakes() {
    return this.makeSecureRequest('cars/makes');
  }

  async getCarModels(make: string) {
    if (!make || typeof make !== 'string') {
      throw new Error('Make parameter is required and must be a string');
    }
    
    return this.makeSecureRequest('cars/models', { make });
  }

  // Additional secure methods can be added here
  async getCarsByMakeAndModel(make: string, model: string) {
    if (!make || !model || typeof make !== 'string' || typeof model !== 'string') {
      throw new Error('Make and model parameters are required and must be strings');
    }

    return this.makeSecureRequest('cars', { make, model });
  }
}

export const secureCarsApiService = new SecureCarsApiService();
export default secureCarsApiService;
