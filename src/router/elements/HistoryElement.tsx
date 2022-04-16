import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const HistoryElement: FC = () => {
  const Module = React.lazy(() => import('modules/HistoryModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Module />
      </RequireAuth>
    </Suspense>
  );
};

export default HistoryElement;
