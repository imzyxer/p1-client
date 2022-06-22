import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from 'react-i18next';
import { TThingPayloadPassword } from 'types/thing';
import PasswordField from 'components/formControls/basic/PasswordField';
import CopyButton from 'components/common/CopyButton';
import Stack from '@mui/material/Stack';

type TParams = {
  payload: TThingPayloadPassword;
};

const PieceForPassword: FC<TParams> = ({ payload }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField label={t('dialog.thing.labelLogin')} variant="outlined" InputProps={{ readOnly: true }} defaultValue={payload.login} fullWidth />
          <CopyButton copyText={payload.login} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PasswordField id="thing_card_password" value={payload.password} label={t('dialog.thing.labelPassword')} />
          <CopyButton copyText={payload.password} sx={{ ml: 1 }} />
        </Box>
      </Grid>
      {payload.link && (
        <Grid item xs={12}>
          <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
            <LinkIcon color="action" />
            <Link href={payload.link} rel="noreferrer">
              {payload.link}
            </Link>
            <CopyButton copyText={payload.link} size="small" />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default PieceForPassword;
