import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { CheckCircle } from 'lucide-react';

const FindBestPriceSuccess = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-[980px] mx-auto px-2 sm:px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 md:p-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-neutral-1 mb-4">
                Request Submitted Successfully!
              </h1>
              
              <p className="text-neutral-2 mb-8">
                Thank you for your interest. A representative will contact you shortly with pricing information based on your preferences.
              </p>

              <div className="space-y-4">
                <Button 
                  asChild
                  className="w-full bg-motortrend-red hover:bg-motortrend-red/90"
                >
                  <Link to="/new-cars">
                    Browse More New Cars
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link to="/">
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FindBestPriceSuccess;
