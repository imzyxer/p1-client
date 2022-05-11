import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { observer } from 'mobx-react';
import HistoryIcon from '@mui/icons-material/History';
import { useTranslation, Trans } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { getHistoryUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';

const LastVisitAlert: FC = () => {
  const { t } = useTranslation('dashboard');
  const { userLastVisit: visit } = useAppStore();

  return (
    <>
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
            You last logged in on {{ datetime: visit.datetime }}. Location — {{ location: visit.location }}, IP used — {{ ip: visit.ip }}
          </Trans>
        </Alert>
      )}
    </>
  );
};

export default observer(LastVisitAlert);
