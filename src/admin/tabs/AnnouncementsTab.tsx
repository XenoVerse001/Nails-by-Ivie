import { useState, useEffect } from 'react';
import { SiteData, Announcement, generateId } from '../../store/siteData';
import { Save, Plus, Trash2, ToggleLeft, ToggleRight, CheckCircle, RotateCcw, Megaphone } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function AnnouncementsTab({ siteData, onUpdate }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([...siteData.announcements]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setAnnouncements([...siteData.announcements]);
    setHasChanges(false);
  }, [siteData.announcements]);

  const handleSave = () => {
    onUpdate({ ...siteData, announcements });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setAnnouncements([...siteData.announcements]);
    setHasChanges(false);
  };

  const addAnnouncement = () => {
    const newItem: Announcement = {
      id: generateId(),
      title: 'New Announcement',
      message: 'Write your announcement here...',
      type: 'info',
      active: true,
      createdAt: new Date().toISOString(),
    };
    setAnnouncements(prev => [newItem, ...prev]);
    setHasChanges(true);
  };

  const update = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    setHasChanges(true);
  };

  const remove = (id: string) => {
    if (confirm('Delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      setHasChanges(true);
    }
  };

  const typeColors = {
    info: { bg: 'bg-blue-500/10 border-blue-500/20', badge: 'bg-blue-500/20 text-blue-400' },
    promo: { bg: 'bg-amber-500/10 border-amber-500/20', badge: 'bg-amber-500/20 text-amber-400' },
    urgent: { bg: 'bg-red-500/10 border-red-500/20', badge: 'bg-red-500/20 text-red-400' },
  };

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Announcements</h2>
          <p className="text-xs text-white/40">Create announcements that show as banners on your website.</p>
        </div>
        <button
          onClick={addAnnouncement}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> New Announcement
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/[0.1] rounded-2xl p-12 text-center">
          <Megaphone className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-sm text-white/30 mb-2">No announcements yet</p>
          <p className="text-xs text-white/20 mb-4">Create one to display a banner on your site</p>
          <button
            onClick={addAnnouncement}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3 h-3" /> Create announcement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map(item => {
            const colors = typeColors[item.type];
            return (
              <div key={item.id} className={`border rounded-2xl p-5 transition-all ${item.active ? colors.bg : 'bg-white/[0.02] border-white/[0.06] opacity-60'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => update(item.id, { active: !item.active })}
                      className={`transition-colors ${item.active ? 'text-green-400' : 'text-white/30'}`}
                      title={item.active ? 'Active - Click to deactivate' : 'Inactive - Click to activate'}
                    >
                      {item.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wider uppercase ${colors.badge}`}>
                      {item.active ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white/20">{new Date(item.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => remove(item.id)}
                      className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => update(item.id, { title: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Message</label>
                    <textarea
                      rows={2}
                      value={item.message}
                      onChange={(e) => update(item.id, { message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Type</label>
                    <div className="flex gap-2">
                      {(['info', 'promo', 'urgent'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => update(item.id, { type })}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                            item.type === type
                              ? typeColors[type].badge + ' ring-1 ring-offset-1 ring-offset-transparent ring-current'
                              : 'bg-white/5 text-white/40 hover:bg-white/10'
                          }`}
                        >
                          {type === 'info' && 'ℹ️ Info'}
                          {type === 'promo' && '🎉 Promo'}
                          {type === 'urgent' && '⚠️ Urgent'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Save bar */}
      {announcements.length > 0 && (
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
          <span className="text-[10px] text-white/20 ml-auto">{announcements.filter(a => a.active).length} active</span>
        </div>
      )}
    </div>
  );
}
