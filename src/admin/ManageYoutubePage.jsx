import { useState } from 'react';
import { Youtube, Trash2, Plus, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import Badge from '../components/ui/Badge';

export default function ManageYoutubePage() {
  const { videos, addVideo, removeVideo, updateVideo } = useData();
  const [form, setForm] = useState({ title: '', youtubeId: '', year: 'freshman', access: 'free', tag: 'Lecture', duration: '15:00', description: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.youtubeId) return;
    addVideo({ id: `v-${Date.now()}`, featured: false, ...form });
    setForm({ ...form, title: '', youtubeId: '' });
  };

  const toggleFeatured = (v) => updateVideo({ ...v, featured: !v.featured });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">YouTube links</h1>
          <p className="text-sm text-slate-500">Add, organize and feature YouTube lessons.</p>
        </div>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <Youtube className="h-4 w-4 text-red-500" /> Open YouTube
        </a>
      </div>
      <form onSubmit={submit} className="card-padded mb-6 grid gap-3 sm:grid-cols-6">
        <input required className="input sm:col-span-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required className="input" placeholder="YouTube ID" value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} />
        <input className="input" placeholder="Tag (e.g. Algebra)" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
        <select className="input" value={form.access} onChange={(e) => setForm({ ...form, access: e.target.value })}>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
        <button className="btn-primary">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="card-padded">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant={v.access === 'free' ? 'success' : 'accent'}>{v.access}</Badge>
              {v.featured && <Badge variant="brand">Featured</Badge>}
            </div>
            <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{v.title}</h3>
            <div className="mt-3 flex justify-between">
              <button onClick={() => toggleFeatured(v)} className="btn-ghost !px-2 !py-1 text-xs">
                <Star className={`h-3.5 w-3.5 ${v.featured ? 'fill-current text-amber-500' : ''}`} /> {v.featured ? 'Unfeature' : 'Feature'}
              </button>
              <button onClick={() => removeVideo(v.id)} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
