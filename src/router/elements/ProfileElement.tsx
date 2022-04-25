import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import AccessUsersOnly from 'router/AccessUsersOnly';

const Module = React.lazy(() => import('modules/ProfileModule'));
const ProfileElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <AccessUsersOnly>
      <Module />
    </AccessUsersOnly>
  </Suspense>
);

export default ProfileElement;
