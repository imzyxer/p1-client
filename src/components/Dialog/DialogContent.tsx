import React, { FC } from 'react';
import MuiDialogContent, { DialogContentProps } from '@mui/material/DialogContent';

const DialogContent: FC<DialogContentProps> = ({ children, ...props }) => (
  <MuiDialogContent
    sx={{
      padding: t => `${t.spacing(3)}!important`,
    }}
    {...props}
  >
    {children}
  </MuiDialogContent>
);

export default DialogContent;
