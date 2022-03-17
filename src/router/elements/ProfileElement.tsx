import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'router/RequireAuth';

const Element = React.lazy(() => import('router/elements/Profile'));
const ProfileElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <RequireAuth>
      <Element />
    </RequireAuth>
  </Suspense>
);

export default ProfileElement;
