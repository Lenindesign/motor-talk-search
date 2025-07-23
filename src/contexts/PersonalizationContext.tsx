
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
  console.log('[PersonalizationProvider] Initializing...');
  
  // Initialize with default preferences first
  const [preferences, setPreferences] = useState<PersonalizationPreferences>(defaultPreferences);
  
  // Load from localStorage after component mounts
  useEffect(() => {
    try {
      console.log('[PersonalizationProvider] Loading from localStorage...');
      const savedPrefs = localStorage.getItem("userPreferences");
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs);
        console.log('[PersonalizationProvider] Loaded preferences:', parsed);
        setPreferences(parsed);
      }
    } catch (error) {
      console.error('[PersonalizationProvider] Error loading preferences:', error);
    }
  }, []);

  useEffect(() => {
    try {
      console.log('[PersonalizationProvider] Saving preferences:', preferences);
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
    } catch (error) {
      console.error('[PersonalizationProvider] Error saving preferences:', error);
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
