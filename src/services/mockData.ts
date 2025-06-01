/**
 * Mock Data Service
 * 
 * This file contains all mock data used throughout the application for demonstration purposes.
 * Data is organized into sections for articles, cars, photos, videos, and chat responses.
 * 
 * Special attention is given to Honda Accord data to ensure search functionality returns
 * at least 36 results across all content types when searching for Honda Accord.
 */

import { ArticleData } from "../components/ArticleCard";
import { CarData } from "../components/CarCard/types";
import { PhotoData } from "../components/PhotoCard";
import { VideoData } from "../components/VideoCard";

// Content Types
export type ContentType = "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos";

// Content Collection Type
export interface ContentCollection {
  articles: ArticleData[];
  newCars: CarData[];
  usedCars: CarData[];
  photos: PhotoData[];
  videos: VideoData[];
}

/**
 * MOCK ARTICLES DATA
 * 
 * This section contains all article mock data used in the application.
 * Articles are organized into categories:
 * 1. Honda Accord specific articles (IDs v1-v4 and honda-article-*)
 * 2. Featured articles for hero slides
 * 3. General automotive articles
 */
export const mockArticles: ArticleData[] = [
  // Honda Accord Articles with v1-v4 IDs for direct URL access
  {
    id: 'v1',
    title: '2025 Honda Accord Hybrid: Efficiency Meets Performance',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg',
    category: 'First Drive',
    date: 'May 31, 2025',
    detailUrl: '/article/v1',
    featured: true,
    photoCount: 24,
    content: {
      subtitle: "Honda's redesigned Accord Hybrid sets new standards for mid-size sedans with class-leading efficiency and surprising performance.",
      author: "Michael Chen",
      authorTitle: "Senior Automotive Editor",
      readTime: "8 min read",
      sections: [
        {
          type: "paragraph",
          content: "The 2025 Honda Accord Hybrid represents the pinnacle of Honda's hybrid technology, combining remarkable fuel efficiency with the refined driving dynamics that have made the Accord a perennial favorite. After a week of testing in various conditions, I've found that this latest iteration doesn't just improve on its predecessor—it redefines what we should expect from a mid-size hybrid sedan."
        },
        {
          type: "paragraph",
          content: "With a completely redesigned powertrain delivering 212 combined horsepower and an EPA-estimated 51 mpg combined, the Accord Hybrid strikes an impressive balance between performance and efficiency that few competitors can match."
        },
        {
          type: "heading",
          content: "Design: Subtle Evolution, Major Impact"
        },
        {
          type: "paragraph",
          content: "Honda has taken an evolutionary approach with the Accord's exterior design, refining rather than revolutionizing. The front fascia features a more sophisticated grille treatment and sleeker LED headlights that give the car a premium presence. The fastback-like roofline remains, but with more refined character lines that reduce visual weight."
        },
        {
          type: "paragraph",
          content: "Inside, the cabin has received a complete overhaul with a focus on digital integration and premium materials. The new 12.3-inch touchscreen infotainment system floats above the dashboard, while physical climate controls remain—a thoughtful decision that prioritizes usability over trendy minimalism."
        },
        {
          type: "specs",
          title: "2025 Honda Accord Hybrid Specifications",
          data: [
            { label: "Powertrain", value: "2.0L 4-cylinder + Electric Motor" },
            { label: "Combined Output", value: "212 horsepower" },
            { label: "Transmission", value: "E-CVT" },
            { label: "EPA Fuel Economy", value: "51 mpg combined" },
            { label: "Battery", value: "1.1 kWh lithium-ion" }
          ]
        },
        {
          type: "quote",
          content: "The new Accord Hybrid doesn't ask drivers to compromise. It delivers performance, efficiency, and refinement in equal measure—a true engineering achievement.",
          author: "Dr. Emily Chen, Automotive Engineering Professor"
        },
        {
          type: "heading",
          content: "Driving Dynamics: The Hybrid Advantage"
        },
        {
          type: "paragraph",
          content: "Perhaps the most impressive aspect of the 2025 Accord Hybrid is how it drives. The immediate torque from the electric motor provides brisk acceleration from a standstill, while the system seamlessly blends power sources on the move. The 0-60 mph sprint takes just 7.1 seconds—impressive for a car that can also deliver over 50 mpg."
        },
        {
          type: "paragraph",
          content: "Ride quality is excellent, with the retuned suspension absorbing imperfections without feeling disconnected. Steering is precise and appropriately weighted, giving the driver confidence through corners while remaining light enough for easy maneuvering in tight spaces."
        },
        {
          type: "heading",
          content: "Technology: Next-Generation Integration"
        },
        {
          type: "paragraph",
          content: "Honda's new infotainment system is a significant step forward, with crisp graphics, responsive touch inputs, and wireless Apple CarPlay and Android Auto integration. The available 12-speaker Bose sound system delivers impressive audio quality, making the Accord a perfect rolling concert hall."
        },
        {
          type: "paragraph",
          content: "The Honda Sensing suite of driver assistance features has been enhanced with improved cameras and radar sensors, providing more natural-feeling adaptive cruise control and lane-keeping assistance. The new traffic jam assist feature works remarkably well in stop-and-go traffic, reducing driver fatigue during commutes."
        },
        {
          type: "cta",
          title: "Find Your Perfect Honda Accord",
          description: "Use our interactive tool to compare trims, colors, and features to build your ideal 2025 Honda Accord.",
          buttonText: "Build & Price"
        }
      ]
    }
  },
  {
    id: 'v2',
    title: '2025 Honda Accord Touring: Luxury Within Reach',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd14be8a380008367a34/2018-honda-accord-touring-2-5t-front-three-quarter-in-motion-05.jpg',
    category: 'Road Test',
    date: 'May 29, 2025',
    detailUrl: '/article/v2',
    featured: true,
    photoCount: 18,
    content: {
      subtitle: "The top-tier Touring trim elevates the 2025 Honda Accord with premium features that challenge luxury brands at a fraction of the price.",
      author: "Lisa Martinez",
      authorTitle: "Senior Review Editor",
      readTime: "9 min read",
      sections: [
        {
          type: "paragraph",
          content: "The line between mainstream and luxury vehicles continues to blur, and the 2025 Honda Accord Touring makes a compelling case that you don't need a premium badge to enjoy a premium experience. After spending two weeks with Honda's flagship sedan, I'm convinced it offers one of the best values in the automotive landscape today."
        },
        {
          type: "paragraph",
          content: "Priced at $38,545 (including destination), the Accord Touring costs significantly less than entry-level luxury sedans while offering comparable—and in some cases superior—features, materials, and driving refinement."
        },
        {
          type: "heading",
          content: "Premium Appointments: The Details Matter"
        },
        {
          type: "paragraph",
          content: "Step inside the Accord Touring and you're greeted by perforated leather seats with heating and ventilation for front passengers. The driver's seat offers 12-way power adjustment with memory settings, while the front passenger gets 4-way power adjustment. The heated steering wheel and heated rear seats ensure comfort for all occupants during cold weather."
        },
        {
          type: "paragraph",
          content: "Material quality throughout the cabin is exceptional, with soft-touch surfaces on all major touchpoints and convincing open-pore wood-look trim across the dashboard. The acoustic glass and enhanced sound insulation create a serene environment even at highway speeds, with measured noise levels comparable to luxury sedans costing $15,000 more."
        },
        {
          type: "specs",
          title: "2025 Honda Accord Touring Features",
          data: [
            { label: "Infotainment", value: "12.3-inch touchscreen with wireless CarPlay/Android Auto" },
            { label: "Audio", value: "12-speaker Bose premium sound system" },
            { label: "Comfort", value: "Heated/ventilated front seats, heated rear seats" },
            { label: "Lighting", value: "Full LED lighting with adaptive front headlights" },
            { label: "Convenience", value: "Wireless charging, head-up display, hands-free trunk" }
          ]
        },
        {
          type: "quote",
          content: "The Accord Touring challenges the notion that you need to spend luxury car money to get a luxury car experience. It delivers refinement and features that would cost $50,000 or more with a premium badge.",
          author: "Robert Chen, Automotive Industry Analyst"
        },
        {
          type: "heading",
          content: "Technology: Fully Featured and User-Friendly"
        },
        {
          type: "paragraph",
          content: "The technological centerpiece is Honda's new 12.3-inch touchscreen infotainment system, which offers crisp graphics and a logical menu structure. Google Built-in provides native integration of Google Maps and Google Assistant, offering superior voice recognition and navigation compared to many proprietary systems."
        },
        {
          type: "paragraph",
          content: "The 10.2-inch digital instrument cluster is customizable and provides clear information without overwhelming the driver. The full-color head-up display projects speed, navigation directions, and safety alerts directly in the driver's line of sight, minimizing distraction."
        },
        {
          type: "heading",
          content: "On the Road: Refined and Responsive"
        },
        {
          type: "paragraph",
          content: "The Touring comes exclusively with Honda's enhanced hybrid powertrain, which combines a 2.0-liter Atkinson-cycle four-cylinder engine with two electric motors to produce 212 horsepower and 232 lb-ft of torque. While not the quickest in its class, the system delivers power in a smooth, linear fashion that feels perfectly suited to the car's character."
        },
        {
          type: "paragraph",
          content: "The adaptive damper system—exclusive to the Touring trim—automatically adjusts suspension firmness based on driving conditions. The result is impressive body control during spirited driving without sacrificing comfort over rough surfaces. Combined with precise steering and strong brakes, the Accord Touring strikes an ideal balance between comfort and control."
        },
        {
          type: "cta",
          title: "Experience the Accord Touring",
          description: "Schedule a test drive to experience the premium features and refined driving dynamics of the 2025 Honda Accord Touring.",
          buttonText: "Find a Dealer"
        }
      ]
    }
  },
  {
    id: 'v3',
    title: '2025 Honda Accord vs. Toyota Camry: Midsize Sedan Showdown',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/65a4c3b0adb8a4000836452a/2025-toyota-camry-vs-2024-honda-accord-feature-image.jpg',
    category: 'Comparison',
    date: 'May 28, 2025',
    detailUrl: '/article/v3',
    featured: true,
    photoCount: 22,
    content: {
      subtitle: "We pit the redesigned 2025 Honda Accord against its archival, the Toyota Camry, in a comprehensive comparison of America's favorite midsize sedans.",
      author: "James Wilson",
      authorTitle: "Chief Comparison Editor",
      readTime: "12 min read",
      sections: [
        {
          type: "paragraph",
          content: "For decades, the Honda Accord and Toyota Camry have dominated the midsize sedan segment, each offering a compelling blend of reliability, efficiency, and value. With both models receiving significant updates for 2025, we brought them together for a definitive comparison to determine which deserves your hard-earned dollars."
        },
        {
          type: "paragraph",
          content: "Over the course of a week, we drove both sedans back-to-back on the same roads, compared their interiors with a fine-tooth comb, measured their cargo capacity, and even calculated their real-world fuel economy. The results reveal clear strengths and weaknesses for each model."
        },
        {
          type: "heading",
          content: "Design and Interior Quality: Different Philosophies"
        },
        {
          type: "paragraph",
          content: "The 2025 Accord embraces a clean, sophisticated design language with a fastback-like profile and restrained detailing. It's handsome and likely to age well, though some might find it too conservative. Inside, the Accord offers exceptional material quality with a horizontally-oriented dashboard that emphasizes width and spaciousness."
        },
        {
          type: "paragraph",
          content: "By contrast, the 2025 Camry adopts a more expressive exterior with sharp character lines and an aggressive front fascia. The interior follows a similar theme with angular design elements and a more driver-focused cockpit. While both cabins are well-assembled, the Accord edges ahead with superior materials and a more premium feel, particularly in higher trim levels."
        },
        {
          type: "specs",
          title: "2025 Accord vs. Camry: By the Numbers",
          data: [
            { label: "Accord Hybrid System", value: "212 hp / 232 lb-ft / 51 mpg combined" },
            { label: "Camry Hybrid System", value: "208 hp / 221 lb-ft / 52 mpg combined" },
            { label: "Accord Passenger Volume", value: "105.7 cubic feet" },
            { label: "Camry Passenger Volume", value: "100.4 cubic feet" },
            { label: "Accord Cargo Volume", value: "16.7 cubic feet" },
            { label: "Camry Cargo Volume", value: "15.1 cubic feet" }
          ]
        },
        {
          type: "quote",
          content: "The Accord feels like it was designed from the inside out, prioritizing passenger comfort and usability. The Camry, meanwhile, seems to put more emphasis on style and driver engagement.",
          author: "Caroline Lee, Interior Design Specialist"
        },
        {
          type: "heading",
          content: "Driving Dynamics: Comfort vs. Sportiness"
        },
        {
          type: "paragraph",
          content: "Behind the wheel, these sedans reveal distinctly different characters. The Accord prioritizes refinement with light, precise steering, a compliant ride, and exceptional noise isolation. The hybrid powertrain delivers power smoothly and predictably, though it lacks the immediate responsiveness of some turbocharged competitors."
        },
        {
          type: "paragraph",
          content: "The Camry, particularly in its sportier SE and XSE trims, offers more engaging handling with weightier steering and firmer suspension tuning. This comes at the cost of some ride comfort, as the Camry transmits more road imperfections into the cabin. Its hybrid system feels marginally more responsive than the Accord's when accelerating from low speeds."
        },
        {
          type: "heading",
          content: "Technology and Features: Digital Showdown"
        },
        {
          type: "paragraph",
          content: "Both sedans come well-equipped with modern technology, but their implementations differ significantly. The Accord's 12.3-inch touchscreen offers sharper graphics and more responsive performance than the Camry's 10.5-inch unit. Honda's decision to partner with Google for native integration gives it an edge in usability, particularly for navigation and voice commands."
        },
        {
          type: "paragraph",
          content: "The Camry counters with Toyota's improved infotainment system, which now includes wireless Apple CarPlay and Android Auto across all trims (Honda reserves wireless connectivity for higher Accord trims). Both offer comprehensive driver assistance features, though Honda's systems operate with more natural, less intrusive interventions in most scenarios."
        },
        {
          type: "heading",
          content: "Efficiency and Value: The Bottom Line"
        },
        {
          type: "paragraph",
          content: "In hybrid form, both sedans deliver exceptional fuel economy, with the Camry holding a slight edge in EPA ratings (52 mpg combined vs. 51 mpg for the Accord). In our real-world testing, however, the Accord actually outperformed its EPA estimates, returning 53.2 mpg in mixed driving compared to the Camry's 51.8 mpg."
        },
        {
          type: "paragraph",
          content: "Pricing remains competitive, with the Accord starting slightly higher but offering more standard features. When comparably equipped, the price difference narrows significantly. The Camry retains a slight edge in projected depreciation and maintenance costs, though the gap has narrowed considerably in recent years."
        },
        {
          type: "cta",
          title: "Compare These Sedans Side-by-Side",
          description: "Use our interactive comparison tool to view detailed specifications, features, and pricing for the 2025 Honda Accord and Toyota Camry.",
          buttonText: "Start Comparing"
        }
      ]
    }
  },
  {
    id: 'v4',
    title: 'Honda Accord: The Complete History of an Automotive Icon',
    imageUrl: 'https://d2kde5ohu8qb21.cloudfront.net/files/6763144d7da72a0008ca90b5/mt75-msc-1982-honda-accord.jpg',
    category: 'Feature',
    date: 'May 25, 2025',
    detailUrl: '/article/v4',
    featured: false,
    photoCount: 30,
    content: {
      subtitle: "From its humble beginnings in 1976 to today's sophisticated hybrid, we trace the complete evolution of Honda's definitive family sedan.",
      author: "David Thompson",
      authorTitle: "Automotive Historian",
      readTime: "15 min read",
      sections: [
        {
          type: "paragraph",
          content: "Few cars have shaped the automotive landscape as profoundly as the Honda Accord. Since its introduction nearly 50 years ago, the Accord has evolved from a compact hatchback to a technology-packed midsize sedan, selling more than 18 million units worldwide and helping establish Honda as a major global automaker."
        },
        {
          type: "paragraph",
          content: "This comprehensive history traces the Accord's remarkable journey through eleven generations, highlighting the innovations, design changes, and market shifts that have defined its development. From pioneering fuel injection to embracing electrification, the Accord's story mirrors the automotive industry's broader evolution."
        },
        {
          type: "heading",
          content: "First Generation (1976-1981): The Revolutionary Compact"
        },
        {
          type: "paragraph",
          content: "When the first Accord arrived in 1976, it was a compact three-door hatchback measuring just 162.8 inches in length—smaller than today's Honda Civic. Powered by a 1.6-liter engine producing 68 horsepower, it wasn't particularly powerful, but its front-wheel-drive layout, precise handling, and exceptional build quality immediately set it apart from American and European competitors."
        },
        {
          type: "paragraph",
          content: "The timing couldn't have been better. With memories of the 1973 oil crisis still fresh, American consumers were increasingly receptive to efficient Japanese imports. The Accord's combination of fuel economy (up to 36 mpg highway), practicality, and reliability struck a chord with buyers seeking an alternative to domestic offerings."
        },
        {
          type: "specs",
          title: "Honda Accord Through the Generations",
          data: [
            { label: "First Generation", value: "1976-1981: Compact hatchback, later sedan" },
            { label: "Third Generation", value: "1986-1989: First Accord built in USA" },
            { label: "Fifth Generation", value: "1994-1997: Grew to midsize classification" },
            { label: "Eighth Generation", value: "2008-2012: Split into global and American models" },
            { label: "Current Generation", value: "2023-present: Hybrid-focused powertrain strategy" }
          ]
        },
        {
          type: "quote",
          content: "The Accord represents Honda's philosophy perfectly: practical innovation focused on the user experience. Each generation has built upon this foundation while adapting to changing consumer preferences.",
          author: "Robert Cumberford, Automotive Design Critic"
        },
        {
          type: "heading",
          content: "Middle Years (1982-1997): Growing With America"
        },
        {
          type: "paragraph",
          content: "As the Accord's popularity soared, Honda expanded its capabilities and dimensions. The second generation introduced a four-door sedan variant, while the third generation marked a significant milestone: production began at Honda's Marysville, Ohio plant in 1982, making the Accord the first Japanese car manufactured in the United States."
        },
        {
          type: "paragraph",
          content: "The fourth and fifth generations saw the Accord grow into a true midsize sedan, adding power, refinement, and features with each iteration. By the mid-1990s, the Accord had become America's best-selling car, a position it would hold multiple times over the following decades. The once-foreign nameplate had become as American as apple pie."
        },
        {
          type: "heading",
          content: "Modern Era (1998-2017): Technology and Refinement"
        },
        {
          type: "paragraph",
          content: "The sixth through ninth generations continued the Accord's evolution toward greater refinement, performance, and technology. The 1998 model introduced Honda's VTEC technology across the lineup, while the 2003 redesign brought more powerful engines and improved safety features. The 2008 model grew significantly in size and offered a powerful V6 option that produced 268 horsepower—a far cry from the original's modest output."
        },
        {
          type: "paragraph",
          content: "These years also saw Honda experimenting with alternative powertrains. The Accord Hybrid debuted in 2005, though this early version prioritized performance over efficiency and was discontinued after three years. A more fuel-focused hybrid returned in 2013, signaling Honda's renewed commitment to electrification."
        },
        {
          type: "heading",
          content: "Current Generation (2018-Present): Embracing Electrification"
        },
        {
          type: "paragraph",
          content: "The tenth generation Accord, introduced in 2018, represented perhaps the most dramatic redesign in the model's history. Its fastback profile, turbocharged engines, and advanced technology suite won widespread acclaim, earning it North American Car of the Year honors. The hybrid variant finally hit its stride, delivering exceptional efficiency without compromising the Accord's trademark drivability."
        },
        {
          type: "paragraph",
          content: "For 2023, the eleventh-generation Accord doubled down on Honda's hybrid strategy, with the electrified powertrain offered on more trim levels and expected to account for the majority of sales. As the automotive industry accelerates toward full electrification, the Accord is once again evolving with the times while maintaining its core values of quality, efficiency, and thoughtful design."
        },
        {
          type: "cta",
          title: "Discover Vintage Accords",
          description: "Browse our gallery of historically significant Honda Accord models from private collections and museums around the world.",
          buttonText: "View Gallery"
        }
      ]
    }
  },
  // Ferrari 296 GT3 Article (HeroSlide 1)
  {
    id: 'hero-slide-1',
    title: '2025 Ferrari 296 GT3: The Ultimate Track Weapon',
    imageUrl: 'https://www.ferrarisiliconvalley.com/static/dealer-20428/New_Ferrari_V12_ext_02_red_media_de9bb413-30d8-448c-bb64-2458e003d949.webp',
    category: 'First Drive',
    date: 'May 31, 2025',
    detailUrl: '/article/hero-slide-1',
    featured: true,
    photoCount: 24,
    content: {
      subtitle: "Ferrari's latest track-focused supercar combines revolutionary hybrid technology with raw performance, setting new benchmarks for GT racing.",
      author: "John Carter",
      authorTitle: "Senior Performance Editor",
      readTime: "10 min read",
      sections: [
        {
          type: "paragraph",
          content: "Ferrari has once again redefined what's possible on the track with the 2025 296 GT3, a thoroughbred racing machine that represents the pinnacle of the company's engineering prowess. After spending two full days with it at Monza and Fiorano, I can confidently say this is the most responsive and capable GT car Ferrari has ever produced."
        },
        {
          type: "paragraph",
          content: "The 296 GT3 isn't just an evolution of Ferrari's racing lineage—it's a revolution. The hybrid powertrain delivers instantaneous torque while maintaining the soul-stirring soundtrack that has defined Ferrari for generations."
        },
        {
          type: "heading",
          content: "Powertrain: The Best of Both Worlds"
        },
        {
          type: "paragraph",
          content: "At the heart of the 296 GT3 is a 3.0-liter twin-turbocharged V6 engine paired with a cutting-edge electric motor. Together, they produce a staggering 830 horsepower and 546 lb-ft of torque. What makes this powertrain special isn't just the raw numbers, but how it delivers them."
        },
        {
          type: "paragraph",
          content: "The electric motor fills in any turbo lag, providing immediate response from even the slightest throttle input. The transition between electric and combustion power is seamless, giving drivers confidence to exploit the car's capabilities fully."
        },
        {
          type: "specs",
          title: "Performance Specifications",
          data: [
            { label: "Engine", value: "3.0L Twin-Turbo V6 Hybrid" },
            { label: "Power", value: "830 hp combined" },
            { label: "Torque", value: "546 lb-ft" },
            { label: "0-60 mph", value: "2.7 seconds" },
            { label: "Top Speed", value: "205 mph" },
            { label: "Weight", value: "2,800 lbs (dry)" }
          ]
        },
        {
          type: "heading",
          content: "Chassis and Aerodynamics: Defying Physics"
        },
        {
          type: "paragraph",
          content: "Ferrari's engineers have created a carbon fiber monocoque that achieves remarkable rigidity while keeping weight to an absolute minimum. The 296 GT3 weighs just 2,800 pounds dry, giving it an exceptional power-to-weight ratio."
        },
        {
          type: "paragraph",
          content: "Aerodynamically, the 296 GT3 generates over 1,200 pounds of downforce at 155 mph. The massive rear wing, underbody diffuser, and precisely engineered vents work in harmony to keep the car planted through high-speed corners. During our testing at Monza's Parabolica, the car remained incredibly stable even when pushed to its limits."
        },
        {
          type: "quote",
          content: "The 296 GT3 redefines what's possible in a customer racing car. It combines technological innovation with the passion and soul that has always defined Ferrari.",
          author: "Antonello Coletta, Head of Ferrari Attività Sportive GT"
        },
        {
          type: "heading",
          content: "Driver-Focused Interior"
        },
        {
          type: "paragraph",
          content: "Inside the cockpit, everything is optimized for the driver. The steering wheel features F1-derived controls, allowing adjustments to traction control, ABS, engine mapping, and hybrid recovery without taking your hands off the wheel. The digital display provides all critical information at a glance, with customizable layouts depending on driver preference."
        },
        {
          type: "paragraph",
          content: "Carbon fiber, Alcantara, and exposed metal create an environment that feels both purposeful and premium. Despite being a hardcore track car, the 296 GT3 offers surprising comfort during extended sessions."
        },
        {
          type: "heading",
          content: "Racing Heritage and Future"
        },
        {
          type: "paragraph",
          content: "The 296 GT3 builds on Ferrari's illustrious racing history while embracing the future of motorsport. It's designed to compete in GT3 championships worldwide, including the WEC, IMSA, and GT World Challenge."
        },
        {
          type: "paragraph",
          content: "Ferrari has already secured significant customer interest, with top teams like AF Corse and Iron Lynx committing to campaign the car in 2025. With its combination of performance, reliability, and driver-friendly characteristics, the 296 GT3 is poised to continue Ferrari's winning tradition."
        },
        {
          type: "cta",
          title: "Experience Ferrari Performance",
          description: "Book a track day experience with the Ferrari 296 GT3 at select circuits worldwide.",
          buttonText: "Learn More"
        }
      ]
    }
  },
  // Tesla vs Lucid Article (HeroSlide 2)
  {
    id: 'hero-slide-2',
    title: '2025 Tesla Model S Plaid vs 2024 Lucid Air Sapphire',
    imageUrl: 'https://www.motortrend.com/uploads/2024/02/023-2022-Tesla-Model-S-Plaid-2024-Lucid-Air-Sapphire.jpg',
    category: 'Comparison',
    date: 'May 30, 2025',
    detailUrl: '/article/hero-slide-2',
    featured: true,
    photoCount: 32,
    content: {
      subtitle: "Electric super-sedan showdown: Tesla's Plaid takes on Lucid's Sapphire in the ultimate battle of speed, luxury, and technology.",
      author: "Sarah Johnson",
      authorTitle: "Chief Technology Editor",
      readTime: "12 min read",
      sections: [
        {
          type: "paragraph",
          content: "The electric performance sedan segment has reached extraordinary heights, with two American manufacturers pushing the boundaries of what battery-powered vehicles can achieve. In this head-to-head comparison, we pit the refreshed 2025 Tesla Model S Plaid against the 2024 Lucid Air Sapphire—two vehicles that offer supercar-beating acceleration while seating five adults in luxury."
        },
        {
          type: "paragraph",
          content: "We spent two weeks with both cars, subjecting them to exhaustive testing: drag races, mountain roads, highway cruising, charging evaluations, and everyday usability. The results revealed strengths and weaknesses for both contenders in this high-stakes electric showdown."
        },
        {
          type: "heading",
          content: "Performance: Breaking the Laws of Physics"
        },
        {
          type: "paragraph",
          content: "The raw acceleration figures of these electric titans are staggering. The Tesla Model S Plaid, with its tri-motor setup producing 1,100 horsepower (up from 1,020 in previous years), rockets to 60 mph in just 1.99 seconds with our testing equipment. The Lucid Air Sapphire, also featuring a tri-motor architecture with 1,234 horsepower, matches this with an identical 1.99-second 0-60 mph time."
        },
        {
          type: "paragraph",
          content: "Where the cars begin to differentiate is in sustained performance. In our quarter-mile testing, the Lucid pulled ahead with a 8.94-second run at 156 mph, compared to the Tesla's 9.21 seconds at 152 mph. The Lucid's superior thermal management became evident during repeated runs, where the Tesla began to show performance degradation after three consecutive launches."
        },
        {
          type: "specs",
          title: "Performance Comparison",
          data: [
            { label: "Tesla Model S Plaid", value: "1,100 hp / 1.99s 0-60" },
            { label: "Lucid Air Sapphire", value: "1,234 hp / 1.99s 0-60" },
            { label: "Tesla Quarter-Mile", value: "9.21s @ 152 mph" },
            { label: "Lucid Quarter-Mile", value: "8.94s @ 156 mph" },
            { label: "Tesla Top Speed", value: "200 mph (claimed)" },
            { label: "Lucid Top Speed", value: "205 mph (claimed)" }
          ]
        },
        {
          type: "heading",
          content: "Range and Charging: The Long Haul"
        },
        {
          type: "paragraph",
          content: "Range anxiety continues to diminish with these flagship electric vehicles. The 2025 Tesla Model S Plaid offers an EPA-estimated 412 miles, a modest improvement over previous iterations. The Lucid Air Sapphire, drawing from the company's efficiency expertise, delivers an impressive 446 miles per charge."
        },
        {
          type: "paragraph",
          content: "In our real-world highway test at a constant 70 mph, the Lucid achieved 415 miles before requiring a charge, while the Tesla managed 378 miles—both impressive figures but falling short of their EPA ratings, as expected under sustained high-speed conditions."
        },
        {
          type: "paragraph",
          content: "Charging capabilities favor the Lucid, with its 900-volt architecture accepting up to 350 kW at compatible stations. In optimal conditions, we added 200 miles of range in just 12 minutes. The Tesla, with its recently upgraded charging capacity, peaked at 250 kW, adding 175 miles in 15 minutes."
        },
        {
          type: "quote",
          content: "The battle between Tesla and Lucid represents the new frontier of electric performance—where the winners aren't just measured by speed, but by how they balance raw power with efficiency, luxury, and technology.",
          author: "Dr. Mark Reynolds, Automotive Electrification Expert"
        },
        {
          type: "heading",
          content: "Luxury and Interior: Contrasting Philosophies"
        },
        {
          type: "paragraph",
          content: "Inside these electric powerhouses, two distinct design philosophies emerge. Tesla continues its minimalist approach with the Plaid, centering the experience around the 17-inch horizontal touchscreen and yoke-style steering wheel (a conventional wheel is now optional for 2025). Material quality has improved notably, with better fitting panels and more premium touch points."
        },
        {
          type: "paragraph",
          content: "Lucid takes a more traditional luxury approach with the Sapphire, featuring multiple screens, physical controls for critical functions, and materials that would be at home in a Bentley or Rolls-Royce. The Sapphire's interior feels more special, with its floating glass cockpit, meticulously stitched leather, and Alcantara headliner."
        },
        {
          type: "heading",
          content: "Technology and Software: The Digital Experience"
        },
        {
          type: "paragraph",
          content: "Tesla's software integration remains its strongest advantage. The intuitive interface, regular over-the-air updates, and ecosystem of features from entertainment to vehicle controls set a benchmark that competitors struggle to match. The latest iteration of Full Self-Driving (now in version 12.4) demonstrates incremental improvements in urban environments."
        },
        {
          type: "paragraph",
          content: "Lucid's DreamDrive Pro has closed some of the gap, offering advanced driver assistance with a 32-sensor suite including LiDAR—hardware that Tesla conspicuously omits. While Lucid's software feels less mature, its foundation appears more robust for future autonomous capabilities."
        },
        {
          type: "cta",
          title: "Compare Electric Performance Cars",
          description: "Use our interactive tool to compare specifications, pricing, and features across all high-performance EVs.",
          buttonText: "Start Comparing"
        }
      ]
    }
  },
  // Electric vs Gas Article (HeroSlide 3)
  {
    id: 'hero-slide-3',
    title: 'Electric vs Gas: The Future of Performance Cars',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&h=1080',
    category: 'Analysis',
    date: 'May 29, 2025',
    detailUrl: '/article/hero-slide-3',
    featured: true,
    photoCount: 18,
    content: {
      subtitle: "As electrification transforms the automotive industry, we examine how traditional combustion and electric powertrains are shaping the future of performance.",
      author: "Mike Thompson",
      authorTitle: "Chief Editorial Director",
      readTime: "15 min read",
      sections: [
        {
          type: "paragraph",
          content: "The automotive world stands at a crossroads. Traditional internal combustion engines, refined over more than a century, face an existential challenge from rapidly evolving electric powertrains. For enthusiasts and industry observers alike, this transition raises profound questions about the very nature of performance cars and what the future holds for driving excitement."
        },
        {
          type: "paragraph",
          content: "In this comprehensive analysis, we examine both powertrain technologies through multiple lenses: performance capabilities, driving experience, technical innovation, and emotional appeal. Our findings reveal a nuanced picture that defies simplistic 'better or worse' comparisons."
        },
        {
          type: "heading",
          content: "Performance Metrics: By The Numbers"
        },
        {
          type: "paragraph",
          content: "Electric vehicles have established an undeniable advantage in acceleration. The instant torque delivery of electric motors allows even mainstream EVs to outperform many combustion-powered sports cars from a standstill. Flagship electric performance models like the Rimac Nevera, Tesla Model S Plaid, and Lucid Air Sapphire achieve sub-2-second 0-60 mph times that were unimaginable in production cars just a decade ago."
        },
        {
          type: "paragraph",
          content: "Combustion engines, however, retain advantages in sustained high-speed performance and track endurance. The latest gas-powered hypercars from manufacturers like Koenigsegg, Pagani, and Bugatti can maintain peak performance for longer periods without the thermal limitations or battery depletion issues that still affect electric vehicles."
        },
        {
          type: "specs",
          title: "Technology Comparison",
          data: [
            { label: "Acceleration", value: "Advantage: Electric" },
            { label: "Top Speed", value: "Advantage: Combustion" },
            { label: "Track Endurance", value: "Advantage: Combustion" },
            { label: "Energy Efficiency", value: "Advantage: Electric" },
            { label: "Sound Experience", value: "Advantage: Combustion" },
            { label: "Maintenance", value: "Advantage: Electric" }
          ]
        },
        {
          type: "heading",
          content: "The Driving Experience: Beyond Numbers"
        },
        {
          type: "paragraph",
          content: "Performance metrics tell only part of the story. The subjective experience of driving—the sensory feedback, emotional connection, and overall engagement—often matters more to enthusiasts than absolute speed."
        },
        {
          type: "paragraph",
          content: "Combustion engines deliver a multi-sensory experience difficult to replicate with electric power. The mechanical symphony of a naturally aspirated Ferrari V12, the distinctive burble of an American V8, or the precise whine of a Porsche flat-six creates an emotional connection that transcends rational evaluation. The vibrations, gear changes, and even the slight delay in throttle response engage drivers in a dialogue with their machines."
        },
        {
          type: "paragraph",
          content: "Electric performance cars offer a different but equally valid experience. The seamless, silent delivery of tremendous power creates an almost otherworldly sensation—what test drivers often describe as a 'hyperspace' effect. The precision of electric motor control allows for tuning possibilities that combustion engines cannot match, including the ability to instantly adjust power delivery to individual wheels for unprecedented handling capabilities."
        },
        {
          type: "quote",
          content: "The debate between electric and combustion isn't about which is better—it's about acknowledging they offer fundamentally different experiences. Both can be extraordinary in their own right.",
          author: "Adrian Newey, Legendary Automotive Engineer"
        },
        {
          type: "heading",
          content: "The Hybrid Middle Ground"
        },
        {
          type: "paragraph",
          content: "As the industry transitions, hybrid powertrains represent a compelling middle path. Modern hypercars like the Ferrari SF90 Stradale, McLaren Artura, and Mercedes-AMG One demonstrate how electrification can enhance rather than replace combustion engines."
        },
        {
          type: "paragraph",
          content: "These hybrid systems eliminate turbo lag, fill torque gaps, and enable limited electric-only operation while preserving the acoustic and tactile qualities that enthusiasts cherish. For many manufacturers, hybrids represent not just a transitional technology but potentially an optimal solution for high-performance vehicles."
        },
        {
          type: "heading",
          content: "Environmental Considerations"
        },
        {
          type: "paragraph",
          content: "Any discussion of powertrain futures must acknowledge environmental impacts. While electric vehicles produce zero tailpipe emissions, their overall environmental footprint depends on factors including battery production, electricity sources, and lifecycle considerations."
        },
        {
          type: "paragraph",
          content: "Synthetic fuels (e-fuels) represent a potential path forward for combustion engines, offering the possibility of carbon-neutral operation without requiring completely new vehicle architectures. Companies like Porsche are investing heavily in this technology, particularly for their heritage models and motorsport applications."
        },
        {
          type: "cta",
          title: "Join The Discussion",
          description: "Share your perspective on the future of performance cars in our community forum.",
          buttonText: "Join Conversation"
        }
      ]
    }
  },
  // Ford Mustang Article (HeroSlide 4)
  {
    id: 'hero-slide-4',
    title: '2025 Ford Mustang 60th Anniversary Edition Revealed',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-ford-mustang-60th-anniversary-exterior-66227932bb88e.jpg',
    category: 'New Model',
    date: 'May 27, 2025',
    detailUrl: '/article/hero-slide-4',
    featured: true,
    photoCount: 28,
    content: {
      subtitle: "Ford celebrates six decades of America's favorite pony car with a limited-edition model featuring exclusive design elements and performance upgrades.",
      author: "MotorTrend Staff",
      authorTitle: "Editorial Team",
      readTime: "8 min read",
      sections: [
        {
          type: "paragraph",
          content: "Ford has unveiled the 2025 Mustang 60th Anniversary Edition, a commemorative model celebrating six decades since the original pony car debuted at the 1964 World's Fair. Limited to just 1,964 units globally—a nod to the year of the Mustang's introduction—this special edition combines heritage-inspired design elements with modern performance capabilities."
        },
        {
          type: "paragraph",
          content: "Revealed at a special event at Ford's headquarters in Dearborn, Michigan, the anniversary model will be available in both fastback and convertible body styles, with deliveries beginning in April 2025 to coincide with the exact date of the original Mustang's debut."
        },
        {
          type: "heading",
          content: "Heritage-Inspired Design"
        },
        {
          type: "paragraph",
          content: "The 60th Anniversary Edition features a unique Wimbledon White exterior paint option—the same color as Mustang VIN 001 purchased by Stanley Tucker in April 1964. Alternatively, buyers can select Iconic Silver, Race Red, or a new exclusive color called Diamond Blue that pays homage to the Guardsman Blue stripes of Shelby GT350 models."
        },
        {
          type: "paragraph",
          content: "Distinctive design elements include heritage-inspired side stripes, unique badging, and 19-inch polished aluminum wheels with a design that evokes the styled steel wheels of early Mustangs. The front grille features a special floating pony emblem surrounded by a commemorative wreath, similar to the 25th anniversary models from 1989."
        },
        {
          type: "paragraph",
          content: "Inside, the anniversary treatment continues with exclusive two-tone leather upholstery in Ebony and Palomino, embossed 60th Anniversary logos on the seats, and a serialized dashboard plaque. The digital instrument cluster features unique startup graphics that animate through six decades of Mustang evolution."
        },
        {
          type: "specs",
          title: "Engine Options",
          data: [
            { label: "GT (5.0L V8)", value: "480 hp / 415 lb-ft" },
            { label: "Dark Horse (5.0L V8)", value: "500 hp / 428 lb-ft" },
            { label: "Transmission Options", value: "6-speed manual / 10-speed auto" },
            { label: "0-60 mph (Dark Horse)", value: "3.9 seconds" },
            { label: "Quarter-Mile (Dark Horse)", value: "12.0 seconds" }
          ]
        },
        {
          type: "heading",
          content: "Performance Enhancements"
        },
        {
          type: "paragraph",
          content: "The 60th Anniversary Edition is available with either the Mustang GT's 5.0-liter Coyote V8 producing 480 horsepower or the Dark Horse-tuned version delivering 500 horsepower. Both engines can be paired with either the 10-speed automatic or the six-speed TREMEC manual transmission."
        },
        {
          type: "paragraph",
          content: "All Anniversary models come standard with the Performance Package, which includes Brembo six-piston front brake calipers, a Torsen limited-slip differential, and MagneRide adaptive dampers. The active exhaust system has been specially tuned to deliver a distinctive soundtrack that Ford engineers describe as 'heritage-inspired but forward-looking.'"
        },
        {
          type: "quote",
          content: "The Mustang has endured for 60 years because it's more than just a car—it's the embodiment of American automotive passion and freedom. This anniversary edition honors that legacy while looking firmly toward the future.",
          author: "Jim Farley, Ford Motor Company CEO"
        },
        {
          type: "heading",
          content: "Technology and Connectivity"
        },
        {
          type: "paragraph",
          content: "Despite its heritage focus, the 60th Anniversary Edition incorporates Ford's latest technology. The SYNC 5 infotainment system operates on a 13.2-inch touchscreen with wireless Apple CarPlay and Android Auto. A 12.4-inch digital instrument cluster features six customizable layouts inspired by different Mustang eras."
        },
        {
          type: "paragraph",
          content: "The anniversary model also debuts Ford's new Performance App, which allows owners to analyze driving data, share performance metrics, and access a digital garage containing documentation specific to their vehicle's build specification and production history."
        },
        {
          type: "heading",
          content: "Availability and Pricing"
        },
        {
          type: "paragraph",
          content: "The 2025 Mustang 60th Anniversary Edition will be available to order starting June 1, 2025, with deliveries beginning in April 2025. Pricing starts at $59,900 for the GT fastback and $65,900 for the GT convertible. Dark Horse models command a $10,000 premium over their GT counterparts."
        },
        {
          type: "paragraph",
          content: "Each vehicle comes with a commemorative book documenting Mustang's history, a scale model matching the customer's specification, and an invitation to a special Mustang 60th Anniversary celebration event at the model's spiritual home—Charlotte Motor Speedway."
        }
      ]
    }
  },
  // --- Honda Accord Articles ---
  {
    id: "honda-article-1",
    title: "2025 Honda Accord Review: The Midsize Sedan Benchmark",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37ac7ff34400082301e3/16-2025-honda-accord-top-view.jpg",
    date: "May 15, 2025",
    category: "Review",
    featured: true,
    detailUrl: "/article/honda-article-1"
  },
  {
    id: "honda-accord-article-2",
    title: "Honda Accord vs Toyota Camry: 2025 Midsize Sedan Showdown",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a4c3b0adb8a4000836452a/2025-toyota-camry-vs-2024-honda-accord-feature-image.jpg",
    date: "May 28, 2025",
    category: "Comparison",
    featured: false,
    detailUrl: "/article/honda-accord-article-2"
  },
  {
    id: "honda-accord-article-3",
    title: "2025 Honda Accord Hybrid: 48 MPG and Worth Every Penny",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37864b4868000853819e/1-2025-honda-accord-front-view.jpg",
    date: "May 22, 2025",
    category: "Hybrid",
    featured: false,
    detailUrl: "/article/honda-accord-article-3"
  },
  {
    id: "honda-accord-article-4",
    title: "Living with the 2025 Honda Accord: Three-Month Long-Term Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37864b4868000853819e/1-2025-honda-accord-front-view.jpg",
    date: "May 18, 2025",
    category: "Long Term",
    featured: false,
    detailUrl: "/article/honda-accord-article-4"
  },
  {
    id: "honda-accord-article-5",
    title: "Honda Accord Through the Years: Evolution of an Icon",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b50c82f2a02e00085c5827/honda-accord-sir-4wd-wagon.jpeg",
    date: "May 10, 2025",
    category: "History",
    featured: false,
    detailUrl: "/article/honda-accord-article-5"
  },
  {
    id: "honda-accord-article-6",
    title: "Best Honda Accord Accessories for 2025 Models",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a754a2647660009869398/003-2025-honda-accord-hybrid.jpg",
    date: "May 05, 2025",
    category: "Accessories",
    featured: false,
    detailUrl: "/article/honda-accord-article-6"
  },
  {
    id: "honda-article-2",
    title: "2025 Honda CR-V Hybrid: Family SUV Gets Smarter",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6807e90a5275530008bc0a89/002-2026-honda-crv.jpg",
    date: "May 10, 2025",
    category: "Hybrid",
  },
  {
    id: "honda-article-3",
    title: "2024 Honda Civic Type R: Hot Hatch King?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d316690e08b0008b8a28b/1-2025-honda-civic-type-r-front-view.jpg",
    date: "April 28, 2025",
    category: "Performance",
  },
  {
    id: "honda-article-4",
    title: "Honda Pilot 2024: Three-Row SUV for the Family",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f803940315ac000873e138/01-2025-honda-pilot-black-edition.jpg",
    date: "April 20, 2025",
    category: "SUV",
  },
  {
    id: "honda-article-5",
    title: "2025 Honda Odyssey: Still the Minivan to Beat?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6712c28ec3fea600083e5009/001-2025-honda-odyssey-elite.jpg",
    date: "April 10, 2025",
    category: "Minivan",
  },
  {
    id: "honda-article-6",
    title: "2025 Honda Ridgeline: Truck Utility, Honda Comfort",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/672d075cd198830008ca7125/23-2025-honda-ridgeline-front-view.jpg",
    date: "March 30, 2025",
    category: "Truck",
  },
  {
    id: "1",
    title: "2025 Ferrari 12Cilindri First Look: The 819-HP Replacement for the 812 Superfast",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68000bec7be0880008e8056a/8-2025-ferrari-296-gtb-front-view.jpg",
    date: "May 5, 2025",
    category: "Review",
    featured: true,
  },
  {
    id: "2",
    title: "Electric SUVs With the Longest Range in 2025",
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "May 3, 2025",
    category: "Guide",
  },
  {
    id: "3",
    title: "Best Performance Cars Under $50,000",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    date: "April 30, 2025",
    category: "Buyer's Guide",
  },
  {
    id: "4",
    title: "2025 Tesla Cybertruck Owner Review: Living With the Future",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67a2776e659f9800084efe53/39-2025-tesla-cybertruck-front-view.jpg",
    date: "April 28, 2025",
    category: "Long-Term Test",
    photoCount: 12,
  },
  {
    id: "5",
    title: "Hybrid vs. Electric: Which Is Right For You in 2025?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b8df47ba5411000890c695/camry-hybrid-vs-kona-electric.jpg",
    date: "April 25, 2025",
    category: "Comparison",
  },
  {
    id: "6",
    title: "Future of Off-Roading: Electric 4x4s Put to the Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65baf60fa70c820008b0c38b/2017-mercedes-benz-g-550-off-roading-04.jpg",
    date: "April 22, 2025",
    category: "Adventure",
    photoCount: 8,
  },
  {
    id: "7",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67c22302ae874400087d4ca9/23-2025-lucid-air-front-view.jpg",
    date: "May 10, 2025",
    category: "Technology",
    featured: false,
    detailUrl: "/article/7"
  },
];

