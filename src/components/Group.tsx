import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import { IGroup } from 'types/group';
import GroupIcon from 'components/common/GroupIcon';
import ThingsTable, { EColumn } from 'components/common/ThingsTable';
import useGroupStore from 'stores/hooks/useGroupStore';
import PageTitle from 'components/layout/PageTitle';
import PageContainer from 'components/layout/PageContainer';

const Group: FC<{ group: IGroup }> = ({ group }) => {
  const groupStore = useGroupStore();

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <PageTitle icon={<GroupIcon icon={group.icon} />}>{group.name}</PageTitle>
            <ThingsTable
              things={groupStore.thingsForList}
              columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT, EColumn.CREATED, EColumn.UPDATED]}
            />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Group);
