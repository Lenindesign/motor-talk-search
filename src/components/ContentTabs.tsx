
import React from "react";
import { ContentType } from "./ContentGrid";

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
    <div className="mb-4 flex overflow-x-auto border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? 'bg-motortrend-dark text-white'
              : 'bg-transparent text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ContentTabs;
