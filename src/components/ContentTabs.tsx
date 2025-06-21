import React from "react";
import { Link } from "react-router-dom";

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
    <div className="mb-4 sticky top-0 bg-white z-50 border-b border-gray-200">
      <div className="flex gap-6 overflow-x-auto p-4 scrollbar-hide">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab.id);
              const element = document.getElementById(tab.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className={`typography-caption whitespace-nowrap cursor-pointer hover:text-motortrend-red transition-colors ${
              activeTab === tab.id ? "text-motortrend-red font-semibold" : "text-gray-600"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContentTabs;

