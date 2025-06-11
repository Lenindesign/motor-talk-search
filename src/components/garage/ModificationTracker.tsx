import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, TrendingUp, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Modification {
  id: string;
  carId: string;
  type: 'performance' | 'aesthetic' | 'suspension' | 'engine' | 'exhaust' | 'wheels';
  name: string;
  brand: string;
  installedDate: string;
  cost: number;
  performanceGains?: {
    horsepower?: number;
    torque?: number;
    zeroToSixty?: number;
  };
  notes: string;
  images?: string[];
}

interface ModificationTrackerProps {
  carId: string;
  carName: string;
  modifications?: Modification[];
  onAddModification?: (mod: Omit<Modification, 'id'>) => void;
}

const ModificationTracker: React.FC<ModificationTrackerProps> = ({
  carId,
  carName,
  modifications = [],
  onAddModification
}) => {
  const [isAddingMod, setIsAddingMod] = useState(false);
  const [newMod, setNewMod] = useState<Partial<Modification>>({
    type: 'performance',
    performanceGains: {}
  });

  const totalCost = modifications.reduce((sum, mod) => sum + mod.cost, 0);
  const totalHpGain = modifications.reduce((sum, mod) => sum + (mod.performanceGains?.horsepower || 0), 0);
  const totalTorqueGain = modifications.reduce((sum, mod) => sum + (mod.performanceGains?.torque || 0), 0);

  const modTypeIcons = {
    performance: '⚡',
    aesthetic: '🎨',
    suspension: '🔧',
    engine: '🏎️',
    exhaust: '💨',
    wheels: '⭕'
  };

  const modTypeColors = {
    performance: 'bg-red-100 text-red-700 border-red-200',
    aesthetic: 'bg-purple-100 text-purple-700 border-purple-200',
    suspension: 'bg-blue-100 text-blue-700 border-blue-200',
    engine: 'bg-orange-100 text-orange-700 border-orange-200',
    exhaust: 'bg-gray-100 text-gray-700 border-gray-200',
    wheels: 'bg-green-100 text-green-700 border-green-200'
  };

  const handleAddMod = () => {
    if (onAddModification && newMod.name && newMod.brand) {
      onAddModification({
        carId,
        type: newMod.type || 'performance',
        name: newMod.name,
        brand: newMod.brand,
        installedDate: newMod.installedDate || new Date().toISOString(),
        cost: newMod.cost || 0,
        performanceGains: newMod.performanceGains,
        notes: newMod.notes || ''
      });
      setNewMod({ type: 'performance', performanceGains: {} });
      setIsAddingMod(false);
    }
  };

  return (
    <Card className="border-motortrend-red/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-motortrend-red" />
            Modification Tracker
          </div>
          <Dialog open={isAddingMod} onOpenChange={setIsAddingMod}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Mod
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Modification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={newMod.type}
                      onValueChange={(value) => setNewMod({ ...newMod, type: value as Modification['type'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="aesthetic">Aesthetic</SelectItem>
                        <SelectItem value="suspension">Suspension</SelectItem>
                        <SelectItem value="engine">Engine</SelectItem>
                        <SelectItem value="exhaust">Exhaust</SelectItem>
                        <SelectItem value="wheels">Wheels/Tires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Cost</Label>
                    <Input
                      type="number"
                      placeholder="$0"
                      value={newMod.cost || ''}
                      onChange={(e) => setNewMod({ ...newMod, cost: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Modification Name</Label>
                  <Input
                    placeholder="e.g., Cold Air Intake"
                    value={newMod.name || ''}
                    onChange={(e) => setNewMod({ ...newMod, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input
                    placeholder="e.g., K&N"
                    value={newMod.brand || ''}
                    onChange={(e) => setNewMod({ ...newMod, brand: e.target.value })}
                  />
                </div>
                {(newMod.type === 'performance' || newMod.type === 'engine') && (
                  <div className="space-y-2">
                    <Label>Performance Gains (optional)</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Input
                          type="number"
                          placeholder="HP+"
                          value={newMod.performanceGains?.horsepower || ''}
                          onChange={(e) => setNewMod({
                            ...newMod,
                            performanceGains: {
                              ...newMod.performanceGains,
                              horsepower: parseFloat(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="TQ+"
                          value={newMod.performanceGains?.torque || ''}
                          onChange={(e) => setNewMod({
                            ...newMod,
                            performanceGains: {
                              ...newMod.performanceGains,
                              torque: parseFloat(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0-60"
                          value={newMod.performanceGains?.zeroToSixty || ''}
                          onChange={(e) => setNewMod({
                            ...newMod,
                            performanceGains: {
                              ...newMod.performanceGains,
                              zeroToSixty: parseFloat(e.target.value) || 0
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Installation notes, impressions, etc."
                    value={newMod.notes || ''}
                    onChange={(e) => setNewMod({ ...newMod, notes: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddMod} className="w-full">
                  Add Modification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-neutral-8 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-motortrend-red">{modifications.length}</div>
            <div className="text-xs text-neutral-3">Total Mods</div>
          </div>
          <div className="bg-neutral-8 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">+{totalHpGain}</div>
            <div className="text-xs text-neutral-3">HP Gained</div>
          </div>
          <div className="bg-neutral-8 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-neutral-1">${totalCost.toLocaleString()}</div>
            <div className="text-xs text-neutral-3">Invested</div>
          </div>
        </div>

        {/* Modifications List */}
        <div className="space-y-2">
          {modifications.length === 0 ? (
            <div className="text-center py-6 text-neutral-4">
              <Wrench className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No modifications yet</p>
              <p className="text-xs">Track your build progress here</p>
            </div>
          ) : (
            modifications.map((mod, index) => (
              <div
                key={mod.id || index}
                className="flex items-center justify-between p-3 bg-neutral-8 rounded-lg hover:bg-neutral-7 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${modTypeColors[mod.type]}`}>
                    {modTypeIcons[mod.type]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{mod.name}</div>
                    <div className="text-xs text-neutral-4">{mod.brand}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {mod.performanceGains?.horsepower && (
                    <Badge variant="secondary" className="text-xs">
                      +{mod.performanceGains.horsepower} HP
                    </Badge>
                  )}
                  <div className="text-right">
                    <div className="font-medium text-sm">${mod.cost.toLocaleString()}</div>
                    <div className="text-xs text-neutral-4">
                      {new Date(mod.installedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {modifications.length > 0 && (
          <div className="mt-4 pt-4 border-t border-neutral-6">
            <Button variant="outline" size="sm" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Performance Timeline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModificationTracker; 