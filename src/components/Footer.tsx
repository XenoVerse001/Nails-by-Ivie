import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { SiteData } from '../store/siteData';
import Logo from './Logo';

interface FooterProps {
  isDark: boolean;
  siteData: SiteData;
  onAdminAccess?: () => void;
}

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const socialIconPaths: Record<string, string> = {
  Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  TikTok: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.84 4.83 4.83 0 003.77-2.77z',
  Twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
};

export default function Footer({ siteData, onAdminAccess }: FooterProps) {
  const b = siteData.branding;
  const c = siteData.contact;
  const socials = siteData.socialLinks.filter(s => s.visible);

  // Secret admin access: 5 taps within 3 seconds on the copyright text
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretTap = useCallback(() => {
    tapCountRef.current += 1;
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      onAdminAccess?.();
    } else {
      tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0; }, 3000);
    }
  }, [onAdminAccess]);

  return (
    <footer className="relative overflow-hidden bg-luxury-black">
      <div className="luxury-divider" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-nude-400/5 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-16 md:py-20 grid md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={38} src={b.logoUrl} />
              <span className="font-heading text-lg font-semibold tracking-[0.15em] text-white">{b.logoText}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">Premium nail artistry and beauty services in Lagos, Nigeria. Where luxury meets self-care.</p>
            <div className="flex items-center gap-3">
              {socials.map(social => (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-champagne-400 hover:bg-white/10 hover:border-champagne-400/30 transition-all duration-300" aria-label={social.platform}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={socialIconPaths[social.platform] || socialIconPaths.Instagram} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map(link => <a key={link.name} href={link.href} className="text-sm text-white/40 hover:text-champagne-400 transition-colors duration-300">{link.name}</a>)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-6">Contact Us</h4>
            <div className="space-y-3 text-sm text-white/40">
              <p>{c.address.split(',').slice(0, 2).join(',')}</p>
              <p>{c.phone}</p>
              <p>{c.hours}</p>
            </div>
            <a href={`https://wa.me/${c.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-105 transition-transform duration-300">
              Book Now
            </a>
          </motion.div>
        </div>

        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Secret admin access: tap copyright 5 times quickly */}
          <p
            className="text-xs text-white/20 flex items-center gap-1 select-none cursor-default"
            onClick={handleSecretTap}
          >
            © {new Date().getFullYear()} {b.brandName}. Made with <Heart className="w-3 h-3 text-rose-gold-400 fill-rose-gold-400" /> in Lagos, Nigeria.
          </p>
          <p className="text-xs text-white/20">{b.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
