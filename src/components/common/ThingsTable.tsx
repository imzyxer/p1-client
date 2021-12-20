import React, { FC } from 'react';
import { TThingForList } from 'types/thing';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import StarredFalse from '@mui/icons-material/StarBorder';
import StarredTrue from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import TableContainer from '@mui/material/TableContainer';
import useThingViewStore from 'stores/hooks/useThingViewStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { TId } from 'types/app';
import useThingEditStore from 'stores/hooks/useThingEditStore';
import Empty from 'components/common/Empty';
import confirmStore from 'stores/ConfirmStore';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';

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

const ThingsTable: FC<IThingTable> = ({ columns, things }) => {
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
            <Hidden smDown>{columns.includes(EColumn.TYPE) && <TableCell>&nbsp;</TableCell>}</Hidden>
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
              <Hidden smDown>
                {columns.includes(EColumn.TYPE) && (
                  <TableCell align="center" padding="none">
                    <IconButton size="medium">
                      <ThingTypeIcon type={thing.type} />
                    </IconButton>
                  </TableCell>
                )}
              </Hidden>
              {columns.includes(EColumn.TITLE) && (
                <TableCell size="small">
                  {thing.title}
                  <br />
                  <Box component="small" sx={{ color: t => t.palette.text.secondary }} whiteSpace="nowrap">
                    {thing.requested}
                  </Box>
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
