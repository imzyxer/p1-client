import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const Module = React.lazy(() => import('modules/InternalErrorModule'));
const InternalErrorElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Module />
  </Suspense>
);

export default InternalErrorElement;
