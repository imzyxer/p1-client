import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import PasswordField from 'components/formControls/PasswordField';

const PieceForPassword: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Paper sx={{ my: 3, p: 3 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id="link" name="payload.link" label={t('dialog.thing.labelLink')} autoComplete="link" />
          </Grid>
          <Grid item xs={6}>
            <TextField id="login" name="payload.login" label={t('dialog.thing.labelLogin')} required autoComplete="new-login" />
          </Grid>
          <Grid item xs={6}>
            <PasswordField id="password" name="payload.password" label={t('dialog.thing.labelPassword')} autoComplete="new-password" />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="comment" name="comment" label={t('dialog.thing.labelComment')} multiline maxRows={4} />
        </Grid>
      </Grid>
    </>
  );
};

export default PieceForPassword;
