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
import { Form, Formik } from 'formik';
import TextField from 'components/formControls/TextField';
import PasswordField from 'components/formControls/PasswordField';
import { observer } from 'mobx-react';
import { getDashboardUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import FormLoader from 'components/common/FormLoader';
import UserEntity from 'entities/UserEntity';
import Logotype from 'components/common/Logotype';
import { EElement } from 'types/app';
import { useTranslation, Trans } from 'react-i18next';

const LoginModule: FC = () => {
  const appStore = useAppStore();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation('login');

  useEffect(() => {
    appStore.setElement(EElement.LOGIN, t('pageTitle'));
  }, [t, appStore]);

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
              backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]),
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
              <Form style={{ width: '100%' }}>
                <Box mb={2} mt={4}>
                  <TextField id="login" name="login" type="email" label={t('labelEmail')} autoComplete="email" autoFocus required />
                </Box>
                <PasswordField id="password" name="password" label={t('labelPassword')} required autoComplete="current-password" />
                <Box
                  sx={{
                    margin: theme => theme.spacing(3, 0, 2),
                  }}
                >
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {t('buttonSignIn')}
                  </Button>
                </Box>
                <Box mt={5}>
                  <Typography variant="body2" color="textSecondary">
                    <Trans i18nKey="poweredBy" t={t}>
                      Powered by
                      <Link color="inherit" href="https://binarika.ru/">
                        Binarika
                      </Link>
                    </Trans>
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

export default observer(LoginModule);
