import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogTitle from 'components/layout/DialogTitle';
import { useRootStore } from 'stores/hooks/useRootStore';
import ManageGroupIcon from '@material-ui/icons/CreateNewFolder';
import GroupList from 'components/App/Dialogs/GroupsManage/GroupList';
import GroupAdd from 'components/App/Dialogs/GroupsManage/GroupAdd';
import GroupEdit from 'components/App/Dialogs/GroupsManage/GroupEdit';

const Index: FC = () => {
  const { groupsManageStore: store } = useRootStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const handleClose = () => store.close();
  const { isOpened: open } = store;

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle onClose={handleClose}>
        <ManageGroupIcon />
        <span>&nbsp;Manage Groups</span>
      </DialogTitle>
      {store.isItList && <GroupList />}
      {store.isItCreateForm && <GroupAdd />}
      {store.isItEditForm && <GroupEdit />}
    </Dialog>
  );
};

export default observer(Index);
