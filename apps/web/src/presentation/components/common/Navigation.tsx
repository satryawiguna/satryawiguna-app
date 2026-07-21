'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useContactDrawer } from '@/presentation/components/home/ContactDrawerContext';
import EmailIcon from '@mui/icons-material/Email';

const navLinks = [
  { label: 'PROJECTS', href: '/projects' },
  { label: 'RESUME', href: '/resume' },
  { label: 'ABOUT', href: '/about' },
  { label: 'BLOG', href: '/blog' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openDrawer } = useContactDrawer();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(2, 6, 23, 0.8)',
          backdropFilter: 'blur(6px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography
                component="span"
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '18px', md: '24px' },
                  letterSpacing: '-1.2px',
                  color: '#22d3ee',
                  cursor: 'pointer',
                }}
              >
                #SATRYA_WIGUNA
              </Typography>
            </Link>

            {/* Desktop Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      borderBottom: pathname === link.href ? '2px solid #22d3ee' : 'none',
                      pb: 0.75,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '1.4px',
                        color: pathname === link.href ? '#22d3ee' : '#94a3b8',
                        '&:hover': { color: '#22d3ee' },
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>

            {/* Desktop CTA Button */}
            <Button
              onClick={openDrawer}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                backgroundColor: '#00f0ff',
                color: '#002022',
                gap: '8px',
                px: 3,
                py: 1,
                borderRadius: '4px',
                textTransform: 'none',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                '&:hover': { backgroundColor: '#00dbe9' },
              }}
            >
              <EmailIcon sx={{ color: '#00363a', fontSize: '16px' }} />
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#00363a',
                  whiteSpace: 'nowrap',
                }}
              >
                Get In Touch
              </Typography>
            </Button>

            {/* Mobile Hamburger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#22d3ee',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: 'rgba(2, 6, 23, 0.97)',
            backdropFilter: 'blur(12px)',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#22d3ee' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderBottom: pathname === link.href ? '2px solid #22d3ee' : 'none',
                  mb: 1,
                  borderRadius: '4px',
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      letterSpacing: '1.4px',
                      color: pathname === link.href ? '#22d3ee' : '#94a3b8',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              fullWidth
              onClick={() => {
                setMobileOpen(false);
                openDrawer();
              }}
              sx={{
                backgroundColor: '#00f0ff',
                color: '#002022',
                py: 1.5,
                gap: '8px',
                borderRadius: '4px',
                textTransform: 'none',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '16px',
                '&:hover': { backgroundColor: '#00dbe9' },
              }}
            >
              <EmailIcon sx={{ color: '#00363a', fontSize: '16px' }} />
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#00363a',
                  whiteSpace: 'nowrap',
                }}
              >
                Get In Touch
              </Typography>
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
