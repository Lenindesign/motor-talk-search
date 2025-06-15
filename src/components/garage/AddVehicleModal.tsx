import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Search, Plus, X } from 'lucide-react';

interface AddVehicleModalProps {
  children: React.ReactNode;
  onAddVehicle?: (vehicleData: VehicleFormData) => void;
}

interface VehicleFormData {
  year: string;
  make: string;
  model: string;
  trim?: string;
  mileage?: string;
  vin?: string;
  color?: string;
  purchaseDate?: string;
  purchasePrice?: string;
  notes?: string;
  status: 'owned' | 'interested' | 'testDriven';
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const popularMakes = [
  'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge',
  'Ford', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep',
  'Kia', 'Land Rover', 'Lexus', 'Lincoln', 'Mazda', 'Mercedes-Benz', 'Mitsubishi',
  'Nissan', 'Porsche', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
];

const AddVehicleModal: React.FC<AddVehicleModalProps> = ({ children, onAddVehicle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<VehicleFormData>({
    year: '',
    make: '',
    model: '',
    trim: '',
    mileage: '',
    vin: '',
    color: '',
    purchaseDate: '',
    purchasePrice: '',
    notes: '',
    status: 'owned'
  });

  const handleInputChange = (field: keyof VehicleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.year || !formData.make || !formData.model) {
      alert('Please fill in the required fields: Year, Make, and Model');
      return;
    }

    // Call the onAddVehicle callback if provided
    if (onAddVehicle) {
      onAddVehicle(formData);
    }

    // Reset form and close modal
    setFormData({
      year: '',
      make: '',
      model: '',
      trim: '',
      mileage: '',
      vin: '',
      color: '',
      purchaseDate: '',
      purchasePrice: '',
      notes: '',
      status: 'owned'
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      year: '',
      make: '',
      model: '',
      trim: '',
      mileage: '',
      vin: '',
      color: '',
      purchaseDate: '',
      purchasePrice: '',
      notes: '',
      status: 'owned'
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="typography-title flex items-center gap-2">
            <Car className="w-5 h-5 text-motortrend-red" />
            Add Vehicle to Garage
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Selection */}
          <div className="space-y-2">
            <Label className="typography-body-small font-medium">Vehicle Status *</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.status === 'owned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('status', 'owned')}
                className={formData.status === 'owned' ? 'bg-motortrend-red text-white' : ''}
              >
                Owned
              </Button>
              <Button
                type="button"
                variant={formData.status === 'interested' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('status', 'interested')}
                className={formData.status === 'interested' ? 'bg-motortrend-red text-white' : ''}
              >
                Interested
              </Button>
              <Button
                type="button"
                variant={formData.status === 'testDriven' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('status', 'testDriven')}
                className={formData.status === 'testDriven' ? 'bg-motortrend-red text-white' : ''}
              >
                Test Driven
              </Button>
            </div>
          </div>

          {/* Basic Vehicle Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="typography-subtitle">Vehicle Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="typography-body-small font-medium">Year *</Label>
                  <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="make" className="typography-body-small font-medium">Make *</Label>
                  <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularMakes.map(make => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="typography-body-small font-medium">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Enter model"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trim" className="typography-body-small font-medium">Trim</Label>
                  <Input
                    id="trim"
                    value={formData.trim}
                    onChange={(e) => handleInputChange('trim', e.target.value)}
                    placeholder="e.g., LX, Sport, Premium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color" className="typography-body-small font-medium">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="e.g., Black, White, Red"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="typography-subtitle">Additional Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileage" className="typography-body-small font-medium">Current Mileage</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                    placeholder="e.g., 45000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vin" className="typography-body-small font-medium">VIN</Label>
                  <Input
                    id="vin"
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value)}
                    placeholder="17-character VIN"
                    maxLength={17}
                  />
                </div>
              </div>

              {formData.status === 'owned' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate" className="typography-body-small font-medium">Purchase Date</Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice" className="typography-body-small font-medium">Purchase Price</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={formData.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      placeholder="e.g., 25000"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes" className="typography-body-small font-medium">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes about this vehicle..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-motortrend-red text-white hover:bg-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleModal;
