import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { TThingPayloadPassword } from 'types/thing';
import PasswordField from 'components/formControls/basic/PasswordField';
import CopyButton from 'components/common/CopyButton';

const PieceForPassword: FC<{ payload: TThingPayloadPassword }> = ({ payload }) => (
  <>
    <Grid item xs={12}>
      <Link href={payload.link} rel="noreferrer">
        {payload.link}
      </Link>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="Login" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.login} fullWidth />
        <CopyButton copyText={payload.login} sx={{ ml: 1 }} />
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PasswordField id="thing_card_password" value={payload.password} label="Password" />
        <CopyButton copyText={payload.password} sx={{ ml: 1 }} />
      </Box>
    </Grid>
  </>
);

export default PieceForPassword;
