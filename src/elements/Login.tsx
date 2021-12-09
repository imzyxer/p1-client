import React, { FC, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import useStyles from 'components/Login/hooks/useStyles';
import { Form, Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { observer } from 'mobx-react';
import { getDashboardUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import { APP_NAME } from 'constants/app';
import FormLoader from 'components/common/FormLoader';
import FormikPasswordField from 'components/common/FormikPasswordField';
import UserEntity from 'entities/UserEntity';
import Logotype from 'components/common/Logotype';

const Login: FC = () => {
  const appStore = useAppStore();
  const location = useLocation();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Welcome — ${APP_NAME}`;
  }, []);

  if (!appStore.userIsGuest) {
    return <Navigate to={getDashboardUrn()} state={{ from: location }} />;
  }

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={UserEntity.validationSchemaForSignIn()}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        setErrorMessage(null);
        appStore.signIn(
          values,
          () => {
            navigate(getDashboardUrn(), { replace: true });
          },
          response => {
            setErrorMessage(response.result.message);
            setSubmitting(false);
          }
        );
      }}
    >
      {({ isSubmitting }) => (
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} lg={9} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
            <FormLoader />
            <div className={classes.paper}>
              <Logotype />
              <Collapse in={errorMessage !== null} className={classes.errorMessage}>
                <Box mt={2}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Box>
              </Collapse>
              <Form className={classes.form}>
                <Box mb={2}>
                  <Field
                    id="login"
                    component={TextField}
                    name="login"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                  />
                </Box>
                <FormikPasswordField id="password" name="password" label="Password *" labelWidth={85} required autoComplete="current-password" />
                <div>
                  <Button type="submit" variant="contained" color="primary" className={classes.submit} disabled={isSubmitting}>
                    Sign In
                  </Button>
                </div>
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary">
                    Powered by{' '}
                    <Link color="inherit" href="https://binarika.ru/">
                      Binarika
                    </Link>
                  </Typography>
                </Box>
              </Form>
            </div>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default observer(Login);
