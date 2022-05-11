import React, { FC } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { getHomePageUrn } from 'utils/getUrn';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

type TProps = {
  title: string;
  children?: React.ReactNode;
};

const ErrorPage: FC<TProps> = ({ title, children }) => (
  <Container
    maxWidth="sm"
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
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

export default ErrorPage;
