import React, { FC, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { APP_NAME } from 'constants/app';
import ErrorPage from 'components/modules/ErrorPage';

const InternalError: FC = () => {
  useEffect(() => {
    document.title = `500 Internal Server Error — ${APP_NAME}`;
  }, []);

  return (
    <ErrorPage title="500">
      <Typography variant="h5" gutterBottom>
        Oops! 500 Internal Server Error
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Our spaghetti code is not working properly. We will be back soon!
      </Typography>
    </ErrorPage>
  );
};

export default InternalError;
