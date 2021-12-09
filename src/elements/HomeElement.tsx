import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';

const HomeElement: FC = () => {
  const Element = React.lazy(() => import('elements/Home'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <Element />
    </Suspense>
  );
};

export default HomeElement;
