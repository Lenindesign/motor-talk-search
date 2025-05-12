import React, { useState } from 'react';
import { Calendar, Check, Edit, Save, Trash, ChartBar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SavedItem } from '../contexts/SavedItemsContext';
import { useToast } from "@/hooks/use-toast";
import CarScoreCard, { CarScore } from './CarScoreCard';

interface CarDetailsProps {
  car: SavedItem;
  onUpdate: (id: string, updates: Partial<SavedItem>) => void;
  onDelete: (id: string) => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(car.metadata?.notes || '');
  const [ownership, setOwnership] = useState<'owned' | 'interested' | 'testDriven'>(
    car.metadata?.ownership as any || 'interested'
  );
  const { toast } = useToast();
  const [showScores, setShowScores] = useState(false);

  // Generate mock MotorTrend scores for demonstration purposes
  // In a real app, this data would come from an API or database
  const generateMockScores = (): CarScore => {
    const baseScore = 7 + Math.random() * 2; // Generate a base score between 7-9
    
    // Generate scores for different categories, slightly varied from base score
    return {
      overall: Math.min(10, Math.max(1, baseScore + (Math.random() * 1.5 - 0.75))).toFixed(1) as unknown as number,
      performance: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      fuelEfficiency: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      safety: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      value: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      reliability: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      comfort: Math.min(10, Math.max(1, baseScore + (Math.random() * 2 - 1))).toFixed(1) as unknown as number,
      rankInClass: Math.floor(Math.random() * 10) + 1, // Rank between 1 and 10
      totalInClass: Math.floor(Math.random() * 20) + 10, // Total in class between 10 and 30
      editorNote: "This vehicle offers excellent value in its class with competitive features and strong build quality."
    };
  };

  // Use memoization to keep score consistent between renders
  const motorTrendScore = React.useMemo(() => generateMockScores(), [car.id]);

  const handleSave = () => {
    const updatedMetadata = {
      ...car.metadata,
      notes,
      ownership,
      lastUpdated: new Date().toISOString()
    };
    
    onUpdate(car.id, {
      metadata: updatedMetadata
    });
    
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your car details have been updated."
    });
  };

  const getOwnershipBadge = () => {
    switch (ownership) {
      case 'owned':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Owned
          </Badge>
        );
      case 'testDriven':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Test Driven
          </Badge>
        );
      case 'interested':
      default:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Interested
          </Badge>
        );
    }
  };

  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          {getOwnershipBadge()}
          <span>{car.title}</span>
        </h3>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setShowScores(!showScores)}
            className="flex items-center gap-1"
          >
            <ChartBar size={16} />
            {showScores ? "Hide Scores" : "MotorTrend Scores"}
          </Button>
          
          {isEditing ? (
            <Button 
              onClick={handleSave} 
              size="sm" 
              className="gap-1 transition-transform hover:scale-105"
            >
              <Save size={16} />
              Save
            </Button>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)} 
              variant="outline" 
              size="sm"
              className="gap-1 transition-colors hover:bg-gray-100"
            >
              <Edit size={16} />
              Edit
            </Button>
          )}
          <Button
            onClick={() => onDelete(car.id)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>

      {car.metadata?.lastUpdated && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Calendar size={12} />
          <span>Last updated: {new Date(car.metadata.lastUpdated).toLocaleDateString()}</span>
        </div>
      )}

      {showScores && (
        <div className="mb-4">
          <CarScoreCard score={motorTrendScore} className="border-motortrend-red border-t-2" />
        </div>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOwnership('interested')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  ownership === 'interested'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ownership === 'interested' && <Check size={14} className="inline mr-1" />}
                Interested
              </button>
              <button
                type="button"
                onClick={() => setOwnership('testDriven')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  ownership === 'testDriven'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ownership === 'testDriven' && <Check size={14} className="inline mr-1" />}
                Test Driven
              </button>
              <button
                type="button"
                onClick={() => setOwnership('owned')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  ownership === 'owned'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ownership === 'owned' && <Check size={14} className="inline mr-1" />}
                Owned
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="car-notes" className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              id="car-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes about this car..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-motortrend-red min-h-[100px]"
            />
          </div>
        </div>
      ) : (
        <div>
          {notes ? (
            <div className="bg-gray-50 rounded-md p-3 border">
              <p className="text-sm whitespace-pre-wrap">{notes}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No notes added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarDetails;
