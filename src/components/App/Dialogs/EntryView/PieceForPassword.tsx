import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { TEntryPayloadPassword } from 'types/entry';
import AdvancedPasswordField from 'components/common/AdvancedPasswordField';

const PieceForPassword: FC<{ payload: TEntryPayloadPassword }> = ({ payload }) => (
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
      <AdvancedPasswordField id="entry_card_password" value={payload.password} label="Password" labelWidth={75} />
    </Grid>
  </>
);

export default PieceForPassword;
