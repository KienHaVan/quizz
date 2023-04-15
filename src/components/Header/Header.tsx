import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Images } from '../../assets';
import { useAppDispatch } from '../../store';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import { useGetOwnProfileQuery } from '../../store/apis/UserManagementAPI/userManagementApi';
import { logOut } from '../../store/slices/authSlice';
import { StyledListItemButton } from './styles';

const Header = () => {
  const drawerWidth = '60%';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useGetOwnProfileQuery({});

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = async () => {
    try {
      Swal.fire({
        title: 'Do you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'LogOut',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logOut());
          navigate('/');
        }
      });
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
        <StyledListItemButton onClick={() => navigate('/profile')}>
          <ListItemText
            primary="Profile"
            sx={{
              alignSelf: 'center',
              textAlign: 'center',
              fontWeight: '600',
            }}
          />
        </StyledListItemButton>
        <StyledListItemButton onClick={handleLogOut}>
          <ListItemText
            primary="LogOut"
            sx={{
              alignSelf: 'center',
              textAlign: 'center',
              color: 'red',
              fontWeight: '600',
            }}
          />
        </StyledListItemButton>
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
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <img src={Images.LOGO} alt="" style={{ width: 100 }} />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Button
              sx={{ color: '#fff' }}
              onClick={() => setIsListOpen(!isListOpen)}
            >
              <Typography
                sx={{
                  textTransform: 'none',
                  marginRight: '8px',
                  fontSize: '20px',
                }}
              >
                {data?.name}
              </Typography>
              <Avatar alt={data?.name} src={data?.avatar_link} />
            </Button>
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
                <ListItemButton onClick={() => navigate('/profile')}>
                  <ListItemText primary="Profile" />
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
