import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';

import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
// import { useRootStore } from 'stores/hooks/useRootStore';

const ProfileBlank: FC = () => {
  // const { profileEditStore } = useRootStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field id="email" component={TextField} name="email" label="Login" variant="outlined" fullWidth required />
      </Grid>
    </Grid>
  );
};

export default observer(ProfileBlank);
