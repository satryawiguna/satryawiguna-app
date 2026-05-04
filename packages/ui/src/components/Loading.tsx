import { CircularProgress, Box } from '@mui/material';

export interface LoadingProps {
  size?: number;
  fullScreen?: boolean;
}

export function Loading({ size = 40, fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <CircularProgress size={size} />
    </Box>
  );
}
