import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Phone, User, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SavedItem } from '../../contexts/SavedItemsContext';
import { CarData } from '../CarCard/types';

interface ScheduleTestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: SavedItem;
  carData: CarData;
}

const ScheduleTestDriveModal: React.FC<ScheduleTestDriveModalProps> = ({
  isOpen,
  onClose,
  car,
  carData
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    dealerLocation: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.preferredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate scheduling the test drive
    toast({
      title: "Test Drive Scheduled!",
      description: `Your test drive for the ${car.title} has been scheduled. A dealer will contact you shortly to confirm.`,
      duration: 5000
    });

    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      dealerLocation: '',
      message: ''
    });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      dealerLocation: '',
      message: ''
    });
    onClose();
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-motortrend-red" />
            Schedule Test Drive
          </DialogTitle>
        </DialogHeader>

        {/* Car Info Header */}
        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={car.imageUrl} 
              alt={car.title}
              className="w-16 h-12 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-neutral-1">{car.title}</h3>
              <p className="text-sm text-neutral-3">{carData.price}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-1 flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-1 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Appointment Details
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={minDate}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dealerLocation">Preferred Dealer Location</Label>
              <Select onValueChange={(value) => handleInputChange('dealerLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dealer location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown Location - 123 Main St</SelectItem>
                  <SelectItem value="north">North Location - 456 Oak Ave</SelectItem>
                  <SelectItem value="south">South Location - 789 Pine Rd</SelectItem>
                  <SelectItem value="west">West Location - 321 Elm St</SelectItem>
                  <SelectItem value="any">Any Location (Dealer will choose closest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-1 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Information
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="message">Special Requests or Questions</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Any specific questions about the vehicle, financing options, trade-in, etc."
                rows={3}
              />
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">What to Expect:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• A dealer representative will contact you within 24 hours to confirm your appointment</li>
              <li>• Please bring a valid driver's license for the test drive</li>
              <li>• Test drives typically last 15-30 minutes</li>
              <li>• No obligation to purchase</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-motortrend-red hover:bg-motortrend-red/90"
            >
              Schedule Test Drive
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTestDriveModal; 