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
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const thingViewStore = useThingViewStore();
  const thingEditStore = useThingEditStore();
  const openModal = (thingId: TId) => thingViewStore.open(thingId);
  const openEditModal = (thingId: TId) => thingEditStore.open(thingId);
  const doStarred = (thingId: TId, isStarred: boolean) => {
    const confirmDescription = isStarred ? t('confirm.unStarred') : t('confirm.starred');
    const snackbarMessage = isStarred ? t('snackbar.thingUnStarred') : t('snackbar.thingStarred');

    confirmStore
      .confirm({
        description: confirmDescription,
      })
      .then(
        () => {
          thingEditStore.doStarred(thingId, () => {
            enqueueSnackbar(snackbarMessage, { variant: 'success' });
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
            {columns.includes(EColumn.TITLE) && <TableCell>{t('thingsTable.thTitle')}</TableCell>}
            {columns.includes(EColumn.SUBJECT) && <TableCell>{t('thingsTable.thSubject')}</TableCell>}
            {columns.includes(EColumn.STARRED) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.EDIT) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.CREATED) && <TableCell align="right">{t('thingsTable.thCreated')}</TableCell>}
            {columns.includes(EColumn.UPDATED) && <TableCell align="right">{t('thingsTable.thUpdated')}</TableCell>}
            {columns.includes(EColumn.REQUESTED) && <TableCell align="right">{t('thingsTable.thRequested')}</TableCell>}
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
                    <Tooltip title={t<string>('thingsTable.tooltipView')}>
                      <IconButton size="medium">
                        <ThingTypeIcon type={thing.type} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
              </Hidden>
              {columns.includes(EColumn.TITLE) && (
                <TableCell size="small">
                  <Box
                    component="div"
                    sx={{
                      maxWidth: { xs: '110px', sm: '100%' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    whiteSpace="nowrap"
                    title={thing.title}
                  >
                    {thing.title}
                  </Box>
                  <Box component="small" sx={{ color: theme => theme.palette.text.secondary }} whiteSpace="nowrap" title={t('thingsTable.tooltipRequested')}>
                    {thing.requested}
                  </Box>
                </TableCell>
              )}
              {columns.includes(EColumn.SUBJECT) && <TableCell size="small">{thing.subject}</TableCell>}
              {columns.includes(EColumn.STARRED) && (
                <TableCell size="small" padding="none">
                  <Tooltip title={t<string>(thing.isStarred ? 'thingsTable.tooltipUnStarred' : 'thingsTable.tooltipStarred')}>
                    <IconButton
                      size="medium"
                      onClick={(e: React.MouseEvent) => {
                        doStarred(thing.id, thing.isStarred);
                        e.stopPropagation();
                      }}
                    >
                      {thing.isStarred ? <StarredTrue /> : <StarredFalse />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
              {columns.includes(EColumn.EDIT) && (
                <TableCell align="center" size="small" padding="none">
                  <Tooltip title={t<string>('thingsTable.tooltipEdit')}>
                    <IconButton
                      size="medium"
                      onClick={(e: React.MouseEvent) => {
                        openEditModal(thing.id);
                        e.stopPropagation();
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
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
