import React, { FC, Suspense } from 'react';
import { observer } from 'mobx-react';
import Confirm from 'components/Dialogs/Confirm';
import useRootStore from 'stores/hooks/useRootStore';

const ThingViewModal = React.lazy(() => import('components/Dialogs/ThingView'));
const ThingEditModal = React.lazy(() => import('components/Dialogs/ThingEdit'));
const ThingAddModal = React.lazy(() => import('components/Dialogs/ThingAdd'));
const GroupsManage = React.lazy(() => import('components/Dialogs/GroupsManage'));
const Dialogs: FC = () => {
  const { thingViewStore, thingEditStore, thingAddStore, groupsManageStore } = useRootStore();

  return (
    <>
      <Confirm />
      {thingViewStore.init && (
        <Suspense fallback={<></>}>
          <ThingViewModal />
        </Suspense>
      )}
      {thingEditStore.init && (
        <Suspense fallback={<></>}>
          <ThingEditModal />
        </Suspense>
      )}
      {thingAddStore.init && (
        <Suspense fallback={<></>}>
          <ThingAddModal />
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

export default observer(Dialogs);
