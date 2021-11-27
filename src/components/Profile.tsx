import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import FaceIcon from '@material-ui/icons/Face';
import PageTitle from 'components/layout/PageTitle';
import PageContainer from 'components/layout/PageContainer';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRootStore } from 'stores/hooks/useRootStore';
import ProfileBlank from 'components/App/forms/ProfileBlank';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { IProfileForFormik } from 'types/user';
import { useSnackbar } from 'notistack';

const Profile: FC = () => {
  const { profileEditStore } = useRootStore();
  const { enqueueSnackbar } = useSnackbar();
  const { initialValues } = profileEditStore;
  const onSubmit = (values: IProfileForFormik, { setSubmitting, resetForm }: FormikHelpers<IProfileForFormik>) => {
    profileEditStore.doUpdate(
      values,
      () => {
        enqueueSnackbar('Profile updated successfully', {
          variant: 'success',
        });
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
            <PageTitle icon={<FaceIcon />}>Profile</PageTitle>
            <Box p={3}>
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ dirty, isSubmitting }) => (
                  <Form>
                    <ProfileBlank />
                    <Box pt={2}>
                      <Button type="submit" variant="contained" color="primary" disabled={!dirty || isSubmitting}>
                        Save
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
