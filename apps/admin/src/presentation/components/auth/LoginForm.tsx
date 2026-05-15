'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { useAppSelector } from 'shared-store';
import { selectAuth } from 'shared-store';

const emailSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, 'Code must be exactly 6 digits')
    .matches(/^\d+$/, 'Code must be numeric')
    .required('Verification code is required'),
});

export function LoginForm() {
  const { step, email, initiateChallenge, verifyOtp, goBackToEmail, isInitiating, isVerifying } =
    useLogin();
  const { error } = useAppSelector(selectAuth);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailForm = useFormik({
    initialValues: { email: '' },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      initiateChallenge(values.email);
    },
  });

  const otpForm = useFormik({
    initialValues: { otp: '' },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      verifyOtp(values.otp);
    },
  });

  // Focus first OTP box when step changes
  useEffect(() => {
    if (step === 'otp') {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const digits = otpForm.values.otp.split('');

    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
      digits[index] = '';
      otpForm.setFieldValue('otp', digits.join(''));
      return;
    }

    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      digits[index] = e.key;
      otpForm.setFieldValue('otp', digits.join(''));
      if (index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const otpDigits = Array.from({ length: 6 }, (_, i) => otpForm.values.otp[i] ?? '');

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(90deg, rgb(2, 6, 23) 0%, rgb(2, 6, 23) 100%)' }}
    >
      {/* Background decorative image */}
      <div className="absolute bottom-0 right-0 top-0 w-[600px] opacity-10 mix-blend-screen overflow-hidden pointer-events-none">
        <Image src="/assets/login/bg-server.png" alt="" fill className="object-cover" priority />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-start w-[480px] gap-2">
        {/* Brand header */}
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="flex items-center gap-2 px-[17px] py-[5px] rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]">
            <div className="w-2 h-2 rounded-full bg-[#4edea3]" />
            <span className="font-['Space_Grotesk',sans-serif] text-[10px] text-[#4edea3] tracking-[1px] uppercase">
              SYSTEM SECURE
            </span>
          </div>
          <div className="pt-4 w-full flex flex-col items-center">
            <h1 className="font-['Space_Grotesk',sans-serif] font-bold text-[40px] text-[#dbfcff] tracking-[-2px] text-center">
              PORTFOLIO ADMIN
            </h1>
          </div>
          <p className="font-['Inter',sans-serif] text-[16px] text-[#64748b] text-center">
            Encrypted gateway to development core.
          </p>
        </div>

        {/* Auth card */}
        <div className="w-full backdrop-blur-[4px] bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* Slide container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: step === 'otp' ? 'translateX(-100%)' : 'translateX(0%)' }}
          >
            {/* Step 1: Email */}
            <div className="min-w-full p-[49px]">
              <form onSubmit={emailForm.handleSubmit} className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <div className="pl-2">
                    <label className="font-['Space_Grotesk',sans-serif] text-[14px] text-[#dbfcff] tracking-[0.7px] uppercase">
                      ADMINISTRATOR IDENTITY
                    </label>
                  </div>

                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 flex items-center pointer-events-none">
                      <Image
                        src="/assets/login/icon-email.svg"
                        alt="email"
                        width={20}
                        height={20}
                      />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@system.io"
                      value={emailForm.values.email}
                      onChange={emailForm.handleChange}
                      onBlur={emailForm.handleBlur}
                      className="w-full bg-[#060e20] border border-[rgba(255,255,255,0.1)] rounded-[2px] pl-[57px] pr-6 py-7 font-mono text-[14px] text-[#c8d6e5] placeholder:text-[#334155] focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-colors"
                    />
                  </div>
                  {emailForm.touched.email && emailForm.errors.email && (
                    <p className="mt-1 text-[11px] text-red-400 font-mono">
                      {emailForm.errors.email}
                    </p>
                  )}
                </div>

                {error && <p className="text-red-400 text-[12px] font-mono -mt-8">{error}</p>}

                <button
                  type="submit"
                  disabled={isInitiating}
                  className="relative w-full flex items-center justify-center gap-2 py-3 rounded-[2px] bg-[#00f0ff] text-[#006970] font-['Space_Grotesk',sans-serif] text-[14px] tracking-[1.4px] uppercase hover:bg-[#22d3ee] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                >
                  {isInitiating ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#006970] border-t-transparent rounded-full animate-spin" />
                      INITIATING...
                    </span>
                  ) : (
                    <>
                      INITIATE CHALLENGE
                      <Image src="/assets/login/icon-arrow.svg" alt="" width={16} height={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Step 2: OTP */}
            <div className="min-w-full p-[49px]">
              <form onSubmit={otpForm.handleSubmit} className="flex flex-col gap-6">
                <div className="flex justify-center">
                  <div className="flex items-center gap-2 px-[13px] py-[5px] rounded-xl border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.1)]">
                    <div className="relative w-2 h-2">
                      <div className="absolute inset-0 bg-[#4edea3] rounded-full opacity-75" />
                      <div className="w-2 h-2 rounded-full bg-[#4edea3]" />
                    </div>
                    <span className="font-['Space_Grotesk',sans-serif] text-[10px] text-[#4edea3] tracking-[-0.5px] uppercase">
                      SESSION_ACTIVE
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="font-['Space_Grotesk',sans-serif] font-bold text-[40px] text-[#dbfcff] tracking-[-2px] uppercase">
                    VERIFY IDENTITY
                  </h2>
                  <p className="mt-4 text-[14px] text-[#b9cacb] opacity-80 font-['Inter',sans-serif]">
                    A 6-digit secure PIN has been sent to{' '}
                    <span className="text-[#22d3ee]">{email || 'admin@system.io'}</span>. Enter it
                    below to authorize this session.
                  </p>
                </div>

                {/* OTP inputs */}
                <div className="pt-6 flex items-center justify-between gap-2">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={() => {}}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-[56px] h-16 text-center text-[20px] font-bold text-[#020617] bg-white border border-[#6b7280] rounded-[4px] focus:outline-none focus:border-[#00f0ff] focus:ring-2 focus:ring-[#00f0ff] transition-colors caret-transparent"
                    />
                  ))}
                </div>
                {otpForm.touched.otp && otpForm.errors.otp && (
                  <p className="text-red-400 text-[11px] font-mono text-center">
                    {otpForm.errors.otp}
                  </p>
                )}

                {error && <p className="text-red-400 text-[12px] font-mono text-center">{error}</p>}

                <div className="flex flex-col gap-6 pt-6">
                  <button
                    type="submit"
                    disabled={isVerifying || otpForm.values.otp.length !== 6}
                    className="relative w-full flex items-center justify-center gap-4 py-4 rounded-[2px] bg-[#00f0ff] text-[#006970] font-['Space_Grotesk',sans-serif] text-[14px] tracking-[0.7px] uppercase hover:bg-[#22d3ee] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
                  >
                    {isVerifying ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#006970] border-t-transparent rounded-full animate-spin" />
                        VERIFYING...
                      </span>
                    ) : (
                      <>
                        VERIFY &amp; ACCESS
                        <Image src="/assets/login/icon-chevron.svg" alt="" width={7} height={12} />
                      </>
                    )}
                  </button>

                  <div className="flex flex-col gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => initiateChallenge(email)}
                      disabled={isInitiating}
                      className="flex items-center gap-2 text-[#64748b] font-['Space_Grotesk',sans-serif] text-[10px] tracking-[1px] uppercase hover:text-[#94a3b8] transition-colors disabled:opacity-50"
                    >
                      <Image src="/assets/login/icon-refresh.svg" alt="" width={10} height={10} />
                      RESEND PIN
                    </button>
                    <button
                      type="button"
                      onClick={goBackToEmail}
                      className="font-['Space_Grotesk',sans-serif] text-[10px] text-[#475569] tracking-[1px] uppercase underline hover:text-[#64748b] transition-colors"
                    >
                      BACK TO LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 w-full">
          <button className="flex items-center gap-2 text-[#64748b] font-['Space_Grotesk',sans-serif] text-[10px] tracking-[-0.5px] uppercase hover:text-[#94a3b8] transition-colors">
            <Image src="/assets/login/icon-recovery.svg" alt="" width={12} height={12} />
            SYSTEM RECOVERY
          </button>
          <div className="flex items-center gap-2">
            <span className="font-['Space_Grotesk',sans-serif] text-[10px] text-[#475569] tracking-[1px] uppercase">
              ENCRYPTED
            </span>
            <Image src="/assets/login/icon-lock.svg" alt="" width={10} height={13} />
          </div>
        </div>

        {/* Step indicator (OTP screen) */}
        {step === 'otp' && (
          <div className="flex items-center justify-between w-full px-4 -mt-6">
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#22d3ee]" />
              <div className="w-1 h-1 rounded-full bg-[rgba(34,211,238,0.4)]" />
              <div className="w-1 h-1 rounded-full bg-[rgba(34,211,238,0.2)]" />
            </div>
            <span className="font-mono text-[10px] text-[#64748b] tracking-[1px] uppercase opacity-50">
              TERMINAL_AUTH_V2.4.0
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
