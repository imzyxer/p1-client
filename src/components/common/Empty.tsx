import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

const Empty: FC = () => (
  <Box textAlign="center" p={5} m={2}>
    <SpeakerNotesOffIcon fontSize="large" color="disabled" />
    <Box mt={1}>No Data</Box>
  </Box>
);

export default Empty;
