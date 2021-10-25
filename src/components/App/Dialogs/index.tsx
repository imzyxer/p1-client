import React, { FC, Suspense } from 'react';
import { observer } from 'mobx-react';
import Confirm from 'components/App/Dialogs/Confirm';
import { useRootStore } from 'stores/hooks/useRootStore';

const EntryViewModal = React.lazy(() => import('components/App/Dialogs/EntryView'));
const EntryEditModal = React.lazy(() => import('components/App/Dialogs/EntryEdit'));
const EntryAddModal = React.lazy(() => import('components/App/Dialogs/EntryAdd'));
const GroupsManage = React.lazy(() => import('components/App/Dialogs/GroupsManage'));
const Index: FC = () => {
  const { entryViewStore, entryEditStore, entryAddStore, groupsManageStore } = useRootStore();

  return (
    <>
      <Confirm />
      {entryViewStore.init && (
        <Suspense fallback={<></>}>
          <EntryViewModal />
        </Suspense>
      )}
      {entryEditStore.init && (
        <Suspense fallback={<></>}>
          <EntryEditModal />
        </Suspense>
      )}
      {entryAddStore.init && (
        <Suspense fallback={<></>}>
          <EntryAddModal />
        </Suspense>
      )}
      {groupsManageStore.init && (
        <Suspense fallback={<></>}>
          <GroupsManage />
        </Suspense>
      )}
    </>
  );
};

export default observer(Index);