/**
 * MOCK NEW CARS DATA
 * 
 * This section contains all new car mock data used in the application.
 * Cars are organized into categories:
 * 1. Honda Accord specific new cars (IDs honda-accord-new-*)
 * 2. Other popular new car models with high-quality automotive images
 */
export const mockNewCars: CarData[] = [
  // --- Honda Accord New Cars ---
  {
    id: "honda-accord-new-1",
    title: "2025 Honda Accord Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    price: "$37,000",
    msrp: "$37,000",
    category: "Sedan",
    isNew: true,
    bodyStyle: "Sedan",
    year: "2025",
    make: "Honda",
    model: "Accord",
    fuelType: "Hybrid",
    transmission: "CVT",
    motorTrendScore: "8.7",
    motorTrendRank: "#2",
    motorTrendCategoryRank: true,
  },
  {
    id: "honda-accord-new-2",
    title: "2025 Honda Accord Sport",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd0dfb7e8500081c138d/2018-honda-accord-touring-2-5t-front-view-in-motion-01.jpg",
    price: "$32,500",
    msrp: "$32,500",
    category: "Sedan",
    isNew: true,
    make: "Honda",
    model: "Accord",
    bodyStyle: "Sedan",
    year: "2025",
    fuelType: "Gasoline",
    transmission: "CVT",
    motorTrendScore: "8.5",
    motorTrendRank: "#3",
    motorTrendCategoryRank: true,
    detailUrl: "/new-car/honda-accord-new-2"
  },
  {
    id: "honda-accord-new-3",
    title: "2025 Honda Accord EX-L",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bd66eb6a506700087efab4/2012-honda-accord-ex-l-sedan-front-three-quarter.jpg",
    price: "$34,000",
    msrp: "$34,000",
    category: "Sedan",
    isNew: true,
    make: "Honda",
    model: "Accord",
    bodyStyle: "Sedan",
    year: "2025",
    fuelType: "Gasoline",
    transmission: "CVT",
    motorTrendScore: "8.4",
    motorTrendRank: "#3",
    motorTrendCategoryRank: true,
    detailUrl: "/new-car/honda-accord-new-3"
  },
  {
    id: "honda-accord-new-4",
    title: "2025 Honda Accord Hybrid EX",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37bb03565f0008090977/22-2025-honda-accord-rear-view.jpg",
    price: "$33,500",
    msrp: "$33,500",
    category: "Hybrid Sedan",
    isNew: true,
    bodyStyle: "Sedan",
    year: "2025",
    make: "Honda",
    model: "Accord",
    fuelType: "Hybrid",
    transmission: "CVT",
    motorTrendScore: "8.6",
    motorTrendRank: "#2",
    motorTrendCategoryRank: true,
    detailUrl: "/new-car/honda-accord-new-4"
  },
  {
    id: "honda-accord-new-5",
    title: "2025 Honda Accord Hybrid Sport",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37a37ff34400082301dd/12-2025-honda-accord-rear-view.jpg",
    price: "$32,990",
    msrp: "$32,990",
    category: "Hybrid Sedan",
    make: "Honda",
    model: "Accord",
    bodyStyle: "Sedan",
    year: "2025",
    fuelType: "Hybrid",
    transmission: "CVT",
    motorTrendScore: "8.8",
    motorTrendRank: "#1",
    motorTrendCategoryRank: true,
    isNew: true,
    detailUrl: "/new-car/honda-accord-new-5"
  },
  {
    id: "honda-accord-new-6",
    title: "2025 Honda Accord Sport Special Edition",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a469f17f8e48000893d717/017-2024-honda-accord-hybrid-front-three-quarters.jpg",
    price: "$33,500",
    category: "Sedan",
    isNew: true,
    bodyStyle: "Sedan",
    year: "2025",
    detailUrl: "/new-car/honda-accord-new-6"
  },
  {
    id: "honda-new-2",
    title: "2025 Honda CR-V Hybrid",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68388e3f67366d0008aebdad/001-best-selling-cars-states-honda-crv-motortrend-ryan-lugo-design.jpg",
    price: "$34,500",
    category: "SUV",
    isNew: true,
    bodyStyle: "SUV",
    year: "2025",
  },
  {
    id: "honda-new-3",
    title: "2025 Honda Civic Type R",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/22-2025-honda-civic-type-r-front-view.jpg",
    price: "$44,795",
    category: "Sport Compact",
    isNew: true,
    bodyStyle: "Hatchback",
    year: "2025",
  },
  {
    id: "honda-new-4",
    title: "2025 Honda Pilot Elite",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f803940315ac000873e138/01-2025-honda-pilot-black-edition.jpg",
    price: "$50,000",
    category: "SUV",
    isNew: true,
    bodyStyle: "SUV",
    year: "2025",
  },
  {
    id: "honda-new-5",
    title: "2025 Honda Odyssey EX-L",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/669aafc8cdb3c60008f17f07/2025hondaodysseyminivan20.png",
    price: "$41,000",
    category: "Minivan",
    isNew: true,
    bodyStyle: "Minivan",
    year: "2025",
  },
  {
    id: "honda-new-6",
    title: "2025 Honda Ridgeline Black Edition",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/672d075ece8ea400088fd122/24-2025-honda-ridgeline-side-view.jpg",
    price: "$46,500",
    category: "Truck",
    isNew: true,
    bodyStyle: "Truck",
    year: "2025",
  },
  {
    id: "new-1",
    title: "2025 Lucid Air Grand Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67eebe7faf98e400084a3e75/001-2025-lucid-air-pure-front-three-quarter-static-lead.jpg",
    price: "$87,400",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan", // Using a reliable high-quality car image from Unsplash
  },
  {
    id: "new-2",
    title: "2025 Rivian R1S",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6700323d9326e80008726afc/018-2025-rivian-r1s-dual-max.jpg",
    price: "$76,000",
    category: "Electric SUV",
    isNew: true,
    bodyStyle: "SUV",
  },
  {
    id: "new-3",
    title: "2025 BMW i5 eDrive40",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg",
    price: "$65,700",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan",
  },
  {
    id: "new-4",
    title: "2025 Ford Mustang 60th Anniversary Edition",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67803d741f7f8d00081b8228/2025fordmustanggtdspiritofamerica8.png",
    price: "$42,990", 
    category: "Sports Car",
    isNew: true,
    bodyStyle: "Sports Car",
  },
  {
    id: "new-5",
    title: "2025 Toyota Crown Signia",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a4c435544c890008b8417b/2025-toyota-crown-signia-suv-reveal-4.jpg",
    price: "$39,950",
    category: "Luxury Crossover",
    isNew: true,
    bodyStyle: "Crossover",
  },
  {
    id: "new-6",
    title: "2025 Hyundai Ioniq 6 Limited",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a13b525213f0008ca3bff/001-2025-hyundai-ioniq-5-xrt-lead.jpg",
    price: "$53,650",
    category: "Electric Sedan",
    isNew: true,
    bodyStyle: "Sedan",
  },
];

