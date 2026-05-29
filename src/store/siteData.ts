// ─── Types ───────────────────────────────────────────────────────────
export interface SiteBranding {
  brandName: string;
  tagline: string;
  heroSubtitle: string;
  heroImage: string;
  aboutImage: string;
  logoUrl: string;
  logoText: string;
  headingFont: string;
  bodyFont: string;
  primaryColor: string;
  accentColor: string;
}

export interface AboutData {
  sectionTitle: string;
  sectionHighlight: string;
  paragraph1: string;
  paragraph2: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  visible: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  visible: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  visible: boolean;
}

export interface ContactData {
  address: string;
  addressLink: string;
  phone: string;
  phoneLink: string;
  hours: string;
  instagram: string;
  instagramLink: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'promo' | 'urgent';
  active: boolean;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  visible: boolean;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
  role: 'superadmin' | 'admin';
  createdAt: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteData {
  branding: SiteBranding;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryImage[];
  testimonials: TestimonialItem[];
  contact: ContactData;
  announcements: Announcement[];
  socialLinks: SocialLink[];
  admins: AdminUser[];
  submissions: FormSubmission[];
  siteSettings: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    seoTitle: string;
    seoDescription: string;
    customCss: string;
  };
}

// ─── Simple hash (for demo — NOT production-secure) ────────────────
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

