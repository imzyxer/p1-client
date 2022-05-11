import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { EProgress } from 'types/app';

interface ILocalLoader {
  children?: React.ReactNode;
  progress: EProgress;
}

const LocalLoader: FC<ILocalLoader> = ({ progress, children }) => {
  if (progress === EProgress.LOADED) return <>{children}</>;

  return (
    <Box component="span" m={2}>
      <CircularProgress size={20} />
    </Box>
  );
};

export default LocalLoader;