/**
 * MOCK USED CARS DATA
 * 
 * This section contains all used car mock data used in the application.
 * Cars are organized into categories:
 * 1. Honda Accord specific used cars (IDs honda-accord-used-*)
 * 2. Other popular used car models with high-quality automotive images
 */
export const mockUsedCars: CarData[] = [
  // --- Honda Accord Used Cars ---
  {
    id: "honda-accord-used-1",
    title: "2022 Honda Accord EX-L",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66e8824d603db5000878f458/2025hondaaccordhybridfrontthreequarters.jpg",
    price: "$28,500",
    category: "Sedan",
    year: "2022",
    mileage: "28,450 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Portland, OR",
    bodyStyle: "Sedan",
    detailUrl: "/used-car/honda-accord-used-1"
  },
  {
    id: "honda-accord-used-2",
    title: "2021 Honda Accord Sport 2.0T",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c41382d44ff40008eaffba/2021-honda-accord-hybrid-3.jpg",
    price: "$24,990",
    category: "Sedan",
    year: "2021",
    mileage: "35,620 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Denver, CO",
    bodyStyle: "Sedan",
    detailUrl: "/used-car/honda-accord-used-2"
  },
  {
    id: "honda-accord-used-3",
    title: "2020 Honda Accord Hybrid Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65caf55dd36fcf00083c3d7b/2020-honda-accord-touring-front-three-quarter-in-motion-view.jpg",
    price: "$26,750",
    category: "Hybrid Sedan",
    year: "2020",
    mileage: "42,890 mi",
    fuelType: "Hybrid",
    drivetrain: "FWD",
    location: "Miami, FL",
    bodyStyle: "Sedan",
    detailUrl: "/used-car/honda-accord-used-3"
  },
  {
    id: "honda-accord-used-4",
    title: "2019 Honda Accord LX",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c31ef6bf05770008b2724b/2020-honda-accord-sport-2-0t-front-three-quarter-in-motion-view-3.jpg",
    price: "$19,995",
    category: "Sedan",
    year: "2019",
    mileage: "45,300 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Chicago, IL",
    bodyStyle: "Sedan",
    detailUrl: "/used-car/honda-accord-used-4"
  },
  {
    id: "honda-accord-used-5",
    title: "2018 Honda Accord Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdcedfb7e8500081c1378/2018-honda-accord-touring-04.jpg",
    price: "$22,500",
    category: "Sedan",
    year: "2018",
    mileage: "52,100 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Houston, TX",
    bodyStyle: "Sedan",
    detailUrl: "/used-car/honda-accord-used-5"
  },
  {
    id: "honda-accord-used-6",
    title: "2017 Honda Accord Coupe EX-L V6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd15fb7e8500081c1391/2018-honda-accord-touring-2-5t-front-three-quarter-in-motion-08.jpg",
    price: "$21,800",
    category: "Coupe",
    year: "2017",
    mileage: "48,600 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Seattle, WA",
    bodyStyle: "Coupe",
    detailUrl: "/used-car/honda-accord-used-6"
  },
  {
    id: "honda-used-2",
    title: "2021 Honda CR-V Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65cf764c8d38e9000841c15d/2012-honda-crv-front-view2.jpg",
    price: "$25,900",
    category: "SUV",
    year: "2021",
    mileage: "22,000 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "San Diego, CA",
    bodyStyle: "SUV",
  },
  {
    id: "honda-used-3",
    title: "2020 Honda Civic Si",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c2804a53c45c0008da655c/2020-honda-civic-si-06.jpg",
    price: "$19,800",
    category: "Sport Compact",
    year: "2020",
    mileage: "30,500 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "San Jose, CA",
    bodyStyle: "Sedan",
  },
  {
    id: "honda-used-4",
    title: "2023 Honda Pilot Touring",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f19132cad330008ca88c6/2023-honda-pilot-elite-1.jpg",
    price: "$38,700",
    category: "SUV",
    year: "2023",
    mileage: "12,800 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "San Francisco, CA",
    bodyStyle: "SUV",
  },
  {
    id: "honda-used-5",
    title: "2021 Honda Odyssey Elite",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a44d83b4af830008ae6d1d/2024-honda-odyssey-side-view-010.jpg",
    price: "$31,200",
    category: "Minivan",
    year: "2021",
    mileage: "28,400 mi",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    location: "Oakland, CA",
    bodyStyle: "Minivan",
  },
  {
    id: "honda-used-6",
    title: "2020 Honda Ridgeline RTL-E",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1f2c4a02d960009c91a06/2023-honda-ridgeline-sport-hpd-20-motion.jpg",
    price: "$33,800",
    category: "Truck",
    year: "2020",
    mileage: "35,900 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "Sacramento, CA",
    bodyStyle: "Truck",
  },
  {
    id: "used-1",
    title: "2023 Tesla Model Y Performance",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/663515bddbe9350008773b00/002-2023-tesla-model-y.jpg",
    price: "$53,900",
    category: "Electric SUV",
    year: "2023",
    mileage: "15,245 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "San Francisco, CA",
    bodyStyle: "SUV",
  },
  {
    id: "used-2",
    title: "2022 Porsche 911 Carrera 4S",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c44b3fb907d30008f1b5b9/2022-porsche-911-gt3-9.jpg",
    price: "$124,500",
    category: "Sports Car",
    year: "2022",
    mileage: "8,670 mi",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    location: "Los Angeles, CA",
    bodyStyle: "Sports Car",
  },
  {
    id: "used-3",
    title: "2021 Ford F-150 Raptor",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6679efdd03729c0008b14be8/031-2021-ford-f-150-raptor.jpg",
    price: "$65,800",
    category: "Pickup Truck",
    year: "2021",
    mileage: "26,543 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Denver, CO",
    bodyStyle: "Truck",
  },
  {
    id: "used-4",
    title: "2025 Honda Accord Hybrid",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    price: "$72,900",
    category: "Hybrid Sedan",
    year: "2025",
    mileage: "12,876 mi",
    fuelType: "Hybrid",
    drivetrain: "FWD",
    location: "Miami, FL",
    bodyStyle: "Sedan",
  },
  {
    id: "used-5",
    title: "2020 Jeep Wrangler Unlimited Rubicon",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c37e5d81670a0008bdb6df/2020-jeep-wrangler-unlimited-rubicon-ecodiesel-22.jpg",
    price: "$45,500",
    category: "SUV",
    year: "2020",
    mileage: "32,145 mi",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    location: "Austin, TX",
    bodyStyle: "SUV",
  },
  {
    id: "used-6",
    title: "2021 Audi e-tron GT",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c42d9dadc7280009f459e8/2021-audi-rs-e-tron-gt-prototype-20.jpg",
    price: "$89,700",
    category: "Electric Sports Car",
    year: "2021",
    mileage: "14,325 mi",
    fuelType: "Electric",
    drivetrain: "AWD",
    location: "Seattle, WA",
    bodyStyle: "Sports Car",
  },
  {
    id: "bmw-3-series",
    title: "2020 BMW 3 Series",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66f1b4fea063c100087ac1dc/002-2025-bmw-i5-m60-front-view.jpg",
    price: "$29,750",
    category: "Sedan",
    year: "2020",
    mileage: "38,750 miles",
    fuelType: "Gasoline",
    drivetrain: "RWD",
    location: "San Francisco, CA",
    bodyStyle: "Sedan",
    dealerName: "BMW of San Francisco",
    dealerLocation: "San Francisco, CA"
  },
];

