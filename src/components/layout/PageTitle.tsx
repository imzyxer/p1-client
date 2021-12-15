import React from 'react';
import { Theme } from '@mui/material/styles';
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material';

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
