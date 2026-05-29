import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, PartyPopper, AlertTriangle } from 'lucide-react';
import type { Announcement } from '../store/siteData';

interface Props {
  announcements: Announcement[];
  isDark: boolean;
}

export default function AnnouncementBanner({ announcements, isDark }: Props) {
  const active = announcements.filter(a => a.active);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  if (active.length === 0) return null;

  const visible = active.filter(a => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  const dismiss = (id: string) => setDismissed(new Set([...dismissed, id]));

  const typeStyles = {
    info: {
      bg: isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200',
      text: isDark ? 'text-blue-300' : 'text-blue-700',
      icon: Megaphone,
    },
    promo: {
      bg: isDark ? 'bg-champagne-400/10 border-champagne-400/20' : 'bg-amber-50 border-amber-200',
      text: isDark ? 'text-champagne-300' : 'text-amber-700',
      icon: PartyPopper,
    },
    urgent: {
      bg: isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200',
      text: isDark ? 'text-red-300' : 'text-red-700',
      icon: AlertTriangle,
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <AnimatePresence>
        {visible.map(announcement => {
          const style = typeStyles[announcement.type];
          const Icon = style.icon;
          return (
            <motion.div
              key={announcement.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`border-b ${style.bg} backdrop-blur-xl`}
            >
              <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${style.text}`} />
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-semibold ${style.text}`}>{announcement.title}</span>
                  <span className={`text-xs ml-2 ${style.text} opacity-70`}>{announcement.message}</span>
                </div>
                <button onClick={() => dismiss(announcement.id)} className={`p-1 rounded-md hover:bg-black/5 ${style.text} opacity-50 hover:opacity-100 transition-opacity shrink-0`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
