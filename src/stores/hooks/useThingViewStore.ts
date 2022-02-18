import useRootStore from 'stores/hooks/useRootStore';

export default function useThingViewStore() {
  const { thingViewStore } = useRootStore();
  return thingViewStore;
}
