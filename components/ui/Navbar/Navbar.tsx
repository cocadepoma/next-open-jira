import { useContext } from 'react';
import Image from "next/image";
import NextLink from 'next/link';

import { MenuOutlined as MenuOutlinedIcon } from '@mui/icons-material'
import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material'

import { UIContext } from '../../../context/ui';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);
  const router = useRouter();

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'rgb(255,255,255)', boxShadow: '0px 3px 7px -3px #ffffff59' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', boxShadow: '2px 2px 5px -1px rgba(0,0,0,0.5)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Image
            src="https://res.cloudinary.com/diwcrqh9i/image/upload/v1668332527/logos/logo_yox9pw.png"
            alt="logo"
            width={30}
            height={30}
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          />

          <NextLink href="/" passHref>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: 'rgba(0,0,0,0.7)' }}>OpenJira</Typography>
            </Link>
          </NextLink>
        </div>


        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};
