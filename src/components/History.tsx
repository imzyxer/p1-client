import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import HistoryIcon from '@mui/icons-material/History';
import PageTitle from 'components/layout/PageTitle';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Chip from '@mui/material/Chip';
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
                        {item.datetime}
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
