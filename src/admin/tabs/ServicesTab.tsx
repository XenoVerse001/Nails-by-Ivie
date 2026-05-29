import { useState, useEffect } from 'react';
import { SiteData, ServiceItem, generateId } from '../../store/siteData';
import { Save, Plus, Trash2, Eye, EyeOff, GripVertical, CheckCircle, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

const iconOptions = ['Gem', 'Droplets', 'Sparkles', 'Hand', 'Palette', 'Wrench', 'Crown', 'Star', 'Heart', 'Scissors', 'Flower'];

export default function ServicesTab({ siteData, onUpdate }: Props) {
  const [services, setServices] = useState<ServiceItem[]>([...siteData.services]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setServices([...siteData.services]);
    setHasChanges(false);
  }, [siteData.services]);

  const handleSave = () => {
    onUpdate({ ...siteData, services });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setServices([...siteData.services]);
    setHasChanges(false);
  };

  const addService = () => {
    const newService: ServiceItem = {
      id: generateId(),
      icon: 'Sparkles',
      title: 'New Service',
      description: 'Describe this service...',
      price: 'From ₦0',
      visible: true,
    };
    setServices(prev => [...prev, newService]);
    setHasChanges(true);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    setHasChanges(true);
  };

  const deleteService = (id: string) => {
    if (confirm('Delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== id));
      setHasChanges(true);
    }
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;
    const newServices = [...services];
    [newServices[index], newServices[newIndex]] = [newServices[newIndex], newServices[index]];
    setServices(newServices);
    setHasChanges(true);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Services</h2>
          <p className="text-xs text-white/40">Add, edit, reorder, or remove salon services.</p>
        </div>
        <button
          onClick={addService}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/[0.1] rounded-2xl p-12 text-center">
          <GripVertical className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-sm text-white/30 mb-4">No services yet</p>
          <button
            onClick={addService}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add your first service
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={service.id} className={`bg-white/[0.02] border rounded-2xl p-5 transition-all ${service.visible ? 'border-white/[0.06]' : 'border-red-500/20 opacity-60'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveService(index, 'up')}
                    disabled={index === 0}
                    className={`p-0.5 rounded ${index === 0 ? 'text-white/10 cursor-not-allowed' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveService(index, 'down')}
                    disabled={index === services.length - 1}
                    className={`p-0.5 rounded ${index === services.length - 1 ? 'text-white/10 cursor-not-allowed' : 'text-white/30 hover:text-white/60'}`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-white/20 font-mono w-6">#{index + 1}</span>
                <div className="flex-1" />
                <button
                  onClick={() => updateService(service.id, { visible: !service.visible })}
                  className={`p-1.5 rounded-lg transition-colors ${service.visible ? 'text-green-400 hover:bg-green-500/10' : 'text-red-400 hover:bg-red-500/10'}`}
                  title={service.visible ? 'Visible on website' : 'Hidden from website'}
                >
                  {service.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(service.id, { title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => updateService(service.id, { price: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => updateService(service.id, { description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(service.id, { icon: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all cursor-pointer"
                  >
                    {iconOptions.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
        <span className="text-[10px] text-white/20 ml-auto">{services.filter(s => s.visible).length} visible / {services.length} total</span>
      </div>
    </div>
  );
}
