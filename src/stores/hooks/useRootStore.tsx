import React, { useContext } from 'react';
import RootStore, { RootStoreContext } from 'stores/RootStore';

export function useRootStore() {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('useRootStore must be used within StoreProvider');
  }

  return context;
}

export const UseRootStore: React.FC = ({ children }) => {
  const store = new RootStore();

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};
