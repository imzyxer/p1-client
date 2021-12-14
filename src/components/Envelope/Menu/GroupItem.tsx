import React, { FC } from 'react';
import { IGroup } from 'types/group';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from 'components/common/GroupIcon';

interface IGroupItem {
  group: IGroup;
  selected?: boolean;
}

const GroupItem: FC<IGroupItem> = ({ group, selected = false }) => (
  <ListItem button component={Link} to={urns.getGroupUrn(group.id)} selected={selected}>
    <ListItemIcon>
      <GroupIcon icon={group.icon} />
    </ListItemIcon>
    <ListItemText primary={group.name} />
  </ListItem>
);

export default GroupItem;
