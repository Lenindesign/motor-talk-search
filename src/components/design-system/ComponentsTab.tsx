
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, Plus, Info, AlertCircle } from 'lucide-react';
import ButtonDemo from './ButtonDemo';

const ComponentsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Button variants, sizes, and states</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonDemo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input fields, selects, and form controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-demo">Input Field</Label>
                <Input id="input-demo" placeholder="Enter text here" />
              </div>
              <div>
                <Label htmlFor="textarea-demo">Textarea</Label>
                <Textarea id="textarea-demo" placeholder="Enter longer text here" />
              </div>
              <div>
                <Label htmlFor="select-demo">Select</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox-demo" />
                <Label htmlFor="checkbox-demo">Checkbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="switch-demo" />
                <Label htmlFor="switch-demo">Switch</Label>
              </div>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Radio Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Radio Option 2</Label>
                </div>
              </RadioGroup>
              <div>
                <Label>Slider</Label>
                <Slider defaultValue={[33]} max={100} step={1} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button section is now handled by the ButtonDemo component above */}

      <Card>
        <CardHeader>
          <CardTitle>Feedback Components</CardTitle>
          <CardDescription>Alerts, progress, and status indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is an error alert message.
              </AlertDescription>
            </Alert>
          </div>
          <div className="space-y-2">
            <Label>Progress Bar</Label>
            <Progress value={33} />
          </div>
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentsTab;
