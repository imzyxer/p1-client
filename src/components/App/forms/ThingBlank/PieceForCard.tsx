import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-mui';
import FormikPasswordField from 'components/common/FormikPasswordField';

const PieceForCard: FC = () => (
  <>
    <Grid item xs={8}>
      <Field id="number" component={TextField} name="payload.number" label="Card number" variant="outlined" required fullWidth autoComplete="cc-number" />
    </Grid>
    <Grid item xs={4}>
      <FormikPasswordField id="pin" name="payload.pin" label="PIN" autoComplete="cc-pin" />
    </Grid>
    <Grid item xs={8}>
      <Field id="holder" component={TextField} name="payload.holder" label="Name on card" variant="outlined" fullWidth autoComplete="cc-name" />
    </Grid>
    <Grid item xs={4}>
      <FormikPasswordField id="cvc" name="payload.cvc" label="CVC" autoComplete="cc-csc" />
    </Grid>
  </>
);

export default PieceForCard;
