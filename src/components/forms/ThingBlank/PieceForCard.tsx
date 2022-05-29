import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import CCNumberField from 'components/formControls/CCNumberField';
import CCExpiryField from 'components/formControls/CCExpiryField';
import PasswordField from 'components/formControls/PasswordField';

const PieceForCard: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Paper sx={{ my: 3, p: 3 }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={7} sm={8}>
            <CCNumberField id="number" name="payload.number" label={t('dialog.thing.labelCardNumber')} required autoComplete="cc-number" />
          </Grid>
          <Grid item xs={5} sm={4}>
            <PasswordField id="cvc" name="payload.cvc" label={t('dialog.thing.labelCvc')} autoComplete="new-csc" />
          </Grid>
          <Grid item xs={7} sm={8}>
            <TextField id="holder" name="payload.holder" label={t('dialog.thing.labelHolder')} autoComplete="cc-name" />
          </Grid>
          <Grid item xs={5} sm={4}>
            <CCExpiryField id="exp" name="payload.exp" label={t('dialog.thing.labelExp')} autoComplete="new-exp" />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} sm={8}>
          <TextField id="comment" name="comment" label={t('dialog.thing.labelComment')} multiline maxRows={4} />
        </Grid>
        <Grid item xs={5} sm={4}>
          <PasswordField id="pin" name="payload.pin" label={t('dialog.thing.labelPin')} autoComplete="new-pin" />
        </Grid>
      </Grid>
    </>
  );
};

export default PieceForCard;
