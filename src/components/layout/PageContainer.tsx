import React, { FC } from 'react';
import Container from '@mui/material/Container';

const PageContainer: FC = ({ children }) => (
  <Container
    maxWidth={false}
    sx={{
      paddingTop: theme => theme.spacing(3),
      paddingBottom: theme => theme.spacing(3),
      overflowY: 'auto',
      flex: '1 1 auto',
      maxWidth: '100vw',
    }}
  >
    <>{children}</>
  </Container>
);

export default PageContainer;
