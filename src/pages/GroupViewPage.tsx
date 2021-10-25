import React, { FC, useEffect } from 'react';
import Group from 'components/Group';
import withEnvelope from 'components/hoc/withEnvelope';
import { observer } from 'mobx-react';
import useGroupStore from 'stores/hooks/useGroupStore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useParams } from 'react-router-dom';
import Empty from 'components/common/Empty';
import { EProgress } from 'types/app';
import { APP_NAME } from 'constants/app';
import { reaction } from 'mobx';
import useAppStore from 'stores/hooks/useAppStore';

const GroupViewPage: FC = () => {
  const params = useParams<Record<string, string | undefined>>();
  const groupStore = useGroupStore();
  const appStore = useAppStore();
  const groupId = params.groupId ?? null;

  useEffect(() => {
    document.title = `Entries — ${APP_NAME}`;
    groupStore.initiate(groupId);
  }, [groupStore, groupId]);

  useEffect(() => {
    const disposer = reaction(
      () => appStore.entryHasBeenChanged,
      changeNumber => {
        if (changeNumber > 0) groupStore.refresh();
      }
    );
    return () => disposer();
  }, []); // eslint-disable-line

  if (groupStore.progress !== EProgress.LOADED) return <LinearProgress />;

  const { group } = groupStore;

  return group ? <Group group={group} /> : <Empty />;
};

export default withEnvelope(observer(GroupViewPage));
