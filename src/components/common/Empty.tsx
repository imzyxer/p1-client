import React, { FC } from 'react';
import Box from '@mui/material/Box';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

const Empty: FC = () => (
  <Box textAlign="center" p={5} m={2}>
    <SpeakerNotesOffIcon fontSize="large" color="disabled" />
    <Box mt={1}>No Data</Box>
  </Box>
);

export default Empty;
