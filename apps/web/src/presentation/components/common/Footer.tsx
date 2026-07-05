'use client';

import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';

// const footerLinks = [
//   { label: 'Projects', href: '/projects' },
//   { label: 'Contact', href: '/contact' },
//   { label: 'GitHub', href: 'https://github.com/satryawiguna', external: true },
//   { label: 'Bitbucket', href: 'https://bitbucket.org/satryawiguna', external: true },
//   { label: 'Linkedin', href: 'https://www.linkedin.com/in/satryawiguna', external: true },
// ];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(2, 6, 23, 0.8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
            gap: 2,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '-0.9px',
                color: '#22d3ee',
              }}
            >
              #SATRYA_WIGUNA
            </Typography>
          </Link>

          {/* Footer Links */}
          {/* <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {footerLinks.map((link) => (
              <MuiLink
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#22d3ee',
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Box> */}

          {/* Copyright */}
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#64748b',
            }}
          >
            © {currentYear} ALL RIGHTS RESERVED
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
