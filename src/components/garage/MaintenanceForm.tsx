import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Gauge, Save, X } from 'lucide-react';

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

interface MaintenanceFormProps {
  record?: MaintenanceRecord;
  carId: string;
  onSave: (record: MaintenanceRecord) => void;
  onCancel: () => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ record, carId, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    id: record?.id || Date.now().toString(),
    carId: carId,
    type: record?.type || 'oil-change',
    description: record?.description || '',
    date: record?.date || new Date().toISOString().split('T')[0],
    mileage: record?.mileage || undefined,
    cost: record?.cost || undefined,
    nextDue: record?.nextDue || '',
    nextMileage: record?.nextMileage || undefined,
    status: record?.status || 'scheduled',
    notes: record?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description && formData.date && formData.type) {
      onSave(formData as MaintenanceRecord);
    }
  };

  const maintenanceTypes = [
    { value: 'oil-change', label: 'Oil Change' },
    { value: 'tire-rotation', label: 'Tire Rotation' },
    { value: 'brake-service', label: 'Brake Service' },
    { value: 'inspection', label: 'Inspection' },
    { value: 'repair', label: 'Repair' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="typography-subtitle text-neutral-1">
          {record ? 'Edit Maintenance Record' : 'Add Maintenance Record'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Service Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as MaintenanceRecord['type'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {maintenanceTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as MaintenanceRecord['status'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., Regular oil change with synthetic oil"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Service Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-neutral-4" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage (optional)</Label>
              <div className="relative">
                <Gauge className="absolute left-3 top-3 h-4 w-4 text-neutral-4" />
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder="e.g., 45000"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost (optional)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-neutral-4" />
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="e.g., 89.99"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextDue">Next Service Due (optional)</Label>
              <Input
                id="nextDue"
                type="date"
                value={formData.nextDue}
                onChange={(e) => setFormData(prev => ({ ...prev, nextDue: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextMileage">Next Service Mileage (optional)</Label>
            <div className="relative">
              <Gauge className="absolute left-3 top-3 h-4 w-4 text-neutral-4" />
              <Input
                id="nextMileage"
                type="number"
                value={formData.nextMileage || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, nextMileage: e.target.value ? parseInt(e.target.value) : undefined }))}
                placeholder="e.g., 50000"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes about the service..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save Record
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MaintenanceForm; 