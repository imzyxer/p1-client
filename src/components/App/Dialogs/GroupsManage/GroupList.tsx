import React, { FC } from 'react';
import { observer } from 'mobx-react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useRootStore } from 'stores/hooks/useRootStore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from 'components/layout/ListItemIcon';
import GroupIcon from 'components/common/GroupIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Divider from '@mui/material/Divider';
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
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(group.id)} size="large">
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
