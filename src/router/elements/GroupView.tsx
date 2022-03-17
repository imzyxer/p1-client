import React, { FC, useEffect } from 'react';
import GroupViewComponent from 'components/modules/GroupView';
import { observer } from 'mobx-react';
import useGroupStore from 'stores/hooks/useGroupStore';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';
import Empty from 'components/common/Empty';
import { EElement, EProgress } from 'types/app';
import { reaction } from 'mobx';
import useAppStore from 'stores/hooks/useAppStore';

const GroupView: FC = () => {
  const params = useParams<keyof { groupId: string }>();
  const groupStore = useGroupStore();
  const appStore = useAppStore();
  const groupId = params.groupId ?? null;

  useEffect(() => {
    appStore.setElement(EElement.GROUP_VIEW, 'Things');
    groupStore.initiate(groupId);
  }, [appStore, groupStore, groupId]);

  useEffect(() => {
    const disposer = reaction(
      () => appStore.thingHasBeenChanged,
      changeNumber => {
        if (changeNumber > 0) groupStore.refresh();
      }
    );
    return () => disposer();
  }, []); // eslint-disable-line

  if (groupStore.progress !== EProgress.LOADED) return <LinearProgress />;

  const { group } = groupStore;

  return group ? <GroupViewComponent group={group} /> : <Empty />;
};

export default observer(GroupView);
