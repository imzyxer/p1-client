import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { observer } from 'mobx-react';
import PasswordIcon from '@mui/icons-material/Password';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { getProfilePassCodeUrn } from 'utils/getUrn';
import useRootStore from 'stores/hooks/useRootStore';

const PassCodeAlert: FC = () => {
  const { t } = useTranslation('dashboard');
  const { standaloneStore } = useRootStore();

  return (
    <>
      {standaloneStore.isStandalone && !standaloneStore.isProtectedByPassCode && (
        <Alert
          sx={{ mb: 2 }}
          severity="warning"
          action={
            <IconButton component={Link} to={getProfilePassCodeUrn()}>
              <PasswordIcon />
            </IconButton>
          }
        >
          <AlertTitle>{t('alertPassCodeTitle')}</AlertTitle>
          {t('alertPassCodeBody')}
        </Alert>
      )}
    </>
  );
};

export default observer(PassCodeAlert);
