'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ScrollContextType {
  isHeaderHidden: boolean;
  isSearchHidden: boolean;
  setHeaderHidden: (hidden: boolean) => void;
  setSearchHidden: (hidden: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isSearchHidden, setIsSearchHidden] = useState(false);

  const setHeaderHidden = useCallback((hidden: boolean) => {
    setIsHeaderHidden(hidden);
  }, []);

  const setSearchHidden = useCallback((hidden: boolean) => {
    setIsSearchHidden(hidden);
  }, []);

  return (
    <ScrollContext.Provider value={{ 
      isHeaderHidden, 
      isSearchHidden, 
      setHeaderHidden, 
      setSearchHidden 
    }}>
      {children}
    </ScrollContext.Provider>
  );
};