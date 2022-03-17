import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import HistoryIcon from '@mui/icons-material/History';
import PageTitle from 'components/common/PageTitle';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
import useHistoryStore from 'stores/hooks/useHistoryStore';
import PageContainer from 'components/common/PageContainer';
import { useTranslation } from 'react-i18next';

const History: FC = () => {
  const { t } = useTranslation('history');
  const historyStore = useHistoryStore();

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <PageTitle icon={<HistoryIcon />}>{t('pageTitle')}</PageTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('thDate')}</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>{t('thOS')}</TableCell>
                    <TableCell>{t('thBrowser')}</TableCell>
                    <TableCell>{t('thLocation')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyStore.historyForList.map((item, index) => (
                    <TableRow hover key={item.id}>
                      <TableCell>
                        {item.datetime}
                        &nbsp;
                        {index === 0 && <Chip size="small" label={t('labelCurrent')} color="secondary" variant="outlined" />}
                        {index === 1 && <Chip size="small" label={t('labelPrevious')} color="primary" variant="outlined" />}
                      </TableCell>
                      <TableCell>{item.ip}</TableCell>
                      <TableCell>{item.os}</TableCell>
                      <TableCell>{item.ua}</TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(History);
