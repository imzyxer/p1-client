import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const DashboardElement: FC = () => {
  const Module = React.lazy(() => import('modules/DashboardModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Module />
      </RequireAuth>
    </Suspense>
  );
};

export default DashboardElement;
