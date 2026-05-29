import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface HeroProps {
  isDark: boolean;
  siteData: SiteData;
}

export default function Hero({ isDark, siteData }: HeroProps) {
  const b = siteData.branding;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={b.heroImage} alt="Luxury nails" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-luxury-black/80 via-luxury-black/60 to-luxury-black/90' : 'bg-gradient-to-b from-white/60 via-white/30 to-white/70'}`} />
      </div>

      <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-nude-300/30 to-rose-gold-300/20 blur-xl" />
      <motion.div animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/3 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-champagne-300/20 to-nude-300/15 blur-2xl" />
      <motion.div animate={{ y: [-15, 25, -15] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-1/3 left-[20%] w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold-200/25 to-champagne-200/20 blur-lg" />

      {[...Array(6)].map((_, i) => (
        <motion.div key={i} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [0, -30, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8 }} className="absolute" style={{ top: `${20 + (i * 10) % 60}%`, left: `${10 + (i * 13) % 80}%` }}>
          <Sparkles className="w-3 h-3 text-champagne-400/60" />
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-4">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase ${isDark ? 'bg-white/10 text-champagne-300 border border-white/10' : 'bg-nude-100/80 text-nude-500 border border-nude-200/50'}`}>
            <Sparkles className="w-3 h-3" />
            {b.heroSubtitle}
            <Sparkles className="w-3 h-3" />
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className={`font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 ${isDark ? 'text-white' : 'text-luxury-black'}`}>
          <span className="block">{b.brandName.split(' ')[0]}</span>
          {b.brandName.split(' ').length > 1 && (
            <span className="block italic font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-gold">
              {b.brandName.split(' ').slice(1).join(' ')}
            </span>
          )}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className={`font-elegant text-xl sm:text-2xl md:text-3xl italic tracking-wide mb-10 ${isDark ? 'text-white/70' : 'text-luxury-dark/60'}`}>
          {b.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="group relative px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-nude-400 to-rose-gold-400 shadow-xl hover:shadow-2xl hover:shadow-nude-400/30 transition-all duration-500 hover:scale-105 overflow-hidden">
            <span className="relative z-10">Book Appointment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-gold-400 to-nude-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          <a href="#gallery" className={`px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border transition-all duration-500 hover:scale-105 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-luxury-dark/20 text-luxury-dark hover:bg-luxury-dark/5'}`}>
            View Gallery
          </a>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className={`flex flex-col items-center gap-2 ${isDark ? 'text-white/40' : 'text-luxury-dark/30'}`}>
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
