import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogTitle from 'components/layout/DialogTitle';
import useRootStore from 'stores/hooks/useRootStore';
import ManageGroupIcon from '@mui/icons-material/CreateNewFolder';
import GroupList from 'components/App/Dialogs/GroupsManage/GroupList';
import GroupAdd from 'components/App/Dialogs/GroupsManage/GroupAdd';
import GroupEdit from 'components/App/Dialogs/GroupsManage/GroupEdit';
import { useTranslation } from 'react-i18next';

const Index: FC = () => {
  const { t } = useTranslation();
  const { groupsManageStore: store } = useRootStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => store.close();
  const { isOpened: open } = store;

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle onClose={handleClose}>
        <ManageGroupIcon />
        <span>&nbsp;{t('dialog.group.title')}</span>
      </DialogTitle>
      {store.isItList && <GroupList />}
      {store.isItCreateForm && <GroupAdd />}
      {store.isItEditForm && <GroupEdit />}
    </Dialog>
  );
};

export default observer(Index);
