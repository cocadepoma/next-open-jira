import { useContext, useEffect, useState } from "react";
import { DashboardOutlined, DashboardCustomizeOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material"
import { UIContext } from "../../../context/ui";
import { useRouter } from "next/router";

export const Sidebar = () => {
  const router = useRouter();

  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  const [activeUrl, setActiveUrl] = useState('base');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.href.includes('boards')) {
      setActiveUrl('boards');
    } else {
      setActiveUrl('base');
    }
  }, []);

  return (
    <Drawer
      anchor="left"
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          <ListItem style={{ backgroundColor: activeUrl === 'base' ? 'rgba(255,255,255,0.3)' : undefined }} button onClick={() => {
            closeSideMenu();
            router.push('/');
          }}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary={'Board'} />
          </ListItem>

          <ListItem style={{ backgroundColor: activeUrl === 'boards' ? 'rgba(255,255,255,0.3)' : undefined }} button onClick={() => {
            closeSideMenu();
            router.push('/boards');
          }}>
            <ListItemIcon>
              <DashboardCustomizeOutlined />
            </ListItemIcon>
            <ListItemText primary={'Edit Board'} />
          </ListItem>

        </List>

        <Divider />

      </Box>
    </Drawer>
  )
}
