import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { EProgress } from 'types/app';

interface ILocalLoader {
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
