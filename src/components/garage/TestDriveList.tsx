import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  Edit3,
  Save,
  X,
  Car,
  AlertCircle
} from 'lucide-react';
import { SavedItem, useSavedItems } from '../../contexts/SavedItemsContext';
import { CarData } from '../CarCard/types';
import ScheduleTestDriveModal from './ScheduleTestDriveModal';

interface TestDriveListProps {
  cars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
}

interface TestDriveNote {
  id: string;
  carId: string;
  note: string;
  rating?: number;
  testDriveDate?: string;
  dealerContact?: string;
  purchaseInterest: 'high' | 'medium' | 'low' | 'not-interested';
  createdAt: string;
}

const TestDriveList: React.FC<TestDriveListProps> = ({ cars, savedItemToCarData }) => {
  const { updateSavedItem } = useSavedItems();
  const navigate = useNavigate();
  const [testDriveNotes, setTestDriveNotes] = useState<TestDriveNote[]>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<SavedItem | null>(null);

  // Filter cars that are marked for test driving
  const testDriveCars = cars.filter(car => car.metadata?.ownership === 'testDriven');

  const handleSaveNote = (carId: string) => {
    const newNote: TestDriveNote = {
      id: Date.now().toString(),
      carId,
      note: noteText,
      purchaseInterest: 'medium',
      createdAt: new Date().toISOString()
    };

    setTestDriveNotes(prev => [...prev.filter(n => n.carId !== carId), newNote]);
    setEditingNotes(null);
    setNoteText('');
  };

  const handleUpdatePurchaseInterest = (carId: string, interest: TestDriveNote['purchaseInterest']) => {
    setTestDriveNotes(prev => {
      const existingNote = prev.find(note => note.carId === carId);
      
      if (existingNote) {
        // Update existing note
        return prev.map(note => 
          note.carId === carId 
            ? { ...note, purchaseInterest: interest }
            : note
        );
      } else {
        // Create new note with purchase interest
        const newNote: TestDriveNote = {
          id: `note-${Date.now()}`,
          carId,
          note: '',
          purchaseInterest: interest,
          createdAt: new Date().toISOString()
        };
        return [...prev, newNote];
      }
    });
  };

  const getCarNote = (carId: string) => {
    return testDriveNotes.find(note => note.carId === carId);
  };

  const handleCarClick = (car: SavedItem) => {
    // Navigate to car detail page based on car type
    if (car.type === 'newCar') {
      navigate(`/new-car/${car.id}`);
    } else {
      navigate(`/used-car/${car.id}`);
    }
  };

  const handleScheduleTestDrive = (car: SavedItem) => {
    setSelectedCar(car);
    setScheduleModalOpen(true);
  };

  const handleGetQuote = (car: SavedItem) => {
    // Create a car ID for the Car Connect route
    // Format: make-model-year (lowercase, spaces replaced with hyphens)
    const carData = savedItemToCarData(car);
    let carId = car.id;
    
    // Try to extract make, model, year from the car title
    if (car.title) {
      const titleParts = car.title.toLowerCase().split(' ');
      if (titleParts.length >= 3) {
        // Assume format like "2025 BMW i5 eDrive40"
        const year = titleParts[0];
        const make = titleParts[1];
        const model = titleParts.slice(2).join('-');
        carId = `${make}-${model}-${year}`;
      } else {
        // Fallback: use the original ID or create one from title
        carId = car.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
    }
    
    // Navigate to Car Connect with the car ID
    navigate(`/find-best-price/${carId}`);
  };

  const getPurchaseInterestColor = (interest: TestDriveNote['purchaseInterest']) => {
    switch (interest) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'not-interested': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPurchaseInterestText = (interest: TestDriveNote['purchaseInterest']) => {
    switch (interest) {
      case 'high': return 'Ready to Buy';
      case 'medium': return 'Considering';
      case 'low': return 'Maybe Later';
      case 'not-interested': return 'Not Interested';
      default: return 'Undecided';
    }
  };

  if (testDriveCars.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <Car className="w-16 h-16 text-neutral-4 mx-auto mb-4" />
        <h3 className="typography-subtitle text-neutral-2 mb-2">No Test Drive Cars Yet</h3>
        <p className="typography-body text-neutral-4 mb-6 max-w-md mx-auto">
          Add cars you're interested in test driving to keep track of your car buying journey. 
          You can schedule test drives, take notes, and track your purchase decisions.
        </p>
        <Button variant="outline" className="mx-auto">
          <Car className="w-4 h-4 mr-2" />
          Browse Cars to Test Drive
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="typography-title text-neutral-1">Test Drive List</h2>
          <p className="typography-body text-neutral-4">
            {testDriveCars.length} car{testDriveCars.length !== 1 ? 's' : ''} to test drive
          </p>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          Car Buying Journey
        </Badge>
      </div>

      {/* Test Drive Cards */}
      <div className="space-y-4">
        {testDriveCars.map(car => {
          const carData = savedItemToCarData(car);
          const note = getCarNote(car.id);
          const isEditing = editingNotes === car.id;

          return (
            <Card key={car.id}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={car.imageUrl} 
                      alt={car.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <CardTitle 
                        className="typography-subtitle text-neutral-1 cursor-pointer hover:text-motortrend-red transition-colors"
                        onClick={() => handleCarClick(car)}
                      >
                        {car.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="typography-body text-neutral-3">
                          {carData.price}
                        </span>
                        {carData.location && (
                          <div className="flex items-center text-neutral-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="typography-caption">{carData.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Purchase Interest Badge */}
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      className={`${getPurchaseInterestColor(note?.purchaseInterest || 'medium')} border`}
                    >
                      {getPurchaseInterestText(note?.purchaseInterest || 'medium')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="flex items-center" onClick={() => handleScheduleTestDrive(car)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Test Drive
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => handleGetQuote(car)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Dealer
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => handleGetQuote(car)}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                </div>

                {/* Purchase Interest Selector */}
                <div className="space-y-2">
                  <label className="typography-caption text-neutral-3">Purchase Interest Level:</label>
                  <div className="flex space-x-2">
                    {(['high', 'medium', 'low', 'not-interested'] as const).map(interest => (
                      <Button
                        key={interest}
                        size="sm"
                        variant={note?.purchaseInterest === interest ? 'solid' : 'ghost'}
                        onClick={() => handleUpdatePurchaseInterest(car.id, interest)}
                        className="text-xs"
                      >
                        {getPurchaseInterestText(interest)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="typography-caption text-neutral-3">Test Drive Notes:</label>
                    {!isEditing && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingNotes(car.id);
                          setNoteText(note?.note || '');
                        }}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        {note?.note ? 'Edit' : 'Add Note'}
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <Textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add your thoughts about this car, test drive experience, pros/cons, etc."
                        className="min-h-[100px]"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveNote(car.id)}
                          disabled={!noteText.trim()}
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingNotes(null);
                            setNoteText('');
                          }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : note?.note ? (
                    <div className="bg-neutral-8 p-3 rounded-lg">
                      <p className="typography-body text-neutral-2">{note.note}</p>
                      <p className="typography-caption text-neutral-4 mt-2">
                        Added {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-neutral-8 p-3 rounded-lg border-2 border-dashed border-neutral-6">
                      <p className="typography-caption text-neutral-4 text-center">
                        No notes yet. Click "Add Note" to record your thoughts about this car.
                      </p>
                    </div>
                  )}
                </div>

                {/* Car Specs Quick View */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-neutral-6">
                  {carData.mpg && (
                    <div className="text-center">
                      <p className="typography-caption text-neutral-4">MPG</p>
                      <p className="typography-body font-medium text-neutral-2">{carData.mpg}</p>
                    </div>
                  )}
                  {carData.engine && (
                    <div className="text-center">
                      <p className="typography-caption text-neutral-4">Engine</p>
                      <p className="typography-body font-medium text-neutral-2">{carData.engine}</p>
                    </div>
                  )}
                  {carData.horsepower && (
                    <div className="text-center">
                      <p className="typography-caption text-neutral-4">Power</p>
                      <p className="typography-body font-medium text-neutral-2">{carData.horsepower}</p>
                    </div>
                  )}
                  {carData.motorTrendScore && (
                    <div className="text-center">
                      <p className="typography-caption text-neutral-4">MT Score</p>
                      <p className="typography-body font-medium text-neutral-2">{carData.motorTrendScore}/10</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      {testDriveCars.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="typography-subtitle text-blue-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Test Drive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">
                  {testDriveNotes.filter(n => n.purchaseInterest === 'high').length}
                </p>
                <p className="typography-caption text-blue-700">Ready to Buy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">
                  {testDriveNotes.filter(n => n.purchaseInterest === 'medium').length}
                </p>
                <p className="typography-caption text-blue-700">Considering</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">
                  {testDriveNotes.filter(n => n.note).length}
                </p>
                <p className="typography-caption text-blue-700">With Notes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">{testDriveCars.length}</p>
                <p className="typography-caption text-blue-700">Total Cars</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Schedule Test Drive Modal */}
      {selectedCar && (
        <ScheduleTestDriveModal
          isOpen={scheduleModalOpen}
          onClose={() => {
            setScheduleModalOpen(false);
            setSelectedCar(null);
          }}
          car={selectedCar}
          carData={savedItemToCarData(selectedCar)}
        />
      )}
    </div>
  );
};

export default TestDriveList; 