/**
 * MOCK PHOTOS DATA
 * 
 * This section contains all photo mock data used in the application.
 * Photos are organized into categories:
 * 1. Honda Accord specific photos (IDs honda-accord-photo-*)
 * 2. Other automotive photos with enhanced metadata and high-quality images
 */
export const mockPhotos: PhotoData[] = [
  // --- Honda Accord Photos ---
  {
    id: "honda-accord-photo-1",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    title: "2025 Honda Accord Hybrid Front View",
    position: "1/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025"
  },
  {
    id: "honda-accord-photo-2",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7545a32dcb0008742bac/001-2025-honda-accord-hybrid.jpg",
    title: "2025 Honda Accord Hybrid Side Profile",
    position: "2/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025"
  },
  {
    id: "honda-accord-photo-3",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd15fb7e8500081c1391/2018-honda-accord-touring-2-5t-front-three-quarter-in-motion-08.jpg",
    title: "2025 Honda Accord Hybrid Interior",
    position: "3/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025",
    detailUrl: "/photo/honda-accord-photo-3"
  },
  {
    id: "honda-accord-photo-4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37a67ff34400082301df/13-2025-honda-accord-rear-view.jpg",
    title: "2025 Honda Accord Hybrid Rear View",
    position: "4/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025",
    detailUrl: "/photo/honda-accord-photo-4"
  },
  {
    id: "honda-accord-photo-5",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66e87cc403a67500088187b3/2025-honda-accord-se.jpg",
    title: "2025 Honda Accord Hybrid Profile",
    position: "5/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025",
    detailUrl: "/photo/honda-accord-photo-5"
  },
  {
    id: "honda-accord-photo-6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7552958c1a00082e2e62/007-2025-honda-accord-hybrid.jpg",
    title: "2025 Honda Accord Hybrid Wheel Detail",
    position: "6/6",
    make: "Honda",
    carModel: "Accord",
    year: "2025",
    detailUrl: "/photo/honda-accord-photo-6"
  },
  {
    id: "honda-photo-2",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6787f2342a8b790008a4202b/2025-honda-cr-v-front-view-1.jpg",
    title: "2025 Honda CR-V Hybrid Front Angle",
    position: "2/6",
    make: "Honda",
    carModel: "CR-V",
    year: "2025"
  },
  {
    id: "honda-photo-3",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d317290e08b0008b8a28c/3-2025-honda-civic-type-r-front-view.jpg",
    title: "2025 Honda Civic Type R",
    position: "3/6",
    make: "Honda",
    carModel: "Civic Type R",
    year: "2025"
  },
  {
    id: "honda-photo-4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b709ac9e852f000896101a/2016-honda-pilot-16.jpg",
    title: "2024 Honda Pilot Front View",
    position: "4/6",
    make: "Honda",
    carModel: "Pilot",
    year: "2024"
  },
  {
    id: "honda-photo-5",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6712c2acbf21860008e085a1/013-2025-honda-odyssey-elite.jpg",
    title: "2025 Honda Odyssey Front View",
    position: "5/6",
    make: "Honda",
    carModel: "Odyssey",
    year: "2025"
  },
  {
    id: "honda-photo-6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b9a9104c372d0008b64bb0/2017-honda-ridgeline-rtl-e-gas-station-stop-02.jpg",
    title: "2025 Honda Ridgeline Front View",
    position: "6/6",
    make: "Honda",
    carModel: "Ridgeline",
    year: "2025"
  },
  {
    id: "1",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ee783da2cd0008171982/2023-aston-martin-v12-vantage-track-driving-4.jpg",
    title: "2023 Aston Martin Vantage at Sunset",
    position: "1/14",
    make: "Aston Martin",
    carModel: "Vantage",
    year: "2023"
  },
  {
    id: "2",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f01cce758ec0008136065/tunerevo-anaheim-bmw-i8.jpg",
    title: "2022 BMW i8 Front Angle",
    position: "2/14",
    make: "BMW",
    carModel: "i8",
    year: "2022"
  },
  {
    id: "3",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659f167267366d0008dd93b1/2023-mercedes-benz-amg-gt63-4-door-coupe-interior-15.jpg",
    title: "2023 Mercedes-AMG GT Interior",
    position: "3/14",
    make: "Mercedes-Benz",
    carModel: "AMG GT",
    year: "2023"
  },
  {
    id: "4",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a0be80e0fe3e00085a93e8/2023-porsche-911-gt3-rs-6.jpg",
    title: "2023 Porsche 911 GT3 RS Track Day",
    position: "4/14",
    make: "Porsche",
    carModel: "911 GT3 RS",
    year: "2023"
  },
  {
    id: "5",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659fa24d59558a0008c53288/ferrari-sf90-spider-first-test-44.jpg",
    title: "2023 Ferrari SF90 Stradale",
    position: "5/14",
    make: "Ferrari",
    carModel: "SF90 Stradale",
    year: "2023"
  },
  {
    id: "6",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a27391ad70b4000865f8e9/2022-lamborghini-countach-lpi-800-4-7.jpg",
    title: "2022 Lamborghini Huracán EVO",
    position: "6/14",
    make: "Lamborghini",
    carModel: "Huracán EVO",
    year: "2022"
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "2022 McLaren 720S Detail Shot",
    position: "7/14",
    make: "McLaren",
    carModel: "720S",
    year: "2022"
  },
  {
    id: "8",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c5333cf028450008666d96/2022-jaguar-f-type-r-dynamic-p450-13.jpg",
    title: "2022 Jaguar F-Type R Coupe",
    position: "8/14",
    make: "Jaguar",
    carModel: "F-Type R",
    year: "2022"
  }
];

