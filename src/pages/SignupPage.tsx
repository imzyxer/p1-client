import React, { FC, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField } from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { APP_NAME } from 'constants/app';
import { observer } from 'mobx-react';
import useStyles from 'components/Signup/hooks/useStyles';
import Logotype from 'components/common/Logotype';
import { Form, Formik, Field } from 'formik';
import UserEntity from 'entities/UserEntity';
import { getDashboardUrn, getLoginUrn } from 'utils/getUrn';
import FormikPasswordField from 'components/common/FormikPasswordField';
import { useHistory } from 'react-router-dom';
import useAppStore from 'stores/hooks/useAppStore';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

const SignupPage: FC = () => {
  const appStore = useAppStore();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const invitation = query.get('invitation');
  const isInvitationCodeReadonly = invitation !== null;
  const initialValues = { login: '', password: '', invitation: invitation ?? '' };
  const classes = useStyles();

  useEffect(() => {
    document.title = `Welcome — ${APP_NAME}`;
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logotype />
        <Collapse in={errorMessage !== null} className={classes.errorMessage}>
          <Box mt={2}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        </Collapse>
        <Formik
          initialValues={initialValues}
          validationSchema={UserEntity.validationSchemaForSignup()}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            setErrorMessage(null);
            appStore.signUp(
              values,
              () => {
                history.replace(getDashboardUrn());
              },
              response => {
                setErrorMessage(response.result.message);
                setSubmitting(false);
              }
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    id="login"
                    component={TextField}
                    name="login"
                    type="email"
                    label="Email"
                    autoFocus
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikPasswordField id="password" name="password" label="Password *" labelWidth={85} required autoComplete="new-password" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="invitation"
                    component={TextField}
                    name="invitation"
                    label="Invitation code"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{ readOnly: isInvitationCodeReadonly }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={isSubmitting}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={getLoginUrn()} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default observer(SignupPage);
