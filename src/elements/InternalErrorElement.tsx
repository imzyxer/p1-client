import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const Element = React.lazy(() => import('elements/InternalError'));
const InternalErrorElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Element />
  </Suspense>
);

export default InternalErrorElement;
