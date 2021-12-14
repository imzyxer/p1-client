import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { useFormikContext } from 'formik';
import LinearProgress from '@mui/material/LinearProgress';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    opacity: 0.5,
  },
}));

const FormLoader: FC = () => {
  const classes = useStyles();
  const { isSubmitting } = useFormikContext();

  return (
    <Box component="div" className={classes.root} visibility={isSubmitting ? 'visible' : 'hidden'}>
      <LinearProgress />
    </Box>
  );
};

export default FormLoader;
