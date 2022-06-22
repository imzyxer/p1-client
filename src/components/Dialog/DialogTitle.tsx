import React, { FC } from 'react';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type TDialogTitleProps = {
  children?: React.ReactNode;
  onClose?: () => void;
};

const DialogTitle: FC<TDialogTitleProps> = ({ children, onClose, ...other }) => (
  <MuiDialogTitle sx={{ m: 0, px: 3, py: 2 }} {...other}>
    <Typography
      variant="h6"
      component="div"
      sx={{
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {children}
    </Typography>
    {onClose && (
      <IconButton
        aria-label="close"
        onClick={onClose}
        size="large"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    )}
  </MuiDialogTitle>
);

export default DialogTitle;
