import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { observer } from 'mobx-react';
import { getDashboardUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import FormLoader from 'components/common/FormLoader';
import FormikPasswordField from 'components/common/FormikPasswordField';
import UserEntity from 'entities/UserEntity';
import Logotype from 'components/common/Logotype';
import { EElement } from 'types/app';

const Login: FC = () => {
  const appStore = useAppStore();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    appStore.setElement(EElement.LOGIN, 'Welcome');
  }, [appStore]);

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
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            lg={9}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
            <FormLoader />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Logotype />
              <Collapse
                in={errorMessage !== null}
                sx={{
                  width: '100%',
                }}
              >
                <Box mt={2}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Box>
              </Collapse>
              <Form>
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
                <FormikPasswordField id="password" name="password" label="Password *" required autoComplete="current-password" />
                <Box
                  sx={{
                    margin: t => t.spacing(3, 0, 2),
                  }}
                >
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Sign In
                  </Button>
                </Box>
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary">
                    Powered by{' '}
                    <Link color="inherit" href="https://binarika.ru/">
                      Binarika
                    </Link>
                  </Typography>
                </Box>
              </Form>
            </Box>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default observer(Login);
