import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessUsersOnly from 'router/AccessUsersOnly';

const HistoryElement: FC = () => {
  const Module = React.lazy(() => import('modules/HistoryModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <AccessUsersOnly>
        <Module />
      </AccessUsersOnly>
    </Suspense>
  );
};

export default HistoryElement;
