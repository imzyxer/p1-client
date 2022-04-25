import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import PageTitle from 'components/common/PageTitle';
import useRootStore from 'stores/hooks/useRootStore';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import { Form, Formik, FormikHelpers } from 'formik';
import ProfileBlank from 'components/forms/ProfileBlank';
import { useSnackbar } from 'notistack';
import { IProfileForFormik } from 'types/user';

const ProfileBlock: FC = () => {
  const { t } = useTranslation(['translation', 'profile']);
  const { profileEditStore } = useRootStore();
  const { enqueueSnackbar } = useSnackbar();
  const { initialValues } = profileEditStore;
  const onSubmit = (values: IProfileForFormik, { setSubmitting, resetForm }: FormikHelpers<IProfileForFormik>) => {
    profileEditStore.doUpdate(
      values,
      () => {
        enqueueSnackbar(t('snackbar.profileUpdated'), { variant: 'success' });
        setSubmitting(false);
        resetForm({ values });
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', {
          variant: 'warning',
        });
        setSubmitting(false);
      }
    );
  };

  return (
    <Paper>
      <PageTitle icon={<FaceIcon />}>{t('profile:blockProfileTitle')}</PageTitle>
      <Box p={3}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ dirty, isSubmitting }) => (
            <Form>
              <ProfileBlank />
              <Box pt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={!dirty || isSubmitting}>
                  {t('dialog.btnSave')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default observer(ProfileBlock);
