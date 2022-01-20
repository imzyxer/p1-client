import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Field, useFormikContext } from 'formik';
import { TextField, Checkbox, Select } from 'formik-mui';
import { IProfileForFormik } from 'types/user';
import FormikPasswordField from 'components/common/FormikPasswordField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { LOCALES, THEMES } from 'constants/app';
import timezones from 'timezones-list';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

const ProfileBlank: FC = () => {
  const { t } = useTranslation('profile');
  const { values, setFieldValue } = useFormikContext<IProfileForFormik>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Field id="email" component={TextField} name="email" label={t('labelLogin')} variant="outlined" fullWidth required />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Field type="checkbox" id="isChangePassword" component={Checkbox} name="isChangePassword" />}
          label={t('labelChangePassword') as string}
          disabled
        />
      </Grid>
      {values.isChangePassword && (
        <>
          <Grid item xs={12}>
            <FormikPasswordField id="currentPassword" name="currentPassword" label={t('labelCurrentPassword')} disabled required />
          </Grid>
          <Grid item xs={12}>
            <FormikPasswordField id="newPassword" name="newPassword" label={t('labelNewPassword')} disabled required />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Autocomplete
          disableClearable
          options={timezones}
          fullWidth
          defaultValue={values.defaultTimezone}
          renderInput={params => <Field {...params} id="timezone" component={TextField} name="timezone" label={t('labelTimezone')} fullWidth />}
          onChange={(e, value: any | null) => {
            setFieldValue('timezone', value.tzCode ?? '');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          <Field component={Select} labelId="locale" name="locale" label={t('labelLanguage')} required>
            {LOCALES.map(locale => (
              <MenuItem key={locale.value} value={locale.value}>
                {locale.label}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          <Field component={Select} labelId="theme" name="theme" label={t('labelTheme')} required>
            {THEMES.map(theme => (
              <MenuItem key={theme.value} value={theme.value}>
                {theme.label}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default observer(ProfileBlank);
