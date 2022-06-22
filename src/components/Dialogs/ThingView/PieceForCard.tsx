import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { TThingPayloadCard } from 'types/thing';
import PasswordField from 'components/formControls/basic/PasswordField';
import Box from '@mui/material/Box';
import CopyButton from 'components/common/CopyButton';
import CCEntity from 'entities/CCEntity';

const PieceForCard: FC<{ payload: TThingPayloadCard }> = ({ payload }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} order={{ xs: 1, sm: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label={t('dialog.thing.labelCardNumber')}
            variant="outlined"
            InputProps={{ readOnly: true }}
            defaultValue={CCEntity.formatCardNumber(payload.number)}
            fullWidth
          />
          <CopyButton copyText={payload.number} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={6} sm={4} order={{ xs: 4, sm: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PasswordField id="thing_card_cvc" value={payload.cvc} label={t('dialog.thing.labelCvc')} />
          <CopyButton copyText={payload.cvc} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} order={{ xs: 2, sm: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField label={t('dialog.thing.labelHolder')} variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.holder} fullWidth />
          <CopyButton copyText={payload.number} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={6} sm={4} order={{ xs: 3, sm: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField label={t('dialog.thing.labelExp')} variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.exp || ''} fullWidth />
          <CopyButton copyText={payload.exp || ''} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={6} sm={8} order={{ xs: 5, sm: 5 }} sx={{ display: { xs: 'none' } }}>
        &nbsp;
      </Grid>
      <Grid item xs={6} sm={4} order={{ xs: 6, sm: 6 }}>
        <PasswordField id="thing_card_pin" value={payload.pin} label={t('dialog.thing.labelPin')} />
      </Grid>
    </Grid>
  );
};

export default PieceForCard;
