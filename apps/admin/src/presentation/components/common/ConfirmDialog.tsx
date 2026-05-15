'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          bgcolor: '#0f172a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          minWidth: '400px',
          '@media (max-width: 500px)': {
            minWidth: 'auto',
            margin: '16px',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: '#dbfcff',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '18px',
          pb: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: '#94a3b8',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          sx={{
            color: '#94a3b8',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            textTransform: 'none',
            '&:hover': { color: '#dbfcff', bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: '#00f0ff',
            color: '#006970',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            textTransform: 'none',
            fontWeight: 700,
            '&:hover': { bgcolor: '#22d3ee' },
            boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
