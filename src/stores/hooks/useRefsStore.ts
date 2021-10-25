import { useRootStore } from 'stores/hooks/useRootStore';

export default function useRefsStore() {
  const { refsStore } = useRootStore();
  return refsStore;
}
