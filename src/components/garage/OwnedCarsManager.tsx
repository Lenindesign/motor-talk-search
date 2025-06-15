import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddVehicleModal from './AddVehicleModal';
import { 
  Wrench, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  Edit3,
  Save,
  X,
  Car,
  Star,
  TrendingUp,
  Settings,
  Heart,
  ArrowLeftRight,
  Target,
  Zap,
  Shield,
  Fuel,
  Gauge
} from 'lucide-react';
import { SavedItem, useSavedItems } from '../../contexts/SavedItemsContext';
import { CarData } from '../CarCard/types';

interface OwnedCarsManagerProps {
  cars: SavedItem[];
  savedItemToCarData: (item: SavedItem) => CarData;
}

interface MaintenanceRecord {
  id: string;
  carId: string;
  type: 'oil-change' | 'tire-rotation' | 'brake-service' | 'inspection' | 'repair' | 'other';
  description: string;
  date: string;
  mileage?: number;
  cost?: number;
  nextDue?: string;
  nextMileage?: number;
  status: 'completed' | 'scheduled' | 'overdue';
  notes?: string;
}

interface UpgradePlan {
  id: string;
  carId: string;
  category: 'performance' | 'aesthetic' | 'comfort' | 'technology' | 'safety';
  title: string;
  description: string;
  estimatedCost: number;
  priority: 'high' | 'medium' | 'low';
  status: 'planned' | 'researching' | 'purchased' | 'installed';
  targetDate?: string;
  notes?: string;
}

interface DreamCar {
  id: string;
  make: string;
  model: string;
  year: string;
  imageUrl?: string;
  targetPrice?: number;
  priority: 'high' | 'medium' | 'low';
  category: 'upgrade' | 'additional' | 'replacement';
  notes?: string;
  features: string[];
  addedDate: string;
}

