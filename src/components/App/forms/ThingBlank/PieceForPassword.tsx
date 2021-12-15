import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-mui';
import FormikPasswordField from 'components/common/FormikPasswordField';

const PieceForPassword: FC = () => (
  <>
    <Grid item xs={12}>
      <Field id="link" component={TextField} name="payload.link" label="Link" variant="outlined" fullWidth autoComplete="link" />
    </Grid>
    <Grid item xs={6}>
      <Field id="login" component={TextField} name="payload.login" label="Login" variant="outlined" required fullWidth autoComplete="new-login" />
    </Grid>
    <Grid item xs={6}>
      <FormikPasswordField id="password" name="payload.password" label="Password" labelWidth={80} autoComplete="new-password" />
    </Grid>
  </>
);

export default PieceForPassword;
