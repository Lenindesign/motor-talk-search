
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Calculator, Share2, Download } from "lucide-react";

interface GarageQuickActionsProps {
  carCount: number;
}

const GarageQuickActions: React.FC<GarageQuickActionsProps> = ({ carCount }) => {
  const navigate = useNavigate();

  if (carCount === 0) return null;

  return (
    <Card className="bg-neutral-8 border-neutral-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="typography-caption text-neutral-1 mb-1">Quick Actions</h3>
            <p className="typography-caption-small text-neutral-4">
              Compare, calculate, and share your vehicles
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Calculate</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GarageQuickActions;
