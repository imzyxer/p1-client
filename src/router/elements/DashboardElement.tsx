import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const DashboardElement: FC = () => {
  const Element = React.lazy(() => import('router/elements/Dashboard'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Element />
      </RequireAuth>
    </Suspense>
  );
};

export default DashboardElement;
