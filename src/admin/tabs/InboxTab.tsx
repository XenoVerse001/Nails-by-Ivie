import { useState } from 'react';
import { SiteData } from '../../store/siteData';
import { Trash2, Mail, MailOpen, CheckCheck, Trash } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function InboxTab({ siteData, onUpdate }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const markRead = (id: string) => {
    const updated = {
      ...siteData,
      submissions: siteData.submissions.map(s => s.id === id ? { ...s, read: true } : s),
    };
    onUpdate(updated);
  };

  const markAllRead = () => {
    const updated = {
      ...siteData,
      submissions: siteData.submissions.map(s => ({ ...s, read: true })),
    };
    onUpdate(updated);
  };

  const deleteSubmission = (id: string) => {
    if (confirm('Delete this message?')) {
      const updated = {
        ...siteData,
        submissions: siteData.submissions.filter(s => s.id !== id),
      };
      if (selectedId === id) setSelectedId(null);
      onUpdate(updated);
    }
  };

  const clearAll = () => {
    if (confirm('Delete ALL messages? This cannot be undone.')) {
      onUpdate({ ...siteData, submissions: [] });
      setSelectedId(null);
    }
  };

  const selected = siteData.submissions.find(s => s.id === selectedId);
  const unread = siteData.submissions.filter(s => !s.read).length;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">
            Inbox
            {unread > 0 && <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-rose-gold-400/20 text-rose-gold-300">{unread} unread</span>}
          </h2>
          <p className="text-xs text-white/40">Contact form submissions from your website visitors.</p>
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-medium bg-white/5 text-white/50 hover:bg-white/10 transition-all">
              <CheckCheck className="w-3 h-3" /> Mark All Read
            </button>
          )}
          {siteData.submissions.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
              <Trash className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>
      </div>

      {siteData.submissions.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-16 text-center">
          <Mail className="w-10 h-10 text-white/10 mx-auto mb-3" />
          <p className="text-sm text-white/30">No messages yet.</p>
          <p className="text-xs text-white/15 mt-1">Submissions from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {siteData.submissions.map(sub => (
              <button
                key={sub.id}
                onClick={() => { setSelectedId(sub.id); markRead(sub.id); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedId === sub.id
                    ? 'bg-champagne-400/5 border-champagne-400/20'
                    : sub.read
                      ? 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.03]'
                      : 'bg-white/[0.03] border-champagne-400/10 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {sub.read ? (
                    <MailOpen className="w-3 h-3 text-white/20 shrink-0" />
                  ) : (
                    <Mail className="w-3 h-3 text-champagne-400 shrink-0" />
                  )}
                  <p className={`text-xs font-medium truncate ${sub.read ? 'text-white/60' : 'text-white/90'}`}>{sub.name}</p>
                </div>
                <p className="text-[10px] text-white/25 truncate pl-5">{sub.message || sub.service || sub.email}</p>
                <p className="text-[9px] text-white/15 pl-5 mt-1">{new Date(sub.date).toLocaleString()}</p>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-white">{selected.name}</h3>
                    <p className="text-xs text-white/30 mt-0.5">{new Date(selected.date).toLocaleString()}</p>
                  </div>
                  <button onClick={() => deleteSubmission(selected.id)} className="p-2 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-1">Email</p>
                      <a href={`mailto:${selected.email}`} className="text-sm text-champagne-300 hover:underline">{selected.email}</a>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-1">Phone</p>
                      <p className="text-sm text-white/70">{selected.phone || '—'}</p>
                    </div>
                  </div>
                  {selected.service && (
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-1">Service Requested</p>
                      <p className="text-sm text-white/70">{selected.service}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/25 mb-1">Message</p>
                    <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">{selected.message || 'No message provided.'}</p>
                  </div>

                  {/* Quick Reply */}
                  <div className="pt-4 border-t border-white/[0.06] flex gap-2">
                    <a
                      href={`mailto:${selected.email}?subject=Re: Your Nails By Ivie Inquiry`}
                      className="px-4 py-2 rounded-lg text-xs font-medium bg-champagne-400/10 text-champagne-300 hover:bg-champagne-400/20 transition-colors"
                    >
                      Reply via Email
                    </a>
                    {selected.phone && (
                      <a
                        href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-16 text-center">
                <Mail className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-xs text-white/20">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
