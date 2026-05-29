import { useState, useEffect } from 'react';
import { SiteData } from '../../store/siteData';
import { Save, RotateCcw, CheckCircle, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function ContactTab({ siteData, onUpdate }: Props) {
  const [contact, setContact] = useState({ ...siteData.contact });
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setContact({ ...siteData.contact });
    setHasChanges(false);
  }, [siteData.contact]);

  const handleSave = () => {
    onUpdate({ ...siteData, contact });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setContact({ ...siteData.contact });
    setHasChanges(false);
  };

  const updateField = (key: keyof typeof contact, value: string) => {
    setContact(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const field = (label: string, key: keyof typeof contact, hint?: string) => (
    <div>
      <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
        {label}
        {hint && <span className="ml-2 font-normal normal-case tracking-normal text-white/20">({hint})</span>}
      </label>
      <input
        type="text"
        value={contact[key]}
        onChange={(e) => updateField(key, e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-white mb-1">Contact Information</h2>
        <p className="text-xs text-white/40">Update your salon's contact details, address, hours, and social links.</p>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Location</h3>
          </div>
          {field('Address', 'address')}
          {field('Google Maps Link', 'addressLink', 'full URL starting with https://')}
        </div>

        {/* Phone */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Phone</h3>
          </div>
          {field('Phone Number (Display)', 'phone', 'how it appears on site')}
          {field('Phone Link', 'phoneLink', 'e.g. tel:09134655114')}
        </div>

        {/* Hours & Social */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Hours & Social</h3>
          </div>
          {field('Business Hours', 'hours')}
          {field('Instagram Handle', 'instagram', 'e.g. @nailsbyivie')}
          {field('Instagram Profile Link', 'instagramLink')}
        </div>

        {/* WhatsApp */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">WhatsApp</h3>
          </div>
          {field('WhatsApp Number', 'whatsappNumber', 'with country code, no + symbol (e.g. 2349134655114)')}
          {field('Default WhatsApp Message', 'whatsappMessage')}
          
          {/* Preview */}
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-xs text-white/40 mb-2">WhatsApp Link Preview:</p>
            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-400 hover:text-green-300 underline break-all"
            >
              wa.me/{contact.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className={`flex items-center gap-3 mt-6 p-4 rounded-xl transition-all ${hasChanges ? 'bg-champagne-400/10 border border-champagne-400/20' : 'bg-white/[0.02]'}`}>
        <button
          onClick={handleSave}
          disabled={!hasChanges && !saved}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : hasChanges
                ? 'bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] active:scale-95'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saved ? 'Saved!' : hasChanges ? 'Save Changes' : 'No Changes'}
        </button>
        {hasChanges && (
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium bg-white/5 text-white/50 hover:bg-white/10 transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Discard
          </button>
        )}
      </div>
    </div>
  );
}
