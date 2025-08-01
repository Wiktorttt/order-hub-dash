import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType {
  useRealData: boolean;
  setUseRealData: (value: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [useRealData, setUseRealData] = useState(false);

  return (
    <DataContext.Provider value={{ useRealData, setUseRealData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataMode = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataMode must be used within a DataProvider');
  }
  return context;
};