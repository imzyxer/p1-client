import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Field } from 'formik';
import { TextField } from 'formik-mui';
import FormikPasswordField from 'components/common/FormikPasswordField';
import { useTranslation } from 'react-i18next';

const PieceForPassword: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12}>
        <Field id="link" component={TextField} name="payload.link" label={t('dialog.thing.labelLink')} variant="outlined" fullWidth autoComplete="link" />
      </Grid>
      <Grid item xs={6}>
        <Field
          id="login"
          component={TextField}
          name="payload.login"
          label={t('dialog.thing.labelLogin')}
          variant="outlined"
          required
          fullWidth
          autoComplete="new-login"
        />
      </Grid>
      <Grid item xs={6}>
        <FormikPasswordField id="password" name="payload.password" label={t('dialog.thing.labelPassword')} autoComplete="new-password" />
      </Grid>
    </>
  );
};

export default PieceForPassword;