// ─── Default Data ──────────────────────────────────────────────────
export const defaultSiteData: SiteData = {
  branding: {
    brandName: 'NAILS BY IVIE',
    tagline: 'Luxury Nails. Timeless Beauty.',
    heroSubtitle: 'Premium Nail Artistry',
    heroImage: '/images/hero-bg.jpg',
    aboutImage: '/images/about.jpg',
    logoUrl: 'https://i.postimg.cc/0NW51G3y/Zh9c-F.jpg',
    logoText: 'NAILS BY IVIE',
    headingFont: "'Playfair Display', serif",
    bodyFont: "'Montserrat', sans-serif",
    primaryColor: '#E5916C',
    accentColor: '#D4736A',
  },
  about: {
    sectionTitle: 'Where Beauty Meets',
    sectionHighlight: 'Artistry',
    paragraph1: 'Welcome to <strong>Nails By Ivie</strong> — a women-owned nail salon in Lagos dedicated to premium nail artistry, beauty, and self-care. We believe every woman deserves to feel luxurious, confident, and beautiful.',
    paragraph2: 'Our talented team of nail artists combines international techniques with creative artistry to deliver stunning, Instagram-worthy nails. From classic elegance to bold, trendsetting designs — we craft every set with precision, passion, and premium products.',
    stat1Label: 'Happy Clients',
    stat1Value: '2,000+',
    stat2Label: 'Years of Excellence',
    stat2Value: '5+',
    stat3Label: 'Nail Designs',
    stat3Value: '500+',
  },
  services: [
    { id: '1', icon: 'Gem', title: 'Acrylic Nails', description: 'Premium acrylic extensions with flawless finish and lasting durability.', price: 'From ₦15,000', visible: true },
    { id: '2', icon: 'Droplets', title: 'Gel Polish', description: 'High-shine gel polish application with chip-resistant, glossy results.', price: 'From ₦8,000', visible: true },
    { id: '3', icon: 'Sparkles', title: 'Pedicure', description: 'Luxurious pedicure treatments for perfectly polished, pampered feet.', price: 'From ₦10,000', visible: true },
    { id: '4', icon: 'Hand', title: 'Manicure', description: 'Classic to luxury manicures with meticulous nail shaping and care.', price: 'From ₦7,000', visible: true },
    { id: '5', icon: 'Palette', title: 'Nail Art', description: 'Custom artistic designs from minimalist elegance to bold statements.', price: 'From ₦5,000', visible: true },
    { id: '6', icon: 'Wrench', title: 'Nail Repair', description: 'Expert nail repair and restoration to bring damaged nails back to life.', price: 'From ₦3,000', visible: true },
    { id: '7', icon: 'Crown', title: 'Luxury Nail Sets', description: 'Premium custom press-on nail sets crafted for special occasions.', price: 'From ₦20,000', visible: true },
  ],
  gallery: [
    { id: '1', src: '/images/gallery1.jpg', alt: 'Luxury nude pink acrylic nails', visible: true },
    { id: '2', src: 'https://images.pexels.com/photos/3997384/pexels-photo-3997384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Professional red manicure', visible: true },
    { id: '3', src: '/images/gallery2.jpg', alt: 'Elegant burgundy nail art', visible: true },
    { id: '4', src: 'https://images.pexels.com/photos/34871595/pexels-photo-34871595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Red and white nail design', visible: true },
    { id: '5', src: '/images/gallery3.jpg', alt: 'Modern French tip nails', visible: true },
    { id: '6', src: 'https://images.pexels.com/photos/5484948/pexels-photo-5484948.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Detailed nail art session', visible: true },
    { id: '7', src: '/images/gallery4.jpg', alt: 'Marble nail art design', visible: true },
    { id: '8', src: 'https://images.pexels.com/photos/10420563/pexels-photo-10420563.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Blue manicured nails with rings', visible: true },
  ],
  testimonials: [
    { id: '1', name: 'Chioma A.', role: 'Regular Client', text: 'Nails By Ivie is absolutely incredible! Every single time I visit, my nails come out looking like a work of art. The attention to detail is unmatched and the salon ambiance makes you feel so pampered.', rating: 5, visible: true },
    { id: '2', name: 'Adaeze N.', role: 'Bridal Client', text: "I got my bridal nails done here and they were absolutely STUNNING! Ivie understood my vision perfectly and created the most elegant nail set for my wedding day. I couldn't stop staring at my hands!", rating: 5, visible: true },
    { id: '3', name: 'Blessing O.', role: 'Loyal Client', text: 'The best nail salon in Lagos, hands down! The quality of their acrylics is amazing — they last for weeks without lifting. The hygiene standards are top-notch and the staff is so welcoming.', rating: 5, visible: true },
    { id: '4', name: 'Funke D.', role: 'First-time Client', text: "My friend recommended Nails By Ivie and I'm so glad she did! The experience was luxurious from start to finish. My gel nails were perfect and the nail art design was exactly what I wanted.", rating: 5, visible: true },
    { id: '5', name: 'Tolu K.', role: 'VIP Client', text: "I've been to many nail salons across Lagos and internationally, and Nails By Ivie competes with the very best. The premium service, beautiful designs, and warm atmosphere keep me coming back every time.", rating: 5, visible: true },
  ],
  contact: {
    address: 'M7C3+44G, Old Ota Rd, Alagbado, Lagos 102213, Lagos',
    addressLink: 'https://maps.google.com/?q=M7C3+44G,+Old+Ota+Rd,+Alagbado,+Lagos+102213',
    phone: '0913 465 5114',
    phoneLink: 'tel:09134655114',
    hours: 'Open Daily — Closes 6:30 PM',
    instagram: '@nailsbyivie',
    instagramLink: 'https://instagram.com',
    whatsappNumber: '2349134655114',
    whatsappMessage: "Hello Nails By Ivie! I'd like to book an appointment.",
  },
  announcements: [],
  socialLinks: [
    { id: '1', platform: 'Instagram', url: 'https://instagram.com', visible: true },
    { id: '2', platform: 'TikTok', url: '#', visible: true },
    { id: '3', platform: 'Twitter', url: '#', visible: true },
    { id: '4', platform: 'Facebook', url: '#', visible: true },
  ],
  admins: [
    {
      username: 'ivie',
      passwordHash: simpleHash('NailsByIvie2024!'),
      role: 'superadmin',
      createdAt: new Date().toISOString(),
    },
  ],
  submissions: [],
  siteSettings: {
    maintenanceMode: false,
    maintenanceMessage: 'We are currently updating our website. Please check back soon!',
    seoTitle: 'Nails By Ivie — Luxury Nails. Timeless Beauty.',
    seoDescription: 'Premium nail salon in Lagos, Nigeria. Acrylic nails, gel polish, nail art & luxury nail sets.',
    customCss: '',
  },
};

// ─── LocalStorage helpers ────────────────────────────────────────────
const STORAGE_KEY = 'nailsbyivie_sitedata';

export function loadSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to fill any missing keys from updates
      return { ...defaultSiteData, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaultSiteData;
}

export function saveSiteData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetSiteData(): SiteData {
  localStorage.removeItem(STORAGE_KEY);
  return defaultSiteData;
}

// ─── Auth helpers ────────────────────────────────────────────────────
const AUTH_KEY = 'nailsbyivie_auth';

export function loginAdmin(data: SiteData, username: string, password: string): boolean {
  const hash = simpleHash(password);
  const admin = data.admins.find(a => a.username.toLowerCase() === username.toLowerCase() && a.passwordHash === hash);
  if (admin) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ username: admin.username, role: admin.role, ts: Date.now() }));
    return true;
  }
  return false;
}

export function getLoggedInAdmin(): { username: string; role: string } | null {
  try {
    const stored = sessionStorage.getItem(AUTH_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Session valid for 8 hours
      if (Date.now() - parsed.ts < 8 * 60 * 60 * 1000) {
        return { username: parsed.username, role: parsed.role };
      }
      sessionStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // ignore
  }
  return null;
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
