import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText, Car, Star, Settings, Zap, Shield, Users, MapPin, Wrench, CheckCircle2 } from 'lucide-react';
import { mockNewCars } from '@/services/mockData';
import { PaymentCalculator } from '@/components/PaymentCalculator/PaymentCalculator';
import { CarData } from '@/components/CarCard';
import { getBodyStyle, mockTrims, expertRatings, ownerReviews } from './NewCarDetail/utils';
import CarHeader from './NewCarDetail/CarHeader';
import CarSidebar from './NewCarDetail/CarSidebar';
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
import StickyRelay from './NewCarDetail/StickyRelay';
import MarketIntelligence from './NewCarDetail/MarketIntelligence/MarketIntelligence';

const NewCarDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [selectedTrim, setSelectedTrim] = useState('Base');
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollToSection } = useSmoothScroll();

  // Comprehensive sections with Apple-style progressive disclosure
  const sections = useMemo(() => [
    {
      id: 'overview',
      title: 'Overview'
    },
    {
      id: 'specs',
      title: 'Specs'
    },
    {
      id: 'pricing',
      title: 'Pricing'
    },
    {
      id: 'reviews',
      title: 'Reviews'
    },
    {
      id: 'comparison',
      title: 'Comparison'
    },
    {
      id: 'ownership',
      title: 'Ownership'
    },
    {
      id: 'market',
      title: 'Market'
    }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Find the entry with the largest intersection ratio
      let maxRatio = 0;
      let activeEntry = null;
      
      entries.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeEntry = entry;
        }
      });
      
      // Only update if we have a significant intersection
      if (activeEntry && maxRatio > 0.1) {
        setActiveSection(activeEntry.target.id);
      }
    }, {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: "-80px 0px -50% 0px"
    });

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Account for sticky nav
      
      // If we're near the top, always show overview
      if (window.scrollY < 100) {
        setActiveSection('overview');
        return;
      }
      
      // Find the section that's currently most visible
      let currentSection = 'overview'; // default
      
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navHeight = 120; // Account for sticky nav
          
          // Check if section is in viewport
          if (rect.top <= navHeight && rect.bottom > navHeight) {
            currentSection = sections[i].id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Set initial state
    handleScroll();
    
    // Add scroll listener as backup
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const car = mockNewCars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-neutral-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-neutral-6 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Car className="w-8 h-8 text-neutral-3" />
          </div>
          <h1 className="typography-title text-neutral-1 mb-3">Vehicle Not Found</h1>
          <p className="typography-body text-neutral-4 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/cars" 
            className="inline-flex items-center justify-center px-6 py-3 bg-motortrend-red text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
          >
            Browse All Cars
          </Link>
        </div>
      </div>
    );
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

  const selectedTrimData = processedTrims.find(t => t.name === selectedTrim) || processedTrims[0];
  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;

  return (
    <div className="min-h-screen bg-neutral-8">
      {/* Enhanced Navigation with All Sections */}
      <nav className="sticky top-[56px] md:top-[64px] z-50 bg-white/95 backdrop-blur-md border-b border-neutral-6 shadow-sm">
        <div className="max-w-[980px] mx-auto px-4">
          <div className="flex items-center gap-1 md:gap-2 py-3 overflow-x-auto scrollbar-hide">
            {sections.map(section => (
              <button 
                key={section.id} 
                onClick={() => scrollToSection(section.id)} 
                className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeSection === section.id 
                    ? 'bg-motortrend-red text-white shadow-modern' 
                    : 'text-neutral-3 hover:text-neutral-1 hover:bg-neutral-8'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main Content with Apple-style layout */}
      <div className="max-w-[980px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section - No ID since it's not in navigation */}
            <div className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <CarHeader 
                car={car} 
                carData={carData} 
                overallRating={expertRatings[0].score} 
                ownerRating={ownerReviews.overallScore}
              />
            </div>

            {/* Overview Section */}
            <div id="overview" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <h2 className="typography-title text-neutral-1 mb-6">Overview</h2>
                <VehicleOverview 
                  overallRating={expertRatings[0].score} 
                  ownerRating={ownerReviews.overallScore} 
                  carTitle={car.title} 
                  specs={{
                    engine: '400 HP Electric Motor',
                    acceleration: '4.2 seconds 0-60 mph',
                    range: '405 miles EPA estimated',
                    charging: '350kW DC Fast Charging',
                    drivetrain: 'All-Wheel Drive',
                    seating: '5 passengers',
                    cargo: '28.1 cu ft',
                    warranty: '4 years/50,000 miles'
                  }} 
                />
              </div>
            </div>

            {/* Specs Section */}
            <div id="specs" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <h2 className="typography-title text-neutral-1 mb-6">Specifications</h2>
                <RatingsTab />
              </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <h2 className="typography-title text-neutral-1 mb-6">Pricing & Calculator</h2>
                <div className="space-y-6">
                  <PaymentCalculator car={{
                    ...car,
                    msrp: selectedTrimData.price,
                    imageUrl: car.imageUrl
                  }} />
                                     <TrimLevels carTitle={car.title} />
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <h2 className="typography-title text-neutral-1 mb-6">Reviews & Comparisons</h2>
                <div className="space-y-8">
                  <ReviewsTab />
                  <div className="border-t border-neutral-6 pt-8">
                    <h3 className="typography-subtitle text-neutral-1 mb-4">Compare with Competitors</h3>
                    <CompetitorsComparison />
                  </div>
                </div>
              </div>
            </div>

            {/* Class Comparison Section */}
            <div id="comparison" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <ComparisonTab carTitle={car.title} carCategory={car.category} />
              </div>
            </div>

            {/* Cost of Ownership Section */}
            <div id="ownership" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <CostOfOwnership 
                  initialPrice={parseInt(car.price.replace(/\D/g, ''))}
                  costBreakdown={[
                    { category: 'Depreciation', amount: 15000, percentage: 45, color: 'bg-red-500' },
                    { category: 'Insurance', amount: 8000, percentage: 24, color: 'bg-blue-500' },
                    { category: 'Maintenance', amount: 6000, percentage: 18, color: 'bg-yellow-500' },
                    { category: 'Electricity', amount: 4000, percentage: 13, color: 'bg-green-500' }
                  ]}
                  depreciationData={[
                    { year: 0, value: parseInt(car.price.replace(/\D/g, '')) },
                    { year: 1, value: parseInt(car.price.replace(/\D/g, '')) * 0.8 },
                    { year: 2, value: parseInt(car.price.replace(/\D/g, '')) * 0.65 },
                    { year: 3, value: parseInt(car.price.replace(/\D/g, '')) * 0.55 },
                    { year: 4, value: parseInt(car.price.replace(/\D/g, '')) * 0.45 },
                    { year: 5, value: parseInt(car.price.replace(/\D/g, '')) * 0.38 }
                  ]}
                />
              </div>
            </div>

            {/* Market Intelligence Section */}
            <div id="market" className="bg-white rounded-2xl shadow-modern border border-neutral-6 overflow-hidden">
              <div className="p-6">
                <MarketIntelligence 
                  carMake={car.title.split(' ')[0]}
                  carModel={car.title.split(' ').slice(1).join(' ')}
                  carYear={2025}
                  currentPrice={parseInt(car.price.replace(/\D/g, ''))}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <CarSidebar car={car} carData={carData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCarDetail;
