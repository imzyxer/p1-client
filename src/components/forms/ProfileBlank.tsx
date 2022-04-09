import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import { useFormikContext } from 'formik';
import { IProfileForFormik } from 'types/user';
import { LOCALES, THEMES } from 'constants/app';
import timezones from 'timezones-list';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import Select from 'components/formControls/Select';
import Checkbox from 'components/formControls/Checkbox';
import PasswordField from 'components/formControls/PasswordField';

const ProfileBlank: FC = () => {
  const { t } = useTranslation('profile');
  const { values, setFieldValue } = useFormikContext<IProfileForFormik>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField id="email" name="email" type="email" label={t('labelLogin')} required />
      </Grid>
      <Grid item xs={12}>
        <Checkbox name="isChangePassword" label={t('labelChangePassword')} disabled />
      </Grid>
      {values.isChangePassword && (
        <>
          <Grid item xs={12}>
            <PasswordField id="currentPassword" name="currentPassword" label={t('labelCurrentPassword')} disabled required />
          </Grid>
          <Grid item xs={12}>
            <PasswordField id="newPassword" name="newPassword" label={t('labelNewPassword')} disabled required />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Autocomplete
          disableClearable
          options={timezones}
          fullWidth
          defaultValue={values.defaultTimezone}
          renderInput={params => <TextField name="timezone" label={t('labelTimezone')} {...params} />}
          onChange={(e, value: any | null) => {
            setFieldValue('timezone', value.tzCode ?? '');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Select name="locale" label={t('labelLanguage')} labelId="locale" options={LOCALES} required />
      </Grid>
      <Grid item xs={12}>
        <Select name="theme" label={t('labelTheme')} labelId="theme" options={THEMES} required />
      </Grid>
    </Grid>
  );
};

export default observer(ProfileBlank);
