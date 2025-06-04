interface ChatbotAnswer {
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
        title: 'Car Buying Tips: Expert Advice',
        url: '/videos/car-buying-tips-expert-advice',
        thumbnail: '/images/videos/car-buying-tips-2025.jpg'
      },
      {
        type: 'carDetail',
        title: '2025 Honda Civic',
        url: '/cars/honda/civic/2025',
        thumbnail: '/images/cars/honda/2025-civic.jpg'
      }
    ],
    tags: ['buying guide', 'recommendations', 'car shopping', 'decision making']
  }
];
