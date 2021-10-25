import React, { FC, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import LogotypeIcon from '@material-ui/icons/Https';
import useStyles from 'components/Login/styles';
import { Form, Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { observer } from 'mobx-react';
import { getDashboardUrn } from 'utils/getUrn';
import useAppStore from 'stores/hooks/useAppStore';
import { APP_NAME } from 'constants/app';
import FormLoader from 'components/common/FormLoader';

const LoginPage: FC = () => {
  const appStore = useAppStore();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.title = `Welcome — ${APP_NAME}`;
  }, []);

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setErrorMessage(null);
        appStore.signIn(
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
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} lg={9} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
            <FormLoader />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LogotypeIcon />
              </Avatar>
              <Typography variant="subtitle1" color="textSecondary">
                Storage <strong>П1</strong> <sup>&beta;</sup>
              </Typography>
              <Collapse in={errorMessage !== null} className={classes.errorMessage}>
                <Box mt={2}>
                  <Alert severity="error">{errorMessage}</Alert>
                </Box>
              </Collapse>
              <Form className={classes.form}>
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
                <Field
                  id="password"
                  component={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
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

export default observer(LoginPage);
