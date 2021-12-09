import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { getHomePageUrn } from 'utils/getUrn';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const ErrorPage: FC<{ title: string }> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Box pr={2}>
            <Typography variant="h1" component="h1" align="right">
              {title}
            </Typography>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={6}>
          <Box pl={2}>
            {children}
            <Link href={getHomePageUrn()}>Take me home</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
