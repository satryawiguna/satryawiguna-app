'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useCategories } from '@/presentation/hooks/useCategories';

interface ProjectsHeroProps {
  selectedCategoryId?: number | null;
  onCategoryChange?: (categoryId: number | null) => void;
}

export function ProjectsHero({ selectedCategoryId, onCategoryChange }: ProjectsHeroProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { data: categories = [] } = useCategories({ type: 'PROJECT' });

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (categoryId: number | null) => {
    onCategoryChange?.(categoryId);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 0 },
        width: '100%',
      }}
    >
      {/* Left: Badge + Title + Description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.8px' }}>
        {/* Status Badge */}
        <Box sx={{ mb: 1 }}>
          <Chip
            icon={
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4edea3',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: '#4edea3',
                    opacity: 0.75,
                    filter: 'blur(4px)',
                  },
                }}
              />
            }
            label="System ready to build"
            sx={{
              backgroundColor: 'rgba(0, 165, 114, 0.1)',
              border: '1px solid rgba(0, 165, 114, 0.2)',
              color: '#4edea3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.2px',
              px: 1.5,
              py: 0.5,
            }}
          />
        </Box>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '40px', md: '64px' },
            lineHeight: { xs: '1.1', md: '70.4px' },
            letterSpacing: '-1.28px',
            color: '#dbfcff',
            mt: '5.2px',
          }}
        >
          Engineering Case Studies
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '30.6px',
            color: '#b9cacb',
            maxWidth: '672px',
            mt: '4px',
          }}
        >
          A selection of production-ready systems showcasing scalable architecture, modern
          engineering practices, and thoughtful product design.
        </Typography>
      </Box>

      {/* Right: Filter button + Popover */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          ref={buttonRef}
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            px: '17px',
            py: '9px',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <TuneIcon sx={{ color: '#dae2fd', fontSize: '14px' }} />
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#dae2fd',
            }}
          >
            {selectedCategoryId
              ? (categories.find((c) => c.id === selectedCategoryId)?.name ?? 'Filter by Category')
              : 'Filter by Category'}
          </Typography>
        </Box>

        {/* Dropdown Popover */}
        {open && (
          <Box
            ref={popoverRef}
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: '220px',
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(12px)',
              zIndex: 1000,
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                px: '16px',
                py: '10px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#8899aa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Categories
              </Typography>
            </Box>

            {/* "All" option */}
            <Box
              onClick={() => handleSelect(null)}
              sx={{
                px: '16px',
                py: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: !selectedCategoryId ? 'rgba(0, 219, 233, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                },
              }}
            >
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#00dbe9',
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: !selectedCategoryId ? '#00dbe9' : '#dae2fd',
                }}
              >
                All Projects
              </Typography>
            </Box>

            {/* Category list */}
            {categories.map((category) => (
              <Box
                key={category.id}
                onClick={() => handleSelect(category.id)}
                sx={{
                  px: '16px',
                  py: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor:
                    selectedCategoryId === category.id ? 'rgba(0, 219, 233, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#4edea3',
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: selectedCategoryId === category.id ? '#00dbe9' : '#dae2fd',
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            ))}

            {categories.length === 0 && (
              <Box sx={{ px: '16px', py: '20px', textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#667788',
                  }}
                >
                  No categories found
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