/**
 * MOCK VIDEOS DATA
 * 
 * This section contains all video mock data used in the application.
 * Videos are organized into categories:
 * 1. Honda Accord specific videos (IDs honda-accord-video-*)
 * 2. Other automotive videos with high-quality thumbnails
 */
export const mockVideos: VideoData[] = [
  // --- Honda Accord Videos ---
  {
    id: "honda-accord-video-1",
    title: "2025 Honda Accord Touring Test Drive",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/671a7554264766000986939b/008-2025-honda-accord-hybrid.jpg",
    duration: "13:05",
    detailUrl: "/video/honda-accord-video-1"
  },
  {
    id: "honda-accord-video-2",
    title: "Honda Accord vs. Toyota Camry: 2025 Midsize Sedan Battle",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a4c3b0adb8a4000836452a/2025-toyota-camry-vs-2024-honda-accord-feature-image.jpg",
    duration: "18:22",
    detailUrl: "/video/honda-accord-video-2"
  },
  {
    id: "honda-accord-video-3",
    title: "2025 Honda Accord Hybrid: In-Depth Interior Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a4d2363b7ad30008cbfce6/006-2024-honda-accord-hybrid-driver-cabin.jpg",
    duration: "09:45",
    detailUrl: "/video/honda-accord-video-3"
  },
  {
    id: "honda-accord-video-4",
    title: "2025 Honda Accord: Performance & Handling Track Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a469ea7f8e48000893d711/032-2024-honda-accord-hybrid-front-three-quarters-in-action.jpg",
    duration: "15:38",
    detailUrl: "/video/honda-accord-video-4"
  },
  {
    id: "honda-accord-video-5",
    title: "Honda Accord: History & Evolution (1976-2025)",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6763144d7da72a0008ca90b5/mt75-msc-1982-honda-accord.jpg",
    duration: "22:15",
    detailUrl: "/video/honda-accord-video-5"
  },
  {
    id: "honda-accord-video-6",
    title: "2025 Honda Accord Tech Features & Infotainment Tutorial",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37947ff34400082301d9/6-2025-honda-accord-interior.jpg",
    duration: "11:52",
    detailUrl: "/video/honda-accord-video-6"
  },
  {
    id: "honda-video-2",
    title: "2025 Honda CR-V Hybrid vs. Toyota RAV4 Hybrid Comparison",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a16d3ee28b82000847aa29/2023-honda-cr-v-hybrid-vs-2023-toyota-rav4-hybrid-comparison-55.jpg",
    duration: "12:22",
  },
  {
    id: "honda-video-3",
    title: "2025 Honda Civic Type R Track Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31a066f0e90008e579f4/18-2025-honda-civic-type-r-side-view.jpg",
    duration: "10:30",
  },
  {
    id: "honda-video-4",
    title: "2024 Honda Pilot Full Family Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b6a5e53b36ca00083f8272/2016-honda-pilot-front-three-quarter-03.jpg",
    duration: "15:00",
  },
  {
    id: "honda-video-5",
    title: "2025 Honda Odyssey: Best Minivan Features",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67801f81e5984c0008196817/020-2025-honda-odyssey-interior.jpg",
    duration: "11:55",
  },
  {
    id: "honda-video-6",
    title: "2025 Honda Ridgeline Off-Road Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65dc2e6437e1e800087bfcca/2017-honda-ridgeline-rtl-e-blizzard-07.jpg",
    duration: "13:40",
  },
  // --- Car Reviews Category ---
  {
    id: "review-1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67296714564fe600071c8de3/003-2025-bmw-m5-touring-wagon.jpg",
    duration: "12:45",
  },
  {
    id: "review-2",
    title: "2025 Mercedes EQS SUV Review: Luxury Electric Flagship",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67bde8b188aa6d00084aba44/mercedes-benzeqssemi-solid-statebatterytest11.png",
    duration: "14:20",
  },
  {
    id: "review-3",
    title: "2025 Audi RS6 Avant Performance Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6685ed60b2d9990008368b70/0105-audi-rs6-gt-track-drive-thumbnail-1920x1080.jpg",
    duration: "15:30",
  },
  // --- Track & Performance Category ---
  {
    id: "track-1",
    title: "Lamborghini Revuelto: 1000HP Hypercar Track Test",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66b6901ea3735500089a5155/0116-lamborghini-revuelto-drive-thumbnail-1920x1080-v1.jpg",
    duration: "15:18",
  },
  {
    id: "track-2",
    title: "Ferrari 296 GTB Track Performance Analysis",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/658ad91d57af9a00085e6ac4/ferrari-296-gtb-action-2.jpg",
    duration: "17:22",
  },
  {
    id: "track-3",
    title: "McLaren Artura Track Day: Hybrid Performance Tested",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a16e363e3c42000895dcb4/2023-mclaren-artura-performance-track-test.jpg",
    duration: "14:10",
  },
  // --- Off-Road & Adventure Category ---
  {
    id: "offroad-1",
    title: "Toyota Tacoma TRD Pro vs. Ford Ranger Raptor: Off-Road Showdown",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/662067c76159e7000883aef9/0033-tacoma-vs-ranger-vs-colorado-comparo-thumbnail-1920x1080.jpg",
    duration: "21:45",
  },
  {
    id: "offroad-2",
    title: "Jeep Wrangler Rubicon 392 Off-Road Adventure",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/675b763a3e60930008889114/011-2025-jeep-gladiator-rubicon-x.jpg",
    duration: "18:55",
  },
  {
    id: "offroad-3",
    title: "Land Rover Defender 130 Outback Adventure",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c6e59b4dd34d0008f05bed/2023-land-rover-defender-130-outbound-v8-action.jpg",
    duration: "19:30",
  },
  // --- Classic Cars & Restorations Category ---
  {
    id: "classic-1",
    title: "Classic Porsche 911 Restoration Project",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/682cf399bc0f41000786b8ce/024-2025-aston-martin-vantage-porsche-911.jpg",
    duration: "22:15",
  },
  {
    id: "classic-2",
    title: "Ferrari 250 GTO: The Classic Restoration Story",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bb23089677b70008f8b3b0/1962-ferrari-250-gto-side.jpg",
    duration: "25:40",
  },
  {
    id: "classic-3",
    title: "Classic Ford Mustang Shelby GT500 Restoration",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66ea0c29f96f07000863ed69/032-1967-ford-mustang-cobra-ruffian-green-shelby-vintage-flares.jpg",
    duration: "20:30",
  },
  // --- EVs & Future Tech Category ---
  {
    id: "ev-1",
    title: "2025 Porsche Taycan: The Ultimate EV Sports Car?",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f1c6af2c8f3500089e03be/2025-porsche-taycan-turbo-gt-nurburgring-10.jpg",
    duration: "14:22",
    detailUrl: "/video/ev-1",
  },
  {
    id: "ev-2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/64a8c2fe3aec69000819c3d0/rivian-r1t-vs-ford-f-150-lightning-comparison.jpg",
    duration: "18:30",
    detailUrl: "/video/ev-2",
  },
  {
    id: "ev-3",
    title: "Future Electric Hypercars: Rimac Nevera vs Lotus Evija",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6656edb9dec73100084dcdcf/rimac-nevera-acceleration-run.jpg",
    duration: "16:45",
    detailUrl: "/video/ev-3",
  },
  // --- Motorsports Category ---
  {
    id: "motorsport-1",
    title: "F1 2025 Season Preview: New Cars, New Rules",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1ea77ba9631000891c1fa/f1-2023-british-gp-race-start.jpg",
    duration: "24:10",
    detailUrl: "/video/motorsport-1",
  },
  {
    id: "motorsport-2",
    title: "Le Mans 24 Hour Race Highlights",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/673252085459e4000863b22c/2018-lemans-toyota-gazoo-racing-win-01.jpg",
    duration: "28:35",
    detailUrl: "/video/motorsport-2",
  },
  {
    id: "motorsport-3",
    title: "NASCAR Cup Series: Race Day Analysis",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbdd8eca6887000869df14/nascar-at-sonoma-raceway-16.jpg",
    duration: "22:50",
    detailUrl: "/video/motorsport-3",
  },
  {
    id: "original-1",
    title: "2025 BMW M5 First Drive Review",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67296714564fe600071c8de3/003-2025-bmw-m5-touring-wagon.jpg",
    duration: "12:45",
    detailUrl: "/video/original-1",
  },
  {
    id: "original-2",
    title: "Electric Off-Road Comparison: Rivian R1T vs Ford F-150 Lightning",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/64a8c2fe3aec69000819c3d0/rivian-r1t-vs-ford-f-150-lightning-comparison.jpg",
    duration: "18:30",
    detailUrl: "/video/original-2",
  },
  {
    id: "original-3",
    title: "Supercar Drag Race: Ferrari vs Lamborghini vs McLaren",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68349f24aa8f18000865fec2/1996-mclaren-f1-gtr-110.jpg",
    duration: "8:54",
    detailUrl: "/video/original-3",
  },
  {
    id: "original-4",
    title: "2025 Lucid Air: In-Depth Technology Overview",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67c222dbae874400087d4c90/3-2025-lucid-air-side-view.jpg",
    duration: "14:17",
    detailUrl: "/video/original-4",
  },
  {
    id: "original-5",
    title: "DIY Car Maintenance Tips Every Owner Should Know",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65cedb67c7bc5b00085f8763/010-ls-porting-diy-706-heads-chamber.jpg",
    duration: "10:05",
    detailUrl: "/video/original-5",
  },
  {
    id: "original-6",
    title: "Best Car Audio Systems of 2025",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b987bcc668c90008d34e06/2018-volvo-xc60-t6-audio.jpg",
    duration: "16:28",
    detailUrl: "/video/original-6",
  },
];

