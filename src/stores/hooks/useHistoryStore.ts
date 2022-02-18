import useRootStore from 'stores/hooks/useRootStore';

export default function useHistoryStore() {
  const { historyStore } = useRootStore();
  return historyStore;
}
