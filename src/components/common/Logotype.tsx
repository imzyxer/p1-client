import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import LogotypeIcon from '@mui/icons-material/Https';
import Typography from '@mui/material/Typography';

const Logotype: FC = () => (
  <>
    <Avatar
      sx={{
        m: 1,
        backgroundColor: 'secondary.main',
        width: t => t.spacing(7),
        height: t => t.spacing(7),
      }}
    >
      <LogotypeIcon />
    </Avatar>
    <Typography variant="subtitle1" color="textSecondary">
      Storage <strong>П1</strong> <sup>&beta;</sup>
    </Typography>
  </>
);

export default Logotype;
