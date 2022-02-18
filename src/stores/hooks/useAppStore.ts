import useRootStore from 'stores/hooks/useRootStore';

export default function useAppStore() {
  const { appStore } = useRootStore();
  return appStore;
}
