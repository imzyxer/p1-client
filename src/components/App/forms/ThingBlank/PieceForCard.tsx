import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const PieceForCard: FC = () => (
  <>
    <Grid item xs={8}>
      <Field id="number" component={TextField} name="payload.number" label="Card number" variant="outlined" required fullWidth autoComplete="cc-number" />
    </Grid>
    <Grid item xs={4}>
      <Field id="pin" component={TextField} name="payload.pin" label="PIN" variant="outlined" fullWidth autoComplete="cc-pin" />
    </Grid>
    <Grid item xs={8}>
      <Field id="holder" component={TextField} name="payload.holder" label="Name on card" variant="outlined" fullWidth autoComplete="cc-name" />
    </Grid>
    <Grid item xs={4}>
      <Field id="cvc" component={TextField} name="payload.cvc" label="CVC" variant="outlined" fullWidth autoComplete="cc-csc" />
    </Grid>
  </>
);

export default PieceForCard;