const OwnedCarsManager: React.FC<OwnedCarsManagerProps> = ({ cars, savedItemToCarData }) => {
  const { updateSavedItem } = useSavedItems();
  const [activeTab, setActiveTab] = useState<'current' | 'maintenance' | 'upgrades' | 'wishlist'>('current');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [upgradePlans, setUpgradePlans] = useState<UpgradePlan[]>([]);
  const [dreamCars, setDreamCars] = useState<DreamCar[]>([]);
  const [editingMaintenance, setEditingMaintenance] = useState<string | null>(null);
  const [editingUpgrade, setEditingUpgrade] = useState<string | null>(null);
  const [editingDreamCar, setEditingDreamCar] = useState<string | null>(null);

  // Filter cars that are marked as owned
  const ownedCars = cars.filter(car => car.metadata?.ownership === 'owned');

  const getMaintenanceTypeIcon = (type: MaintenanceRecord['type']) => {
    switch (type) {
      case 'oil-change': return <Fuel className="w-4 h-4" />;
      case 'tire-rotation': return <Settings className="w-4 h-4" />;
      case 'brake-service': return <Shield className="w-4 h-4" />;
      case 'inspection': return <CheckCircle className="w-4 h-4" />;
      case 'repair': return <Wrench className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getMaintenanceStatusColor = (status: MaintenanceRecord['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUpgradeCategoryIcon = (category: UpgradePlan['category']) => {
    switch (category) {
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'aesthetic': return <Star className="w-4 h-4" />;
      case 'comfort': return <Heart className="w-4 h-4" />;
      case 'technology': return <Settings className="w-4 h-4" />;
      case 'safety': return <Shield className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addMaintenanceRecord = (carId: string) => {
    const newRecord: MaintenanceRecord = {
      id: Date.now().toString(),
      carId,
      type: 'oil-change',
      description: 'Oil Change',
      date: new Date().toISOString().split('T')[0],
      status: 'scheduled'
    };
    setMaintenanceRecords(prev => [...prev, newRecord]);
    setEditingMaintenance(newRecord.id);
  };

  const addUpgradePlan = (carId: string) => {
    const newPlan: UpgradePlan = {
      id: Date.now().toString(),
      carId,
      category: 'performance',
      title: 'New Upgrade',
      description: '',
      estimatedCost: 0,
      priority: 'medium',
      status: 'planned'
    };
    setUpgradePlans(prev => [...prev, newPlan]);
    setEditingUpgrade(newPlan.id);
  };

  const addDreamCar = () => {
    const newDreamCar: DreamCar = {
      id: Date.now().toString(),
      make: '',
      model: '',
      year: new Date().getFullYear().toString(),
      imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop&crop=center',
      priority: 'medium',
      category: 'upgrade',
      features: [],
      addedDate: new Date().toISOString()
    };
    setDreamCars(prev => [...prev, newDreamCar]);
    setEditingDreamCar(newDreamCar.id);
  };

  if (ownedCars.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <Car className="w-16 h-16 text-neutral-4 mx-auto mb-4" />
        <h3 className="typography-subtitle text-neutral-2 mb-2">No Owned Cars Yet</h3>
        <p className="typography-body text-neutral-4 mb-6 max-w-md mx-auto">
          Mark cars as "Owned" to start tracking maintenance, planning upgrades, and building your dream car wishlist.
        </p>
        <AddVehicleModal onAddVehicle={(vehicleData) => {
          console.log('Adding vehicle:', vehicleData);
          // Here you would typically save the vehicle to your data store
          // For now, we'll just log it
        }}>
          <Button variant="outline" className="mx-auto">
            <Car className="w-4 h-4 mr-2" />
            Add Your First Car
          </Button>
        </AddVehicleModal>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="typography-title text-neutral-1">My Cars</h2>
          <p className="typography-body text-neutral-4">
            {ownedCars.length} owned car{ownedCars.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          Car Ownership Hub
        </Badge>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Current Cars
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="upgrades" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Upgrades
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Dream Cars
          </TabsTrigger>
        </TabsList>

        {/* Current Cars Tab */}
        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ownedCars.map(car => {
              const carData = savedItemToCarData(car);
              const carMaintenance = maintenanceRecords.filter(r => r.carId === car.id);
              const carUpgrades = upgradePlans.filter(u => u.carId === car.id);
              const overdueMaintenance = carMaintenance.filter(r => r.status === 'overdue').length;
              const plannedUpgrades = carUpgrades.filter(u => u.status === 'planned').length;

              return (
                <Card key={car.id} className="relative overflow-hidden bg-gradient-to-br from-white via-neutral-8 to-neutral-7 border-2 border-neutral-6 shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-1 p-0">
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-motortrend-red text-white font-medium shadow-modern">
                      Owned
                    </Badge>
                  </div>
                  
                  {/* Full-width image taking upper third */}
                  <div className="relative h-42 w-full overflow-hidden">
                    <img 
                      src={car.imageUrl} 
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Image overlay for premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Subtle Pattern Overlay for content area */}
                  <div className="absolute inset-0 top-42 bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none"></div>
                  
                  <CardHeader className="!pb-4 !px-4 !pt-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="w-full">
                        <CardTitle className="typography-title text-neutral-1 mb-1">
                          {car.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4">
                          <span className="typography-body-large font-semibold text-motortrend-red">
                            {carData.year}
                          </span>
                          {carData.mileage && (
                            <div className="flex items-center bg-white/80 rounded-full px-3 py-1 shadow-sm">
                              <Gauge className="w-4 h-4 mr-2 text-neutral-3" />
                              <span className="typography-caption font-medium text-neutral-2">{carData.mileage}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 relative z-10 !pt-4 !px-4 !pb-4">
                    {/* Enhanced Stats Grid with Your Vehicle indicator */}
                    <div className="space-y-2">
                      {/* Your Vehicle indicator at top of stats */}
                      <div className="flex items-center justify-center space-x-2 pb-1">
                        <div className="w-2 h-2 bg-motortrend-red rounded-full animate-pulse"></div>
                        <span className="typography-caption text-neutral-3 font-medium">Your Vehicle</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/40 shadow-sm">
                          <p className="text-lg font-bold text-neutral-1 mb-0.5">{carMaintenance.length}</p>
                          <p className="typography-caption text-neutral-3 font-medium">Maintenance</p>
                          <p className="typography-small text-neutral-4">Records</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/40 shadow-sm">
                          <p className="text-lg font-bold text-neutral-1 mb-0.5">{carUpgrades.length}</p>
                          <p className="typography-caption text-neutral-3 font-medium">Upgrade</p>
                          <p className="typography-small text-neutral-4">Plans</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/40 shadow-sm">
                          <p className={`text-lg font-bold mb-0.5 ${overdueMaintenance > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {overdueMaintenance}
                          </p>
                          <p className="typography-caption text-neutral-3 font-medium">Overdue</p>
                          <p className="typography-small text-neutral-4">Items</p>
                        </div>
                      </div>
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        className="bg-white/80 backdrop-blur-sm text-neutral-1 border border-white/40 hover:bg-white hover:shadow-modern transition-all duration-200 flex-1 min-w-[120px]"
                        onClick={() => {
                          setSelectedCarId(car.id);
                          setActiveTab('maintenance');
                        }}
                      >
                        <Wrench className="w-4 h-4 mr-2 text-neutral-3" />
                        <span className="font-medium">Maintenance</span>
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-motortrend-red/90 text-white hover:bg-motortrend-red hover:shadow-modern transition-all duration-200 flex-1 min-w-[120px]"
                        onClick={() => {
                          setSelectedCarId(car.id);
                          setActiveTab('upgrades');
                        }}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="font-medium">Upgrades</span>
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="typography-subtitle text-neutral-1">Maintenance Tracking</h3>
            <Button onClick={() => ownedCars[0] && addMaintenanceRecord(ownedCars[0].id)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>

          {/* Car Selector */}
          {ownedCars.length > 1 && (
            <div className="flex space-x-2">
              {ownedCars.map(car => (
                <Button
                  key={car.id}
                  size="sm"
                  variant={selectedCarId === car.id ? 'solid' : 'outline'}
                  onClick={() => setSelectedCarId(car.id)}
                >
                  {car.title.split(' ').slice(0, 2).join(' ')}
                </Button>
              ))}
            </div>
          )}

          {/* Maintenance Records */}
          <div className="space-y-3">
            {maintenanceRecords
              .filter(record => !selectedCarId || record.carId === selectedCarId)
              .map(record => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getMaintenanceTypeIcon(record.type)}
                        <div>
                          <h4 className="typography-subtitle text-neutral-1">{record.description}</h4>
                          <p className="typography-caption text-neutral-4">
                            {new Date(record.date).toLocaleDateString()}
                            {record.mileage && ` • ${record.mileage.toLocaleString()} miles`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getMaintenanceStatusColor(record.status)} border`}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                        {record.cost && (
                          <span className="typography-body font-medium text-neutral-2">
                            ${record.cost}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Upgrades Tab */}
        <TabsContent value="upgrades" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="typography-subtitle text-neutral-1">Upgrade Planning</h3>
            <Button onClick={() => ownedCars[0] && addUpgradePlan(ownedCars[0].id)}>
              <Plus className="w-4 h-4 mr-2" />
              Plan Upgrade
            </Button>
          </div>

          {/* Upgrade Plans */}
          <div className="space-y-3">
            {upgradePlans
              .filter(plan => !selectedCarId || plan.carId === selectedCarId)
              .map(plan => (
                <Card key={plan.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getUpgradeCategoryIcon(plan.category)}
                        <div>
                          <h4 className="typography-subtitle text-neutral-1">{plan.title}</h4>
                          <p className="typography-caption text-neutral-4">{plan.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getPriorityColor(plan.priority)} border`}>
                          {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
                        </Badge>
                        <span className="typography-body font-medium text-neutral-2">
                          ${plan.estimatedCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Dream Cars Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="typography-subtitle text-neutral-1">Dream Car Wishlist</h3>
            <Button onClick={addDreamCar}>
              <Plus className="w-4 h-4 mr-2" />
              Add Dream Car
            </Button>
          </div>

          {/* Dream Cars Grid */}
          <div className="grid grid-cols-1 gap-4">
            {dreamCars.map(dreamCar => (
              <Card key={dreamCar.id} className="relative overflow-hidden bg-card shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-1 p-0 col-span-3">
                {/* Full-width car image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={dreamCar.imageUrl || 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop&crop=center'} 
                    alt={`${dreamCar.year} ${dreamCar.make} ${dreamCar.model}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Priority badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${getPriorityColor(dreamCar.priority)} border shadow-sm`}>
                      {dreamCar.priority.charAt(0).toUpperCase() + dreamCar.priority.slice(1)} Priority
                    </Badge>
                  </div>
                  
                  {/* Car name prominently displayed on the image */}
                  <div className="absolute top-3 left-3">
                    <h2 className="text-lg font-bold text-white text-shadow-lg leading-tight">
                      {dreamCar.year} {dreamCar.make} {dreamCar.model}
                    </h2>
                  </div>
                </div>

                {/* Information overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <div className="space-y-2">
                    {/* Category and price row */}
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {dreamCar.category.charAt(0).toUpperCase() + dreamCar.category.slice(1)}
                      </Badge>
                      {dreamCar.targetPrice && (
                        <span className="typography-body-small font-medium text-white">
                          ${dreamCar.targetPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-2 pt-1">
                      <Button size="sm" variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <ArrowLeftRight className="w-4 h-4 mr-1" />
                        Compare
                      </Button>
                      <Button size="sm" variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <Target className="w-4 h-4 mr-1" />
                        Research
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {dreamCars.length === 0 && (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-neutral-4 mx-auto mb-3" />
              <h4 className="typography-subtitle text-neutral-2 mb-2">No Dream Cars Yet</h4>
              <p className="typography-body text-neutral-4 mb-4">
                Start building your wishlist of cars you'd love to own someday
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnedCarsManager; 