import React, { FC, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { APP_NAME } from 'constants/app';
import ErrorPage from 'components/ErrorPage';

const NotFound: FC = () => {
  useEffect(() => {
    document.title = `404 Not Found — ${APP_NAME}`;
  }, []);
  return (
    <ErrorPage title="404">
      <Typography variant="h5" gutterBottom>
        Oops! 404 Not Found
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Sorry, an error has occurred, requested page not found!
      </Typography>
    </ErrorPage>
  );
};

export default NotFound;
