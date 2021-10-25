import { useRootStore } from 'stores/hooks/useRootStore';

export default function useDashboardStore() {
  const { dashboardStore } = useRootStore();
  return dashboardStore;
}
