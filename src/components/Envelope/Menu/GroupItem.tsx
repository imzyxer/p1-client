import React, { FC } from 'react';
import { IGroup } from 'types/group';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import * as urns from 'utils/getUrn';
import ListItemIcon from 'components/layout/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
