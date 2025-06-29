import { createContext, useContext, useState, useCallback, useEffect } from 'react';

import { _langs } from 'src/_mock';

// ----------------------------------------------------------------------

export type Language = {
  value: string;
  label: string;
  icon: string;
  direction: 'ltr' | 'rtl';
};

type LanguageContextType = {
  currentLanguage: Language;
  direction: 'ltr' | 'rtl';
  changeLanguage: (languageValue: string) => void;
  languages: Language[];
};

// ----------------------------------------------------------------------

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ----------------------------------------------------------------------

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language');
    const foundLanguage = _langs.find((lang) => lang.value === savedLanguage);
    return foundLanguage || _langs[0]; // Default to English
  });

  const direction = currentLanguage.direction;

  const changeLanguage = useCallback((languageValue: string) => {
    const newLanguage = _langs.find((lang) => lang.value === languageValue);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem('language', languageValue);
    }
  }, []);

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage.value;
  }, [currentLanguage, direction]);

  const value = {
    currentLanguage,
    direction,
    changeLanguage,
    languages: _langs,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// ----------------------------------------------------------------------

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}