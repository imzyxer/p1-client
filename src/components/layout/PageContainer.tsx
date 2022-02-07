import React, { FC } from 'react';
import Container from '@mui/material/Container';

const PageContainer: FC = ({ children }) => (
  <Container
    maxWidth={false}
    sx={{
      paddingTop: theme => theme.spacing(4),
      paddingBottom: theme => theme.spacing(4),
      overflowY: 'auto',
      outline: '1px solid red',
      flex: '1 1 auto',
      maxWidth: '100vw',
    }}
  >
    <>{children}</>
  </Container>
);

export default PageContainer;
