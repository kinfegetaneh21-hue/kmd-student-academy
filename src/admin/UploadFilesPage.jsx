import { useState } from 'react';
import { Upload, FileText, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import Badge from '../components/ui/Badge';

export default function UploadFilesPage() {
  const { courses } = useData();
  const [files, setFiles] = useState([
    { id: 'f1', title: 'Thermodynamics — lecture pack', course: 'General Physics', year: 'freshman', size: '4.2 MB', type: 'pdf', access: 'free' },
    { id: 'f2', title: 'SQL cheat-sheet v3', course: 'Database Systems', year: 'y2', size: '820 KB', type: 'pdf', access: 'premium' },
    { id: 'f3', title: 'Emerging Tech — slides', course: 'Intro to Emerging Tech', year: 'freshman', size: '6.8 MB', type: 'pptx', access: 'free' },
  ]);
  const [form, setForm] = useState({ title: '', course: courses[0]?.title || '', year: 'freshman', type: 'pdf', access: 'free', size: '1.2 MB' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setFiles((f) => [{ id: `f-${Date.now()}`, ...form }, ...f]);
    setForm({ ...form, title: '' });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Upload files</h1>
        <p className="text-sm text-slate-500">PDFs, slides, worksheets — organized by course, year and access level.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} className="card-padded space-y-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New file</h3>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Title</span>
            <input required className="input mt-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Course</span>
            <select className="input mt-1" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {courses.map((c) => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
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
          <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500 dark:border-slate-700">
            <Upload className="h-4 w-4" /> Drop file or click to browse (demo)
            <input type="file" className="hidden" />
          </label>
          <button className="btn-primary w-full">Upload file</button>
        </form>

        <div className="lg:col-span-2 card-padded !p-0 overflow-hidden">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Files ({files.length})</h3>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {files.map((f) => (
              <li key={f.id} className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{f.title}</div>
                  <div className="text-xs text-slate-500">{f.course} · {f.size} · {f.type.toUpperCase()}</div>
                </div>
                <Badge variant={f.access === 'free' ? 'success' : 'accent'}>{f.access}</Badge>
                <button onClick={() => setFiles(files.filter((x) => x.id !== f.id))} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
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
