import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, BarChart2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      // 1. CRITICAL FIX: Save the token using your exact original path
      localStorage.setItem("token", response.data.accessToken);

      // 2. Keep your original context update exactly as it was
      login(
        response.data.accessToken,
        response.data.user,
        response.data.refreshToken
      );

      // 3. Keep your original navigation path
      navigate("/dashboard");
      
    } catch (err: any) {
      alert(err.response?.data?.message ?? "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[1150px] bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* LEFT COLUMN */}
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-[#f4f7fa] p-12 lg:p-14 border-r border-slate-200">
          <div>
            {/* Logo area */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-[10px] bg-[#0a44da] flex items-center justify-center shadow-sm">
                <BarChart2 className="text-white" size={22} strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#0a44da]">
                Distributed Api Monitor
              </h1>
            </div>

            {/* Headings */}
            <h2 className="text-[38px] leading-[1.15] font-bold text-slate-900 tracking-tight mb-4">
              Global infrastructure<br />visibility at a glance.
            </h2>
            <p className="text-[17px] text-slate-500 leading-relaxed max-w-[400px]">
              Real-time health monitoring for mission-critical APIs and services across distributed networks.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mt-8 mb-8 rounded-2xl overflow-hidden shadow-xl w-full">
            <img
              src="/hero.png"
              alt="Global Infrastructure"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Trusted by area */}
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#dbeafe] text-[11px] text-slate-700 border-[3px] border-[#f4f7fa] flex items-center justify-center font-bold z-30">JD</div>
              <div className="w-10 h-10 rounded-full bg-[#e2e8f0] text-[11px] text-slate-700 border-[3px] border-[#f4f7fa] flex items-center justify-center font-bold z-20">AM</div>
              <div className="w-10 h-10 rounded-full bg-[#bbf7d0] text-[11px] text-slate-700 border-[3px] border-[#f4f7fa] flex items-center justify-center font-bold z-10">RK</div>
            </div>
            <p className="text-[15px] font-semibold text-slate-600">
              Trusted by 2,000+ DevOps teams
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 lg:p-16">
          <form onSubmit={handleSubmit} className="w-full max-w-[440px]">
            
            <h1 className="text-[36px] font-bold tracking-tight text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-[16px] text-slate-500 mb-10">
              Enter your credentials to access your dashboard
            </p>

            {/* Email Field */}
            <div className="mb-6">
              <label className="flex items-center gap-2 mb-2.5 text-[15px] font-semibold text-slate-900">
                <Mail size={18} className="text-slate-700" strokeWidth={2} /> Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] rounded-xl border border-slate-300 bg-white px-4 text-[15px] placeholder:text-slate-400 focus:border-[#0a44da] focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2.5">
                <label className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
                  <Lock size={18} className="text-slate-700" strokeWidth={2} /> Password
                </label>
                <button type="button" className="text-[#0a44da] font-semibold text-[14px] hover:underline">
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[52px] rounded-xl border border-slate-300 bg-white px-4 pr-12 text-[15px] placeholder:text-slate-400 focus:border-[#0a44da] focus:ring-4 focus:ring-blue-100 transition-all outline-none tracking-widest placeholder:tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-[52px] w-full rounded-xl bg-[#0a44da] hover:bg-blue-800 text-white text-[16px] font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? "Signing In..." : (
                <>
                  Sign in to Platform <ArrowRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mt-8 mb-8">
              <div className="flex-1 h-[1px] bg-slate-200"></div>
              <p className="text-slate-400 text-[14px] font-medium">Or continue with</p>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>

            {/* Footer Links */}
            <p className="text-center text-[15px] text-slate-500 font-medium">
              Don't have an account yet?
              <Link to="/register" className="ml-1.5 text-[#0a44da] font-bold hover:underline">
                Register your organization
              </Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;