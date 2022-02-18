import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField } from 'formik-mui';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react';
import Logotype from 'components/common/Logotype';
import { Field, Form, Formik } from 'formik';
import UserEntity from 'entities/UserEntity';
import { getDashboardUrn, getLoginUrn } from 'utils/getUrn';
import FormikPasswordField from 'components/common/FormikPasswordField';
import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from 'stores/hooks/useAppStore';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { EElement } from 'types/app';
import { useTranslation } from 'react-i18next';
import { LOCALE_EN, LOCALE_RU } from 'constants/app';

const Signup: FC = () => {
  const appStore = useAppStore();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const invitation = query.get('invitation');
  const locale = query.get('locale');
  const isInvitationCodeReadonly = invitation !== null;
  const initialValues = { login: '', password: '', invitation: invitation ?? '', locale: locale ?? LOCALE_EN };
  const { t, i18n } = useTranslation('signup');

  useEffect(() => {
    appStore.setElement(EElement.SIGNUP, t('pageTitle'));
  }, [t, appStore]);

  useEffect(() => {
    if (locale === LOCALE_RU) {
      i18n.changeLanguage(locale).then(
        () => {},
        () => {}
      );
    }
  }, [i18n, locale]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: theme => theme.spacing(8),
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
            <Form>
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 2,
                }}
              >
                <Grid item xs={12}>
                  <Field
                    id="login"
                    component={TextField}
                    name="login"
                    type="email"
                    label={t('labelEmail')}
                    autoFocus
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikPasswordField id="password" name="password" label={t('labelPassword')} autoComplete="new-password" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="invitation"
                    component={TextField}
                    name="invitation"
                    label={t('labelInvitation')}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      readOnly: isInvitationCodeReadonly,
                      sx: {
                        fontFamily: `'Roboto Mono', monospace`,
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  margin: theme => theme.spacing(3, 0, 2),
                }}
              >
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                  {t('buttonSignUp')}
                </Button>
              </Box>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={getLoginUrn()} variant="body2">
                    {t('linkSignIn')}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default observer(Signup);
