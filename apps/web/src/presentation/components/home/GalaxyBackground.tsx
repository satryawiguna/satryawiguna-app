'use client';

import { useEffect, useRef } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import gsap from 'gsap';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
}

const COLORS = ['#00dbe9', '#4edea3', '#742fe5', '#dbfcff', '#0ea5e9'];

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const starCount = isMobile ? 80 : 200;
    let rotation = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize stars
    starsRef.current = Array.from({ length: starCount }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random() * 2 - 1,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color,
        pulse: Math.random() * Math.PI * 2,
      };
    });

    // GSAP animation for rotation
    const tl = gsap.to(
      {},
      {
        duration: 0.016,
        repeat: -1,
        onRepeat: () => {
          rotation += 0.001;
        },
      },
    );

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDist = Math.max(canvas.width, canvas.height) * 0.45;

      // Mouse influence
      const mouseInfluenceX = mouseRef.current.x * 0.15;
      const mouseInfluenceY = mouseRef.current.y * 0.15;

      starsRef.current.forEach((star) => {
        // Spiral galaxy transformation
        const radius = Math.sqrt(star.x * star.x + star.y * star.y);
        const angle = Math.atan2(star.y, star.x) + rotation + radius * 0.5;

        // Add some z-axis wobble
        const zWobble = Math.sin(rotation * 2 + star.z * Math.PI) * 0.1;

        const nx = Math.cos(angle) * radius + star.z * 0.15 + mouseInfluenceX * radius * 0.3;
        const ny = Math.sin(angle) * radius + zWobble + mouseInfluenceY * radius * 0.3;

        const screenX = centerX + nx * maxDist;
        const screenY = centerY + ny * maxDist;

        // Depth-based sizing and opacity
        const depthFactor = (star.z + 1) / 2;
        const size = star.size * (0.5 + depthFactor * 0.8);
        const baseOpacity = star.opacity * (0.3 + depthFactor * 0.7);

        // Pulsing effect
        star.pulse += 0.02;
        const pulseFactor = 0.7 + Math.sin(star.pulse) * 0.3;
        const opacity = baseOpacity * pulseFactor;

        // Draw star
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Glow effect for brighter stars
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity * 0.15;
          ctx.fill();
        }
      });

      // Subtle vignette overlay
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxDist);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.6, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(11, 19, 38, 0.4)');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      tl.kill();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isMobile]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}
