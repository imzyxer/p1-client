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
import Chip from '@material-ui/core/Chip';
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
                  {historyStore.historyForList.map((item, index) => (
                    <TableRow hover key={item.id}>
                      <TableCell>
                        {item.date}
                        &nbsp;
                        {index === 0 && <Chip size="small" label="Current" color="secondary" variant="outlined" />}
                        {index === 1 && <Chip size="small" label="Previous" color="primary" variant="outlined" />}
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
