import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessGuestsOnly from 'router/AccessGuestsOnly';

const StandaloneElement: FC = () => {
  const Module = React.lazy(() => import('modules/StandaloneModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <AccessGuestsOnly>
        <Module />
      </AccessGuestsOnly>
    </Suspense>
  );
};

export default StandaloneElement;
