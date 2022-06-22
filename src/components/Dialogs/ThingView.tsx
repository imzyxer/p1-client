import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { EProgress } from 'types/app';
import GlobalLoader from 'components/common/GlobalLoader';
import { useTranslation } from 'react-i18next';
import DialogTitle from 'components/Dialog/DialogTitle';
import DialogContent from 'components/Dialog/DialogContent';
import PieceForPassword from 'components/Dialogs/ThingView/PieceForPassword';
import PieceForCard from 'components/Dialogs/ThingView/PieceForCard';
import { EThingType } from 'types/thing';
import _isEmpty from 'lodash/isEmpty';
import useRootStore from 'stores/hooks/useRootStore';
import GroupIcon from 'components/common/GroupIcon';

const ThingView: FC = () => {
  const { t } = useTranslation();
  const { thingViewStore: store } = useRootStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {store.data.type === EThingType.PASSWORD && <PieceForPassword payload={store.passwordPayload} />}
            {store.data.type === EThingType.CARD && <PieceForCard payload={store.cardPayload} />}
          </Grid>
          {!_isEmpty(store.data.comment) && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('dialog.thing.labelComment')}
              </Typography>
              <Typography variant="body1">{store.data.comment}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} mt={2}>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {t('dialog.thing.labelCreated')}: {store.thingCreated}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {t('dialog.thing.labelUpdated')}: {store.thingUpdated}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', paddingLeft: th => th.spacing(3) }}>
        {store.group && (
          <Box sx={{ opacity: '.5', alignItems: 'center', display: 'inline-flex' }}>
            <GroupIcon icon={store.group.icon} />
            &nbsp;
            {store.group.name}
          </Box>
        )}
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(ThingView);
