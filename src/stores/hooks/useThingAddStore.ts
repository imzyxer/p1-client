import { useRootStore } from 'stores/hooks/useRootStore';

export default function useThingAddStore() {
  const { thingAddStore } = useRootStore();
  return thingAddStore;
}
