import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Sidebar from 'components/Envelope/Sidebar';
import { observer } from 'mobx-react';
import useAppStore from 'stores/hooks/useAppStore';
import Dialogs from 'components/Dialogs';
import { Outlet } from 'react-router-dom';
import Header from 'components/Envelope/Header';

const drawerWidth = 240;

const Envelope: FC = () => {
  const appStore = useAppStore();
  const mobileOpen = appStore.isOpenMenu;
  const handleDrawerToggle = () => appStore.setIsOpenMenu(!mobileOpen);
  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <Sidebar />
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
      <Dialogs />
    </Box>
  );
};

export default observer(Envelope);