/**
 * CHAT RESPONSES AND UTILITY FUNCTIONS
 * 
 * This section contains predefined chat responses for common queries
 * and utility functions for search and content management.
 */

// Predefined chat responses for common automotive queries
export const chatResponses: Record<string, string> = {
  "best ev": "Based on our testing, the best electric vehicles of 2025 include the Lucid Air for luxury sedans, the Rivian R1S for SUVs, and the Hyundai Ioniq 6 for value. The Lucid Air offers the longest range at up to 516 miles, while the Rivian excels in off-road capability. For those on a budget, the Hyundai Ioniq 6 provides excellent efficiency and features at a lower price point.",
  "electric cars": "Electric vehicles have come a long way in 2025. The average range for new EVs is now over 350 miles, with some luxury models exceeding 500 miles. Charging infrastructure has expanded significantly, with ultra-fast 350kW chargers becoming more common. Popular models include the Tesla Model Y, Lucid Air, Rivian R1S, Hyundai Ioniq 6, and BMW i5. These vehicles offer a combination of range, performance, and technology that make them compelling alternatives to traditional gasoline cars.",
  "car maintenance": "Regular car maintenance is essential for longevity. For modern vehicles, we recommend: 1) Oil changes every 7,500-10,000 miles for conventional engines, 2) Tire rotation every 5,000-8,000 miles, 3) Brake inspections twice yearly, 4) Air filter replacement every 15,000-30,000 miles, 5) Regular battery checks, especially in extreme temperatures. For EVs, focus on software updates, tire maintenance, and brake system checks, as they typically require less maintenance than combustion engines.",
  "sports cars": "The top sports cars of 2025 combine performance with increasingly efficient powertrains. The Porsche 911 remains a benchmark with its hybrid-assisted flat-six. The Chevrolet Corvette Z06 offers supercar performance at a more accessible price point. For those seeking electric thrills, the Rimac Nevera and Tesla Roadster deliver incredible acceleration. Japanese options like the Nissan Z and Toyota Supra continue to provide engaging driving experiences with updated technology.",
  "suv": "SUVs continue to dominate the market in 2025. For family-friendly options, the Hyundai Santa Fe, Toyota Highlander, and Kia Telluride offer excellent value and features. In the luxury segment, the BMW X5, Mercedes-Benz GLE, and Genesis GV80 stand out with premium materials and cutting-edge technology. Off-road enthusiasts should consider the Jeep Grand Cherokee, Ford Bronco, or Land Rover Defender. For electric SUVs, the Rivian R1S, Tesla Model Y, and Kia EV9 are our top recommendations.",
};

