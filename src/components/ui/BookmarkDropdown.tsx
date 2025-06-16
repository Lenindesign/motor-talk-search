import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useNavigate } from 'react-router-dom';

export interface BookmarkDropdownProps {
  isSaved: boolean;
  onSave: (category: 'owned' | 'testDriven' | 'interested') => void;
  onRemove: () => void;
  className?: string;
  carTitle?: string;
}

const BookmarkDropdown: React.FC<BookmarkDropdownProps> = ({
  isSaved,
  onSave,
  onRemove,
  className,
  carTitle = "Car"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const getCategoryDisplayName = (category: 'owned' | 'testDriven' | 'interested') => {
    switch (category) {
      case 'owned':
        return 'Owned';
      case 'testDriven':
        return 'Test Drive';
      case 'interested':
        return 'Interested';
      default:
        return category;
    }
  };

  const handleCategorySelect = (e: React.MouseEvent, category: 'owned' | 'testDriven' | 'interested') => {
    e.stopPropagation();
    e.preventDefault();
    onSave(category);
    setIsOpen(false);
    
    // Show toast notification
    const categoryName = getCategoryDisplayName(category);
    const action = isSaved ? 'moved to' : 'saved to';
    
    toast({
      title: `${action} ${categoryName}`,
      description: `${carTitle} has been ${action} your ${categoryName} list.`,
      duration: 3000,
      action: (
        <ToastAction 
          altText="Go to My Garage"
          onClick={() => navigate('/garage')}
        >
          My Garage
        </ToastAction>
      ),
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
    setIsOpen(false);
    
    // Show toast notification
    toast({
      title: "Removed from garage",
      description: `${carTitle} has been removed from your garage.`,
      duration: 3000,
      action: (
        <ToastAction 
          altText="Go to My Garage"
          onClick={() => navigate('/garage')}
        >
          My Garage
        </ToastAction>
      ),
    });
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={handleToggleDropdown}
        className={cn(
          "flex items-center gap-1 p-1.5 transition-colors",
          className?.includes("static") 
            ? "text-gray-400 hover:text-gray-600" 
            : "bg-black/60 hover:bg-black/80 rounded-full text-white absolute z-20 top-2 left-2"
        )}
        aria-label={isSaved ? "Change bookmark category" : "Bookmark item"}
      >
        <Bookmark 
          size={16} 
          fill={isSaved ? "currentColor" : "none"} 
          stroke="currentColor" 
        />
        <ChevronDown size={12} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className={cn(
            "absolute z-30 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px]",
            className?.includes("static") ? "top-8 left-0" : "top-12 left-2"
          )}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {!isSaved ? (
            <>
              <button
                onClick={(e) => handleCategorySelect(e, 'owned')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Owned
              </button>
              <button
                onClick={(e) => handleCategorySelect(e, 'testDriven')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Test Drive
              </button>
              <button
                onClick={(e) => handleCategorySelect(e, 'interested')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Interested
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => handleCategorySelect(e, 'owned')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Move to Owned
              </button>
              <button
                onClick={(e) => handleCategorySelect(e, 'testDriven')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Move to Test Drive
              </button>
              <button
                onClick={(e) => handleCategorySelect(e, 'interested')}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors text-gray-700"
              >
                Move to Interested
              </button>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={handleRemove}
                className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 transition-colors text-red-600"
              >
                Remove
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkDropdown; 