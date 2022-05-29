import React, { FC } from 'react';
import { IGroup } from 'types/group';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import ListItemIcon from 'components/common/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from 'components/common/GroupIcon';

interface IGroupItem {
  group: IGroup;
  selected?: boolean;
}

const GroupItem: FC<IGroupItem> = ({ group, selected = false }) => (
  <ListItemButton component={Link} to={urns.getGroupUrn(group.id)} selected={selected}>
    <ListItemIcon>
      <GroupIcon icon={group.icon} />
    </ListItemIcon>
    <ListItemText primary={group.name} />
  </ListItemButton>
);

export default GroupItem;
