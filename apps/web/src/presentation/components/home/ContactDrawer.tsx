'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Drawer, IconButton, InputBase, Typography } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloseIcon from '@mui/icons-material/Close';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useContactDrawer } from './ContactDrawerContext';
import { SuccessModal } from '@/presentation/components/common';
import { useContactForm } from '@/presentation/hooks';

type Step = 'name' | 'email' | 'message' | 'confirm' | 'submitting';

const STEP_ORDER: Step[] = ['name', 'email', 'message', 'confirm', 'submitting'];
const monoFont = 'Nimbus Mono PS, monospace';

function generateReceiptId() {
  return `#TX-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
}

export function ContactDrawer() {
  const { open, closeDrawer } = useContactDrawer();
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [receiptId, setReceiptId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { send: sendContact } = useContactForm();

  const stepIndex = STEP_ORDER.indexOf(step);

  // Auto-scroll to bottom as new content appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, showSuccess, showClosing, showSuccessModal]);

  function reset() {
    setStep('name');
    setName('');
    setEmail('');
    setMessage('');
    setConfirmInput('');
    setReceiptId('');
    setShowSuccess(false);
    setShowClosing(false);
    setShowSuccessModal(false);
  }

  function handleClose() {
    closeDrawer();
    setTimeout(reset, 300);
  }

  function handleCloseSuccessModal() {
    setShowSuccessModal(false);
  }

  function handleNameKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && name.trim()) {
      e.preventDefault();
      setStep('email');
    }
  }

  const submitForm = useCallback(async () => {
    setStep('submitting');
    try {
      // Obtain reCAPTCHA Enterprise token at submission time
      let token: string | undefined;
      try {
        const grecaptcha = (window as any).grecaptcha;
        if (grecaptcha?.enterprise) {
          // Wait for the enterprise library to be fully ready
          await new Promise<void>((resolve) => grecaptcha.enterprise.ready(resolve));
          token = await grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: 'contact',
          });
        }
      } catch {
        // reCAPTCHA unavailable — proceed without token
      }

      await sendContact({
        identity: name,
        email_address: email,
        transmission: message,
        recaptcha_token: token ?? null,
      });
      const id = generateReceiptId();
      setReceiptId(id);
      setShowSuccess(true);
      setTimeout(() => {
        setShowClosing(true);
        setTimeout(() => {
          reset();
          closeDrawer();
          setShowSuccessModal(true);
        }, 800);
      }, 600);
    } catch {
      setStep('confirm');
    }
  }, [name, email, message, sendContact]);

  function handleEmailKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && email.trim()) {
      e.preventDefault();
      setStep('message');
    }
  }

  function handleMessageKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      setStep('confirm');
    }
  }

  const handleConfirmKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = confirmInput.trim().toLowerCase();
      if (val === 'y' || val === 'yes') submitForm();
      else if (val === 'n' || val === 'no') setStep('message');
    }
  };

  const labelSx = {
    fontFamily: monoFont,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#4edea3',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
  };

  const mutedSx = {
    fontFamily: monoFont,
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(185,202,203,0.5)',
  };

  const valueSx = {
    fontFamily: monoFont,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#dbfcff',
    wordBreak: 'break-word' as const,
  };

  const inputSx = {
    fontFamily: monoFont,
    fontSize: '14px',
    lineHeight: '21px',
    color: '#dbfcff',
    flex: 1,
    minWidth: 0,
    '& .MuiInputBase-input': {
      p: 0,
      fontFamily: monoFont,
      fontSize: '14px',
      color: '#dbfcff',
      caretColor: '#00f0ff',
      '&::placeholder': {
        color: 'rgba(219,252,255,0.25)',
        fontStyle: 'italic',
      },
    },
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: '480px' },
          backgroundColor: 'rgba(11, 19, 38, 0.92)',
          backdropFilter: 'blur(6px)',
          borderLeft: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 0 15px 0 rgba(0, 240, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' },
        },
      }}
    >
      {/* ─── Header ─────────────────────────────────────── */}
      <Box
        sx={{
          backgroundColor: 'rgba(45, 52, 73, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '16px',
          pt: '16px',
          pb: '17px',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TerminalIcon sx={{ color: 'rgba(219,252,255,0.8)', fontSize: '20px' }} />
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '1.2px',
              color: 'rgba(219,252,255,0.8)',
              textTransform: 'uppercase',
            }}
          >
            SECURE_CONTACT_PROTOCOL
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: 'rgba(219,252,255,0.6)',
            width: 30,
            height: 30,
            '&:hover': { color: '#00f0ff', backgroundColor: 'rgba(0,240,255,0.08)' },
          }}
        >
          <CloseIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>

      {/* ─── Terminal Body ──────────────────────────────── */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {/* System init messages */}
        {[
          '[SYSTEM] Initializing secure communication...',
          '[SYSTEM] Encrypted channel established.',
          '[SYSTEM] Ready to receive your message.',
        ].map((line) => (
          <Typography key={line} sx={mutedSx}>
            {line}
          </Typography>
        ))}

        <Box sx={{ mt: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* ── Name_Identity ── */}
          {stepIndex > 0 ? (
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Typography sx={labelSx}>Identity:</Typography>
              <Typography sx={valueSx}>{name}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Typography sx={labelSx}>Identity:</Typography>
              <InputBase
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleNameKeyDown}
                sx={inputSx}
              />
            </Box>
          )}

          {/* ── Return_Endpoint ── */}
          {stepIndex >= 1 &&
            (stepIndex > 1 ? (
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography sx={labelSx}>Reply_Address:</Typography>
                <Typography sx={valueSx}>{email}</Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Typography sx={labelSx}>Reply_Address:</Typography>
                <InputBase
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleEmailKeyDown}
                  type="email"
                  sx={inputSx}
                />
              </Box>
            ))}

          {/* ── Payload_Content ── */}
          {stepIndex >= 2 &&
            (stepIndex > 2 ? (
              <Box>
                <Typography sx={labelSx}>Transmission:</Typography>
                <Box sx={{ borderLeft: '1px solid rgba(219,252,255,0.2)', pl: '16px', mt: '4px' }}>
                  <Typography sx={{ ...valueSx, whiteSpace: 'pre-wrap' }}>{message}</Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                <Typography sx={labelSx}>Transmission:</Typography>
                <Box sx={{ borderLeft: '1px solid rgba(219,252,255,0.2)', pl: '16px', mt: '4px' }}>
                  <InputBase
                    autoFocus
                    multiline
                    minRows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleMessageKeyDown}
                    placeholder="Describe your inquiry…  (Shift+Enter for new line, Enter to continue)"
                    fullWidth
                    sx={{
                      ...inputSx,
                      alignItems: 'flex-start',
                      '& .MuiInputBase-input': {
                        ...inputSx['& .MuiInputBase-input'],
                        resize: 'none',
                      },
                    }}
                  />
                </Box>
              </Box>
            ))}

          {/* ── Submit (Y/N) ── */}
          {stepIndex >= 3 &&
            (stepIndex > 3 ? (
              <Box sx={{ display: 'flex', gap: '8px' }}>
                <Typography sx={labelSx}>Submit (Y/N):</Typography>
                <Typography sx={valueSx}>{confirmInput}</Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Typography sx={labelSx}>Submit (Y/N):</Typography>
                <InputBase
                  autoFocus
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value.slice(0, 3))}
                  onKeyDown={handleConfirmKeyDown}
                  placeholder="Y / N"
                  sx={{ ...inputSx, flex: '0 0 60px' }}
                />
              </Box>
            ))}

          {/* ── Status Log ── */}
          {stepIndex >= 4 && (
            <Box
              sx={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                pt: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <AutorenewIcon
                  sx={{
                    color: '#4edea3',
                    fontSize: '14px',
                    '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } },
                    animation: showSuccess ? 'none' : 'spin 1s linear infinite',
                  }}
                />
                <Typography sx={{ ...labelSx, whiteSpace: 'normal' }}>
                  Processing request data packets...
                </Typography>
              </Box>

              {showSuccess && (
                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <CheckCircleOutlineIcon sx={{ color: '#dbfcff', fontSize: '14px' }} />
                  <Typography sx={valueSx}>
                    Transmission Successful. Receipt: {receiptId}
                  </Typography>
                </Box>
              )}

              {showClosing && (
                <Typography sx={{ ...mutedSx, fontStyle: 'italic' }}>
                  Closing socket... Bye.
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* ── Reset Button ── */}
        <Box
          component="button"
          onClick={reset}
          sx={{
            mt: '24px',
            alignSelf: 'flex-start',
            backgroundColor: 'transparent',
            border: '1px solid rgba(0,240,255,0.4)',
            color: '#00f0ff',
            fontFamily: monoFont,
            fontSize: '13px',
            letterSpacing: '1.2px',
            px: '16px',
            py: '8px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(0,240,255,0.08)', borderColor: '#00f0ff' },
            transition: 'all 0.2s ease',
          }}
        >
          RESET
        </Box>
      </Box>

      {/* ── Success Modal ── */}
      <SuccessModal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        receiptId={receiptId}
      />
    </Drawer>
  );
}
