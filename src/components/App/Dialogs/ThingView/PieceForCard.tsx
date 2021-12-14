import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import { TThingPayloadCard } from 'types/thing';
import AdvancedPasswordField from 'components/common/AdvancedPasswordField';

const PieceForCard: FC<{ payload: TThingPayloadCard }> = ({ payload }) => (
  <>
    <Grid item xs={8}>
      <TextField label="Number" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.number} fullWidth />
    </Grid>
    <Grid item xs={4}>
      <AdvancedPasswordField id="thing_card_pin" value={payload.pin} label="PIN" />
    </Grid>
    <Grid item xs={8}>
      <TextField label="Holder" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.holder} fullWidth />
    </Grid>
    <Grid item xs={4}>
      <AdvancedPasswordField id="thing_card_cvc" value={payload.cvc} label="CVC" />
    </Grid>
  </>
);

export default PieceForCard;
