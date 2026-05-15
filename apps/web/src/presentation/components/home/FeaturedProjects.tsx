import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedProjects() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
            gap: 3,
          }}
        >
          {/* Featured Project - Left Side (7 columns) */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '1 / span 7' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                height: { xs: '320px', md: '500px' },
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Background Image Area */}
              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                  background:
                    'linear-gradient(135deg, rgba(0, 219, 233, 0.1) 0%, rgba(116, 47, 229, 0.1) 100%)',
                }}
              >
                {/* Placeholder for project image */}
              </Box>

              {/* Content Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0, 219, 233, 0.2)',
                      px: 1,
                      py: 0.5,
                      borderRadius: '2px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '10px',
                        letterSpacing: '1px',
                        color: '#00dbe9',
                        textTransform: 'uppercase',
                      }}
                    >
                      FINTECH
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0, 219, 233, 0.2)',
                      px: 1,
                      py: 0.5,
                      borderRadius: '2px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '10px',
                        letterSpacing: '1px',
                        color: '#00dbe9',
                        textTransform: 'uppercase',
                      }}
                    >
                      NEXT.JS
                    </Typography>
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '30px',
                    lineHeight: '36px',
                    color: '#dbfcff',
                  }}
                >
                  Quantum Ledger v2
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#b9cacb',
                    maxWidth: '512px',
                  }}
                >
                  Advanced real-time analytics dashboard for high-frequency trading
                  <br />
                  assets with multi-chain support.
                </Typography>

                {/* Link */}
                <Link href="/projects/quantum-ledger" style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      '&:hover': {
                        '& p': {
                          textDecoration: 'underline',
                        },
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#00dbe9',
                      }}
                    >
                      Explore Case Study
                    </Typography>
                    <Image src="/assets/icons/arrow-right.svg" alt="Arrow" width={9} height={9} />
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Right Side Cards (5 columns) */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '8 / span 5' },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Performance Optimized Card */}
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: 4.125,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gradient decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '112px',
                  height: '96px',
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src="/assets/icons/gradient-performance.svg"
                  alt=""
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>

              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'rgba(0, 219, 233, 0.1)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                <Image src="/assets/icons/lightning.svg" alt="Lightning" width={20} height={25} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: '#dbfcff',
                  pt: 1.5,
                  mb: 1.5,
                }}
              >
                Performance Optimized
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: '#b9cacb',
                  mb: 1.5,
                }}
              >
                Engineering for sub-second response times. From
                <br />
                database indexing to frontend hydration, I eliminate
                <br />
                bottlenecks to ensure seamless user experiences.
              </Typography>

              {/* List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9375, pt: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="/assets/icons/checkmark-cyan.svg"
                    alt="Check"
                    width={10}
                    height={10}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'rgba(0, 219, 233, 0.8)',
                    }}
                  >
                    Core Web Vitals Focus
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="/assets/icons/checkmark-cyan.svg"
                    alt="Check"
                    width={10}
                    height={10}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'rgba(0, 219, 233, 0.8)',
                    }}
                  >
                    Distributed Caching
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Military-Grade Security Card */}
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: 4.125,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gradient decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '96px',
                  height: '112px',
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src="/assets/icons/gradient-security.svg"
                  alt=""
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>

              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'rgba(78, 222, 163, 0.1)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                <Image src="/assets/icons/shield.svg" alt="Shield" width={20} height={25} />
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: '#dbfcff',
                  pt: 1.5,
                  mb: 1.5,
                }}
              >
                Military-Grade Security
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: '#b9cacb',
                  mb: 1.5,
                }}
              >
                Zero-trust architecture implementation. I prioritize data
                <br />
                integrity through robust encryption, OAuth2/OIDC, and
                <br />
                rigorous vulnerability assessments.
              </Typography>

              {/* List */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.9375, pt: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="/assets/icons/checkmark-green.svg"
                    alt="Check"
                    width={10}
                    height={10}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'rgba(78, 222, 163, 0.8)',
                    }}
                  >
                    Penetration Tested
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Image
                    src="/assets/icons/checkmark-green.svg"
                    alt="Check"
                    width={10}
                    height={10}
                  />
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'rgba(78, 222, 163, 0.8)',
                    }}
                  >
                    GDPR & HIPAA Compliance
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