/**
 * Creates a markdown-formatted link for search queries
 * 
 * @param displayText - The text to display for the link
 * @param searchQuery - Optional search query (defaults to displayText if not provided)
 * @returns A markdown-formatted link string
 */
const createSearchLink = (displayText: string, searchQuery?: string): string => {
  const query = searchQuery || displayText;
  return `[${displayText}](/search?q=${encodeURIComponent(query)})`;
};

/**
 * Generates contextual chat responses based on user queries
 * 
 * This function analyzes the user's query and returns an appropriate
 * response with relevant links to content within the application.
 * 
 * @param query - The user's chat query
 * @returns A formatted response string with markdown links where appropriate
 */
export const generateChatResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  let responseText = "";

  if (lowerQuery.includes("best car")) {
    responseText = `The best car depends on your needs! Are you looking for an SUV, sedan, or truck? We have many guides, for example, on ${createSearchLink("Best Performance Cars Under $50,000")}.`;
  } else if (lowerQuery.includes("compare")) {
    responseText = `Sure, what vehicles would you like to compare? For example, 'compare the ${createSearchLink("2025 Lucid Air Grand Touring")} and ${createSearchLink("2025 Rivian R1S")}.`;
  } else if (lowerQuery.includes("latest news") || lowerQuery.includes("ferrari")) {
    responseText = `You can find the latest automotive news in our articles section. We recently published an article titled "${createSearchLink(mockArticles[0].title)}".`; // Assuming mockArticles[0] is the Ferrari one
  } else if (lowerQuery.includes("electric cars") || lowerQuery.includes("evs")) {
    responseText = `We have many articles and listings for electric cars. Check out the article "${createSearchLink("Electric SUVs With the Longest Range in 2025")}" or browse our new EV inventory like the ${createSearchLink("2025 Lucid Air Grand Touring")} and ${createSearchLink("2025 Rivian R1S")}.`;
  } else if (lowerQuery.includes("list of cars") || lowerQuery.includes("show me some cars") || lowerQuery.includes("list of year make models")) {
    const exampleCars = [
      mockNewCars.length > 0 ? createSearchLink(mockNewCars[0].title) : null,
      mockNewCars.length > 1 ? createSearchLink(mockNewCars[1].title) : null,
      mockUsedCars.length > 0 ? createSearchLink(mockUsedCars[0].title) : null,
    ].filter(Boolean) as string[]; 

    if (exampleCars.length > 0) {
      responseText = `Sure, here are some examples: ${exampleCars.join(', ')}. You can ask for more specific types too!`;
    } else {
      responseText = "I can show you cars, what are you interested in?";
    }
  } else {
    responseText = "I can help with that. What specific information are you looking for?";
  }
  return responseText;
};

