import React, { FC } from 'react';
import { TThingForList } from 'types/thing';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import StarredFalse from '@material-ui/icons/StarBorder';
import StarredTrue from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';
import TableContainer from '@material-ui/core/TableContainer';
import useThingViewStore from 'stores/hooks/useThingViewStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { TId } from 'types/app';
import useThingEditStore from 'stores/hooks/useThingEditStore';
import Empty from 'components/common/Empty';
import confirmStore from 'stores/ConfirmStore';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';

export enum EColumn {
  TYPE,
  TITLE,
  SUBJECT,
  STARRED,
  EDIT,
  CREATED,
  UPDATED,
  REQUESTED,
}

interface IThingTable {
  columns: EColumn[];
  things: TThingForList[];
}

const useStyles = makeStyles(theme => ({
  requested: {
    color: theme.palette.text.secondary,
  },
}));

const ThingsTable: FC<IThingTable> = ({ columns, things }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const thingViewStore = useThingViewStore();
  const thingEditStore = useThingEditStore();
  const openModal = (thingId: TId) => thingViewStore.open(thingId);
  const openEditModal = (thingId: TId) => thingEditStore.open(thingId);
  const doStarred = (thingId: TId) => {
    confirmStore.confirm({ description: 'Do you want starred/unstarred this thing?' }).then(
      () => {
        thingEditStore.doStarred(thingId, () => {
          enqueueSnackbar('Thing starred successfully', { variant: 'success' });
        });
      },
      () => {}
    );
  };

  if (things.length === 0) return <Empty />;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.includes(EColumn.TYPE) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.TITLE) && <TableCell>Title</TableCell>}
            {columns.includes(EColumn.SUBJECT) && <TableCell>Subject</TableCell>}
            {columns.includes(EColumn.STARRED) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.EDIT) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.CREATED) && <TableCell align="right">Created</TableCell>}
            {columns.includes(EColumn.UPDATED) && <TableCell align="right">Updated</TableCell>}
            {columns.includes(EColumn.REQUESTED) && <TableCell align="right">Requested</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {things.map(thing => (
            <TableRow
              key={thing.id}
              onClick={(e: React.MouseEvent) => {
                openModal(thing.id);
                e.stopPropagation();
              }}
              hover
            >
              {columns.includes(EColumn.TYPE) && (
                <TableCell align="center" padding="none">
                  <IconButton size="medium">
                    <ThingTypeIcon type={thing.type} />
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.TITLE) && (
                <TableCell size="small">
                  {thing.title}
                  <br />
                  <small className={classes.requested}>{thing.requested}</small>
                </TableCell>
              )}
              {columns.includes(EColumn.SUBJECT) && <TableCell size="small">{thing.subject}</TableCell>}
              {columns.includes(EColumn.STARRED) && (
                <TableCell size="small" padding="none">
                  <IconButton
                    size="medium"
                    onClick={(e: React.MouseEvent) => {
                      doStarred(thing.id);
                      e.stopPropagation();
                    }}
                  >
                    {thing.isStarred ? <StarredTrue /> : <StarredFalse />}
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.EDIT) && (
                <TableCell align="center" size="small" padding="none">
                  <IconButton
                    size="medium"
                    onClick={(e: React.MouseEvent) => {
                      openEditModal(thing.id);
                      e.stopPropagation();
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.CREATED) && (
                <TableCell align="right" size="small">
                  {thing.created}
                </TableCell>
              )}
              {columns.includes(EColumn.UPDATED) && (
                <TableCell align="right" size="small">
                  {thing.updated}
                </TableCell>
              )}
              {columns.includes(EColumn.REQUESTED) && (
                <TableCell align="right" size="small">
                  {thing.requested}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThingsTable;
