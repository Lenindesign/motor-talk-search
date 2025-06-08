import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText, Car, Star, Settings, Zap, Shield, Users, MapPin, Wrench, CheckCircle2 } from 'lucide-react';
import { mockNewCars } from '@/services/mockData';
import { PaymentCalculator } from '@/components/PaymentCalculator/PaymentCalculator';
import { CarData } from '@/components/CarCard';
import { getBodyStyle, mockTrims, expertRatings, ownerReviews } from './NewCarDetail/utils';
import CarHeader from './NewCarDetail/CarHeader';
import VehicleOverview from './NewCarDetail/VehicleOverview';
import RatingsTab from './NewCarDetail/RatingsTab';
import ComparisonTab from './NewCarDetail/ComparisonTab';
import CompetitorsComparison from './NewCarDetail/CompetitorsComparison/CompetitorsComparison';
import ReviewsTab from './NewCarDetail/ReviewsTab';
import TrimLevels from './NewCarDetail/TrimLevels';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/button';
import PricingModule from './NewCarDetail/PricingModule';
import CostOfOwnership from '@/components/CostOfOwnership/CostOfOwnership';
const NewCarDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const car = mockNewCars.find(c => c.id === id);
  const [selectedTrim, setSelectedTrim] = useState('Base');
  const [activeSection, setActiveSection] = useState('overview');
  const {
    scrollToSection
  } = useSmoothScroll();
  if (!car) {
    return <div className="min-h-screen bg-white">
        
        <main className="content-container section-spacing">
          <div className="text-center space-element">
            <h1 className="typography-display text-neutral-1 mb-6">Vehicle Not Found</h1>
            <Link to="/cars" className="typography-body text-motortrend-red hover:text-motortrend-red/80 transition-colors duration-200">
              Browse All Cars
            </Link>
          </div>
        </main>
      </div>;
  }
  const carData: CarData = {
    id: car.id,
    title: car.title,
    price: car.price,
    category: car.category,
    imageUrl: car.imageUrl,
    year: '2025',
    bodyStyle: getBodyStyle(car.category),
    mileage: 'New',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    location: 'Available Nationwide'
  };
  const processedTrims = mockTrims.map(trim => ({
    name: trim.name,
    price: trim.name === 'Base' ? car.price : '$' + (parseInt(car.price.replace(/\D/g, '')) + trim.basePrice).toLocaleString(),
    features: trim.features
  }));
  const sections = [{
    id: 'overview',
    title: 'Overview'
  }, {
    id: 'payment-calculator',
    title: 'Payment Calculator'
  }, {
    id: 'ratings',
    title: 'Expert Ratings'
  }, {
    id: 'comparison',
    title: 'Class Comparison'
  }, {
    id: 'competitors',
    title: 'Competitors'
  }, {
    id: 'reviews',
    title: 'Owner Reviews'
  }, {
    id: 'trims',
    title: 'Trims & Pricing'
  }, {
    id: 'cost',
    title: 'Cost of Ownership'
  }];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "-10% 0px -70% 0px"
    });
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
  const selectedTrimData = processedTrims.find(t => t.name === selectedTrim) || processedTrims[0];
  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;
  return <div className="">
      <main className="">
        
        {/* Sticky Navigation */}
        <nav className="sticky top-[56px] md:top-[64px] z-50 bg-white border-b border-neutral-200 shadow-sm mb-6">
          <div className="max-w-[980px] mx-auto">
            <div className="flex space-x-2 overflow-x-auto p-2 hide-scrollbar">
              {sections.map(section => <button key={section.id} onClick={() => scrollToSection(section.id)} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeSection === section.id ? 'bg-motortrend-red text-white shadow-sm' : 'hover:bg-motortrend-red/10'}`}>
                  {section.title}
                </button>)}
            </div>
          </div>
        </nav>
        
        {/* Car Header with Image and Primary Info */}
        <div className="mb-6">
            <CarHeader car={car} carData={carData} overallRating={expertRatings[0].score} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Vehicle Overview */}
            <div id="overview" className="mb-6">
              <VehicleOverview overallRating={expertRatings[0].score} ownerRating={ownerReviews.overallScore} carTitle={car.title} specs={{
              engine: '400 HP Electric Motor',
              acceleration: '4.2 seconds 0-60 mph',
              range: '405 miles EPA estimated',
              charging: '350kW DC Fast Charging',
              drivetrain: 'All-Wheel Drive',
              seating: '5 passengers',
              cargo: '28.1 cu ft',
              warranty: '4 years/50,000 miles'
            }} />
            </div>

            {/* Payment Calculator Section */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6" id="payment-calculator">
              <h2 className="text-lg md:text-xl text-neutral-1 font-bold mb-3">Payment Calculator</h2>
              <PaymentCalculator car={{
              ...car,
              msrp: selectedTrimData.price,
              imageUrl: car.imageUrl
            }} />
            </div>
            
            {/* Expert Ratings Section */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6" id="ratings">
              <h2 className="text-lg md:text-xl text-neutral-1 font-bold mb-3">Expert Ratings</h2>
              <RatingsTab />
            </div>
            
            {/* Class Comparison */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6" id="comparison">
              <h2 className="text-lg md:text-xl text-neutral-1 font-bold mb-3">Class Comparison</h2>
              <ComparisonTab carTitle={car.title} carCategory={car.category} />
            </div>
            
            {/* Competitors Section */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6" id="competitors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl text-neutral-1 font-bold">Compare with Competitors</h2>
                <Button variant="ghost" size="sm" className="text-motortrend-red text-xs px-2">
                  View All <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
              <CompetitorsComparison />
            </div>
            
            {/* Owner Reviews Section */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6 min-h-[300px]" id="reviews">
              <h2 className="text-lg md:text-xl text-neutral-1 font-bold mb-3">Owner Reviews</h2>
              <ReviewsTab />
            </div>
            

            
            {/* Trim Levels Section */}
            <div id="trims" className="bg-white shadow-modern border-modern rounded-xl overflow-hidden p-4 md:p-5 mb-6">
              <TrimLevels carTitle={car.title} />
            </div>

            {/* Cost of Ownership Section */}
            <div id="cost" className="mb-6">
              <CostOfOwnership initialPrice={parseInt(car.price.replace(/\D/g, ''))} costBreakdown={[{
              category: 'Depreciation',
              amount: 42000,
              percentage: 52,
              color: 'bg-indigo-500'
            }, {
              category: 'Electricity',
              amount: 4800,
              percentage: 6,
              color: 'bg-emerald-500'
            }, {
              category: 'Insurance',
              amount: 24000,
              percentage: 30,
              color: 'bg-amber-500'
            }, {
              category: 'Maintenance',
              amount: 9600,
              percentage: 12,
              color: 'bg-orange-500'
            }]} depreciationData={[{
              year: 0,
              value: parseInt(car.price.replace(/\D/g, ''))
            },
            // EVs typically depreciate faster in first year
            {
              year: 1,
              value: parseInt(car.price.replace(/\D/g, '')) * 0.80
            },
            // But then stabilize due to battery longevity and tech value
            {
              year: 3,
              value: parseInt(car.price.replace(/\D/g, '')) * 0.65
            }, {
              year: 5,
              value: parseInt(car.price.replace(/\D/g, '')) * 0.52
            }, {
              year: 7,
              value: parseInt(car.price.replace(/\D/g, '')) * 0.45
            }]} />
            </div>


          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Links */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden mb-6">
              <div className="p-4 bg-neutral-7 border-b border-neutral-6">
                <h3 className="typography-body-large font-semibold text-neutral-1">Quick Links</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <FileText size={16} className="mr-2" /> Owner's Manual
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <MapPin size={16} className="mr-2" /> Find a Dealer
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <Car size={16} className="mr-2" /> Build & Price
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start w-full">
                    <Wrench size={16} className="mr-2" /> Service Centers
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden mb-6">
              <div className="p-4 bg-neutral-7 border-b border-neutral-6">
                <h3 className="typography-body-large font-semibold text-neutral-1">Key Features</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex">
                    <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-2">All-wheel drive with dual motors</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-2">15.5-inch touchscreen infotainment</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-2">Advanced driver assistance features</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-2">Over-the-air software updates</span>
                  </li>
                  <li className="flex">
                    <CheckCircle2 size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-2">Premium audio system with 14 speakers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Similar Cars */}
            <div className="bg-white shadow-modern border-modern rounded-xl overflow-hidden">
              <div className="p-4 bg-neutral-7 border-b border-neutral-6">
                <h3 className="typography-body-large font-semibold text-neutral-1">Similar Cars</h3>
              </div>
              <div className="p-4 space-y-4">
                {mockNewCars.slice(0, 3).map(similarCar => <Link key={similarCar.id} to={`/cars/new/${similarCar.id}`} className="flex items-center bg-neutral-8 rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                    <div className="w-16 h-12 flex-shrink-0 mr-3">
                      <img src={similarCar.imageUrl || 'https://via.placeholder.com/300x180?text=Car+Image'} alt={similarCar.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-neutral-1">{similarCar.title}</p>
                      <p className="text-xs text-neutral-3">${similarCar.price.toLocaleString()}</p>
                    </div>
                  </Link>)}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Similar Vehicles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>;
};
export default NewCarDetail;