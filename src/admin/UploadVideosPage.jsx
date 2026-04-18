import { useState } from 'react';
import { Upload, PlayCircle, Trash2, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import Badge from '../components/ui/Badge';

export default function UploadVideosPage() {
  const { videos, addVideo, removeVideo } = useData();
  const [form, setForm] = useState({
    title: '',
    youtubeId: '',
    description: '',
    year: 'freshman',
    access: 'free',
    tag: 'Lecture',
    duration: '15:00',
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.youtubeId) return;
    addVideo({ id: `v-${Date.now()}`, ...form });
    setForm({ ...form, title: '', youtubeId: '', description: '' });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Upload videos</h1>
        <p className="text-sm text-slate-500">Upload internal videos or attach YouTube links.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} className="card-padded space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New video</h3>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Title</span>
            <input required className="input mt-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">YouTube ID</span>
            <input required className="input mt-1" placeholder="e.g. dQw4w9WgXcQ" value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Description</span>
            <textarea rows={3} className="input mt-1" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Year</span>
              <select className="input mt-1" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                {academicYears.map((y) => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Access</span>
              <select className="input mt-1" value={form.access} onChange={(e) => setForm({ ...form, access: e.target.value })}>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </div>
          <button className="btn-primary w-full">
            <Plus className="h-4 w-4" /> Add video
          </button>
        </form>

        <div className="lg:col-span-2 card-padded !p-0 overflow-hidden">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">All videos ({videos.length})</h3>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {videos.map((v) => (
              <li key={v.id} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                  <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                    <PlayCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{v.title}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <Badge variant={v.access === 'free' ? 'success' : 'accent'}>{v.access}</Badge>
                    {v.year}
                  </div>
                </div>
                <button onClick={() => removeVideo(v.id)} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
