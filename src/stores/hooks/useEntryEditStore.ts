import { useRootStore } from 'stores/hooks/useRootStore';

export default function useEntryEditStore() {
  const { entryEditStore } = useRootStore();
  return entryEditStore;
}
