import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, LayoutDashboard, Eye, LogOut } from 'lucide-react';

interface Props {
  onGoToAdmin: () => void;
  onLogout: () => void;
  adminName: string;
}

export default function AdminQuickAccess({ onGoToAdmin, onLogout, adminName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 left-0 w-48 rounded-2xl bg-luxury-black/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden mb-2"
          >
            <div className="p-3 border-b border-white/[0.06]">
              <p className="text-[10px] text-white/30 uppercase tracking-wider">Logged in as</p>
              <p className="text-xs text-white/80 font-medium truncate">{adminName}</p>
            </div>
            <div className="p-2">
              <button
                onClick={() => { onGoToAdmin(); setIsOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors text-left"
              >
                <LayoutDashboard className="w-4 h-4 text-champagne-400" />
                Admin Dashboard
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors text-left"
              >
                <Eye className="w-4 h-4 text-white/40" />
                Continue Previewing
              </button>
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen
            ? 'bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white'
            : 'bg-luxury-black/80 backdrop-blur-xl border border-white/20 text-white/60 hover:text-white hover:border-white/30'
        }`}
        aria-label="Admin menu"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
      </motion.button>
    </div>
  );
}
