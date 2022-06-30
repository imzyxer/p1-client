import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import { IGroup } from 'types/group';
import GroupIcon from 'components/common/GroupIcon';
import ThingsTable from 'components/ThingsTable';
import { EColumn } from 'components/ThingsTable/ThingsTableRow';
import useGroupStore from 'stores/hooks/useGroupStore';
import PageTitle from 'components/common/PageTitle';
import PageContainer from 'components/common/PageContainer';

const Content: FC<{ group: IGroup }> = ({ group }) => {
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

export default observer(Content);
