import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const HomeElement: FC = () => {
  const Module = React.lazy(() => import('modules/HomeModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <Module />
    </Suspense>
  );
};

export default HomeElement;
