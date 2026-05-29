import { AlertTriangle, Eye, ArrowLeft, Settings } from 'lucide-react';

interface Props {
  mode: 'admin-viewing' | 'visitor-preview';
  onPreviewAsVisitor?: () => void;
  onBackToSite?: () => void;
  onGoToAdmin: () => void;
}

export default function MaintenanceAdminBar({ mode, onPreviewAsVisitor, onBackToSite, onGoToAdmin }: Props) {
  if (mode === 'visitor-preview') {
    // Shown on top of the maintenance page when admin clicks "Preview as Visitor"
    return (
      <div className="fixed top-0 left-0 right-0 z-[200] bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Eye className="w-4 h-4 text-blue-200 shrink-0" />
            <p className="text-xs text-blue-100 font-medium truncate">
              <span className="font-semibold">Visitor Preview</span> — This is what your visitors currently see
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Site
            </button>
            <button
              onClick={onGoToAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-white text-blue-700 hover:bg-blue-50 transition-colors"
            >
              <Settings className="w-3 h-3" />
              Admin Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // mode === 'admin-viewing' — Shown on top of the regular site when maintenance is ON
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <AlertTriangle className="w-4 h-4 text-amber-100 shrink-0" />
          <p className="text-xs text-amber-50 font-medium truncate">
            <span className="font-semibold">Maintenance Mode is ON</span> — Only you (admin) can see the site right now. Visitors see the maintenance page.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPreviewAsVisitor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <Eye className="w-3 h-3" />
            See Visitor View
          </button>
          <button
            onClick={onGoToAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-white text-amber-700 hover:bg-amber-50 transition-colors"
          >
            <Settings className="w-3 h-3" />
            Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}
