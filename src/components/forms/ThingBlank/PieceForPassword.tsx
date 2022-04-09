import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import PasswordField from 'components/formControls/PasswordField';

const PieceForPassword: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <TextField id="link" name="payload.link" label={t('dialog.thing.labelLink')} autoComplete="link" />
      </Grid>
      <Grid item xs={6}>
        <TextField id="login" name="payload.login" label={t('dialog.thing.labelLogin')} required autoComplete="new-login" />
      </Grid>
      <Grid item xs={6}>
        <PasswordField id="password" name="payload.password" label={t('dialog.thing.labelPassword')} autoComplete="new-password" />
      </Grid>
    </>
  );
};

export default PieceForPassword;
