import React, { FC, Suspense } from 'react';
import { LinearProgress } from '@mui/material';
import RequireAuth from 'components/App/RequireAuth';

const HistoryElement: FC = () => {
  const Element = React.lazy(() => import('elements/History'));
  return (
    <Suspense fallback={<LinearProgress />}>
      <RequireAuth>
        <Element />
      </RequireAuth>
    </Suspense>
  );
};

export default HistoryElement;
