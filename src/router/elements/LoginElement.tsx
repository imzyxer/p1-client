import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const LoginElement: FC = () => {
  const Module = React.lazy(() => import('modules/LoginModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <Module />
    </Suspense>
  );
};

export default LoginElement;
