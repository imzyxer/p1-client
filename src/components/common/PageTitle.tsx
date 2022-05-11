import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { SvgIconProps } from '@mui/material';

type TPageTitleProps = {
  children?: React.ReactNode;
  icon?: React.ReactElement<SvgIconProps>;
};

const PageTitle: FC<TPageTitleProps> = ({ children, icon }) => (
  <Typography
    variant="h6"
    component="div"
    sx={{
      paddingTop: theme => theme.spacing(2),
      paddingLeft: theme => theme.spacing(2),
      alignItems: 'center',
      display: 'flex',
    }}
  >
    {icon ?? ''}
    <span>&nbsp;{children}</span>
  </Typography>
);

export default PageTitle;
