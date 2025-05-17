
import React from 'react';
import { Link2, Calculator, Car, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BuyingResourcesProps {
  vehicle: any;
}

const BuyingResources: React.FC<BuyingResourcesProps> = ({ vehicle }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Buying Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Local Inventory */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <Car className="mr-2 h-5 w-5 text-primary" />
              <h3 className="font-semibold">Find Local Inventory</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Search for new and used {vehicle.make} {vehicle.model} inventory at dealerships near you.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">New Inventory</Button>
              <Button variant="outline" size="sm" className="w-full">Used Inventory</Button>
              <Button variant="outline" size="sm" className="w-full">Certified Pre-Owned</Button>
            </div>
          </div>
          
          {/* Pricing Guides */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <Link2 className="mr-2 h-5 w-5 text-primary" />
              <h3 className="font-semibold">Pricing Resources</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Get accurate pricing information to make an informed buying decision.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Invoice Price Guide</Button>
              <Button variant="outline" size="sm" className="w-full">Current Incentives & Rebates</Button>
              <Button variant="outline" size="sm" className="w-full">True Cost to Own®</Button>
            </div>
          </div>
          
          {/* Financing Calculator */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-primary" />
              <h3 className="font-semibold">Payment Calculator</h3>
            </div>
            <p className="mb-2 text-sm text-gray-600">
              Estimate your monthly payments for this vehicle:
            </p>
            
            <div className="mb-4 rounded bg-gray-50 p-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Vehicle Price:</div>
                <div className="text-right font-medium">${vehicle.price.base.toLocaleString()}</div>
                
                <div className="text-gray-500">Term:</div>
                <div className="text-right font-medium">72 months</div>
                
                <div className="text-gray-500">Interest Rate:</div>
                <div className="text-right font-medium">4.9%</div>
                
                <div className="text-gray-500">Down Payment:</div>
                <div className="text-right font-medium">${Math.round(vehicle.price.base * 0.2).toLocaleString()}</div>
                
                <div className="col-span-2 mt-2 border-t border-gray-300 pt-2 text-center">
                  <div className="text-gray-500">Estimated Monthly Payment</div>
                  <div className="text-xl font-bold text-primary">
                    ${Math.round((vehicle.price.base * 0.8) / 72 * 1.125).toLocaleString()}/mo
                  </div>
                </div>
              </div>
            </div>
            
            <Button size="sm" className="w-full">Customize Calculation</Button>
          </div>
          
          {/* Trade-in Value */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-primary" />
              <h3 className="font-semibold">Value Your Trade-In</h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Get an estimate of your current vehicle's value to determine your trade-in amount.
            </p>
            <Button variant="secondary" size="sm" className="w-full">Get Trade-In Value</Button>
          </div>
        </div>
        
        {/* Additional Resources */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium">Additional Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <ArrowRight size={14} className="mr-2 text-primary" />
              <a href="#" className="text-primary hover:underline">Insurance Cost Estimator</a>
            </li>
            <li className="flex items-center">
              <ArrowRight size={14} className="mr-2 text-primary" />
              <a href="#" className="text-primary hover:underline">Car Buying Tips & Advice</a>
            </li>
            <li className="flex items-center">
              <ArrowRight size={14} className="mr-2 text-primary" />
              <a href="#" className="text-primary hover:underline">New vs. Used Comparison</a>
            </li>
            <li className="flex items-center">
              <ArrowRight size={14} className="mr-2 text-primary" />
              <a href="#" className="text-primary hover:underline">Common Negotiation Mistakes</a>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyingResources;
