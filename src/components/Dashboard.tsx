import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import StarIcon from '@mui/icons-material/Star';
import TimeIcon from '@mui/icons-material/AccessTime';
import ThingsTable, { EColumn } from 'components/common/ThingsTable';
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
            <ThingsTable things={starred} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<TimeIcon />}>Latest</PageTitle>
            <ThingsTable things={latest} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT]} />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Dashboard);
