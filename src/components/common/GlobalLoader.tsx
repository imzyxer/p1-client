import React, { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const GlobalLoader: FC<{ invisible?: boolean }> = ({ invisible = true }) => {
  return (
    <Backdrop
      open
      invisible={invisible}
      sx={{
        color: '#fff',
        zIndex: t => t.zIndex.drawer + 1,
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default GlobalLoader;
