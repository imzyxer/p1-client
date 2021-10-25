import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { SvgIconProps } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      alignItems: 'center',
      display: 'flex',
    },
  });

export interface PageTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  icon?: React.ReactElement<SvgIconProps>;
}

const PageTitle = withStyles(styles)((props: PageTitleProps) => {
  const { children, classes, icon } = props;
  return (
    <Typography variant="h6" component="div" className={classes.root}>
      {icon ?? ''}
      <span>&nbsp;{children}</span>
    </Typography>
  );
});

export default PageTitle;
