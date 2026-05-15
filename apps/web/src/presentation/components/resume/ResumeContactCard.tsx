import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ContactItem {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  href?: string;
}

const contacts: ContactItem[] = [
  {
    icon: '/assets/icons/resume/icon-email.svg',
    iconWidth: 13.3,
    iconHeight: 10.7,
    label: 'satya@freshcms.net',
    href: 'mailto:satya@freshcms.net',
  },
  {
    icon: '/assets/icons/resume/icon-phone.svg',
    iconWidth: 12,
    iconHeight: 12,
    label: '+628113808231',
    href: 'tel:+628113808231',
  },
  {
    icon: '/assets/icons/resume/icon-map-pin.svg',
    iconWidth: 10.7,
    iconHeight: 13.3,
    label: 'Bali, Indonesia',
  },
  {
    icon: '/assets/icons/resume/icon-linkedin.svg',
    iconWidth: 13.3,
    iconHeight: 6.7,
    label: 'linkedin.com/in/satryawiguna',
    href: 'https://linkedin.com/in/satryawiguna',
  },
];

export function ResumeContactCard() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        p: '49px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '16px', height: '20px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-contact.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '-0.18px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          CONTACT
        </Typography>
      </Box>

      {/* Contact list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {contacts.map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Box
              sx={{
                position: 'relative',
                width: `${item.iconWidth}px`,
                height: `${item.iconHeight}px`,
                flexShrink: 0,
              }}
            >
              <Image src={item.icon} alt="" fill style={{ objectFit: 'contain' }} />
            </Box>
            <Typography
              component={item.href ? 'a' : 'span'}
              {...(item.href
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              sx={{
                fontFamily: 'Nimbus Mono PS, monospace',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#b9cacb',
                textDecoration: 'none',
                '&:hover': item.href ? { color: '#00dbe9' } : undefined,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