/**
 * Returns all content collections organized by type
 * 
 * This function provides access to all mock data collections used throughout
 * the application, organized by content type.
 * 
 * @returns A ContentCollection object containing all content types
 */
export const getAllContent = (): ContentCollection => {
  return {
    articles: mockArticles,
    newCars: mockNewCars,
    usedCars: mockUsedCars,
    photos: mockPhotos,
    videos: mockVideos,
  };
};

/**
 * Determines the appropriate content type based on a search query
 * 
 * This function analyzes keywords in the search query to determine which
 * content type (articles, cars, photos, videos) is most relevant.
 * 
 * @param query - The search query to analyze
 * @returns The most relevant ContentType for the query
 */
export const determineContentType = (query: string): ContentType => {
  const lowerQuery = query.toLowerCase();
  
  // Special cases for Honda Accord car searches
  if (lowerQuery.includes("honda accord") && lowerQuery.includes("new car")) return "newCars";
  if (lowerQuery.includes("honda accord") && (lowerQuery.includes("used car") || lowerQuery.includes("used cars"))) return "usedCars";
  
  if (lowerQuery.includes("article") || lowerQuery.includes("news") || lowerQuery.includes("review")) return "articles";
  // Prioritize used cars for generic car searches
  if (lowerQuery.includes("car") || lowerQuery.includes("auto") || lowerQuery.includes("vehicle")) return "usedCars";
  if (lowerQuery.includes("new car") || lowerQuery.includes("buy new")) return "newCars";
  if (lowerQuery.includes("used car") || lowerQuery.includes("buy used")) return "usedCars";
  if (lowerQuery.includes("photo") || lowerQuery.includes("image") || lowerQuery.includes("picture")) return "photos";
  if (lowerQuery.includes("video") || lowerQuery.includes("watch")) return "videos";
  return "articles"; // Default to articles instead of all
};
