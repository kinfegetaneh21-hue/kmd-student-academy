import { useMemo, useState } from 'react';
import { Upload, PlayCircle, Trash2, Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import Badge from '../components/ui/Badge';

export default function UploadVideosPage() {
  const { videos, addVideo, removeVideo, courses } = useData();
  const freshmanCourses = useMemo(
    () => courses.filter((c) => c.year === 'freshman'),
    [courses]
  );
  const firstCourseId = courses[0]?.id || '';
  const [form, setForm] = useState({
    title: '',
    youtubeId: '',
    description: '',
    courseId: firstCourseId,
    year: 'freshman',
    access: 'free',
    tag: 'Lecture',
    duration: '15:00',
  });
  const [filter, setFilter] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.youtubeId) return;
    const course = courses.find((c) => c.id === form.courseId);
    addVideo({
      id: `v-${Date.now()}`,
      ...form,
      courseTitle: course?.title || '',
    });
    setForm({ ...form, title: '', youtubeId: '', description: '' });
  };

  const onCourseChange = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    setForm((f) => ({
      ...f,
      courseId,
      year: course?.year || f.year,
      access: course?.access || f.access,
    }));
  };

  const filteredVideos = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((v) =>
      [v.title, v.courseTitle, v.year].filter(Boolean).join(' ').toLowerCase().includes(q)
    );
  }, [videos, filter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Upload videos</h1>
          <p className="text-sm text-slate-500">Attach YouTube lessons to any freshman or premium course.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Filter videos..."
            className="input !pl-9 w-64"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
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
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Course</span>
            <select
              className="input mt-1"
              value={form.courseId}
              onChange={(e) => onCourseChange(e.target.value)}
            >
              {freshmanCourses.length > 0 && (
                <optgroup label="Freshman (Free)">
                  {freshmanCourses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="Premium (2nd – 7th year)">
                {courses
                  .filter((c) => c.year !== 'freshman')
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.level} — {c.title}
                    </option>
                  ))}
              </optgroup>
            </select>
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
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tag</span>
              <input className="input mt-1" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Duration</span>
              <input className="input mt-1" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </label>
          </div>
          <button className="btn-primary w-full">
            <Plus className="h-4 w-4" /> Add video
          </button>
        </form>

        <div className="lg:col-span-2 card-padded !p-0 overflow-hidden">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">All videos ({filteredVideos.length})</h3>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {filteredVideos.map((v) => (
              <li key={v.id} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                  <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                    <PlayCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{v.title}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <Badge variant={v.access === 'free' ? 'success' : 'accent'}>{v.access}</Badge>
                    <span>{v.year}</span>
                    {v.courseTitle && <span className="text-slate-500">· {v.courseTitle}</span>}
                  </div>
                </div>
                <button onClick={() => removeVideo(v.id)} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
            {filteredVideos.length === 0 && (
              <li className="p-8 text-center text-sm text-slate-500">No videos match your filter.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
