import React, { FC } from 'react';
import { TThingForList } from 'types/thing';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Empty from 'components/common/Empty';
import Hidden from '@mui/material/Hidden';
import { useTranslation } from 'react-i18next';
import ThingsTableRow, { EColumn } from 'components/ThingsTable/ThingsTableRow';

type TThingTableProps = {
  columns: EColumn[];
  things: TThingForList[];
};

const ThingsTable: FC<TThingTableProps> = ({ columns, things }) => {
  const { t } = useTranslation();

  if (things.length === 0) return <Empty />;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden smDown>{columns.includes(EColumn.TYPE) && <TableCell>&nbsp;</TableCell>}</Hidden>
            {columns.includes(EColumn.TITLE) && <TableCell>{t('thingsTable.thTitle')}</TableCell>}
            {columns.includes(EColumn.SUBJECT) && <TableCell>{t('thingsTable.thSubject')}</TableCell>}
            {columns.includes(EColumn.ACTIONS) && <TableCell>&nbsp;</TableCell>}
            {columns.includes(EColumn.CREATED) && <TableCell align="right">{t('thingsTable.thCreated')}</TableCell>}
            {columns.includes(EColumn.UPDATED) && <TableCell align="right">{t('thingsTable.thUpdated')}</TableCell>}
            {columns.includes(EColumn.REQUESTED) && <TableCell align="right">{t('thingsTable.thRequested')}</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {things.map(thing => (
            <ThingsTableRow key={thing.id} columns={columns} thing={thing} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThingsTable;
