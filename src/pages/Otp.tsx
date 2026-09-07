import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOtp } from "../network/auth/queries";

const OTP_LENGTH = 6;

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminId = location.state?.adminId;
  console.log("Admin ID:", adminId);

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    index: number,
    value: string
  ) => {
    // Only allow numbers
    const number = value.replace(/\D/g, "");

    if (!number) return;

    const newOtp = [...otp];
    newOtp[index] = number.charAt(0);

    setOtp(newOtp);

    // Move to next input
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";

        setOtp(newOtp);
        return;
      }

      // Move backwards if current box is empty
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newOtp = [...otp];
        newOtp[index - 1] = "";

        setOtp(newOtp);
      }
    }

    // Allow moving between inputs with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const newOtp = Array(OTP_LENGTH).fill("");

    pastedValue
      .split("")
      .forEach((digit, index) => {
        newOtp[index] = digit;
      });

    setOtp(newOtp);

    // Focus the next empty box or the last box
    const nextIndex = Math.min(
      pastedValue.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();
  };

  const {mutate, isPending} = useOtp();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH || !adminId) {
      return;
    }

    mutate({
      adminId,
      otp: otpValue,
    })
    
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d120d]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================
            LEFT SIDE - BRANDING
        ========================================== */}

        <section className="relative hidden overflow-hidden bg-[#2d120d] lg:flex">

          {/* Decorative circles */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full border border-[#fff8ca]/10" />

          <div className="absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full bg-[#6b0b0c]/40 blur-3xl" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff8ca] text-xl font-black text-[#6b0b0c] shadow-lg">
                  F
                </div>

                <div>
                  <p className="text-lg font-bold tracking-tight text-white">
                    Fluxa
                  </p>

                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    Administration
                  </p>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Secure verification
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                One more step to access{" "}
                <span className="text-[#fff8ca]">
                  Fluxa.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/50 xl:text-lg">
                We've added an extra layer of security to
                protect the Fluxa administration platform and
                the data it manages.
              </p>

              {/* Security badge */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <ShieldCheck
                    size={20}
                    className="text-[#fff8ca]"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Two-step verification
                  </p>

                  <p className="mt-0.5 text-xs text-white/40">
                    Your account is protected
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-white/30">
              <span>
                © {new Date().getFullYear()} Fluxa
              </span>

              <span>Admin Console</span>
            </div>

          </div>
        </section>

        {/* =========================================
            RIGHT SIDE - OTP
        ========================================== */}

        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6b0b0c] text-lg font-black text-[#fff8ca]">
                F
              </div>

              <div>
                <p className="font-bold text-[#2d120d]">
                  Fluxa
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2d120d]/40">
                  Administration
                </p>
              </div>

            </div>

            {/* Header */}
            <div>

              <p className="mb-3 text-sm font-semibold text-[#6b0b0c]">
                Verify your identity
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#2d120d] sm:text-4xl">
                Enter verification code
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#2d120d]/50">
                We've sent a 6-digit verification code to
                your email address. Enter it below to continue.
              </p>

            </div>

            {/* OTP Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10"
            >

              <label className="mb-3 block text-sm font-semibold text-[#2d120d]">
                Verification code
              </label>

              {/* OTP Boxes */}
              <div className="flex gap-2 sm:gap-3">

                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    onPaste={handlePaste}
                    className="h-14 w-full rounded-xl border border-[#2d120d]/10 bg-white text-center text-xl font-bold text-[#2d120d] outline-none transition focus:border-[#6b0b0c] focus:ring-4 focus:ring-[#6b0b0c]/10 sm:h-16"
                    aria-label={`OTP digit ${index + 1}`}
                  />
                ))}

              </div>

              {/* Verify button */}
              <button
                type="submit"
                disabled={
                  otp.join("").length !==
                    OTP_LENGTH ||
                  isPending
                }
                className="mt-7 flex h-13 w-full items-center justify-center rounded-xl bg-[#6b0b0c] px-5 text-sm font-semibold text-white shadow-lg shadow-[#6b0b0c]/15 transition hover:bg-[#2d120d] hover:shadow-xl hover:shadow-[#6b0b0c]/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending
                  ? "Verifying..."
                  : "Verify code"}
              </button>

            </form>

            {/* Resend */}
            <div className="mt-7 text-center">

              <p className="text-sm text-[#2d120d]/45">
                Didn't receive the code?
              </p>

              <button
                type="button"
                className="mt-2 text-sm font-semibold text-[#6b0b0c] transition hover:text-[#2d120d]"
              >
                Resend code
              </button>

            </div>

            {/* Back to login */}
            <Link
              to="/"
              className="mx-auto mt-8 flex w-fit items-center gap-2 text-sm font-medium text-[#2d120d]/40 transition hover:text-[#6b0b0c]"
            >
              <ArrowLeft size={15} />
              Back to login
            </Link>

            {/* Security notice */}
            <div className="mt-10 rounded-xl border border-[#2d120d]/8 bg-[#2d120d]/[0.025] p-4">

              <div className="flex gap-3">

                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#6b0b0c]"
                />

                <p className="text-xs leading-5 text-[#2d120d]/50">
                  Never share your verification code with
                  anyone. Fluxa administrators will never ask
                  you for this code.
                </p>

              </div>

            </div>

            {/* Mobile footer */}
            <p className="mt-10 text-center text-xs text-[#2d120d]/30 lg:hidden">
              © {new Date().getFullYear()} Fluxa Admin Console
            </p>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Otp;