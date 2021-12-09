import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import LocalLoader from 'components/common/LocalLoader';
import List from '@material-ui/core/List';
import useRefsStore from 'stores/hooks/useRefsStore';
import GroupItem from 'components/Envelope/Menu/GroupItem';
import { useParams } from 'react-router-dom';
import { computed } from 'mobx';
import { ERef } from 'types/app';

const GroupList: FC = () => {
  const params = useParams<keyof { groupId: string }>();
  const refsStore = useRefsStore();
  const { groups } = refsStore;
  const groupsProgress = computed(() => refsStore.getProgress(ERef.GROUPS)).get();

  useEffect(() => {
    refsStore.fetchGroups();
  }, [refsStore]);

  return (
    <LocalLoader progress={groupsProgress}>
      <List>
        {groups.map(group => (
          <GroupItem key={group.id} group={group} selected={group.id === params.groupId} />
        ))}
      </List>
    </LocalLoader>
  );
};

export default observer(GroupList);
