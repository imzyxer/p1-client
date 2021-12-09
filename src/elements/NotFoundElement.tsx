import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';

const Element = React.lazy(() => import('elements/NotFound'));
const NotFoundElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Element />
  </Suspense>
);

export default NotFoundElement;
