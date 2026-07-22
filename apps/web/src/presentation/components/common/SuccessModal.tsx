'use client';

import { Dialog, DialogContent, Typography, Box, IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const monoFont = 'Nimbus Mono PS, monospace';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  receiptId?: string;
}

export function SuccessModal({ open, onClose, receiptId }: SuccessModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(11, 19, 38, 0.95)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 30px 0 rgba(0, 240, 255, 0.15)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'visible',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          color: 'rgba(219,252,255,0.6)',
          width: 30,
          height: 30,
          '&:hover': {
            color: '#00f0ff',
            backgroundColor: 'rgba(0,240,255,0.08)',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: '18px' }} />
      </IconButton>

      <DialogContent sx={{ p: '48px 32px 40px', textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: '2px solid #4edea3',
            mb: '24px',
          }}
        >
          <CheckCircleOutlineIcon sx={{ color: '#4edea3', fontSize: '32px' }} />
        </Box>

        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '1.2px',
            color: '#4edea3',
            textTransform: 'uppercase',
            mb: '8px',
          }}
        >
          TRANSMISSION SUCCESSFUL
        </Typography>

        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: '14px',
            lineHeight: '21px',
            color: 'rgba(185,202,203,0.7)',
            mb: '8px',
          }}
        >
          Your message has been securely transmitted.
        </Typography>

        {receiptId && (
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: '13px',
              lineHeight: '18px',
              color: 'rgba(219,252,255,0.5)',
            }}
          >
            Receipt: {receiptId}
          </Typography>
        )}

        <Box
          component="button"
          onClick={onClose}
          sx={{
            mt: '32px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(0,240,255,0.4)',
            color: '#00f0ff',
            fontFamily: monoFont,
            fontSize: '13px',
            letterSpacing: '1.2px',
            px: '24px',
            py: '10px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0,240,255,0.08)',
              borderColor: '#00f0ff',
            },
            transition: 'all 0.2s ease',
          }}
        >
          CLOSE
        </Box>
      </DialogContent>
    </Dialog>
  );
}
