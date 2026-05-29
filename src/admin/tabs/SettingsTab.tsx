import { useState, useEffect } from 'react';
import { SiteData, SocialLink, generateId, resetSiteData } from '../../store/siteData';
import { Save, RotateCcw, AlertTriangle, Trash2, Plus, ToggleLeft, ToggleRight, Download, Upload, CheckCircle, Settings, Globe, Share2 } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function SettingsTab({ siteData, onUpdate }: Props) {
  const [settings, setSettings] = useState({ ...siteData.siteSettings });
  const [socials, setSocials] = useState<SocialLink[]>([...siteData.socialLinks]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSettings({ ...siteData.siteSettings });
    setSocials([...siteData.socialLinks]);
    setHasChanges(false);
  }, [siteData.siteSettings, siteData.socialLinks]);

  const handleSave = () => {
    onUpdate({ ...siteData, siteSettings: settings, socialLinks: socials });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings({ ...siteData.siteSettings });
    setSocials([...siteData.socialLinks]);
    setHasChanges(false);
  };

  const updateSettings = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleFactoryReset = () => {
    if (confirm('⚠️ This will reset ALL website data to defaults. Are you absolutely sure?')) {
      if (confirm('Last warning: This cannot be undone. Continue?')) {
        const fresh = resetSiteData();
        onUpdate(fresh);
        alert('Site has been reset to defaults.');
      }
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(siteData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nailsbyivie-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('Backup downloaded!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.branding && data.services) {
            if (confirm('Import this backup? This will replace all current data.')) {
              onUpdate(data);
              alert('Import successful!');
            }
          } else {
            alert('Invalid backup file format.');
          }
        } catch {
          alert('Failed to parse file. Make sure it\'s a valid JSON backup.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const updateSocial = (id: string, updates: Partial<SocialLink>) => {
    setSocials(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    setHasChanges(true);
  };

  const addSocial = () => {
    setSocials(prev => [...prev, { id: generateId(), platform: 'New Platform', url: '#', visible: true }]);
    setHasChanges(true);
  };

  const removeSocial = (id: string) => {
    setSocials(prev => prev.filter(s => s.id !== id));
    setHasChanges(true);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-white mb-1">Site Settings</h2>
        <p className="text-xs text-white/40">SEO, maintenance mode, social links, data management, and advanced settings.</p>
      </div>

      <div className="space-y-6">
        {/* SEO */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-champagne-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">SEO</h3>
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Page Title</label>
            <input
              type="text"
              value={settings.seoTitle}
              onChange={(e) => updateSettings('seoTitle', e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Meta Description</label>
            <textarea
              rows={2}
              value={settings.seoDescription}
              onChange={(e) => updateSettings('seoDescription', e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className={`border rounded-2xl p-6 space-y-5 transition-all ${settings.maintenanceMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-white/[0.02] border-white/[0.06]'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-champagne-400" />
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Maintenance Mode</h3>
              {settings.maintenanceMode && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-500/20 text-amber-400">Active</span>
              )}
            </div>
            <button
              onClick={() => updateSettings('maintenanceMode', !settings.maintenanceMode)}
              className={`transition-colors ${settings.maintenanceMode ? 'text-amber-400' : 'text-white/30'}`}
            >
              {settings.maintenanceMode ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
            </button>
          </div>
          {settings.maintenanceMode && (
            <div>
              <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Maintenance Message</label>
              <textarea
                rows={2}
                value={settings.maintenanceMessage}
                onChange={(e) => updateSettings('maintenanceMessage', e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
              />
              <p className="text-[10px] text-amber-400/60 mt-2">⚠️ Visitors will see this message. Admins can still access the site.</p>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-champagne-400" />
              <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30">Social Links</h3>
            </div>
            <button
              onClick={addSocial}
              className="flex items-center gap-1 text-[10px] text-champagne-400 hover:text-champagne-300 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {socials.length === 0 ? (
            <p className="text-xs text-white/20 text-center py-4">No social links. Click "Add" to create one.</p>
          ) : (
            socials.map(social => (
              <div key={social.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => updateSocial(social.id, { platform: e.target.value })}
                  className="w-28 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  placeholder="Platform"
                />
                <input
                  type="text"
                  value={social.url}
                  onChange={(e) => updateSocial(social.id, { url: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  placeholder="URL"
                />
                <button
                  onClick={() => updateSocial(social.id, { visible: !social.visible })}
                  className={`p-1.5 rounded-lg transition-colors ${social.visible ? 'text-green-400' : 'text-red-400'}`}
                  title={social.visible ? 'Visible' : 'Hidden'}
                >
                  {social.visible ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => removeSocial(social.id)}
                  className="p-1.5 rounded-lg text-red-400/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Custom CSS */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">Custom CSS</h3>
          <textarea
            rows={4}
            value={settings.customCss}
            onChange={(e) => updateSettings('customCss', e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
            placeholder="/* Add custom CSS here */"
          />
          <p className="text-[9px] text-white/20">Advanced: Add custom CSS to override website styles.</p>
        </div>

        {/* Data Management */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" /> Export Backup
            </button>
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" /> Import Backup
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-red-400">Danger Zone</h3>
          </div>
          <p className="text-xs text-white/30 mb-4">Reset all website data to factory defaults. This action cannot be undone.</p>
          <button
            onClick={handleFactoryReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Factory Reset
          </button>
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
          {saved ? 'Saved!' : hasChanges ? 'Save All Settings' : 'No Changes'}
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
