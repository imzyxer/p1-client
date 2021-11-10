import React, { FC } from 'react';
import { TEntryForList } from 'types/entry';
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
import useEntryViewStore from 'stores/hooks/useEntryViewStore';
import EntryTypeIcon from 'components/common/EntryTypeIcon';
import { TId } from 'types/app';
import useEntryEditStore from 'stores/hooks/useEntryEditStore';
import Empty from 'components/common/Empty';
import confirmStore from 'stores/ConfirmStore';
import { useSnackbar } from 'notistack';

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

interface IEntryTable {
  columns: EColumn[];
  entries: TEntryForList[];
}

const EntriesTable: FC<IEntryTable> = ({ columns, entries }) => {
  const { enqueueSnackbar } = useSnackbar();
  const entryViewStore = useEntryViewStore();
  const entryEditStore = useEntryEditStore();
  const openModal = (entryId: TId) => entryViewStore.open(entryId);
  const openEditModal = (entryId: TId) => entryEditStore.open(entryId);
  const doStarred = (entryId: TId) => {
    confirmStore.confirm({ description: 'Do you want starred/unstarred this thing?' }).then(
      () => {
        entryEditStore.doStarred(entryId, () => {
          enqueueSnackbar('Thing starred successfully', { variant: 'success' });
        });
      },
      () => {}
    );
  };

  if (entries.length === 0) return <Empty />;

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
          {entries.map(entry => (
            <TableRow
              key={entry.id}
              onClick={(e: React.MouseEvent) => {
                openModal(entry.id);
                e.stopPropagation();
              }}
              hover
            >
              {columns.includes(EColumn.TYPE) && (
                <TableCell align="center" padding="none">
                  <IconButton size="medium">
                    <EntryTypeIcon type={entry.type} />
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.TITLE) && <TableCell size="small">{entry.title}</TableCell>}
              {columns.includes(EColumn.SUBJECT) && <TableCell size="small">{entry.subject}</TableCell>}
              {columns.includes(EColumn.STARRED) && (
                <TableCell size="small" padding="none">
                  <IconButton
                    size="medium"
                    onClick={(e: React.MouseEvent) => {
                      doStarred(entry.id);
                      e.stopPropagation();
                    }}
                  >
                    {entry.isStarred ? <StarredTrue /> : <StarredFalse />}
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.EDIT) && (
                <TableCell align="center" size="small" padding="none">
                  <IconButton
                    size="medium"
                    onClick={(e: React.MouseEvent) => {
                      openEditModal(entry.id);
                      e.stopPropagation();
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              )}
              {columns.includes(EColumn.CREATED) && (
                <TableCell align="right" size="small">
                  {entry.created}
                </TableCell>
              )}
              {columns.includes(EColumn.UPDATED) && (
                <TableCell align="right" size="small">
                  {entry.updated}
                </TableCell>
              )}
              {columns.includes(EColumn.REQUESTED) && (
                <TableCell align="right" size="small">
                  {entry.requested}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EntriesTable;
