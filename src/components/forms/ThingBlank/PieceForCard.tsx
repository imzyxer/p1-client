import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-mui';
import FormikPasswordField from 'components/common/FormikPasswordField';
import { useTranslation } from 'react-i18next';

const PieceForCard: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={8}>
        <Field
          id="number"
          component={TextField}
          name="payload.number"
          label={t('dialog.thing.labelCardNumber')}
          variant="outlined"
          required
          fullWidth
          autoComplete="cc-number"
        />
      </Grid>
      <Grid item xs={4}>
        <FormikPasswordField id="pin" name="payload.pin" label={t('dialog.thing.labelPin')} autoComplete="cc-pin" />
      </Grid>
      <Grid item xs={8}>
        <Field
          id="holder"
          component={TextField}
          name="payload.holder"
          label={t('dialog.thing.labelHolder')}
          variant="outlined"
          fullWidth
          autoComplete="cc-name"
        />
      </Grid>
      <Grid item xs={4}>
        <FormikPasswordField id="cvc" name="payload.cvc" label={t('dialog.thing.labelCvc')} autoComplete="cc-csc" />
      </Grid>
    </>
  );
};

export default PieceForCard;
