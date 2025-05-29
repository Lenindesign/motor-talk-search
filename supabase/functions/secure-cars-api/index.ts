
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CarSearchParams {
  make?: string;
  model?: string;
  year?: string;
  price_min?: string;
  price_max?: string;
  limit?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const apiKey = Deno.env.get('CARS_API_KEY');
    
    if (!apiKey) {
      console.error('CARS_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { searchParams, endpoint } = await req.json();
    
    // Validate and sanitize inputs
    const validEndpoints = ['cars', 'makes', 'models'];
    if (!validEndpoints.includes(endpoint)) {
      return new Response(
        JSON.stringify({ error: 'Invalid endpoint' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build API URL with secure parameter handling
    const baseUrl = 'https://api.api-ninjas.com/v1';
    const url = new URL(`${baseUrl}/${endpoint}`);
    
    // Add search parameters safely
    if (searchParams) {
      Object.entries(searchParams as CarSearchParams).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          url.searchParams.append(key, value);
        }
      });
    }

    console.log(`Making API request to: ${endpoint}`);

    // Make the API request with security headers
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'MotorTrend-App/1.0'
      }
    });

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      return new Response(
        JSON.stringify({ 
          error: 'External API request failed',
          status: response.status 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    
    // Log successful request (without exposing sensitive data)
    console.log(`Successfully fetched ${Array.isArray(data) ? data.length : 1} items from ${endpoint}`);

    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in secure-cars-api function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
