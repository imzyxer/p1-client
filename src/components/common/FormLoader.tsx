import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

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
