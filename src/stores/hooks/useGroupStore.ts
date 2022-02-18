import useRootStore from 'stores/hooks/useRootStore';

export default function useGroupStore() {
  const { groupViewStore } = useRootStore();
  return groupViewStore;
}
