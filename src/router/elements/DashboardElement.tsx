import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessUsersOnly from 'router/AccessUsersOnly';

const DashboardElement: FC = () => {
  const Module = React.lazy(() => import('modules/DashboardModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <AccessUsersOnly>
        <Module />
      </AccessUsersOnly>
    </Suspense>
  );
};

export default DashboardElement;
