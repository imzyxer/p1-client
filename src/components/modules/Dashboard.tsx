import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { observer } from 'mobx-react';
import StarIcon from '@mui/icons-material/Star';
import TimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';
import ThingsTable, { EColumn } from 'components/common/ThingsTable';
import useDashboardStore from 'stores/hooks/useDashboardStore';
import PageTitle from 'components/common/PageTitle';
import PageContainer from 'components/common/PageContainer';
import { useTranslation, Trans } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { getHistoryUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';

const Dashboard: FC = () => {
  const { t } = useTranslation('dashboard');
  const dashboardStore = useDashboardStore();
  const { userLastVisit: visit } = useAppStore();
  const latest = dashboardStore.latestForList;
  const starred = dashboardStore.starredForList;

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {visit && (
            <Alert
              sx={{ mb: 2 }}
              severity="info"
              action={
                <IconButton component={Link} to={getHistoryUrn()}>
                  <HistoryIcon />
                </IconButton>
              }
            >
              <AlertTitle>{t('alertPreviousVisitTitle')}</AlertTitle>
              <Trans i18nKey="alertPreviousVisitBody" t={t}>
                You last logged in on <strong>{{ datetime: visit.datetime }}</strong>. Location — {{ location: visit.location }}, IP used — {{ ip: visit.ip }}
              </Trans>
            </Alert>
          )}
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
