import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSavedItems, SavedItem } from '../../contexts/SavedItemsContext';
import { Car, Percent, CalendarDays, Landmark, Search, Loader2, Plus } from 'lucide-react';
import { useCarSearchApi } from '@/hooks/use-cars-api';
import { CarData } from '@/components/CarCard/types';
import { useAutocomplete, Suggestion } from "../../hooks/use-autocomplete";
import AutocompleteSuggestions from "../../components/AutocompleteSuggestions";

const PaymentCalculator: React.FC = () => {
  // Helper function to get car image based on title (from QuickAddCar component)
  const getCarImageByTitle = (title: string): string => {
    // Fallback to brand-specific images based on make
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('honda')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg';
    } else if (lowerTitle.includes('hyundai') || lowerTitle.includes('ioniq')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/683a13b525213f0008ca3bff/001-2025-hyundai-ioniq-5-xrt-lead.jpg';
    } else if (lowerTitle.includes('ford')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/67803d741f7f8d00081b8228/2025fordmustanggtdspiritofamerica8.png';
    } else if (lowerTitle.includes('toyota')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4c435544c890008b8417b/2025-toyota-crown-signia-suv-reveal-4.jpg';
    } else if (lowerTitle.includes('bmw')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg';
    } else if (lowerTitle.includes('lucid')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/67eebe7faf98e400084a3e75/001-2025-lucid-air-pure-front-three-quarter-static-lead.jpg';
    } else if (lowerTitle.includes('rivian')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/6700323d9326e80008726afc/018-2025-rivian-r1s-dual-max.jpg';
    } else if (lowerTitle.includes('tesla')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/663515bddbe9350008773b00/002-2023-tesla-model-y.jpg';
    } else if (lowerTitle.includes('porsche')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c44b3fb907d30008f1b5b9/2022-porsche-911-gt3-9.jpg';
    } else if (lowerTitle.includes('jeep')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c37e5d81670a0008bdb6df/2020-jeep-wrangler-unlimited-rubicon-ecodiesel-22.jpg';
    } else if (lowerTitle.includes('audi')) {
      return 'https://d2kde5ohu8qb21.cloudfront.net/files/65c42d9dadc7280009f459e8/2021-audi-rs-e-tron-gt-prototype-20.jpg';
    }
  
    // Generic fallback image
    return 'https://file.kelleybluebookimages.com/kbb/base/house/2025/2025-Rivian-R1S-FrontSide_RIVR1S2501_640x480.jpg';
  };
  
  // Handle selecting a suggestion from autocomplete
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    if (suggestion.type === 'newCar' || suggestion.type === 'carModel' || suggestion.type === 'carMake') {
      // Create a CarData object from the suggestion
      const car: CarData = {
        id: suggestion.id,
        title: suggestion.text,
        imageUrl: suggestion.imageUrl || getCarImageByTitle(suggestion.text),
        price: suggestion.price || '',
        category: suggestion.category || 'New Car',
        year: suggestion.text.match(/\d{4}/) ? suggestion.text.match(/\d{4}/)![0] : new Date().getFullYear().toString(),
        make: suggestion.text.split(' ')[suggestion.text.match(/\d{4}/) ? 1 : 0],
        model: suggestion.text.split(' ').slice(suggestion.text.match(/\d{4}/) ? 2 : 1).join(' ')
      };
      
      setCustomVehicle(car);
      // Set estimated price based on year and make
      const year = parseInt(car.year || new Date().getFullYear().toString());
      const make = car.make?.toLowerCase() || '';
      
      let basePrice = 25000;
      if (make.includes('bmw') || make.includes('audi') || make.includes('mercedes') || make.includes('porsche') || make.includes('lexus')) {
        basePrice = 45000;
      } else if (make.includes('tesla') || make.includes('lucid') || make.includes('rivian')) {
        basePrice = 55000;
      } else if (make.includes('toyota') || make.includes('honda') || make.includes('hyundai') || make.includes('kia')) {
        basePrice = 28000;
      }
      
      const estimatedPrice = year > 2020 ? (basePrice + (year - 2020) * 2000).toString() : basePrice.toString();
      setCustomPrice(estimatedPrice);
      setShowSuggestions(false);
      setSearchQuery(suggestion.text);
    }
  };
  const { savedItems } = useSavedItems();
  
  // Filter garage cars
  const garageCars = useMemo(() => 
    savedItems.filter((item) => item.type === 'newCar' || item.type === 'usedCar'), 
    [savedItems]
  );

  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'finance' | 'lease'>('finance');
  // Default to garage mode if there are cars, otherwise search mode
  const [searchMode, setSearchMode] = useState<'garage' | 'search'>(garageCars.length > 0 ? 'garage' : 'search');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customVehicle, setCustomVehicle] = useState<CarData | null>(null);
  const [customPrice, setCustomPrice] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // Finance State
  const [vehiclePrice, setVehiclePrice] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<string>('0');
  const [tradeInValue, setTradeInValue] = useState<string>('0');
  const [dealerDiscount, setDealerDiscount] = useState<string>('0');
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<string>('5.0'); // APR as percentage

  // Car search API
  const { data: searchResults, isLoading: searchLoading } = useCarSearchApi(searchQuery);
  
  // Autocomplete search functionality
  const {
    suggestions,
    isLoading: suggestionsLoading,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown
  } = useAutocomplete(searchQuery);


  const selectedCar = useMemo(() => {
    if (searchMode === 'garage') {
      return garageCars.find(car => car.id === selectedCarId);
    }
    return customVehicle;
  }, [garageCars, selectedCarId, customVehicle, searchMode]);

  const parseCurrencyInput = (value: string): number => {
    if (!value) return 0;
    const numericString = String(value).replace(/[^\d.-]/g, '');
    const num = parseFloat(numericString);
    return isNaN(num) ? 0 : num;
  };

  // Set the first garage car as default when component mounts
  useEffect(() => {
    if (garageCars.length > 0 && !selectedCarId) {
      setSelectedCarId(garageCars[0].id);
    }
  }, [garageCars]);

  useEffect(() => {
    if (selectedCar) {
      let msrp = 0;
      if (searchMode === 'garage') {
        // For SavedItem type from garage
        const savedItem = selectedCar as SavedItem;
        msrp = parseCurrencyInput(savedItem.metadata?.price as string || savedItem.metadata?.msrp as string || '0');
      } else if (searchMode === 'search') {
        // For CarData type from search
        msrp = parseCurrencyInput(customPrice || '0');
      }
      setVehiclePrice(msrp);
      // Reset finance inputs when car changes, could be more sophisticated
      setDownPayment((msrp * 0.1).toFixed(0)); // Default 10% down payment
      setTradeInValue('0');
      setDealerDiscount('0');
      setInterestRate('5.0');
      setLoanTermMonths(60);
    } else {
      setVehiclePrice(0);
      setDownPayment('0');
    }
  }, [selectedCar, customPrice, searchMode]);

  const estimatedFinanceAmount = useMemo(() => {
    return Math.max(0, vehiclePrice - parseCurrencyInput(downPayment) - parseCurrencyInput(tradeInValue) - parseCurrencyInput(dealerDiscount));
  }, [vehiclePrice, downPayment, tradeInValue, dealerDiscount]);

  const monthlyPayment = useMemo(() => {
    if (estimatedFinanceAmount <= 0) return 0;
    const rate = parseFloat(interestRate);
    if (isNaN(rate) || rate < 0) return null; // Invalid interest rate

    const monthlyInterestRate = (rate / 100) / 12;
    if (monthlyInterestRate === 0) { // Simple division for 0% APR
        return loanTermMonths > 0 ? estimatedFinanceAmount / loanTermMonths : 0;
    }
    
    const payment = estimatedFinanceAmount * 
                    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
                    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    return payment > 0 ? payment : 0;
  }, [estimatedFinanceAmount, loanTermMonths, interestRate]);

  const loanTerms = [24, 36, 48, 60, 72, 84];



  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Landmark className="mr-2 h-5 w-5 text-primary" />
          Payment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 mb-2">
          <Button 
            variant={searchMode === 'garage' ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setSearchMode('garage')} 
            className="flex-1"
            disabled={garageCars.length === 0}
          >
            <Car className="mr-2 h-4 w-4" />
            My Garage
          </Button>
          <Button 
            variant={searchMode === 'search' ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setSearchMode('search')} 
            className="flex-1"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
        
        {searchMode === 'garage' ? (
          garageCars.length > 0 ? (
            <div>
              <Label htmlFor="car-select">Select a Car</Label>
              <Select value={selectedCarId} onValueChange={setSelectedCarId}>
                <SelectTrigger id="car-select">
                  <SelectValue placeholder="Choose a car from your garage..." />
                </SelectTrigger>
                <SelectContent>
                  {garageCars.map(car => (
                    <SelectItem key={car.id} value={car.id}>{car.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="p-4 text-center border rounded-md bg-muted/20">
              <p className="text-sm text-muted-foreground">No cars in your garage. Try searching instead.</p>
            </div>
          )
        ) : (
          <div className="space-y-3">
            <div>
              <Label htmlFor="car-search">Search for a Vehicle</Label>
              <div className="relative">
                <Input 
                  id="car-search" 
                  type="text" 
                  placeholder="Enter make, model, or year..." 
                  value={searchQuery} 
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                    if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
                      e.preventDefault();
                      handleSelectSuggestion(suggestions[selectedIndex]);
                    } else if (e.key === 'Escape') {
                      setShowSuggestions(false);
                    }
                  }}
                />
                {(searchLoading || suggestionsLoading) && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="relative">
                    <AutocompleteSuggestions
                      suggestions={suggestions.filter(suggestion => 
                        suggestion.type === 'newCar' || 
                        suggestion.type === 'usedCar' || 
                        suggestion.type === 'carModel' || 
                        suggestion.type === 'carMake'
                      ).slice(0, 8)}
                      selectedIndex={selectedIndex}
                      isLoading={suggestionsLoading}
                      onSelect={handleSelectSuggestion}
                      onMouseEnter={setSelectedIndex}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {!showSuggestions && searchResults && searchResults.length > 0 && (
              <div className="border rounded-md max-h-60 overflow-y-auto">
                {searchResults.slice(0, 10).map((car, index) => (
                  <div 
                    key={`${car.make}-${car.model}-${car.year}-${index}`}
                    className="p-2 hover:bg-muted/50 cursor-pointer flex justify-between items-center border-b last:border-b-0"
                    onClick={() => {
                      setCustomVehicle(car);
                      const estimatedPrice = car.year && car.year > 2020 ? (30000 + (car.year - 2020) * 2000).toString() : '25000';
                      setCustomPrice(estimatedPrice);
                    }}
                  >
                    <div>
                      <p className="font-medium">{car.year} {car.make} {car.model}</p>
                      <p className="text-xs text-muted-foreground">{car.fuel_type || 'Gasoline'} · {car.transmission || 'Automatic'}</p>
                    </div>
                    <Button variant="ghost" size="sm">Select</Button>
                  </div>
                ))}
              </div>
            )}
            
            {searchQuery && !suggestionsLoading && !searchLoading && searchResults && searchResults.length === 0 && !showSuggestions && (
              <p className="text-sm text-muted-foreground p-2">No vehicles found. Try a different search term.</p>
            )}
            
            {customVehicle && (
              <div className="mt-2">
                <Label htmlFor="custom-price">Vehicle Price</Label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input 
                    id="custom-price" 
                    type="text" 
                    value={customPrice} 
                    onChange={(e) => setCustomPrice(e.target.value)} 
                    className="pl-6"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {selectedCar && (
          <div className="mt-4 p-3 border rounded-md bg-muted/20">
            <div className="flex items-center space-x-3">
              {selectedCar.imageUrl ? (
                <img src={selectedCar.imageUrl} alt={selectedCar.title} className="w-20 h-20 object-cover rounded" />
              ) : (
                <div className="w-20 h-20 bg-muted flex items-center justify-center rounded">
                  <Car className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-sm">{selectedCar.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {searchMode === 'garage' ? 
                    `MSRP: $${parseCurrencyInput((selectedCar as SavedItem).metadata?.price as string || (selectedCar as SavedItem).metadata?.msrp as string || '0').toLocaleString()}` : 
                    `Price: $${parseCurrencyInput(customPrice).toLocaleString()}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedCar && (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'finance' | 'lease')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="lease" disabled>Lease (Coming Soon)</TabsTrigger>
            </TabsList>
            <TabsContent value="finance" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <Input id="down-payment" type="text" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="pl-6" />
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-muted-foreground">Buy for</p>
                    <p className="text-2xl font-bold">${monthlyPayment !== null ? monthlyPayment.toFixed(0) : '---'}</p>
                    <p className="text-xs text-muted-foreground">per month for {loanTermMonths} months</p>
                </div>
              </div>

              <div>
                <Label htmlFor="trade-in">Trade-in Value</Label>
                 <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input id="trade-in" type="text" value={tradeInValue} onChange={(e) => setTradeInValue(e.target.value)} className="pl-6"/>
                </div>
              </div>
              <div>
                <Label htmlFor="dealer-discount">Dealer Discount</Label>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input id="dealer-discount" type="text" value={dealerDiscount} onChange={(e) => setDealerDiscount(e.target.value)} className="pl-6"/>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-muted/20">
                <p className="text-sm font-medium">Estimated Finance Amount</p>
                <p className="text-xl font-bold">${estimatedFinanceAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Includes Available Offers and Rebates (if any)</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="loan-term">Term</Label>
                  <Select value={String(loanTermMonths)} onValueChange={(val) => setLoanTermMonths(Number(val))}>
                    <SelectTrigger id="loan-term">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTerms.map(term => (
                        <SelectItem key={term} value={String(term)}>{term} Months</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interest-rate">Interest Rate (APR)</Label>
                  <div className="relative">
                    <Input id="interest-rate" type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="pr-7"/>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm font-medium">Estimated Monthly Payment*</p>
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">${monthlyPayment !== null ? monthlyPayment.toFixed(2) : '---'}</p>
                    <Button size="sm">Done</Button> 
                </div>
                <p className="text-xs text-muted-foreground mt-1">*Excludes taxes, title, registration, and other fees.</p>
              </div>

            </TabsContent>
            <TabsContent value="lease">
              <p className="text-sm text-muted-foreground py-4">Lease payment calculations coming soon!</p>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCalculator;
