import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import HistoryIcon from '@material-ui/icons/History';
import PageTitle from 'components/layout/PageTitle';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import useHistoryStore from 'stores/hooks/useHistoryStore';
import PageContainer from 'components/layout/PageContainer';

const History: FC = () => {
  const historyStore = useHistoryStore();

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <PageTitle icon={<HistoryIcon />}>Access History</PageTitle>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>OS</TableCell>
                    <TableCell>Browser</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyStore.historyForList.map(item => (
                    <TableRow hover key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.ip}</TableCell>
                      <TableCell>{item.os}</TableCell>
                      <TableCell>{item.browser}</TableCell>
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
