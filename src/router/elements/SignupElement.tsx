import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const Module = React.lazy(() => import('modules/SignupModule'));
const SignupElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Module />
  </Suspense>
);

export default SignupElement;
