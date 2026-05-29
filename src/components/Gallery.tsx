import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';
import { X, ZoomIn } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface GalleryProps {
  isDark: boolean;
  siteData: SiteData;
}

export default function Gallery({ isDark, siteData }: GalleryProps) {
  const { ref, inView } = useInView(0.1);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const images = siteData.gallery.filter(g => g.visible);

  return (
    <section id="gallery" ref={ref} className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-luxury-black' : 'bg-cream'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className={`inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`}>Our Portfolio</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-luxury-black'}`}>
            Nail Art{' '}<span className="italic font-light text-gradient-gold">Gallery</span>
          </h2>
          <div className="luxury-divider mx-auto w-20 mb-6" />
          <p className={`max-w-lg mx-auto text-sm ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Explore our collection of stunning nail designs. Every set is a masterpiece.</p>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((image, i) => (
            <motion.div key={image.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }} className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => setLightbox(image.src)}>
              <img src={image.src} alt={image.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 flex items-center justify-center ${isDark ? 'bg-luxury-black/60' : 'bg-white/50'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isDark ? 'bg-white/20' : 'bg-luxury-black/20'}`}>
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="text-center mt-12">
          <a href={siteData.contact.instagramLink} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 ${isDark ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10' : 'bg-nude-50 border border-nude-200 text-luxury-dark/60 hover:bg-nude-100'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow us on Instagram
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} src={lightbox} alt="Gallery preview" className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
