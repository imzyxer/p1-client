import React, { FC } from 'react';
import { TThingForList } from 'types/thing';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import StarredFalse from '@mui/icons-material/StarBorder';
import StarredTrue from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import useThingViewStore from 'stores/hooks/useThingViewStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { TId } from 'types/app';
import useThingEditStore from 'stores/hooks/useThingEditStore';
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

type TThingsTableRowProps = {
  columns: EColumn[];
  thing: TThingForList;
};

const TableCellType: FC<{ thing: TThingForList }> = ({ thing }) => {
  const { t } = useTranslation();

  return (
    <TableCell align="center" padding="none">
      <Tooltip title={t('thingsTable.tooltipView')}>
        <IconButton size="medium" disabled={thing.isBroken}>
          <ThingTypeIcon type={thing.type} />
        </IconButton>
      </Tooltip>
    </TableCell>
  );
};

const TableCellTitle: FC<{ thing: TThingForList }> = ({ thing }) => {
  const { t } = useTranslation();

  return (
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
  );
};

const TableCellCreated: FC<{ thing: TThingForList }> = ({ thing }) => (
  <TableCell align="right" size="small">
    {thing.created}
  </TableCell>
);

const TableCellUpdated: FC<{ thing: TThingForList }> = ({ thing }) => (
  <TableCell align="right" size="small">
    {thing.updated}
  </TableCell>
);

const TableCellRequested: FC<{ thing: TThingForList }> = ({ thing }) => (
  <TableCell align="right" size="small">
    {thing.requested}
  </TableCell>
);

const ThingsTableRow: FC<TThingsTableRowProps> = ({ columns, thing }) => {
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

  if (thing.isBroken) {
    return (
      <TableRow sx={{ opacity: '.3' }}>
        <Hidden smDown>{columns.includes(EColumn.TYPE) && <TableCellType thing={thing} />}</Hidden>
        {columns.includes(EColumn.TITLE) && <TableCellTitle thing={thing} />}
        {columns.includes(EColumn.SUBJECT) && <TableCell size="small">BROKEN</TableCell>}
        {columns.includes(EColumn.STARRED) && <TableCell size="small">&nbsp;</TableCell>}
        {columns.includes(EColumn.EDIT) && <TableCell size="small">&nbsp;</TableCell>}
        {columns.includes(EColumn.CREATED) && <TableCellCreated thing={thing} />}
        {columns.includes(EColumn.UPDATED) && <TableCellUpdated thing={thing} />}
        {columns.includes(EColumn.REQUESTED) && <TableCellRequested thing={thing} />}
      </TableRow>
    );
  }

  return (
    <TableRow
      onClick={(e: React.MouseEvent) => {
        openModal(thing.id);
        e.stopPropagation();
      }}
      hover
    >
      <Hidden smDown>{columns.includes(EColumn.TYPE) && <TableCellType thing={thing} />}</Hidden>
      {columns.includes(EColumn.TITLE) && <TableCellTitle thing={thing} />}
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
      {columns.includes(EColumn.CREATED) && <TableCellCreated thing={thing} />}
      {columns.includes(EColumn.UPDATED) && <TableCellUpdated thing={thing} />}
      {columns.includes(EColumn.REQUESTED) && <TableCellRequested thing={thing} />}
    </TableRow>
  );
};

export default ThingsTableRow;
