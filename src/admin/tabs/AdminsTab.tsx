import { useState, useEffect } from 'react';
import { SiteData, AdminUser, simpleHash, getLoggedInAdmin } from '../../store/siteData';
import { Save, Trash2, Shield, ShieldCheck, CheckCircle, RotateCcw, Key, UserPlus } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function AdminsTab({ siteData, onUpdate }: Props) {
  const [admins, setAdmins] = useState<AdminUser[]>([...siteData.admins]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'admin' as AdminUser['role'] });
  const [showAdd, setShowAdd] = useState(false);
  const [changePassFor, setChangePassFor] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const currentAdmin = getLoggedInAdmin();

  useEffect(() => {
    setAdmins([...siteData.admins]);
    setHasChanges(false);
  }, [siteData.admins]);

  const handleSave = () => {
    onUpdate({ ...siteData, admins });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setAdmins([...siteData.admins]);
    setHasChanges(false);
    setShowAdd(false);
    setNewUser({ username: '', password: '', role: 'admin' });
  };

  const addAdmin = () => {
    if (!newUser.username.trim() || !newUser.password.trim()) {
      alert('Please enter both username and password');
      return;
    }
    if (admins.find(a => a.username.toLowerCase() === newUser.username.toLowerCase())) {
      alert('Username already exists');
      return;
    }
    const admin: AdminUser = {
      username: newUser.username.trim(),
      passwordHash: simpleHash(newUser.password),
      role: newUser.role,
      createdAt: new Date().toISOString(),
    };
    setAdmins(prev => [...prev, admin]);
    setNewUser({ username: '', password: '', role: 'admin' });
    setShowAdd(false);
    setHasChanges(true);
  };

  const removeAdmin = (username: string) => {
    if (username === currentAdmin?.username) {
      alert("You can't remove yourself!");
      return;
    }
    if (admins.length <= 1) {
      alert("You can't remove the last admin!");
      return;
    }
    if (confirm(`Remove admin "${username}"? They will lose access to the admin panel.`)) {
      setAdmins(prev => prev.filter(a => a.username !== username));
      setHasChanges(true);
    }
  };

  const changePassword = (username: string) => {
    if (!newPassword.trim()) {
      alert('Please enter a new password');
      return;
    }
    setAdmins(prev => prev.map(a =>
      a.username === username ? { ...a, passwordHash: simpleHash(newPassword) } : a
    ));
    setChangePassFor(null);
    setNewPassword('');
    setHasChanges(true);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Admin Users</h2>
          <p className="text-xs text-white/40">Manage who has access to this admin panel.</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] transition-transform active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" /> Add Admin
        </button>
      </div>

      {/* Add new admin form */}
      {showAdd && (
        <div className="bg-champagne-400/5 border border-champagne-400/20 rounded-2xl p-5 mb-6">
          <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-champagne-400/60 mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> New Admin User
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Username</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Password</label>
              <input
                type="text"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                placeholder="password"
              />
            </div>
            <div>
              <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminUser['role'] })}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all cursor-pointer"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addAdmin}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-champagne-400/20 text-champagne-300 hover:bg-champagne-400/30 transition-colors"
            >
              Create Admin
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewUser({ username: '', password: '', role: 'admin' }); }}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Admin list */}
      <div className="space-y-3">
        {admins.map(admin => (
          <div key={admin.username} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nude-400/20 to-rose-gold-400/20 flex items-center justify-center shrink-0">
                {admin.role === 'superadmin' ? (
                  <ShieldCheck className="w-5 h-5 text-champagne-400" />
                ) : (
                  <Shield className="w-5 h-5 text-white/40" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 flex items-center gap-2">
                  {admin.username}
                  {admin.username === currentAdmin?.username && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">You</span>
                  )}
                </p>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{admin.role} · Added {new Date(admin.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChangePassFor(changePassFor === admin.username ? null : admin.username)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 transition-all"
                >
                  <Key className="w-3 h-3" />
                  Password
                </button>
                {admin.username !== currentAdmin?.username && (
                  <button
                    onClick={() => removeAdmin(admin.username)}
                    className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove admin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Change password form */}
            {changePassFor === admin.username && (
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                />
                <button
                  onClick={() => changePassword(admin.username)}
                  className="px-3 py-2 rounded-lg text-[10px] font-semibold bg-champagne-400/20 text-champagne-300 hover:bg-champagne-400/30 transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={() => { setChangePassFor(null); setNewPassword(''); }}
                  className="px-3 py-2 rounded-lg text-[10px] font-medium bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
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
        <span className="text-[10px] text-white/20 ml-auto">{admins.length} admin{admins.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
