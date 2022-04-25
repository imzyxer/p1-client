import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessUsersOnly from 'router/AccessUsersOnly';

const GroupViewElement: FC = () => {
  const Module = React.lazy(() => import('modules/GroupViewModule'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <AccessUsersOnly>
        <Module />
      </AccessUsersOnly>
    </Suspense>
  );
};

export default GroupViewElement;
