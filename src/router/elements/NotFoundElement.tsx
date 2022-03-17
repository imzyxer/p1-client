import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const Element = React.lazy(() => import('router/elements/NotFound'));
const NotFoundElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Element />
  </Suspense>
);

export default NotFoundElement;
