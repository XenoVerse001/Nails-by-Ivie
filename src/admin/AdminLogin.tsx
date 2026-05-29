import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import { SiteData, loginAdmin } from '../store/siteData';

interface Props {
  siteData: SiteData;
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ siteData, onLogin, onBack }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (loginAdmin(siteData, username, password)) {
        onLogin();
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-nude-400/5 to-rose-gold-400/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-nude-400/20 to-rose-gold-400/20 flex items-center justify-center">
              <Lock className="w-7 h-7 text-champagne-400" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <h1 className="font-heading text-xl font-semibold tracking-[0.15em] text-white">
                ADMIN ACCESS
              </h1>
              <Sparkles className="w-4 h-4 text-champagne-400" />
            </div>
            <p className="text-xs text-white/30 tracking-wide">
              Nails By Ivie — Control Panel
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-semibold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-nude-400 to-rose-gold-400 shadow-lg hover:shadow-xl hover:shadow-nude-400/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Back link */}
          <button
            onClick={onBack}
            className="w-full mt-6 text-center text-xs text-white/20 hover:text-white/50 transition-colors tracking-wide"
          >
            ← Back to website
          </button>
        </div>

        <p className="text-center text-[10px] text-white/10 mt-6 tracking-wider">
          Default: ivie / NailsByIvie2024!
        </p>
      </motion.div>
    </div>
  );
}
