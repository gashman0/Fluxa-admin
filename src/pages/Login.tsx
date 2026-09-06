import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useLogin } from "../network/auth/queries";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email:"", password: ""});
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const {mutate, isPending} = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
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
                Admin portal
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                Manage the opportunities that power{" "}
                <span className="text-[#fff8ca]">Fluxa.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/50 xl:text-lg">
                A centralized workspace for managing jobs, users, applications,
                reports and the systems behind the Fluxa platform.
              </p>

              {/* Security badge */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <ShieldCheck size={20} className="text-[#fff8ca]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Secure administration
                  </p>

                  <p className="mt-0.5 text-xs text-white/40">
                    Authorized personnel only
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-white/30">
              <span>© {new Date().getFullYear()} Fluxa</span>

              <span>Admin Console</span>
            </div>
          </div>
        </section>

        {/* =========================================
                    RIGHT SIDE - LOGIN
                ========================================== */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6b0b0c] text-lg font-black text-[#fff8ca]">
                F
              </div>

              <div>
                <p className="font-bold text-[#2d120d]">Fluxa</p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2d120d]/40">
                  Administration
                </p>
              </div>
            </div>

            {/* Header */}
            <div>
              <p className="mb-3 text-sm font-semibold text-[#6b0b0c]">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#2d120d] sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#2d120d]/50">
                Enter your administrator credentials to continue to the Fluxa
                Admin Console.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#2d120d]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@fluxa.com"
                  className="h-13 w-full rounded-xl border border-[#2d120d]/10 bg-white px-4 text-sm text-[#2d120d] outline-none transition placeholder:text-[#2d120d]/25 focus:border-[#6b0b0c] focus:ring-4 focus:ring-[#6b0b0c]/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#2d120d]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#6b0b0c] transition hover:text-[#2d120d]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="h-13 w-full rounded-xl border border-[#2d120d]/10 bg-white px-4 pr-12 text-sm text-[#2d120d] outline-none transition placeholder:text-[#2d120d]/25 focus:border-[#6b0b0c] focus:ring-4 focus:ring-[#6b0b0c]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-[#2d120d]/40 transition hover:bg-[#2d120d]/5 hover:text-[#2d120d]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                // disabled={isLoading}
                className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#6b0b0c] px-5 text-sm font-semibold text-white shadow-lg shadow-[#6b0b0c]/15 transition hover:bg-[#2d120d] hover:shadow-xl hover:shadow-[#6b0b0c]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Security notice */}
            <div className="mt-8 rounded-xl border border-[#2d120d]/8 bg-[#2d120d]/[0.025] p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#6b0b0c]"
                />

                <p className="text-xs leading-5 text-[#2d120d]/50">
                  This is a restricted administrative area. Your activity may be
                  monitored and recorded for security purposes.
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

export default Login;
