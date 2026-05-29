import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Sparkles, Gem, Droplets, Hand, Palette, Wrench, Crown, Star, Heart, Scissors, Flower2 } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface ServicesProps {
  isDark: boolean;
  siteData: SiteData;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gem, Droplets, Sparkles, Hand, Palette, Wrench, Crown, Star, Heart, Scissors, Flower: Flower2,
};

export default function Services({ isDark, siteData }: ServicesProps) {
  const { ref, inView } = useInView(0.1);
  const services = siteData.services.filter(s => s.visible);

  return (
    <section id="services" ref={ref} className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-luxury-dark' : 'bg-white'}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-nude-100/10 to-champagne-100/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className={`inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`}>Our Services</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-luxury-black'}`}>
            Premium Nail{' '}<span className="italic font-light text-gradient-gold">Services</span>
          </h2>
          <div className="luxury-divider mx-auto w-20 mb-6" />
          <p className={`max-w-lg mx-auto text-sm ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Indulge in our curated menu of luxury nail treatments designed to make you feel beautiful.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const IconComp = iconMap[service.icon] || Sparkles;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className={`group relative p-6 rounded-3xl border transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isDark ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1] hover:shadow-xl hover:shadow-champagne-400/5' : 'bg-white border-nude-100/60 hover:bg-nude-50/50 hover:border-nude-200 hover:shadow-xl hover:shadow-nude-200/30'}`}>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-nude-300/10 via-transparent to-champagne-300/10" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 ${isDark ? 'bg-gradient-to-br from-champagne-400/20 to-nude-400/10' : 'bg-gradient-to-br from-nude-100 to-champagne-100'}`}>
                    <IconComp className={`w-5 h-5 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`} />
                  </div>
                  <h3 className={`font-heading text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-luxury-black'}`}>{service.title}</h3>
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-white/40' : 'text-luxury-dark/50'}`}>{service.description}</p>
                  <p className={`text-sm font-semibold mb-4 ${isDark ? 'text-champagne-300' : 'text-nude-500'}`}>{service.price}</p>
                  <a href="#contact" className={`inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${isDark ? 'text-white/40 group-hover:text-champagne-400' : 'text-luxury-dark/40 group-hover:text-nude-500'}`}>
                    Book Now
                    <svg className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
