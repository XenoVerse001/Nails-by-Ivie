import { useState, useEffect, useCallback } from 'react';
import { loadSiteData, saveSiteData, getLoggedInAdmin, logoutAdmin, type SiteData } from './store/siteData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import AnnouncementBanner from './components/AnnouncementBanner';
import MaintenancePage from './components/MaintenancePage';
import MaintenanceAdminBar from './components/MaintenanceAdminBar';
import SplashScreen from './components/SplashScreen';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import AdminQuickAccess from './components/AdminQuickAccess';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

type View = 'site' | 'admin-login' | 'admin-dashboard';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(loadSiteData());
  const [view, setView] = useState<View>('site');
  const [previewAsVisitor, setPreviewAsVisitor] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Hide splash after load
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Update document title from SEO settings
  useEffect(() => {
    document.title = siteData.siteSettings.seoTitle || 'Nails By Ivie';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', siteData.siteSettings.seoDescription || '');
  }, [siteData.siteSettings.seoTitle, siteData.siteSettings.seoDescription]);

  // Load theme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('nailsbyivie-theme');
    setIsDark(saved ? saved === 'dark' : prefersDark);
  }, []);

  // Check for admin route — uses a secret hash that no visitor would guess
  useEffect(() => {
    const checkAdmin = () => {
      const hash = window.location.hash;
      // Only trigger on very specific secret paths
      if (hash === '#/ivie-admin' || hash === '#ivie-admin') {
        const logged = getLoggedInAdmin();
        setView(logged ? 'admin-dashboard' : 'admin-login');
        // Clean the hash so it's not visible in the URL bar
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  // Secret keyboard shortcut: Ctrl+Shift+A opens admin (desktop only)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdmin();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ── Helpers ──────────────────────────────────────
  const openAdmin = useCallback(() => {
    const logged = getLoggedInAdmin();
    setView(logged ? 'admin-dashboard' : 'admin-login');
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('nailsbyivie-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleDataUpdate = useCallback((data: SiteData) => {
    setSiteData(data);
    saveSiteData(data);
  }, []);

  const handleFormSubmission = useCallback((submission: SiteData['submissions'][0]) => {
    const updated = { ...siteData, submissions: [submission, ...siteData.submissions] };
    setSiteData(updated);
    saveSiteData(updated);
  }, [siteData]);

  const handleLogout = useCallback(() => {
    logoutAdmin();
    setView('site');
  }, []);

  // Inject custom CSS
  useEffect(() => {
    let style = document.getElementById('custom-admin-css') as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = 'custom-admin-css';
      document.head.appendChild(style);
    }
    style.textContent = siteData.siteSettings.customCss || '';
  }, [siteData.siteSettings.customCss]);

  // Reset visitor preview when leaving site view
  useEffect(() => {
    if (view !== 'site') setPreviewAsVisitor(false);
  }, [view]);

  // Get admin info
  const admin = getLoggedInAdmin();
  const isMaintenanceOn = siteData.siteSettings.maintenanceMode;

  // ── Splash screen ────────────────────────────────
  if (showSplash && view === 'site' && !admin) {
    return <SplashScreen isVisible={true} brandName={siteData.branding.brandName} logoUrl={siteData.branding.logoUrl} />;
  }

  // ── Admin views ──────────────────────────────────
  if (view === 'admin-login') {
    return (
      <AdminLogin
        siteData={siteData}
        onLogin={() => setView('admin-dashboard')}
        onBack={() => { setView('site'); window.location.hash = ''; }}
      />
    );
  }

  if (view === 'admin-dashboard') {
    return (
      <AdminDashboard
        siteData={siteData}
        onUpdate={handleDataUpdate}
        onLogout={() => setView('admin-login')}
        onPreview={() => setView('site')}
      />
    );
  }

  // ── Maintenance mode ─────────────────────────────
  if (isMaintenanceOn && !admin) {
    return <MaintenancePage siteData={siteData} />;
  }

  if (isMaintenanceOn && admin && previewAsVisitor) {
    return (
      <div>
        <MaintenanceAdminBar
          mode="visitor-preview"
          onBackToSite={() => setPreviewAsVisitor(false)}
          onGoToAdmin={() => setView('admin-dashboard')}
        />
        <div className="pt-10">
          <MaintenancePage siteData={siteData} />
        </div>
      </div>
    );
  }

  // ── Public website ───────────────────────────────
  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-luxury-black text-white' : 'bg-white text-luxury-black'
    }`}>
      <SplashScreen isVisible={showSplash} brandName={siteData.branding.brandName} logoUrl={siteData.branding.logoUrl} />
      <ScrollProgress />

      {isMaintenanceOn && admin && (
        <MaintenanceAdminBar
          mode="admin-viewing"
          onPreviewAsVisitor={() => setPreviewAsVisitor(true)}
          onGoToAdmin={() => setView('admin-dashboard')}
        />
      )}

      <div className={isMaintenanceOn && admin ? 'pt-10' : ''}>
        <AnnouncementBanner announcements={siteData.announcements} isDark={isDark} />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} siteData={siteData} />
        <Hero isDark={isDark} siteData={siteData} />
        <About isDark={isDark} siteData={siteData} />
        <Services isDark={isDark} siteData={siteData} />
        <Gallery isDark={isDark} siteData={siteData} />
        <Testimonials isDark={isDark} siteData={siteData} />
        <Contact isDark={isDark} siteData={siteData} onSubmit={handleFormSubmission} />
        <Footer isDark={isDark} siteData={siteData} onAdminAccess={openAdmin} />
      </div>

      <FloatingButtons siteData={siteData} />
      <ScrollToTop isDark={isDark} />

      {admin && !isMaintenanceOn && (
        <AdminQuickAccess
          adminName={admin.username}
          onGoToAdmin={() => setView('admin-dashboard')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
