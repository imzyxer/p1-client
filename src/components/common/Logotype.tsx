import React, { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import LogotypeIcon from '@material-ui/icons/Https';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  });

const Logotype: FC<WithStyles<typeof styles>> = ({ classes }) => (
  <>
    <Avatar className={classes.avatar}>
      <LogotypeIcon />
    </Avatar>
    <Typography variant="subtitle1" color="textSecondary">
      Storage <strong>П1</strong> <sup>&beta;</sup>
    </Typography>
  </>
);

export default withStyles(styles)(Logotype);
