import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { useFormikContext } from 'formik';
import LinearProgress from '@mui/material/LinearProgress';

const FormLoader: FC = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <Box component="div" visibility={isSubmitting ? 'visible' : 'hidden'} sx={{ opacity: 0.5 }}>
      <LinearProgress />
    </Box>
  );
};

export default FormLoader;
