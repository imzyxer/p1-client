import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import { TThingPayloadCard } from 'types/thing';
import PasswordField from 'components/formControls/basic/PasswordField';
import Box from '@mui/material/Box';
import CopyButton from 'components/common/CopyButton';

const PieceForCard: FC<{ payload: TThingPayloadCard }> = ({ payload }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={8}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="Number" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.number} fullWidth />
        <CopyButton copyText={payload.number} sx={{ ml: 1 }} />
      </Box>
    </Grid>
    <Grid item xs={6} sm={4} order={{ xs: 3, sm: 2 }}>
      <PasswordField id="thing_card_pin" value={payload.pin} label="PIN" />
    </Grid>
    <Grid item xs={12} sm={8} order={{ xs: 2, sm: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField label="Holder" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.holder} fullWidth />
        <CopyButton copyText={payload.number} sx={{ ml: 1 }} />
      </Box>
    </Grid>
    <Grid item xs={6} sm={4} order={{ xs: 4, sm: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PasswordField id="thing_card_cvc" value={payload.cvc} label="CVC" />
        <CopyButton copyText={payload.cvc} sx={{ ml: 1 }} />
      </Box>
    </Grid>
  </Grid>
);

export default PieceForCard;
