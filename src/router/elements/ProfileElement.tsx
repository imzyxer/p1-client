import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const Module = React.lazy(() => import('modules/ProfileModule'));
const ProfileElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <RequireAuth>
      <Module />
    </RequireAuth>
  </Suspense>
);

export default ProfileElement;
