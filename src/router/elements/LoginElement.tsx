import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessGuestsOnly from 'router/AccessGuestsOnly';

const LoginElement: FC = () => {
  const Module = React.lazy(() => import('modules/LoginModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <AccessGuestsOnly>
        <Module />
      </AccessGuestsOnly>
    </Suspense>
  );
};

export default LoginElement;
