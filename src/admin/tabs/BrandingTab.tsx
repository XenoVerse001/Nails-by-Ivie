import { useState, useEffect } from 'react';
import { SiteData } from '../../store/siteData';
import { Save, RotateCcw, CheckCircle, Palette, Type, Image, Crown, Trash2, Info } from 'lucide-react';
import Logo from '../../components/Logo';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function BrandingTab({ siteData, onUpdate }: Props) {
  const [branding, setBranding] = useState({ ...siteData.branding });
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setBranding({ ...siteData.branding });
    setHasChanges(false);
  }, [siteData.branding]);

  const handleSave = () => {
    onUpdate({ ...siteData, branding });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setBranding({ ...siteData.branding });
    setHasChanges(false);
  };

  const updateField = (key: keyof typeof branding, value: string) => {
    setBranding(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const field = (label: string, key: keyof typeof branding, type: string = 'text', placeholder?: string) => (
    <div>
      <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={branding[key]}
        onChange={(e) => updateField(key, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-white mb-1">Branding & Identity</h2>
        <p className="text-xs text-white/40">Control your brand name, tagline, colors, fonts, and hero imagery.</p>
      </div>

      <div className="space-y-6">
        {/* Brand Text */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Brand Text</h3>
          </div>
          {field('Brand Name', 'brandName', 'text', 'NAILS BY IVIE')}
          {field('Logo Text (Navbar)', 'logoText', 'text', 'NAILS BY IVIE')}
          {field('Tagline', 'tagline', 'text', 'Luxury Nails. Timeless Beauty.')}
          {field('Hero Subtitle Badge', 'heroSubtitle', 'text', 'Premium Nail Artistry')}
        </div>

        {/* Logo */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Logo</h3>
          </div>
          
          {field('Logo Image URL', 'logoUrl', 'text', 'Paste your logo image URL here')}
          
          <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <Info className="w-3.5 h-3.5 text-champagne-400/60 shrink-0 mt-0.5" />
            <p className="text-[10px] text-white/30 leading-relaxed">
              Paste a direct image URL (ending in .jpg, .png, .webp). Upload your logo to
              <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-champagne-400/60 hover:text-champagne-400 mx-1 underline">imgbb.com</a>
              or
              <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-champagne-400/60 hover:text-champagne-400 mx-1 underline">postimages.org</a>
              and paste the direct link here. Leave empty to use the default logo.
            </p>
          </div>

          {/* Live preview */}
          <div className="pt-2">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-3">Preview</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="bg-luxury-black rounded-xl p-3 border border-white/10 flex items-center gap-2">
                  <Logo size={32} src={branding.logoUrl} />
                  <span className="font-heading text-xs font-semibold tracking-[0.1em] text-white truncate max-w-[90px]">{branding.logoText}</span>
                </div>
                <span className="text-[8px] text-white/20 uppercase tracking-wider">Dark</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-xl p-3 border border-nude-200/60 flex items-center gap-2">
                  <Logo size={32} src={branding.logoUrl} />
                  <span className="font-heading text-xs font-semibold tracking-[0.1em] text-luxury-black truncate max-w-[90px]">{branding.logoText}</span>
                </div>
                <span className="text-[8px] text-white/20 uppercase tracking-wider">Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="bg-luxury-black/60 rounded-xl p-3 border border-white/10">
                  <Logo size={56} src={branding.logoUrl} />
                </div>
                <span className="text-[8px] text-white/20 uppercase tracking-wider">Splash</span>
              </div>
            </div>
          </div>

          {branding.logoUrl && (
            <button
              onClick={() => updateField('logoUrl', '')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Remove Logo (use default)
            </button>
          )}
        </div>

        {/* Images */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Image className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Images</h3>
          </div>
          {field('Hero Background Image URL', 'heroImage', 'text', '/images/hero-bg.jpg or https://...')}
          {branding.heroImage && (
            <div className="rounded-xl overflow-hidden border border-white/10 h-32 bg-white/5">
              <img
                src={branding.heroImage}
                alt="Hero preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
          {field('About Section Image URL', 'aboutImage', 'text', '/images/about.jpg or https://...')}
          {branding.aboutImage && (
            <div className="rounded-xl overflow-hidden border border-white/10 h-32 bg-white/5">
              <img
                src={branding.aboutImage}
                alt="About preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        {/* Colors & Fonts */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Colors & Fonts</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => updateField('primaryColor', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={branding.primaryColor}
                  onChange={(e) => updateField('primaryColor', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={(e) => updateField('accentColor', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={branding.accentColor}
                  onChange={(e) => updateField('accentColor', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all font-mono"
                />
              </div>
            </div>
          </div>
          {field('Heading Font', 'headingFont', 'text', "'Playfair Display', serif")}
          {field('Body Font', 'bodyFont', 'text', "'Montserrat', sans-serif")}
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
