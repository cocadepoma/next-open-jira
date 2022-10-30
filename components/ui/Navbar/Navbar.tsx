import { MenuOutlined as MenuOutlinedIcon } from '@mui/icons-material'
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { useContext } from 'react';
import { UIContext } from '../../../context/ui';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'rgb(34 42 60)', boxShadow: '0px 3px 7px -3px #ffffff59' }}>
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}
