import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import confirmStore from 'stores/ConfirmStore';
import DialogContent from 'components/Dialog/DialogContent';

const Confirm: FC = () => {
  const { title, description, confirmationText, cancellationText, dialogProps, confirmationButtonProps, cancellationButtonProps } = confirmStore.options;

  return (
    <Dialog maxWidth="sm" {...dialogProps} open={confirmStore.isOpen} onClose={() => confirmStore.handleClose()}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={() => confirmStore.handleCancel()}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={() => confirmStore.handleConfirm()}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(Confirm);
