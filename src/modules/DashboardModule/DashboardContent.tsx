import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import TimeIcon from '@mui/icons-material/AccessTime';
import useRootStore from 'stores/hooks/useRootStore';
import ThingsTable from 'components/ThingsTable';
import { EColumn } from 'components/ThingsTable/ThingsTableRow';
import PageTitle from 'components/common/PageTitle';
import PageContainer from 'components/common/PageContainer';
import { useTranslation } from 'react-i18next';
import LastVisitAlert from 'modules/DashboardModule/alerts/LastVisitAlert';
import PassCodeAlert from 'modules/DashboardModule/alerts/PassCodeAlert';

const DashboardContent: FC = () => {
  const { t } = useTranslation('dashboard');
  const { dashboardStore } = useRootStore();
  const { latestForList: latest, starredForList: starred } = dashboardStore;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PassCodeAlert />
          <LastVisitAlert />
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

export default observer(DashboardContent);
