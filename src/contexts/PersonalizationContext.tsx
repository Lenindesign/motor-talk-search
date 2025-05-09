
import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "light" | "dark" | "system";
export type FontSizeType = "small" | "medium" | "large";

export interface PersonalizationPreferences {
  theme: ThemeType;
  fontSize: FontSizeType;
  language: string;
  timezone: string;
  favoriteCategories: string[];
  favoriteManufacturers: string[];
}

interface PersonalizationContextType {
  preferences: PersonalizationPreferences;
  updatePreferences: (newPreferences: Partial<PersonalizationPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: PersonalizationPreferences = {
  theme: "system",
  fontSize: "medium",
  language: "en",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  favoriteCategories: [],
  favoriteManufacturers: []
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<PersonalizationPreferences>(() => {
    const savedPrefs = localStorage.getItem("userPreferences");
    return savedPrefs ? JSON.parse(savedPrefs) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    
    // Apply theme
    document.documentElement.classList.toggle("dark", preferences.theme === "dark");
    
    // Apply font size
    document.documentElement.dataset.fontSize = preferences.fontSize;
    
    // Apply the appropriate font size CSS class
    document.body.className = document.body.className
      .replace(/text-(sm|base|lg)/, "");
    
    if (preferences.fontSize === "small") {
      document.body.classList.add("text-sm");
    } else if (preferences.fontSize === "large") {
      document.body.classList.add("text-lg");
    } else {
      document.body.classList.add("text-base");
    }
    
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<PersonalizationPreferences>) => {
    setPreferences((current) => ({
      ...current,
      ...newPreferences
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PersonalizationContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error("usePersonalization must be used within a PersonalizationProvider");
  }
  return context;
};
