import React, { createContext, useContext, useState } from "react";

export type ThemeType = "light" | "dark" | "system";

export interface PersonalizationPreferences {
  theme: ThemeType;
}

interface PersonalizationContextType {
  preferences: PersonalizationPreferences;
  updatePreferences: (newPreferences: Partial<PersonalizationPreferences>) => void;
}

const defaultPreferences: PersonalizationPreferences = {
  theme: "system"
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export const SimplePersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<PersonalizationPreferences>(defaultPreferences);

  const updatePreferences = (newPreferences: Partial<PersonalizationPreferences>) => {
    setPreferences((current) => ({
      ...current,
      ...newPreferences
    }));
  };

  return (
    <PersonalizationContext.Provider value={{ preferences, updatePreferences }}>
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