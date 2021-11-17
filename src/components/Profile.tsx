import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import FaceIcon from '@material-ui/icons/Face';
import PageTitle from 'components/layout/PageTitle';
import PageContainer from 'components/layout/PageContainer';
import { Form, Formik } from 'formik';
import { useRootStore } from 'stores/hooks/useRootStore';
import ProfileBlank from 'components/App/forms/ProfileBlank';
import Button from '@material-ui/core/Button';

const Profile: FC = () => {
  const { profileEditStore } = useRootStore();
  const { initialValues } = profileEditStore;
  const onSubmit = () => {
    console.log(123);
  };

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper>
            <PageTitle icon={<FaceIcon />}>Profile</PageTitle>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ dirty, isSubmitting }) => (
                <Form>
                  <ProfileBlank />
                  <Button type="submit" color="primary" disabled={!dirty || isSubmitting}>
                    Save
                  </Button>
                  <Button color="primary">Cancel</Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(Profile);
