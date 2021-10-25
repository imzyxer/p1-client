import React, { FC } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
