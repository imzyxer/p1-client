import { useRootStore } from 'stores/hooks/useRootStore';

export default function useEntryAddStore() {
  const { entryAddStore } = useRootStore();
  return entryAddStore;
}
