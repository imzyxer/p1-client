import { useRootStore } from 'stores/hooks/useRootStore';

export default function useGroupsManageStore() {
  const { groupsManageStore } = useRootStore();
  return groupsManageStore;
}
