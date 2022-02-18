import useRootStore from 'stores/hooks/useRootStore';

export default function useThingEditStore() {
  const { thingEditStore } = useRootStore();
  return thingEditStore;
}
