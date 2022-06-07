import { useContext } from 'react';
import { RootStoreContext } from 'stores/RootStore';

export default function useRootStore() {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('useRootStore must be used within StoreProvider');
  }

  return context;
}
