import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useThingViewStore from 'stores/hooks/useThingViewStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { EProgress } from 'types/app';

import Typography from '@material-ui/core/Typography';
import GlobalLoader from 'components/common/GlobalLoader';

import { useTheme } from '@material-ui/core/styles';
import DialogTitle from 'components/layout/DialogTitle';
import PieceForPassword from 'components/App/Dialogs/ThingView/PieceForPassword';
import PieceForCard from 'components/App/Dialogs/ThingView/PieceForCard';
import { EThingType } from 'types/thing';
import _isEmpty from 'lodash/isEmpty';

const Index: FC = () => {
  const store = useThingViewStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = () => store.close();
  const open = store.isThingCardOpened;

  if (store.progress === EProgress.LOADING) return <GlobalLoader invisible={false} />;
  if (store.thing === null) return <></>;

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle onClose={handleClose}>
        <ThingTypeIcon type={store.data.type} />
        <span>&nbsp;{store.data.title}</span>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {store.data.type === EThingType.PASSWORD && <PieceForPassword payload={store.passwordPayload} />}
          {store.data.type === EThingType.CARD && <PieceForCard payload={store.cardPayload} />}
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
