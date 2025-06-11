import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface MegaDropdownProps {
  isOpen: boolean;
}

const MegaDropdown: React.FC<MegaDropdownProps> = ({ isOpen }) => {
  return (
    <div 
      className={`absolute top-full left-0 w-full bg-motortrend-dark border border-gray-700 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 max-h-[800px]' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'
      }`}
      style={{ zIndex: 1050 }}
    >
      <div className="max-w-[980px] mx-auto grid grid-cols-12 gap-6 p-6">
        {/* View Rankings Section */}
        <div className="col-span-8">
          <h3 className="text-white font-semibold text-lg mb-4">View Rankings</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/suvs" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/suv.svg" alt="SUVs" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">SUVs</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/hybrids" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/hybrid.svg" alt="Hybrids" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Hybrids</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/crossovers" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/crossover.svg" alt="Crossovers" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Crossovers</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/pickup-trucks" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/truck.svg" alt="Pickup Trucks" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Pickup Trucks</span>
              </Link>
            </div>
            
            {/* Row 2 */}
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/luxury" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/luxury.svg" alt="Luxury" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Luxury</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/evs" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/ev.svg" alt="EVs" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">EVs</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/sports-cars" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/sports.svg" alt="Sports Cars" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Sports Cars</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/sedans" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/sedan.svg" alt="Sedans" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Sedans</span>
              </Link>
            </div>
            
            {/* Row 3 */}
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/coupes" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/coupe.svg" alt="Coupes" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Coupes</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/wagons" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/wagon.svg" alt="Wagons" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Wagons</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/hatchbacks" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/hatchback.svg" alt="Hatchbacks" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Hatchbacks</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/convertibles" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/convertible.svg" alt="Convertibles" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Convertibles</span>
              </Link>
            </div>
            
            {/* Row 4 */}
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/small-cars" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/small.svg" alt="Small Cars" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Small Cars</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/vans" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/van.svg" alt="Vans" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Vans</span>
              </Link>
            </div>
            <div className="bg-motortrend-dark-2 rounded-md p-2 hover:bg-motortrend-dark-1 transition-colors">
              <Link to="/rankings/used-cars" className="flex flex-col items-center">
                <div className="h-16 flex items-center justify-center">
                  <img src="/images/car-types/used.svg" alt="Used Cars" className="h-12 w-auto" />
                </div>
                <span className="text-white text-sm font-medium text-center">Used Cars</span>
              </Link>
            </div>
          </div>
          
          {/* Browse by Manufacturer */}
          <h3 className="text-white font-semibold text-lg mt-8 mb-4">Browse by Manufacturer</h3>
          <div className="grid grid-cols-4 gap-4">
            <ul className="text-white text-sm space-y-2">
              <li><Link to="/makes/acura" className="hover:text-motortrend-red transition-colors">Acura</Link></li>
              <li><Link to="/makes/afeela" className="hover:text-motortrend-red transition-colors">Afeela</Link></li>
              <li><Link to="/makes/alfa-romeo" className="hover:text-motortrend-red transition-colors">Alfa Romeo</Link></li>
              <li><Link to="/makes/aston-martin" className="hover:text-motortrend-red transition-colors">Aston Martin</Link></li>
              <li><Link to="/makes/audi" className="hover:text-motortrend-red transition-colors">Audi</Link></li>
              <li><Link to="/makes/bentley" className="hover:text-motortrend-red transition-colors">Bentley</Link></li>
              <li><Link to="/makes/bmw" className="hover:text-motortrend-red transition-colors">BMW</Link></li>
            </ul>
            <ul className="text-white text-sm space-y-2">
              <li><Link to="/makes/ford" className="hover:text-motortrend-red transition-colors">Ford</Link></li>
              <li><Link to="/makes/genesis" className="hover:text-motortrend-red transition-colors">Genesis</Link></li>
              <li><Link to="/makes/gmc" className="hover:text-motortrend-red transition-colors">GMC</Link></li>
              <li><Link to="/makes/honda" className="hover:text-motortrend-red transition-colors">Honda</Link></li>
              <li><Link to="/makes/hyundai" className="hover:text-motortrend-red transition-colors">Hyundai</Link></li>
              <li><Link to="/makes/infiniti" className="hover:text-motortrend-red transition-colors">Infiniti</Link></li>
              <li><Link to="/makes/jeep" className="hover:text-motortrend-red transition-colors">Jeep</Link></li>
            </ul>
            <ul className="text-white text-sm space-y-2">
              <li><Link to="/makes/mercedes-benz" className="hover:text-motortrend-red transition-colors">Mercedes-Benz</Link></li>
              <li><Link to="/makes/nissan" className="hover:text-motortrend-red transition-colors">Nissan</Link></li>
              <li><Link to="/makes/porsche" className="hover:text-motortrend-red transition-colors">Porsche</Link></li>
              <li><Link to="/makes/ram" className="hover:text-motortrend-red transition-colors">Ram</Link></li>
              <li><Link to="/makes/subaru" className="hover:text-motortrend-red transition-colors">Subaru</Link></li>
              <li><Link to="/makes/tesla" className="hover:text-motortrend-red transition-colors">Tesla</Link></li>
              <li><Link to="/makes/toyota" className="hover:text-motortrend-red transition-colors">Toyota</Link></li>
            </ul>
            <ul className="text-white text-sm space-y-2">
              <li><Link to="/makes/volkswagen" className="hover:text-motortrend-red transition-colors">Volkswagen</Link></li>
              <li><Link to="/makes/volvo" className="hover:text-motortrend-red transition-colors">Volvo</Link></li>
              <li><Link to="/makes/rivian" className="hover:text-motortrend-red transition-colors">Rivian</Link></li>
              <li><Link to="/makes/lucid" className="hover:text-motortrend-red transition-colors">Lucid</Link></li>
              <li><Link to="/makes/kia" className="hover:text-motortrend-red transition-colors">Kia</Link></li>
              <li><Link to="/makes/lexus" className="hover:text-motortrend-red transition-colors">Lexus</Link></li>
              <li><Link to="/makes" className="text-motortrend-red font-medium flex items-center">
                View All Makes <ChevronRight size={16} className="ml-1" />
              </Link></li>
            </ul>
          </div>
        </div>
        
        {/* Explore Section */}
        <div className="col-span-4 border-l border-gray-700 pl-6">
          <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
          
          {/* Car Buying Service */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-2">Car Buying Service</h4>
            <Link to="/car-buying-service" className="block text-motortrend-red hover:underline">
              Find the perfect car for you
            </Link>
          </div>
          
          {/* Car Search */}
          <div className="bg-motortrend-dark-2 p-4 rounded-md mb-6">
            <h4 className="text-white font-medium mb-2">
              Search here to quickly navigate to <span className="text-motortrend-red">Car and Driver</span> vehicle reviews.
            </h4>
            <div className="space-y-3">
              <div className="relative">
                <select className="w-full bg-motortrend-dark border border-gray-600 rounded-md py-2 px-3 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-motortrend-red">
                  <option value="">Select Make</option>
                  <option value="bmw">BMW</option>
                  <option value="ford">Ford</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full bg-motortrend-dark border border-gray-600 rounded-md py-2 px-3 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-motortrend-red">
                  <option value="">Select Model</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full bg-motortrend-dark border border-gray-600 rounded-md py-2 px-3 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-motortrend-red">
                  <option value="">Select Year</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
              <button className="w-full bg-motortrend-red hover:bg-motortrend-red/90 text-white font-medium py-2 px-4 rounded-md transition-colors">
                GO
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-2">Quick Links</h4>
            <ul className="text-white text-sm space-y-2">
              <li><Link to="/car-finder" className="hover:text-motortrend-red transition-colors">Car Finder</Link></li>
              <li><Link to="/compare-cars" className="hover:text-motortrend-red transition-colors">Compare Cars</Link></li>
              <li><Link to="/rankings" className="hover:text-motortrend-red transition-colors">Ultimate Car Rankings</Link></li>
              <li><Link to="/cars-for-sale" className="hover:text-motortrend-red transition-colors">Cars for Sale</Link></li>
              <li><Link to="/sell-your-car" className="hover:text-motortrend-red transition-colors">Sell Your Car</Link></li>
              <li><Link to="/certified" className="hover:text-motortrend-red transition-colors">MotorTrend Certified</Link></li>
              <li><Link to="/intellichoice" className="hover:text-motortrend-red transition-colors">IntelliChoice Awards</Link></li>
              <li><Link to="/gear" className="hover:text-motortrend-red transition-colors">Gear Shopping</Link></li>
              <li><Link to="/shopping-tools" className="hover:text-motortrend-red transition-colors">Shopping Tools</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaDropdown;
