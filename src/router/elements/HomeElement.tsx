import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const HomeElement: FC = () => {
  const Element = React.lazy(() => import('router/elements/Home'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <Element />
    </Suspense>
  );
};

export default HomeElement;
