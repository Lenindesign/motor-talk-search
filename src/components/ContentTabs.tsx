

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ContentType = "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos";

interface ContentTabsProps {
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ContentType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "articles", label: "Articles" },
    { id: "newCars", label: "New Cars" },
    { id: "usedCars", label: "Used Cars" },
    { id: "photos", label: "Photos" },
    { id: "videos", label: "Videos" },
  ];

  return (
    <div className="mb-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1 bg-gray-100">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs sm:text-sm font-medium px-2 py-2 data-[state=active]:bg-neutral-800 data-[state=active]:text-white hover:bg-gray-200"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ContentTabs;

