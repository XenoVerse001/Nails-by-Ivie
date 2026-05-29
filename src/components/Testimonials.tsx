import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface TestimonialsProps {
  isDark: boolean;
  siteData: SiteData;
}

export default function Testimonials({ isDark, siteData }: TestimonialsProps) {
  const { ref, inView } = useInView(0.1);
  const testimonials = siteData.testimonials.filter(t => t.visible);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const goTo = (index: number) => { setDirection(index > current ? 1 : -1); setCurrent(index); };
  const next = () => { setDirection(1); setCurrent((prev) => (prev + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-luxury-dark' : 'bg-white'}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-nude-200/10 to-champagne-200/5 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className={`inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`}>Testimonials</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-luxury-black'}`}>
            What Our Clients{' '}<span className="italic font-light text-gradient-gold">Say</span>
          </h2>
          <div className="luxury-divider mx-auto w-20" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
          <div className={`relative rounded-3xl p-8 md:p-12 min-h-[300px] flex flex-col items-center justify-center ${isDark ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-nude-50/50 border border-nude-100/50'}`}>
            <Quote className={`w-10 h-10 mb-6 ${isDark ? 'text-champagne-400/20' : 'text-nude-300/40'}`} />
            <div className="overflow-hidden w-full relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: 'easeInOut' }} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-champagne-400 fill-champagne-400" />)}
                  </div>
                  <p className={`font-elegant text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-8 max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-luxury-dark/70'}`}>"{t.text}"</p>
                  <div>
                    <p className={`font-heading text-lg font-semibold ${isDark ? 'text-white' : 'text-luxury-black'}`}>{t.name}</p>
                    <p className={`text-xs tracking-[0.15em] uppercase mt-1 ${isDark ? 'text-champagne-400/60' : 'text-nude-400'}`}>{t.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10' : 'bg-nude-50 border border-nude-200 text-luxury-dark/40 hover:bg-nude-100'}`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-gradient-to-r from-nude-400 to-rose-gold-400' : `w-2 h-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-nude-200 hover:bg-nude-300'}`}`} />
              ))}
            </div>
            <button onClick={next} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10' : 'bg-nude-50 border border-nude-200 text-luxury-dark/40 hover:bg-nude-100'}`}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
