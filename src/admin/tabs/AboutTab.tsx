import { useState, useEffect } from 'react';
import { SiteData } from '../../store/siteData';
import { Save, RotateCcw, CheckCircle, FileText, BarChart3 } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function AboutTab({ siteData, onUpdate }: Props) {
  const [about, setAbout] = useState({ ...siteData.about });
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setAbout({ ...siteData.about });
    setHasChanges(false);
  }, [siteData.about]);

  const handleSave = () => {
    onUpdate({ ...siteData, about });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setAbout({ ...siteData.about });
    setHasChanges(false);
  };

  const updateField = (key: keyof typeof about, value: string) => {
    setAbout(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const field = (label: string, key: keyof typeof about, multiline = false, hint?: string) => (
    <div>
      <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">
        {label}
        {hint && <span className="ml-2 font-normal normal-case tracking-normal text-white/20">({hint})</span>}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={about[key]}
          onChange={(e) => updateField(key, e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none resize-none"
        />
      ) : (
        <input
          type="text"
          value={about[key]}
          onChange={(e) => updateField(key, e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-champagne-400/50 focus:bg-white/[0.07] transition-all outline-none"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-white mb-1">About Section</h2>
        <p className="text-xs text-white/40">Edit the about section content and statistics.</p>
      </div>

      <div className="space-y-6">
        {/* Heading */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Section Heading</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Title Text', 'sectionTitle')}
            {field('Highlighted Word', 'sectionHighlight')}
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <p className="text-xs text-white/30">Preview:</p>
            <p className="text-lg font-heading text-white mt-1">
              {about.sectionTitle}{' '}
              <span className="italic text-gradient-gold">{about.sectionHighlight}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Content</h3>
          </div>
          {field('Paragraph 1', 'paragraph1', true, 'supports <strong> HTML for bold text')}
          {field('Paragraph 2', 'paragraph2', true)}
        </div>

        {/* Statistics */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Statistics</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {field('Stat 1 Value', 'stat1Value')}
            {field('Stat 1 Label', 'stat1Label')}
            {field('Stat 2 Value', 'stat2Value')}
            {field('Stat 2 Label', 'stat2Label')}
            {field('Stat 3 Value', 'stat3Value')}
            {field('Stat 3 Label', 'stat3Label')}
          </div>
          <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            {[
              { value: about.stat1Value, label: about.stat1Label },
              { value: about.stat2Value, label: about.stat2Label },
              { value: about.stat3Value, label: about.stat3Label },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-heading font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
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
