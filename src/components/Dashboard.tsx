import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import StarIcon from '@material-ui/icons/Star';
import TimeIcon from '@material-ui/icons/AccessTime';
import EntriesTable, { EColumn } from 'components/common/EntriesTable';
import useDashboardStore from 'stores/hooks/useDashboardStore';
import PageTitle from 'components/layout/PageTitle';
import PageContainer from 'components/layout/PageContainer';

const Dashboard: FC = () => {
  const dashboardStore = useDashboardStore();
  const latest = dashboardStore.latestForList;
  const starred = dashboardStore.starredForList;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<StarIcon />}>Starred</PageTitle>
            <EntriesTable entries={starred} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT, EColumn.REQUESTED]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<TimeIcon />}>Latest</PageTitle>
            <EntriesTable entries={latest} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT, EColumn.REQUESTED]} />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Dashboard);
