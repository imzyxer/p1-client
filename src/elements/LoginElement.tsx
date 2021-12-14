import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const LoginElement: FC = () => {
  const Element = React.lazy(() => import('elements/Login'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <Element />
    </Suspense>
  );
};

export default LoginElement;
