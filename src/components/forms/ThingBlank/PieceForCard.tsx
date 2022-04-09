import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import PasswordField from 'components/formControls/PasswordField';

const PieceForCard: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={8}>
        <TextField id="number" name="payload.number" label={t('dialog.thing.labelCardNumber')} required autoComplete="cc-number" />
      </Grid>
      <Grid item xs={4}>
        <PasswordField id="pin" name="payload.pin" label={t('dialog.thing.labelPin')} autoComplete="new-pin" />
      </Grid>
      <Grid item xs={8}>
        <TextField id="holder" name="payload.holder" label={t('dialog.thing.labelHolder')} autoComplete="cc-name" />
      </Grid>
      <Grid item xs={4}>
        <PasswordField id="cvc" name="payload.cvc" label={t('dialog.thing.labelCvc')} autoComplete="new-csc" />
      </Grid>
    </>
  );
};

export default PieceForCard;
