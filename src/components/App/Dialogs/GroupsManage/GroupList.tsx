import React, { FC } from 'react';
import { observer } from 'mobx-react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useRootStore } from 'stores/hooks/useRootStore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import GroupIcon from 'components/common/GroupIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import confirmStore from 'stores/ConfirmStore';
import { useSnackbar } from 'notistack';
import { TId } from 'types/app';

const GroupList: FC = () => {
  const { groupsManageStore: store, refsStore } = useRootStore();
  const { enqueueSnackbar } = useSnackbar();
  const { groups } = refsStore;
  const handleClose = () => store.close();
  const handleAddGroup = () => store.addGroup();

  const onDelete = (groupId: TId) => {
    confirmStore.confirm({ description: 'Do you want to delete this group?' }).then(
      () => {
        store.doRemove(
          groupId,
          () => enqueueSnackbar('Group deleted successfully', { variant: 'success' }),
          () => enqueueSnackbar('Oops! Something wrong', { variant: 'warning' })
        );
      },
      () => {}
    );
  };

  return (
    <>
      <DialogContent dividers>
        <List>
          <ListItem button onClick={handleAddGroup}>
            <ListItemIcon>
              <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Group" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {groups.map(group => (
            <ListItem button key={group.id} onClick={() => store.editGroup(group.id)}>
              <ListItemIcon>
                <GroupIcon icon={group.icon} />
              </ListItemIcon>
              <ListItemText primary={group.name} />
              {group.isEmpty && (
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(group.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default observer(GroupList);
