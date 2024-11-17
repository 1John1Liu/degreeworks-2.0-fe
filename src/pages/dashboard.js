import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemText,
  CssBaseline,
  Box,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useRouter } from 'next/router';

const drawerWidth = 200;

const checkSessionAndRedirect = (router, sessionId) => {
  if (!sessionId) {
    // Redirect to http://localhost:4000 if sessionID is missing
    router.replace('http://localhost:4000');
  }
};

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Extract query parameters
  const queryParams = router.query;

  useEffect(() => {
    const sessionId = queryParams.sessionId;
    checkSessionAndRedirect(router, sessionId);
  }, [queryParams, router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateToPage = (page) => {
    router.push(`/dashboard?page=${page}`);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigateToPage('home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => navigateToPage('register')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </ListItemButton>
        <ListItemButton onClick={() => navigateToPage('whatif')}>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="What If" />
        </ListItemButton>
        <ListItemButton onClick={() => navigateToPage('settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h6" gutterBottom>
          Query Parameters:
        </Typography>
        <Typography paragraph>
          {Object.keys(queryParams).length
            ? JSON.stringify(queryParams, null, 2)
            : 'No query parameters provided.'}
        </Typography>
        <Typography paragraph>
          Rendered Content:
        </Typography>
        {queryParams.page === 'settings' && <Typography>Settings Page Content</Typography>}
        {queryParams.page === 'home' && <Typography>Home Page Content</Typography>}
        {queryParams.page === 'register' && <Typography>Register Page Content</Typography>}
        {queryParams.page === 'whatif' && <Typography>What If Page Content</Typography>}
      </Box>
    </Box>
  );
};

export default Dashboard;
