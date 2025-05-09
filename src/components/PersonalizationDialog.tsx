
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  usePersonalization, 
  ThemeType, 
  FontSizeType 
} from "../contexts/PersonalizationContext";

interface PersonalizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PersonalizationDialog: React.FC<PersonalizationDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { preferences, updatePreferences } = usePersonalization();
  const [tempPreferences, setTempPreferences] = useState({...preferences});
  
  const categories = [
    "Sports Cars",
    "Electric Vehicles",
    "Muscle Cars",
    "Reviews",
    "Luxury",
    "Trucks",
    "Hypercars",
    "Comparisons",
    "SUVs",
    "Classics",
    "Off-Road",
    "Industry News"
  ];
  
  const manufacturers = [
    "Porsche",
    "Audi",
    "Toyota",
    "Lamborghini",
    "Acura",
    "BMW",
    "Tesla",
    "Honda",
    "Ferrari",
    "Nissan",
    "Mercedes-Benz",
    "Ford",
    "Chevrolet",
    "Lexus",
    "Hyundai"
  ];

  const handleThemeChange = (theme: ThemeType) => {
    setTempPreferences(prev => ({ ...prev, theme }));
  };

  const handleFontSizeChange = (fontSize: FontSizeType) => {
    setTempPreferences(prev => ({ ...prev, fontSize }));
  };

  const handleCategoryToggle = (category: string) => {
    setTempPreferences(prev => {
      const currentCategories = [...prev.favoriteCategories];
      const index = currentCategories.indexOf(category);
      
      if (index > -1) {
        currentCategories.splice(index, 1);
      } else {
        currentCategories.push(category);
      }
      
      return { ...prev, favoriteCategories: currentCategories };
    });
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    setTempPreferences(prev => {
      const currentManufacturers = [...prev.favoriteManufacturers];
      const index = currentManufacturers.indexOf(manufacturer);
      
      if (index > -1) {
        currentManufacturers.splice(index, 1);
      } else {
        currentManufacturers.push(manufacturer);
      }
      
      return { ...prev, favoriteManufacturers: currentManufacturers };
    });
  };

  const handleSave = () => {
    updatePreferences(tempPreferences);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTempPreferences({...preferences});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Personalize Your Experience</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="content" className="flex-1">Content Preferences</TabsTrigger>
            <TabsTrigger value="display" className="flex-1">Display Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Favorite Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={tempPreferences.favoriteCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Favorite Manufacturers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {manufacturers.map((manufacturer) => (
                  <div key={manufacturer} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`manufacturer-${manufacturer}`} 
                      checked={tempPreferences.favoriteManufacturers.includes(manufacturer)}
                      onCheckedChange={() => handleManufacturerToggle(manufacturer)}
                    />
                    <label 
                      htmlFor={`manufacturer-${manufacturer}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {manufacturer}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6 pt-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Theme</h3>
              <RadioGroup 
                value={tempPreferences.theme} 
                onValueChange={(value) => handleThemeChange(value as ThemeType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system">System</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Font Size</h3>
              <RadioGroup 
                value={tempPreferences.fontSize} 
                onValueChange={(value) => handleFontSizeChange(value as FontSizeType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="font-small" />
                  <Label htmlFor="font-small" className="text-sm">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <Label htmlFor="font-medium" className="text-base">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="font-large" />
                  <Label htmlFor="font-large" className="text-lg">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-motortrend-dark">
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizationDialog;
