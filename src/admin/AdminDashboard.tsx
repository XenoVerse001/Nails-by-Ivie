import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Palette, FileText, Layers, Image, MessageSquare,
  Phone, Megaphone, Users, Settings, LogOut, ChevronRight, Menu, X,
  Eye, Bell, Inbox
} from 'lucide-react';
import { SiteData, logoutAdmin, getLoggedInAdmin } from '../store/siteData';
import BrandingTab from './tabs/BrandingTab';
import AboutTab from './tabs/AboutTab';
import ServicesTab from './tabs/ServicesTab';
import GalleryTab from './tabs/GalleryTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import ContactTab from './tabs/ContactTab';
import AnnouncementsTab from './tabs/AnnouncementsTab';
import AdminsTab from './tabs/AdminsTab';
import SettingsTab from './tabs/SettingsTab';
import InboxTab from './tabs/InboxTab';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
  onLogout: () => void;
  onPreview: () => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'about', label: 'About', icon: FileText },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'admins', label: 'Admin Users', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard({ siteData, onUpdate, onLogout, onPreview }: Props) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const admin = getLoggedInAdmin();

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  const unreadCount = siteData.submissions.filter(s => !s.read).length;
  const activeAnnouncements = siteData.announcements.filter(a => a.active).length;

  const renderTab = () => {
    switch (activeTab) {
      case 'branding': return <BrandingTab siteData={siteData} onUpdate={onUpdate} />;
      case 'about': return <AboutTab siteData={siteData} onUpdate={onUpdate} />;
      case 'services': return <ServicesTab siteData={siteData} onUpdate={onUpdate} />;
      case 'gallery': return <GalleryTab siteData={siteData} onUpdate={onUpdate} />;
      case 'testimonials': return <TestimonialsTab siteData={siteData} onUpdate={onUpdate} />;
      case 'contact': return <ContactTab siteData={siteData} onUpdate={onUpdate} />;
      case 'announcements': return <AnnouncementsTab siteData={siteData} onUpdate={onUpdate} />;
      case 'inbox': return <InboxTab siteData={siteData} onUpdate={onUpdate} />;
      case 'admins': return <AdminsTab siteData={siteData} onUpdate={onUpdate} />;
      case 'settings': return <SettingsTab siteData={siteData} onUpdate={onUpdate} />;
      default: return <OverviewPanel siteData={siteData} setActiveTab={setActiveTab} unreadCount={unreadCount} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0f] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#111115] border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-sm font-semibold tracking-[0.15em] text-champagne-400">ADMIN PANEL</h2>
              <p className="text-[10px] text-white/30 mt-0.5 tracking-wide">Nails By Ivie</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-nude-400/15 to-rose-gold-400/10 text-champagne-300 border border-nude-400/20'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-champagne-400' : ''}`} />
              <span className="tracking-wide">{tab.label}</span>
              {tab.id === 'inbox' && unreadCount > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-rose-gold-400 text-white text-[9px] font-bold flex items-center justify-center">{unreadCount}</span>
              )}
              {tab.id === 'announcements' && activeAnnouncements > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-champagne-400/30 text-champagne-300 text-[9px] font-bold flex items-center justify-center">{activeAnnouncements}</span>
              )}
              <ChevronRight className={`w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === tab.id ? 'opacity-100' : ''}`} />
            </button>
          ))}
        </nav>

        {/* Bottom user section */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nude-400 to-rose-gold-400 flex items-center justify-center text-[10px] font-bold text-white">
              {admin?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">{admin?.username}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-wider">{admin?.role}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPreview}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-medium bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all tracking-wide"
            >
              <Eye className="w-3 h-3" /> Preview
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all tracking-wide"
            >
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0c0c0f]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/50">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold tracking-wide text-white/90">
              {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={() => setActiveTab('inbox')}
                className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Bell className="w-4 h-4 text-white/50" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-gold-400 text-[8px] font-bold flex items-center justify-center">{unreadCount}</span>
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Overview Panel ──────────────────────────────────────────────────
function OverviewPanel({ siteData, setActiveTab, unreadCount }: { siteData: SiteData; setActiveTab: (t: string) => void; unreadCount: number }) {
  const cards = [
    { label: 'Services', value: siteData.services.filter(s => s.visible).length.toString(), total: siteData.services.length + ' total', color: 'from-blue-500/20 to-blue-600/10', icon: Layers, tab: 'services' },
    { label: 'Gallery Images', value: siteData.gallery.filter(g => g.visible).length.toString(), total: siteData.gallery.length + ' total', color: 'from-purple-500/20 to-purple-600/10', icon: Image, tab: 'gallery' },
    { label: 'Testimonials', value: siteData.testimonials.filter(t => t.visible).length.toString(), total: siteData.testimonials.length + ' total', color: 'from-green-500/20 to-green-600/10', icon: MessageSquare, tab: 'testimonials' },
    { label: 'Unread Messages', value: unreadCount.toString(), total: siteData.submissions.length + ' total', color: 'from-rose-gold-400/20 to-nude-400/10', icon: Inbox, tab: 'inbox' },
    { label: 'Announcements', value: siteData.announcements.filter(a => a.active).length.toString(), total: siteData.announcements.length + ' total', color: 'from-amber-500/20 to-amber-600/10', icon: Megaphone, tab: 'announcements' },
    { label: 'Admin Users', value: siteData.admins.length.toString(), total: '', color: 'from-cyan-500/20 to-cyan-600/10', icon: Users, tab: 'admins' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-white mb-1">Welcome back 👋</h2>
        <p className="text-sm text-white/40">Here's what's happening with your website.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(card => (
          <button
            key={card.label}
            onClick={() => setActiveTab(card.tab)}
            className={`text-left p-5 rounded-2xl bg-gradient-to-br ${card.color} border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-3">
              <card.icon className="w-5 h-5 text-white/30" />
              <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
            </div>
            <p className="text-2xl font-heading font-bold text-white">{card.value}</p>
            <p className="text-[10px] text-white/40 tracking-wider uppercase mt-1">{card.label}</p>
            {card.total && <p className="text-[9px] text-white/20 mt-0.5">{card.total}</p>}
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Edit Branding', tab: 'branding', icon: Palette },
            { label: 'Manage Gallery', tab: 'gallery', icon: Image },
            { label: 'View Messages', tab: 'inbox', icon: Inbox },
            { label: 'Site Settings', tab: 'settings', icon: Settings },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => setActiveTab(action.tab)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-xs text-white/60 hover:text-white/90"
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent submissions */}
      {siteData.submissions.length > 0 && (
        <div className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {siteData.submissions.slice(0, 5).map(sub => (
              <div key={sub.id} className={`flex items-center gap-3 p-3 rounded-xl ${sub.read ? 'bg-white/[0.02]' : 'bg-champagne-400/5 border border-champagne-400/10'}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${sub.read ? 'bg-white/20' : 'bg-champagne-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/80 truncate">{sub.name}</p>
                  <p className="text-[10px] text-white/30 truncate">{sub.message || sub.service}</p>
                </div>
                <p className="text-[9px] text-white/20 shrink-0">{new Date(sub.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
