import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { TEntryPayloadCard } from 'types/entry';
import AdvancedPasswordField from 'components/common/AdvancedPasswordField';

const PieceForCard: FC<{ payload: TEntryPayloadCard }> = ({ payload }) => (
  <>
    <Grid item xs={8}>
      <TextField label="Number" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.number} fullWidth />
    </Grid>
    <Grid item xs={4}>
      <AdvancedPasswordField id="entry_card_pin" value={payload.pin} label="PIN" labelWidth={35} />
    </Grid>
    <Grid item xs={8}>
      <TextField label="Holder" variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.holder} fullWidth />
    </Grid>
    <Grid item xs={4}>
      <AdvancedPasswordField id="entry_card_cvc" value={payload.cvc} label="CVC" labelWidth={35} />
    </Grid>
  </>
);

export default PieceForCard;
