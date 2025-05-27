import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { mockNewCars } from '@/services/mockData';
import { CarData } from '@/components/CarCard';
import { getBodyStyle, mockTrims, expertRatings, ownerReviews } from './NewCarDetail/utils';
import CarHeader from './NewCarDetail/CarHeader';
import QuickStats from './NewCarDetail/QuickStats';
import OverviewTab from './NewCarDetail/OverviewTab';
import RatingsTab from './NewCarDetail/RatingsTab';
import ComparisonTab from './NewCarDetail/ComparisonTab';
import CompetitorsComparison from './NewCarDetail/CompetitorsComparison/CompetitorsComparison';
import ReviewsTab from './NewCarDetail/ReviewsTab';
import TrimsTab from './NewCarDetail/TrimsTab';
import SpecsTab from './NewCarDetail/SpecsTab';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const NewCarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const car = mockNewCars.find(c => c.id === id);
  const [selectedTrim, setSelectedTrim] = useState('Base');
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollToSection } = useSmoothScroll();

  if (!car) {
    return (
      <div className="min-h-screen bg-neutral-8">
        
        <main className="content-container section-spacing">
          <div className="text-center space-element">
            <h1 className="typography-display text-neutral-1 mb-6">Vehicle Not Found</h1>
            <Link to="/cars" className="typography-body text-motortrend-red hover:text-motortrend-red/80 transition-colors duration-200">
              Browse All Cars
            </Link>
          </div>
        </main>
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

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'ratings', title: 'Expert Ratings' },
    { id: 'comparison', title: 'Class Comparison' },
    { id: 'competitors', title: 'Competitors' },
    { id: 'reviews', title: 'Owner Reviews' },
    { id: 'specs', title: 'Specifications' },
    { id: 'trims', title: 'Trims & Pricing' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const selectedTrimData = processedTrims.find(t => t.name === selectedTrim) || processedTrims[0];
  const overallRating = expertRatings.reduce((acc, rating) => acc + rating.score, 0) / expertRatings.length;

  return (
    <div className="min-h-screen bg-neutral-8">
      
      <main className="max-w-[980px] mx-auto w-full px-0 py-[16px] pt-[120px]">
        {/* Car Header */}
        <div className="mb-12 lg:mb-16">
          <CarHeader car={car} carData={carData} selectedTrimPrice={selectedTrimData.price} overallRating={overallRating} />
        </div>

        {/* Quick Stats Summary */}
        <div className="mb-12 lg:mb-16">
          <QuickStats overallRating={overallRating} ownerRating={ownerReviews.overallScore} />
        </div>

        {/* Sticky Navigation */}
        <nav className="fixed top-[64px] left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
          <div className="max-w-[980px] mx-auto px-4">
            <div className="flex space-x-4 overflow-x-auto p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`typography-caption font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-motortrend-red text-white shadow-sm'
                      : 'hover:bg-motortrend-red/10'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          <section id="overview" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Overview</h2>
            <OverviewTab carTitle={car.title} />
          </section>

          <section id="ratings" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Expert Ratings</h2>
            <RatingsTab />
          </section>

          <section id="comparison" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Class Comparison</h2>
            <ComparisonTab carTitle={car.title} carCategory={car.category} />
          </section>

          <section id="competitors" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Competitors</h2>
            <CompetitorsComparison />
          </section>

          <section id="reviews" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Owner Reviews</h2>
            <ReviewsTab />
          </section>

          <section id="specs" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Specifications</h2>
            <SpecsTab />
          </section>

          <section id="trims" className="pt-8">
            <h2 className="typography-display text-neutral-1 mb-4">Trims & Pricing</h2>
            <TrimsTab trims={processedTrims} selectedTrim={selectedTrim} onTrimSelect={setSelectedTrim} selectedTrimData={selectedTrimData} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default NewCarDetail;
