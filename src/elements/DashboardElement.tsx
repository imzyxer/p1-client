import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'components/App/RequireAuth';

const DashboardElement: FC = () => {
  const Element = React.lazy(() => import('elements/Dashboard'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Element />
      </RequireAuth>
    </Suspense>
  );
};

export default DashboardElement;
