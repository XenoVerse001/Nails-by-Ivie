import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Heart, Star, Award } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface AboutProps {
  isDark: boolean;
  siteData: SiteData;
}

export default function About({ isDark, siteData }: AboutProps) {
  const { ref, inView } = useInView(0.2);
  const a = siteData.about;
  const b = siteData.branding;

  const stats = [
    { icon: Heart, label: a.stat1Label, value: a.stat1Value },
    { icon: Star, label: a.stat2Label, value: a.stat2Value },
    { icon: Award, label: a.stat3Label, value: a.stat3Value },
  ];

  return (
    <section id="about" ref={ref} className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-luxury-black' : 'bg-cream'}`}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-nude-200/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gradient-to-tr from-champagne-200/15 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: 'easeOut' }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={b.aboutImage} alt="Nails By Ivie salon" className="w-full h-[400px] md:h-[550px] object-cover" />
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-luxury-black/40 to-transparent' : 'bg-gradient-to-t from-nude-100/20 to-transparent'}`} />
            </div>
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }} className={`absolute -bottom-6 -right-4 md:right-8 px-6 py-4 rounded-2xl shadow-xl ${isDark ? 'bg-luxury-dark/90 backdrop-blur-xl border border-white/10' : 'bg-white/90 backdrop-blur-xl border border-nude-100'}`}>
              <p className="text-3xl font-heading font-bold text-gradient-gold">{a.stat2Value}</p>
              <p className={`text-[10px] tracking-[0.2em] uppercase font-medium ${isDark ? 'text-white/60' : 'text-luxury-dark/50'}`}>{a.stat2Label}</p>
            </motion.div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-nude-300/40 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-nude-300/40 rounded-br-3xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}>
            <span className={`inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`}>About Us</span>
            <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-luxury-black'}`}>
              {a.sectionTitle}{' '}
              <span className="italic font-light text-gradient-gold">{a.sectionHighlight}</span>
            </h2>
            <div className="luxury-divider mb-6 w-20" />
            <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-white/60' : 'text-luxury-dark/60'}`} dangerouslySetInnerHTML={{ __html: a.paragraph1 }} />
            <p className={`text-sm md:text-base leading-relaxed mb-8 ${isDark ? 'text-white/60' : 'text-luxury-dark/60'}`} dangerouslySetInnerHTML={{ __html: a.paragraph2 }} />

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }} className={`text-center p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-nude-50/80 border border-nude-100/50'}`}>
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`} />
                  <p className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-luxury-black'}`}>{stat.value}</p>
                  <p className={`text-[9px] tracking-[0.15em] uppercase font-medium mt-1 ${isDark ? 'text-white/40' : 'text-luxury-dark/40'}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
