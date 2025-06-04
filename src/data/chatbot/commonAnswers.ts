export interface ChatbotAnswer {
  question: string[];  // Multiple variations of the same question
  answer: string;
  relatedLinks: {
    type: 'article' | 'video' | 'carDetail';
    title: string;
    url: string;
    thumbnail?: string;
  }[];
  tags: string[];  // For better question matching
}

export const commonAnswers: ChatbotAnswer[] = [
  {
    question: [
      "What's the best electric car?",
      "Best EV to buy?",
      "Top electric vehicles",
      "Which electric car should I get?"
    ],
    answer: `Based on our comprehensive testing and market analysis, here are the top electric vehicles for 2025:

Top Overall EV Picks:
• Best Overall: Tesla Model Y - Great range, performance, and technology
• Best Value: Chevrolet Blazer EV - Excellent price-to-range ratio
• Best Luxury: BMW i7 - Premium features and impressive range
• Best Performance: Tesla Model S Plaid - Unmatched acceleration and speed

Key factors to consider when choosing an EV:
• Range: Most new EVs offer 250+ miles of range
• Charging network accessibility
• Price and available tax incentives
• Interior space and cargo capacity
• Technology features

The Tesla Model Y stands out for its combination of:
• 330-mile EPA range
• Extensive Supercharger network
• Strong performance (0-60 in 4.8s)
• Spacious interior with optional third row
• Regular over-the-air updates`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Best Electric Vehicles Guide',
        url: '/articles/2025-best-electric-vehicles',
        thumbnail: '/images/articles/2025-ev-guide.jpg'
      },
      {
        type: 'video',
        title: 'Tesla Model Y vs Competition',
        url: '/videos/tesla-model-y-comparison-2025',
        thumbnail: '/images/videos/model-y-comparison.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Tesla Model Y',
        url: '/cars/tesla/model-y/2025',
        thumbnail: '/images/cars/tesla/2025-model-y.jpg'
      }
    ],
    tags: ['electric', 'ev', 'tesla', 'model y', 'chevrolet', 'bmw', 'range', 'charging']
  },
  {
    question: [
      "How often should I service my car?",
      "Car maintenance schedule",
      "When to change oil?",
      "Basic car maintenance tips"
    ],
    answer: `Here's a comprehensive car maintenance schedule to keep your vehicle running smoothly:

Regular Maintenance Schedule:
• Oil Change: Every 5,000-7,500 miles (synthetic oil)
• Tire Rotation: Every 5,000-8,000 miles
• Air Filter: Every 15,000-30,000 miles
• Brake Fluid: Check every 2 years
• Coolant: Every 30,000 miles
• Transmission Fluid: Every 60,000-100,000 miles

Monthly Checks:
• Tire pressure and condition
• All lights functioning
• Windshield washer fluid
• Oil level
• Battery connections

Warning Signs to Watch For:
• Unusual noises
• Warning lights on dashboard
• Reduced performance
• Fluid leaks
• Vibrations while driving

Note: Always consult your vehicle's owner's manual as maintenance schedules can vary by make and model.`,
    relatedLinks: [
      {
        type: 'article',
        title: 'Complete Car Maintenance Guide',
        url: '/articles/complete-car-maintenance-guide-2025',
        thumbnail: '/images/articles/maintenance-guide.jpg'
      },
      {
        type: 'video',
        title: 'DIY Car Maintenance Tips',
        url: '/videos/diy-car-maintenance-tips',
        thumbnail: '/images/videos/maintenance-tips.jpg'
      },
      {
        type: 'article',
        title: 'Warning Signs Your Car Needs Service',
        url: '/articles/car-warning-signs',
        thumbnail: '/images/articles/warning-signs.jpg'
      }
    ],
    tags: ['maintenance', 'service', 'oil change', 'tires', 'brakes', 'fluids', 'diy']
  },
  {
    question: [
      "How to finance a car?",
      "Best way to buy a car?",
      "Car loan advice",
      "How to get the best car deal?"
    ],
    answer: `Here's a comprehensive guide to car financing and getting the best deal:

Before Shopping:
• Check your credit score
• Determine your budget (monthly payment < 15% of income)
• Research current interest rates
• Get pre-approved for a loan
• Calculate your down payment (aim for 20%)

Financing Options:
1. Dealership Financing
   • Convenient but not always best rates
   • Good for manufacturer promotions
   • Negotiate rate and price separately

2. Bank/Credit Union Loans
   • Often better interest rates
   • More straightforward process
   • Stronger negotiating position

3. Online Lenders
   • Easy comparison shopping
   • Quick approval process
   • Competitive rates

Tips for Best Deals:
• Shop at month/quarter end
• Compare multiple offers
• Negotiate total price, not monthly payment
• Watch for hidden fees
• Consider certified pre-owned for better value`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Car Financing Guide',
        url: '/articles/car-financing-guide-2025',
        thumbnail: '/images/articles/financing-guide.jpg'
      },
      {
        type: 'video',
        title: 'How to Negotiate Car Prices',
        url: '/videos/car-negotiation-tips',
        thumbnail: '/images/videos/negotiation-tips.jpg'
      },
      {
        type: 'article',
        title: 'Understanding Car Loans',
        url: '/articles/understanding-car-loans',
        thumbnail: '/images/articles/car-loans.jpg'
      }
    ],
    tags: ['financing', 'loans', 'buying', 'negotiation', 'credit', 'dealership', 'price']
  },
  {
    question: [
      "What is the best SUV?",
      "Which SUV should I buy?",
      "Top SUV recommendations",
      "Best family SUV"
    ],
    answer: `Based on our extensive testing and market analysis, the 2025 Honda CR-V stands out as one of the best all-around SUVs. It offers excellent value with its combination of reliability, safety features, and comfort. For luxury buyers, the 2025 BMW X5 delivers outstanding performance and premium features.

Key factors to consider when choosing an SUV:
• Size and passenger capacity
• Fuel efficiency
• Safety features
• Price range
• Intended use (family, off-road, luxury)

Top recommendations by category:
• Compact SUV: Honda CR-V
• Mid-size SUV: Toyota Highlander
• Luxury SUV: BMW X5
• Full-size SUV: Ford Expedition`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Best SUVs Buying Guide',
        url: '/articles/2025-best-suvs-buying-guide',
        thumbnail: '/images/articles/2025-suv-guide.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Honda CR-V',
        url: '/cars/honda/cr-v/2025',
        thumbnail: '/images/cars/honda/2025-cr-v.jpg'
      },
      {
        type: 'video',
        title: 'Top 5 SUVs of 2025 Comparison',
        url: '/videos/top-5-suvs-2025-comparison',
        thumbnail: '/images/videos/suv-comparison-2025.jpg'
      }
    ],
    tags: ['suv', 'buying guide', 'comparison', 'family', 'recommendations']
  },
  {
    question: [
      "What is the fastest car?",
      "Which car has the highest top speed?",
      "Fastest production car",
      "Most powerful sports car"
    ],
    answer: `As of 2025, the Bugatti Chiron Super Sport 300+ holds the production car speed record at 304.77 mph. However, several new hypercars are challenging this record:

Top 5 Fastest Production Cars (2025):
1. Bugatti Chiron Super Sport 300+ (304.77 mph)
2. Koenigsegg Jesko Absolut (300+ mph theoretical)
3. Hennessey Venom F5 (290+ mph claimed)
4. Bugatti Bolide (310+ mph theoretical)
5. McLaren Speedtail (250+ mph)

Note: While these are the fastest cars in terms of top speed, acceleration and overall performance involve many other factors. For practical high-performance cars, consider options like:
• Porsche 911 GT3 RS
• Ferrari SF90 Stradale
• McLaren 720S`,
    relatedLinks: [
      {
        type: 'article',
        title: 'Fastest Cars of 2025: Complete Guide',
        url: '/articles/fastest-cars-2025-complete-guide',
        thumbnail: '/images/articles/fastest-cars-2025.jpg'
      },
      {
        type: 'video',
        title: 'Bugatti Chiron vs Koenigsegg Jesko: Speed Kings',
        url: '/videos/bugatti-koenigsegg-speed-comparison',
        thumbnail: '/images/videos/speed-kings-2025.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Porsche 911 GT3 RS',
        url: '/cars/porsche/911-gt3-rs/2025',
        thumbnail: '/images/cars/porsche/2025-gt3rs.jpg'
      }
    ],
    tags: ['sports cars', 'speed', 'performance', 'supercars', 'hypercars']
  },
  {
    question: [
      "What's the most fuel efficient car?",
      "Best car for gas mileage",
      "Most economical car",
      "Best hybrid car for fuel economy"
    ],
    answer: `For 2025, the most fuel-efficient vehicles are primarily hybrid and plug-in hybrid models. Here are the top performers:

Best Fuel Economy by Category:

Hybrid Cars:
• Toyota Prius (59 city/56 hwy MPG)
• Honda Insight (55 city/49 hwy MPG)
• Hyundai Elantra Hybrid (53 city/56 hwy MPG)

Plug-in Hybrids:
• Toyota RAV4 Prime (94 MPGe)
• Honda CR-V PHEV (90 MPGe)
• Ford Escape PHEV (105 MPGe)

Note: For maximum efficiency, consider all-electric vehicles which have equivalent fuel economy ratings over 100 MPGe. However, if you're specifically looking for traditional fuel economy, hybrid vehicles offer the best combination of efficiency and practicality.`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Most Fuel-Efficient Cars Ranked',
        url: '/articles/most-fuel-efficient-cars-2025',
        thumbnail: '/images/articles/fuel-efficiency-2025.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Toyota Prius',
        url: '/cars/toyota/prius/2025',
        thumbnail: '/images/cars/toyota/2025-prius.jpg'
      },
      {
        type: 'video',
        title: 'Hybrid vs Plug-in vs Electric: Which to Choose?',
        url: '/videos/hybrid-plugin-electric-comparison',
        thumbnail: '/images/videos/efficiency-comparison-2025.jpg'
      }
    ],
    tags: ['fuel economy', 'hybrid', 'efficiency', 'eco-friendly', 'gas mileage']
  },
  {
    question: [
      "What's the safest car?",
      "Best car for safety",
      "Safest family car",
      "Top safety rated vehicles"
    ],
    answer: `The safest cars of 2025 combine advanced driver assistance systems (ADAS) with robust structural design. Here are the top performers in safety testing:

Top Safety Picks+ (IIHS):
• Volvo XC90
• Genesis G90
• Mercedes-Benz E-Class
• Subaru Outback
• Honda Accord

Key Safety Features to Look For:
• Forward Collision Warning
• Automatic Emergency Braking
• Blind Spot Monitoring
• Lane Departure Warning
• Adaptive Cruise Control
• 360-degree Camera Systems

Note: While these vehicles excel in safety ratings, remember that safe driving practices are equally important. All modern vehicles must meet strict safety standards, but these models go above and beyond requirements.`,
    relatedLinks: [
      {
        type: 'article',
        title: 'Safest Cars of 2025: Complete Analysis',
        url: '/articles/safest-cars-2025-analysis',
        thumbnail: '/images/articles/safety-2025.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Volvo XC90',
        url: '/cars/volvo/xc90/2025',
        thumbnail: '/images/cars/volvo/2025-xc90.jpg'
      },
      {
        type: 'video',
        title: 'Advanced Safety Features Explained',
        url: '/videos/advanced-safety-features-explained',
        thumbnail: '/images/videos/safety-features-2025.jpg'
      }
    ],
    tags: ['safety', 'family', 'crash test', 'adas', 'protection']
  },
  {
    question: [
      "What car should I buy?",
      "Help me choose a car",
      "Best car recommendations",
      "Which car is right for me"
    ],
    answer: `Choosing the right car depends on several personal factors. Here's a structured approach to help you decide:

Consider Your Priorities:
1. Budget (including maintenance & insurance)
2. Primary use (commuting, family, recreation)
3. Passenger/cargo needs
4. Fuel efficiency requirements
5. Must-have features

Top Recommendations by Category:

Economy/Commuter:
• Honda Civic
• Toyota Corolla
• Hyundai Elantra

Family Vehicles:
• Honda CR-V
• Toyota RAV4
• Kia Telluride

Luxury:
• BMW 3 Series
• Mercedes-Benz C-Class
• Genesis G70

Performance:
• Porsche 911
• BMW M3
• Ford Mustang GT

Visit our car finder tool to get personalized recommendations based on your specific needs and preferences.`,
    relatedLinks: [
      {
        type: 'article',
        title: 'How to Choose the Perfect Car: 2025 Guide',
        url: '/articles/how-to-choose-perfect-car-2025',
        thumbnail: '/images/articles/car-buying-guide-2025.jpg'
      },
      {
        type: 'video',
        title: 'Car Buying Tips & Tricks',
        url: '/videos/car-buying-tips-tricks',
        thumbnail: '/images/videos/car-buying-tips.jpg'
      },
      {
        type: 'article',
        title: 'Best Cars by Category 2025',
        url: '/articles/best-cars-by-category-2025',
        thumbnail: '/images/articles/best-cars-2025.jpg'
      }
    ],
    tags: ['buying guide', 'recommendations', 'car shopping', 'comparison']
  },
  {
    question: [
      "What are the latest car safety features?",
      "Most important safety features in cars",
      "Advanced driver assistance systems",
      "What safety features should I look for?"
    ],
    answer: `Modern vehicles come with numerous advanced safety features. Here are the most important ones to consider in 2025:

Must-Have Safety Features:
• Forward Collision Warning (FCW)
• Automatic Emergency Braking (AEB)
• Blind Spot Warning (BSW)
• Lane Departure Warning (LDW)
• Rear Cross Traffic Alert

Advanced Driver Assistance Systems (ADAS):
• Adaptive Cruise Control
• Lane Keeping Assist
• 360-degree Camera Systems
• Parking Assistance
• Driver Attention Monitor

Newest Innovations:
• AI-powered Predictive Safety
• Vehicle-to-Vehicle Communication
• Enhanced Night Vision
• Augmented Reality HUDs
• Advanced Airbag Systems

Best Safety-Rated Brands:
• Volvo
• Subaru
• Genesis
• Mercedes-Benz
• Honda`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Car Safety Technology Guide',
        url: '/articles/car-safety-technology-guide-2025',
        thumbnail: '/images/articles/safety-tech.jpg'
      },
      {
        type: 'video',
        title: 'Latest ADAS Features Explained',
        url: '/videos/adas-features-explained',
        thumbnail: '/images/videos/adas-features.jpg'
      },
      {
        type: 'article',
        title: 'Safest Cars of 2025',
        url: '/articles/safest-cars-2025',
        thumbnail: '/images/articles/safest-cars.jpg'
      }
    ],
    tags: ['safety', 'adas', 'technology', 'features', 'crash prevention', 'driver assistance']
  },
  {
    question: [
      "What are the best performance cars?",
      "Fastest sports cars",
      "Best handling cars",
      "Top sports cars to buy"
    ],
    answer: `Here are our top performance car picks for 2025, categorized by price range and capability:

Supercar Category:
• Porsche 911 GT3 RS - Best track performance
• Ferrari 296 GTB - Best overall supercar
• McLaren 750S - Most innovative technology
• Lamborghini Huracán STO - Most dramatic experience

Sports Car Category:
• Chevrolet Corvette Z06 - Best value supercar
• Toyota GR Supra - Best daily driver sports car
• Porsche Cayman GT4 RS - Best handling
• BMW M4 CSL - Best luxury performance

Performance Metrics to Consider:
• 0-60 mph times
• Quarter-mile performance
• Nürburgring lap times
• Braking distance
• Lateral g-force

Key Features in Modern Performance Cars:
• Advanced aerodynamics
• Carbon fiber construction
• Hybrid powertrains
• Active suspension systems
• Launch control`,
    relatedLinks: [
      {
        type: 'article',
        title: '2025 Performance Car Buyers Guide',
        url: '/articles/performance-car-guide-2025',
        thumbnail: '/images/articles/performance-cars.jpg'
      },
      {
        type: 'video',
        title: 'Porsche 911 GT3 RS vs Competition',
        url: '/videos/porsche-911-gt3-rs-comparison',
        thumbnail: '/images/videos/gt3-rs-comparison.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Chevrolet Corvette Z06',
        url: '/cars/chevrolet/corvette/2025/z06',
        thumbnail: '/images/cars/chevrolet/2025-corvette-z06.jpg'
      }
    ],
    tags: ['performance', 'sports cars', 'supercars', 'racing', 'handling', 'speed', 'track']
  }
];
