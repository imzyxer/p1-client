import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Field, useFormikContext } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import { IProfileForFormik } from 'types/user';
import FormikPasswordField from 'components/common/FormikPasswordField';
// import { useRootStore } from 'stores/hooks/useRootStore';

const ProfileBlank: FC = () => {
  // const { profileEditStore } = useRootStore();
  const { values } = useFormikContext<IProfileForFormik>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field id="email" component={TextField} name="email" label="Login" variant="outlined" fullWidth required />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel control={<Field id="isChangePassword" component={Checkbox} name="isChangePassword" />} label="Change password" disabled />
      </Grid>
      {values.isChangePassword && (
        <>
          <Grid item xs={12}>
            <FormikPasswordField id="currentPassword" name="currentPassword" label="Current password" labelWidth={180} disabled required />
          </Grid>
          <Grid item xs={12}>
            <FormikPasswordField id="newPassword" name="newPassword" label="New password" labelWidth={120} disabled required />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Field id="timezone" component={TextField} name="timezone" label="Timezone" variant="outlined" fullWidth disabled />
      </Grid>
      <Grid item xs={12}>
        <Field id="lang" component={TextField} name="locale" label="Language" variant="outlined" fullWidth disabled />
      </Grid>
      <Grid item xs={12}>
        <Field id="theme" component={TextField} name="theme" label="Theme" variant="outlined" fullWidth disabled />
      </Grid>
    </Grid>
  );
};

export default observer(ProfileBlank);