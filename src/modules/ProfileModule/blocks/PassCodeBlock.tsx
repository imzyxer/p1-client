import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import PageTitle from 'components/common/PageTitle';
import useRootStore from 'stores/hooks/useRootStore';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { getProfilePassCodeUrn } from 'utils/getUrn';
import confirmStore from 'stores/ConfirmStore';

const PassCodeBlock: FC = () => {
  const { t } = useTranslation('profile');
  const { standaloneStore } = useRootStore();

  const onReset = () => {
    confirmStore.confirm({ description: t('passCodeBlock.confirmResetMessage') }).then(
      () => {
        standaloneStore.clearPassCode();
      },
      () => {}
    );
  };

  return (
    <Paper>
      <PageTitle icon={<PasswordIcon />}>{t('blockPassCodeTitle')}</PageTitle>
      <Box p={3}>
        {standaloneStore.isProtectedByPassCode && (
          <>
            <Typography variant="body1" pb={2}>
              {t('passCodeBlock.messagePassCodeAlreadyExists')}
            </Typography>
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="primary" component={Link} to={getProfilePassCodeUrn()}>
                {t('passCodeBlock.buttonChange')}
              </Button>
              <Button onClick={onReset}>{t('passCodeBlock.buttonReset')}</Button>
            </Stack>
          </>
        )}
        {!standaloneStore.isProtectedByPassCode && (
          <>
            <Typography variant="body1" pb={2}>
              {t('passCodeBlock.messageCreatePassCode')}
            </Typography>
            <Stack spacing={2} direction="row">
              <Button variant="contained" color="primary" component={Link} to={getProfilePassCodeUrn()}>
                {t('passCodeBlock.buttonCreate')}
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default observer(PassCodeBlock);
