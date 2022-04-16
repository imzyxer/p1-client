import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const GroupViewElement: FC = () => {
  const Module = React.lazy(() => import('modules/GroupViewModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Module />
      </RequireAuth>
    </Suspense>
  );
};

export default GroupViewElement;
