import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@material-ui/core';

const Element = React.lazy(() => import('elements/Signup'));
const SignupElement: FC = () => (
  <Suspense fallback={<LinearProgress />}>
    <Element />
  </Suspense>
);

export default SignupElement;
