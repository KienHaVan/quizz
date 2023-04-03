import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Images } from '../../assets';
import { useAppDispatch } from '../../store';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import { logOut } from '../../store/slices/authSlice';

const Header = () => {
  const drawerWidth = 240;
  const navItems = ['User'];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = async () => {
    try {
      dispatch(logOut());
      navigate('/', { replace: true });
    } catch (error) {
      const err = error as ErrorResponseType;
      console.error(err.data.message);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <img src={Images.LOGO} alt="" style={{ width: 100 }} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <AppBar component="nav">
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
          <Box
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={Images.LOGO} alt="" style={{ width: 100 }} />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: '#fff' }}
                onClick={() => setIsListOpen(!isListOpen)}
              >
                {item}
              </Button>
            ))}
            {isListOpen && (
              <List
                sx={{
                  width: 200,
                  bgcolor: 'background.paper',
                  position: 'absolute',
                  right: 30,
                  boxShadow: 24,
                  borderRadius: 2,
                }}
                component="nav"
                aria-label="mailbox folders"
              >
                <ListItemButton>
                  <ListItemText primary="Settings" />
                </ListItemButton>
                <Divider />
                <ListItemButton onClick={handleLogOut}>
                  <ListItemText primary="LogOut" />
                </ListItemButton>
              </List>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
