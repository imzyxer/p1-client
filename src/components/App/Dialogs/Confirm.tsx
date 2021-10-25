import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import confirmStore from 'stores/ConfirmStore';

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
