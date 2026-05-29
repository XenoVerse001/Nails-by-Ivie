import { useState, useEffect } from 'react';
import { SiteData, TestimonialItem, generateId } from '../../store/siteData';
import { Save, Plus, Trash2, Eye, EyeOff, Star, CheckCircle, RotateCcw, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function TestimonialsTab({ siteData, onUpdate }: Props) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([...siteData.testimonials]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTestimonials([...siteData.testimonials]);
    setHasChanges(false);
  }, [siteData.testimonials]);

  const handleSave = () => {
    onUpdate({ ...siteData, testimonials });
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setTestimonials([...siteData.testimonials]);
    setHasChanges(false);
  };

  const addTestimonial = () => {
    const newItem: TestimonialItem = {
      id: generateId(),
      name: 'New Client',
      role: 'Client',
      text: 'Write a testimonial...',
      rating: 5,
      visible: true,
    };
    setTestimonials(prev => [...prev, newItem]);
    setHasChanges(true);
  };

  const update = (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    setHasChanges(true);
  };

  const remove = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setHasChanges(true);
    }
  };

  const move = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    const arr = [...testimonials];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setTestimonials(arr);
    setHasChanges(true);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Testimonials</h2>
          <p className="text-xs text-white/40">Manage customer reviews and testimonials.</p>
        </div>
        <button
          onClick={addTestimonial}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> Add Review
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/[0.1] rounded-2xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-sm text-white/30 mb-4">No testimonials yet</p>
          <button
            onClick={addTestimonial}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((item, index) => (
            <div key={item.id} className={`bg-white/[0.02] border rounded-2xl p-5 transition-all ${item.visible ? 'border-white/[0.06]' : 'border-red-500/20 opacity-60'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => move(index, 'up')}
                      disabled={index === 0}
                      className={`p-0.5 rounded ${index === 0 ? 'text-white/10 cursor-not-allowed' : 'text-white/30 hover:text-white/60'}`}
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => move(index, 'down')}
                      disabled={index === testimonials.length - 1}
                      className={`p-0.5 rounded ${index === testimonials.length - 1 ? 'text-white/10 cursor-not-allowed' : 'text-white/30 hover:text-white/60'}`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        onClick={() => update(item.id, { rating: s })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`w-4 h-4 ${s <= item.rating ? 'text-champagne-400 fill-champagne-400' : 'text-white/15'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => update(item.id, { visible: !item.visible })}
                    className={`p-1.5 rounded-lg transition-colors ${item.visible ? 'text-green-400 hover:bg-green-500/10' : 'text-red-400 hover:bg-red-500/10'}`}
                    title={item.visible ? 'Visible' : 'Hidden'}
                  >
                    {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="p-1.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Client Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => update(item.id, { name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Role/Label</label>
                  <input
                    type="text"
                    value={item.role}
                    onChange={(e) => update(item.id, { role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1.5">Review Text</label>
                <textarea
                  rows={3}
                  value={item.text}
                  onChange={(e) => update(item.id, { text: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all resize-none"
                />
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
        <span className="text-[10px] text-white/20 ml-auto">{testimonials.filter(t => t.visible).length} visible / {testimonials.length} total</span>
      </div>
    </div>
  );
}
