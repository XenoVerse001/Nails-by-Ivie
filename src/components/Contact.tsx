import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { MapPin, Phone, Clock, Send, MessageCircle } from 'lucide-react';
import type { SiteData, FormSubmission } from '../store/siteData';
import { generateId } from '../store/siteData';

interface ContactProps {
  isDark: boolean;
  siteData: SiteData;
  onSubmit: (submission: FormSubmission) => void;
}

export default function Contact({ isDark, siteData, onSubmit }: ContactProps) {
  const { ref, inView } = useInView(0.1);
  const c = siteData.contact;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: c.address, link: c.addressLink },
    { icon: Phone, label: 'Phone', value: c.phone, link: c.phoneLink },
    { icon: Clock, label: 'Hours', value: c.hours, link: null as string | null },
    { icon: Send, label: 'Instagram', value: c.instagram, link: c.instagramLink },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission: FormSubmission = {
      id: generateId(),
      ...formData,
      date: new Date().toISOString(),
      read: false,
    };
    onSubmit(submission);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const waLink = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;

  return (
    <section id="contact" ref={ref} className={`relative py-24 md:py-32 overflow-hidden ${isDark ? 'bg-luxury-black' : 'bg-cream'}`}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-nude-200/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-champagne-200/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className={`inline-block text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`}>Get In Touch</span>
          <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-luxury-black'}`}>
            Book Your{' '}<span className="italic font-light text-gradient-gold">Appointment</span>
          </h2>
          <div className="luxury-divider mx-auto w-20 mb-6" />
          <p className={`max-w-lg mx-auto text-sm ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Ready to experience luxury nail care? Reach out to us or book your appointment today.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {(['name', 'email'] as const).map(key => (
                  <div key={key}>
                    <label className={`block text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>{key === 'name' ? 'Full Name' : 'Email'}</label>
                    <input type={key === 'email' ? 'email' : 'text'} required value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none ${isDark ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07]' : 'bg-white border border-nude-200 text-luxury-black placeholder:text-luxury-dark/30 focus:border-nude-400 focus:shadow-lg focus:shadow-nude-100/50'}`} placeholder={key === 'name' ? 'Your name' : 'your@email.com'} />
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={`block text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none ${isDark ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07]' : 'bg-white border border-nude-200 text-luxury-black placeholder:text-luxury-dark/30 focus:border-nude-400 focus:shadow-lg focus:shadow-nude-100/50'}`} placeholder="Your phone number" />
                </div>
                <div>
                  <label className={`block text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Service</label>
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none ${isDark ? 'bg-white/5 border border-white/10 text-white focus:border-champagne-400/50 focus:bg-white/[0.07]' : 'bg-white border border-nude-200 text-luxury-black focus:border-nude-400 focus:shadow-lg focus:shadow-nude-100/50'}`}>
                    <option value="">Select a service</option>
                    {siteData.services.filter(s => s.visible).map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${isDark ? 'text-white/50' : 'text-luxury-dark/50'}`}>Message</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none resize-none ${isDark ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07]' : 'bg-white border border-nude-200 text-luxury-black placeholder:text-luxury-dark/30 focus:border-nude-400 focus:shadow-lg focus:shadow-nude-100/50'}`} placeholder="Tell us about your dream nails..." />
              </div>
              <button type="submit" className="group w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-nude-400 to-rose-gold-400 shadow-lg hover:shadow-xl hover:shadow-nude-300/30 transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2">
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                {submitted ? 'Message Sent! ✓' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <motion.div key={info.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }} className={`p-5 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]' : 'bg-white border border-nude-100/60 hover:shadow-lg hover:shadow-nude-100/30'}`}>
                  <info.icon className={`w-5 h-5 mb-3 ${isDark ? 'text-champagne-400' : 'text-nude-500'}`} />
                  <p className={`text-[9px] tracking-[0.2em] uppercase font-semibold mb-1 ${isDark ? 'text-white/40' : 'text-luxury-dark/40'}`}>{info.label}</p>
                  {info.link ? (
                    <a href={info.link} target="_blank" rel="noopener noreferrer" className={`text-xs leading-relaxed transition-colors ${isDark ? 'text-white/70 hover:text-champagne-300' : 'text-luxury-dark/70 hover:text-nude-500'}`}>{info.value}</a>
                  ) : (
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-white/70' : 'text-luxury-dark/70'}`}>{info.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/[0.06]' : 'border-nude-100'}`}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.27!3d6.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8e!2sOld+Ota+Rd%2C+Alagbado%2C+Lagos!5e0!3m2!1sen!2sng!4v1" width="100%" height="200" style={{ border: 0, filter: isDark ? 'invert(0.9) hue-rotate(180deg)' : 'none' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Nails By Ivie Location" />
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02]">
              <MessageCircle className="w-5 h-5" />
              Book via WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
