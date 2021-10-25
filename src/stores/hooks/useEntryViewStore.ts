import { useRootStore } from 'stores/hooks/useRootStore';

export default function useEntryViewStore() {
  const { entryViewStore } = useRootStore();
  return entryViewStore;
}
