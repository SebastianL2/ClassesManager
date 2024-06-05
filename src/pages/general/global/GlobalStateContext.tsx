import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalStateContextProps {
  data: string;
  setData: (id: string) => void;
  data2: string; 
  setData2: (id: string) => void; 
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string>('');
  const [data2, setData2] = useState<string>(''); // Inicializa data2 con un valor predeterminado

  return (
    <GlobalStateContext.Provider value={{ data, setData, data2, setData2 }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
