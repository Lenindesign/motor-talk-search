
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { PropertyControl, ComponentType, ButtonProperties, BadgeProperties, CardProperties } from './types';

interface PropertyControlsProps {
  selectedComponent: ComponentType;
  properties: Record<string, PropertyControl>;
  buttonProps: ButtonProperties;
  badgeProps: BadgeProperties;
  cardProps: CardProperties;
  onPropertyChange: (propName: string, value: any) => void;
}

const PropertyControls: React.FC<PropertyControlsProps> = ({
  selectedComponent,
  properties,
  buttonProps,
  badgeProps,
  cardProps,
  onPropertyChange
}) => {
  const getCurrentValue = (propName: string) => {
    if (selectedComponent === 'button') {
      return buttonProps[propName as keyof ButtonProperties];
    } else if (selectedComponent === 'badge') {
      return badgeProps[propName as keyof BadgeProperties];
    } else {
      return cardProps[propName as keyof CardProperties];
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Properties</h3>
      <p className="text-sm text-muted-foreground">
        Customize the selected component
      </p>
      <div className="grid gap-4">
        {Object.entries(properties).map(([propName, control]) => (
          <div key={propName} className="grid gap-2">
            <Label htmlFor={propName}>{control.label}</Label>

            {control.type === 'select' && (
              <Select
                value={getCurrentValue(propName) as string || control.options?.[0]}
                onValueChange={(value) => onPropertyChange(propName, value)}
              >
                <SelectTrigger id={propName}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {control.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {control.type === 'boolean' && (
              <div className="flex items-center space-x-2">
                <Switch
                  id={propName}
                  checked={getCurrentValue(propName) as boolean}
                  onCheckedChange={(value) => onPropertyChange(propName, value)}
                />
              </div>
            )}

            {control.type === 'text' && (
              <Input
                id={propName}
                value={getCurrentValue(propName) as string || ''}
                onChange={(e) => onPropertyChange(propName, e.target.value)}
              />
            )}

            {control.type === 'range' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{control.min}</span>
                  <span className="text-sm">{getCurrentValue(propName)}</span>
                  <span className="text-sm">{control.max}</span>
                </div>
                <Slider
                  id={propName}
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={[Number(getCurrentValue(propName)) || 0]}
                  onValueChange={(values) => onPropertyChange(propName, values[0])}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyControls;
