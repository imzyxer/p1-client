import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import FaceIcon from '@mui/icons-material/Face';
import PageTitle from 'components/common/PageTitle';
import PageContainer from 'components/common/PageContainer';
import { Form, Formik, FormikHelpers } from 'formik';
import useRootStore from 'stores/hooks/useRootStore';
import ProfileBlank from 'components/forms/ProfileBlank';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IProfileForFormik } from 'types/user';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const Profile: FC = () => {
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
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<FaceIcon />}>{t('profile:pageTitle')}</PageTitle>
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
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Profile);
