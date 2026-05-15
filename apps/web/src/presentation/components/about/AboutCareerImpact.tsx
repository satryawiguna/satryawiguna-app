import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ImpactCard {
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  iconBg: string;
  title: string;
  description: string;
  quote: string;
  quoteColor: string;
}

const impactCards: ImpactCard[] = [
  {
    iconSrc: '/assets/about/icon-regional.svg',
    iconWidth: 24,
    iconHeight: 23,
    iconBg: 'rgba(0,219,233,0.1)',
    title: 'Regional Full-Stack Role',
    description:
      'Led development for cross-border Event Management Systems serving HK, MY, SG, PH, and ID. Orchestrated frontend excellence with ReactJS and .NET Core backends.',
    quote: '"Scaling platforms for 500k+ daily active users"',
    quoteColor: '#00dbe9',
  },
  {
    iconSrc: '/assets/about/icon-medic.svg',
    iconWidth: 20,
    iconHeight: 20,
    iconBg: 'rgba(78,222,163,0.1)',
    title: 'Clean Medic Project',
    description:
      'Engineered a comprehensive medical waste management platform for hospitals using Laravel and ReactJS, transforming traditional logistics into digital workflows.',
    quote: '"Reduced API response times by ~30%"',
    quoteColor: '#4edea3',
  },
  {
    iconSrc: '/assets/about/icon-nextgen.svg',
    iconWidth: 19,
    iconHeight: 20,
    iconBg: 'rgba(227,210,255,0.1)',
    title: 'Next-Gen Integration',
    description:
      'Currently spearheading product development at ExpInc, integrating AI capabilities into existing ecosystems to drive user engagement and operational efficiency.',
    quote: '"AI Ready: Ollama & Llama Models"',
    quoteColor: '#e3d2ff',
  },
];

export function AboutCareerImpact() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        py: '32px',
        width: '100%',
      }}
    >
      {/* Section heading */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: { xs: '36px', md: '48px' },
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            textAlign: 'center',
          }}
        >
          Career Impact &amp; Trajectory
        </Typography>
      </Box>

      {/* Cards grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: '24px',
        }}
      >
        {impactCards.map((card) => (
          <Box
            key={card.title}
            sx={{
              backgroundColor: '#131b2e',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '4px',
                backgroundColor: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: `${card.iconWidth}px`,
                  height: `${card.iconHeight}px`,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Image
                  src={card.iconSrc}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Box>

            {/* Title */}
            <Box sx={{ pt: '8px' }}>
              <Typography
                component="h4"
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '28px',
                  color: '#dae2fd',
                }}
              >
                {card.title}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#b9cacb',
                fontStyle: 'normal',
              }}
            >
              {card.description}
            </Typography>

            {/* Quote */}
            <Box sx={{ pt: '16px' }}>
              <Typography
                sx={{
                  fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: card.quoteColor,
                  fontStyle: 'normal',
                }}
              >
                {card.quote}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
