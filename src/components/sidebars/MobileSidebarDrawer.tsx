import React, { useState } from 'react';
import { Menu, X, Car, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarShoppingSidebar from './CarShoppingSidebar';
import TrendingSidebar from './TrendingSidebar';

type SidebarView = 'shopping' | 'trending';

const MobileSidebarDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState<SidebarView>('shopping');

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={toggleDrawer}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <Button
              variant={activeView === 'shopping' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('shopping')}
              className="flex items-center space-x-2"
            >
              <Car className="w-4 h-4" />
              <span>Shopping</span>
            </Button>
            <Button
              variant={activeView === 'trending' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('trending')}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Trending</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDrawer}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeView === 'shopping' ? (
            <div className="space-y-6">
              <CarShoppingSidebar />
            </div>
          ) : (
            <div className="space-y-6">
              <TrendingSidebar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileSidebarDrawer;
