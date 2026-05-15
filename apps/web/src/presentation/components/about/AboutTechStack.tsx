import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface TechItem {
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
}

const techItems: TechItem[] = [
  {
    iconSrc: '/assets/about/icon-postgres.svg',
    iconWidth: 18,
    iconHeight: 18,
    label: 'PostgreSQL / MySQL',
  },
  {
    iconSrc: '/assets/about/icon-typescript.svg',
    iconWidth: 20,
    iconHeight: 12,
    label: 'Typescript / Javascript / PHP / Python',
  },
  {
    iconSrc: '/assets/about/icon-aws.svg',
    iconWidth: 22,
    iconHeight: 16,
    label: 'AWS / Serverless',
  },
  {
    iconSrc: '/assets/about/icon-react.svg',
    iconWidth: 18,
    iconHeight: 18,
    label: 'React / Next.js',
  },
  {
    iconSrc: '/assets/about/icon-nodejs.svg',
    iconWidth: 18,
    iconHeight: 19,
    label: 'NodeJs / NestJs / Laravel / FastApi',
  },
];

export function AboutTechStack() {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        pt: '49px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '16px', md: '32px' },
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        {techItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Box
              sx={{
                width: `${item.iconWidth}px`,
                height: `${item.iconHeight}px`,
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Image
                src={item.iconSrc}
                alt={item.label}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#dae2fd',
                whiteSpace: 'nowrap',
                fontStyle: 'normal',
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
