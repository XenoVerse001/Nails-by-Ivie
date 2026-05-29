import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, X } from 'lucide-react';
import type { SiteData } from '../store/siteData';

interface Props {
  siteData: SiteData;
}

export default function FloatingButtons({ siteData }: Props) {
  const [showChat, setShowChat] = useState(false);
  const [visible, setVisible] = useState(false);
  const c = siteData.contact;
  const waLink = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} href="#contact" className="fixed bottom-24 right-4 md:hidden z-40 w-12 h-12 rounded-full bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white shadow-lg shadow-nude-400/30 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }} className="fixed bottom-6 right-4 z-40">
        <AnimatePresence>
          {showChat && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-16 right-0 w-72 rounded-2xl overflow-hidden shadow-2xl mb-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <p className="text-white font-semibold text-sm">{siteData.branding.brandName} 💅</p>
                <p className="text-white/80 text-xs mt-1">Hi! Ready to book your luxury nail appointment?</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-xs text-gray-500 mb-3">Click below to chat with us on WhatsApp</p>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-2.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors">
                  Start Chat
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setShowChat(!showChat)} className="w-14 h-14 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110">
          {showChat ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </motion.div>
    </>
  );
}
