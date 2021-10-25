import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const PieceForPassword: FC = () => (
  <>
    <Grid item xs={12}>
      <Field id="link" component={TextField} name="payload.link" label="Link" variant="outlined" fullWidth />
    </Grid>
    <Grid item xs={6}>
      <Field id="login" component={TextField} name="payload.login" label="Login" variant="outlined" required fullWidth />
    </Grid>
    <Grid item xs={6}>
      <Field id="password" component={TextField} type="password" name="payload.password" label="Password" variant="outlined" fullWidth />
    </Grid>
  </>
);

export default PieceForPassword;
