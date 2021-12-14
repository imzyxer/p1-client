import React, { FC } from 'react';
import { Theme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Container from '@mui/material/Container';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

const PageContainer: FC<WithStyles<typeof styles>> = ({ children, classes }) => (
  <Container maxWidth="lg" className={classes.root}>
    <>{children}</>
  </Container>
);

export default withStyles(styles)(PageContainer);
