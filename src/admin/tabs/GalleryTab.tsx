import { useState, useEffect } from 'react';
import { SiteData, GalleryImage, generateId } from '../../store/siteData';
import { Save, Plus, Trash2, Eye, EyeOff, ImagePlus, CheckCircle, RotateCcw } from 'lucide-react';

interface Props {
  siteData: SiteData;
  onUpdate: (data: SiteData) => void;
}

export default function GalleryTab({ siteData, onUpdate }: Props) {
  const [gallery, setGallery] = useState<GalleryImage[]>([...siteData.gallery]);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync with external changes
  useEffect(() => {
    setGallery([...siteData.gallery]);
    setHasChanges(false);
  }, [siteData.gallery]);

  const handleSave = () => {
    const updated = { ...siteData, gallery };
    onUpdate(updated);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setGallery([...siteData.gallery]);
    setHasChanges(false);
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: generateId(),
      src: '',
      alt: 'New nail design',
      visible: true,
    };
    setGallery(prev => [...prev, newImage]);
    setHasChanges(true);
  };

  const updateImage = (id: string, updates: Partial<GalleryImage>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
    setHasChanges(true);
  };

  const deleteImage = (id: string) => {
    if (confirm('Remove this image?')) {
      setGallery(prev => prev.filter(g => g.id !== id));
      setHasChanges(true);
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= gallery.length) return;
    const newGallery = [...gallery];
    [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];
    setGallery(newGallery);
    setHasChanges(true);
  };

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl font-bold text-white mb-1">Gallery</h2>
          <p className="text-xs text-white/40">Manage your nail art portfolio. Add image URLs, toggle visibility, or remove items.</p>
        </div>
        <button
          onClick={addImage}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-nude-400 to-rose-gold-400 text-white hover:scale-[1.02] transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" /> Add Image
        </button>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white/[0.02] border border-dashed border-white/[0.1] rounded-2xl p-12 text-center">
          <ImagePlus className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-sm text-white/30 mb-4">No gallery images yet</p>
          <button
            onClick={addImage}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3 h-3" /> Add your first image
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((image, index) => (
            <div key={image.id} className={`bg-white/[0.02] border rounded-2xl overflow-hidden transition-all ${image.visible ? 'border-white/[0.06]' : 'border-red-500/20 opacity-60'}`}>
              {/* Preview */}
              <div className="aspect-square bg-white/[0.03] relative group">
                {image.src ? (
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ImagePlus className="w-8 h-8 text-white/10" />
                    <span className="text-[10px] text-white/20">Enter URL below</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => updateImage(image.id, { visible: !image.visible })}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors ${image.visible ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                    title={image.visible ? 'Click to hide' : 'Click to show'}
                  >
                    {image.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                {/* Reorder buttons */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button onClick={() => moveImage(index, 'up')} className="w-6 h-6 rounded bg-black/40 backdrop-blur-sm text-white/60 hover:text-white flex items-center justify-center text-xs">↑</button>
                  )}
                  {index < gallery.length - 1 && (
                    <button onClick={() => moveImage(index, 'down')} className="w-6 h-6 rounded bg-black/40 backdrop-blur-sm text-white/60 hover:text-white flex items-center justify-center text-xs">↓</button>
                  )}
                </div>
              </div>

              {/* Fields */}
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={image.src}
                    onChange={(e) => updateImage(image.id, { src: e.target.value })}
                    placeholder="https://... or /images/..."
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all placeholder:text-white/15"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImage(image.id, { alt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-champagne-400/50 transition-all"
                  />
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
        <span className="text-[10px] text-white/20 ml-auto">{gallery.length} images total</span>
      </div>
    </div>
  );
}
