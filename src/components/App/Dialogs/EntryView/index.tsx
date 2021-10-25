import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useEntryViewStore from 'stores/hooks/useEntryViewStore';
import EntryTypeIcon from 'components/common/EntryTypeIcon';
import { EProgress } from 'types/app';

import Typography from '@material-ui/core/Typography';
import GlobalLoader from 'components/common/GlobalLoader';

import { useTheme } from '@material-ui/core/styles';
import DialogTitle from 'components/layout/DialogTitle';
import PieceForPassword from 'components/App/Dialogs/EntryView/PieceForPassword';
import PieceForCard from 'components/App/Dialogs/EntryView/PieceForCard';
import { EEntryType } from 'types/entry';
import _isEmpty from 'lodash/isEmpty';

const Index: FC = () => {
  const store = useEntryViewStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = () => store.close();
  const open = store.isEntryCardOpened;

  if (store.progress === EProgress.LOADING) return <GlobalLoader invisible={false} />;
  if (store.entry === null) return <></>;

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle onClose={handleClose}>
        <EntryTypeIcon type={store.data.type} />
        <span>&nbsp;{store.data.title}</span>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {store.data.type === EEntryType.PASSWORD && <PieceForPassword payload={store.passwordPayload} />}
          {store.data.type === EEntryType.CARD && <PieceForCard payload={store.cardPayload} />}
          {!_isEmpty(store.data.comment) && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Comment
              </Typography>
              <Typography variant="body1">{store.data.comment}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(Index);
