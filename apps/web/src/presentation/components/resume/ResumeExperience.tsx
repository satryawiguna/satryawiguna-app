import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type?: string;
  description: string;
  tags: string[];
  isCurrent?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: 'Full Stack Developer',
    company: 'Explnc',
    period: '05/2025 — PRESENT',
    type: 'FULL-TIME',
    description:
      'Built and scaled B2B and B2C platforms, improved user engagement and responsiveness, and implemented full-stack solutions with optimized data handling.',
    tags: ['Next.js', 'Nest.js', 'PostgreSQL', 'AWS'],
    isCurrent: true,
  },
  {
    title: 'Full Stack Developer',
    company: 'Triumph Eminent Hub',
    period: '06/2023 — 05/2025',
    type: 'CONTRACT',
    description:
      'Developed internal software including CRM, Finance, and Attendance systems. Architected scalable backend services using .NET Core and PostgreSQL, and integrated AI-driven features.',
    tags: ['.NET Core', 'React', 'PostgreSQL', 'AI Integration'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Clean Medic',
    period: '11/2022 — 05/2023',
    type: 'FULL-TIME',
    description:
      'Engineered a medical waste management platform using Laravel and React.js, focusing on database query optimization and efficient workflows.',
    tags: ['Laravel', 'React.js', 'MySQL'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Lyte',
    period: '09/2020 — 11/2022',
    type: 'CONTRACT',
    description:
      'Worked on a Fintech platform, building robust and scalable APIs using a diverse stack of Laravel, Node.js, and .NET Core.',
    tags: ['Node.js', 'Laravel', '.NET Core'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Freelance',
    period: '09/2012 — 12/2019',
    type: 'FREELANCE',
    description:
      'Worked independently on a project-by-project basis, managing the full software development lifecycle for various clients.',
    tags: ['Node.js', 'Laravel', '.NET Core'],
  },
];

export function ResumeExperience() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Section heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '20px', height: '19px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-briefcase.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: '48px',
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          EXPERIENCE
        </Typography>
      </Box>

      {/* Timeline */}
      <Box
        sx={{
          borderLeft: '1px solid rgba(0, 219, 233, 0.3)',
          pl: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          overflow: 'visible',
        }}
      >
        {experiences.map((exp, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            {/* Timeline dot — centered on the left border line */}
            <Box
              sx={{
                position: 'absolute',
                left: '-45px',
                top: '14px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: exp.isCurrent ? '#00dbe9' : 'rgba(132, 148, 149, 0.5)',
                boxShadow: exp.isCurrent
                  ? '0 0 0 4px rgba(0,219,233,0.2), 0 0 10px 0 rgba(0,219,233,0.4)'
                  : '0 0 0 4px rgba(132,148,149,0.1)',
              }}
            />

            {/* Card */}
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: '25px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Title row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize: { xs: '20px', md: '28px' },
                      lineHeight: '36.4px',
                      color: '#dbfcff',
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Nimbus Mono PS, monospace',
                      fontSize: '13px',
                      lineHeight: '19.5px',
                      color: '#4edea3',
                    }}
                  >
                    {exp.company} • {exp.period}
                  </Typography>
                </Box>
                {exp.type && (
                  <Box
                    sx={{
                      backgroundColor: '#2d3449',
                      borderRadius: '2px',
                      px: '16px',
                      py: '8px',
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#b9cacb',
                      }}
                    >
                      {exp.type}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#b9cacb',
                }}
              >
                {exp.description}
              </Typography>

              {/* Tags */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', pt: '8px' }}>
                {exp.tags.map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      backgroundColor: 'rgba(219, 252, 255, 0.1)',
                      borderRadius: '2px',
                      px: '16px',
                      py: '8px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Nimbus Mono PS, monospace',
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#00dbe9',
                      }}
                    >
                      {tag}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
