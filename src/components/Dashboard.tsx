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
import { useTranslation } from 'react-i18next';

const Dashboard: FC = () => {
  const { t } = useTranslation('dashboard');
  const dashboardStore = useDashboardStore();
  const latest = dashboardStore.latestForList;
  const starred = dashboardStore.starredForList;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<StarIcon />}>{t('blockTitle')}</PageTitle>
            <ThingsTable things={starred} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<TimeIcon />}>{t('blockLatest')}</PageTitle>
            <ThingsTable things={latest} columns={[EColumn.TYPE, EColumn.TITLE, EColumn.SUBJECT, EColumn.STARRED, EColumn.EDIT]} />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Dashboard);
