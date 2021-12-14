import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'components/App/RequireAuth';

const Element = React.lazy(() => import('elements/Profile'));
const ProfileElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <RequireAuth>
      <Element />
    </RequireAuth>
  </Suspense>
);

export default ProfileElement;
