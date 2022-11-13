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
import Image from "next/image";

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
        <Box sx={{ padding: '5px 10px', textAlign: 'center', margin: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
          <Typography variant="body1">Open Jira</Typography>
          <Image
            src="https://res.cloudinary.com/diwcrqh9i/image/upload/v1668332527/logos/logo_yox9pw.png"
            alt="logo"
            width={20}
            height={20}
          />
        </Box>

        <Divider />

        <List>
          <ListItem style={{ backgroundColor: activeUrl === 'base' ? 'rgba(16, 105, 227, 0.2)' : undefined }} button onClick={() => {
            closeSideMenu();
            router.push('/');
          }}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>


          <ListItem style={{ backgroundColor: activeUrl === 'boards' ? 'rgba(16, 105, 227, 0.2)' : undefined }} button onClick={() => {
            closeSideMenu();
            router.push('/boards');
          }}>
            <ListItemIcon>
              <DashboardCustomizeOutlined />
            </ListItemIcon>
            <ListItemText primary={'Edit Boards'} />
          </ListItem>

        </List>

        <Divider />

      </Box>
    </Drawer>
  )
}
