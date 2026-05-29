import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import type { SiteData } from '../store/siteData';
import Logo from './Logo';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  siteData: SiteData;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleTheme, siteData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const b = siteData.branding;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        // Calculate offset for sticky header
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash silently
        window.history.pushState(null, '', href);
      }
    }, 100); // Small delay to let mobile menu close first
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-luxury-black/80 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-white/80 backdrop-blur-xl shadow-lg shadow-nude-200/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
            <div className="transition-transform group-hover:scale-105">
              <Logo size={36} src={b.logoUrl} />
            </div>
            <span className={`font-heading text-base md:text-lg font-semibold tracking-[0.15em] ${isDark ? 'text-white' : 'text-luxury-black'}`}>
              {b.logoText}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:text-nude-500 relative group ${isDark ? 'text-white/80' : 'text-luxury-dark/70'}`}>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-nude-500 to-rose-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'hover:bg-white/10 text-champagne-400' : 'hover:bg-nude-100 text-luxury-dark'}`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white shadow-lg hover:shadow-nude-300/40 transition-all duration-300 hover:scale-105">
              Book Now
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 rounded-lg ${isDark ? 'text-white' : 'text-luxury-black'}`}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className={`md:hidden overflow-hidden ${isDark ? 'bg-luxury-black/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'}`}>
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a key={link.name} href={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} onClick={(e) => handleNavClick(e as any, link.href)} className={`block py-3 text-sm font-medium tracking-[0.15em] uppercase transition-colors ${isDark ? 'text-white/80 hover:text-champagne-400' : 'text-luxury-dark/70 hover:text-nude-500'}`}>
                  {link.name}
                </motion.a>
              ))}
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block mt-4 text-center px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white">
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
