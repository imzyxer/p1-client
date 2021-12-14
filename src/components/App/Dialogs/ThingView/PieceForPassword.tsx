import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { TThingPayloadPassword } from 'types/thing';
import AdvancedPasswordField from 'components/common/AdvancedPasswordField';

const PieceForPassword: FC<{ payload: TThingPayloadPassword }> = ({ payload }) => (
  <>
    <Grid item xs={12}>
      <Link href={payload.link} rel="noreferrer">
        {payload.link}
      </Link>
    </Grid>
    <Grid item xs={6}>
      <TextField label="Login" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.login} fullWidth />
    </Grid>
    <Grid item xs={6}>
      <AdvancedPasswordField id="thing_card_password" value={payload.password} label="Password" />
    </Grid>
  </>
);

export default PieceForPassword;
