import { useMemo, useState } from 'react';
import { Upload, FileText, Trash2, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import Badge from '../components/ui/Badge';

const seedFiles = [
  { id: 'f-seed-1', title: 'Thermodynamics — lecture pack', courseId: 'fresh-physics', courseTitle: 'General Physics', year: 'freshman', size: '4.2 MB', type: 'pdf', access: 'free' },
  { id: 'f-seed-2', title: 'Emerging Tech — slides', courseId: 'fresh-emerging', courseTitle: 'Introduction to Emerging Technologies', year: 'freshman', size: '6.8 MB', type: 'pptx', access: 'free' },
];

export default function UploadFilesPage() {
  const { courses, files, addFile, removeFile } = useData();
  const freshmanCourses = useMemo(
    () => courses.filter((c) => c.year === 'freshman'),
    [courses]
  );
  const firstCourseId = courses[0]?.id || '';
  const firstCourse = courses.find((c) => c.id === firstCourseId);
  const [form, setForm] = useState({
    title: '',
    courseId: firstCourseId,
    year: firstCourse?.year || 'freshman',
    access: firstCourse?.access || 'free',
    type: 'pdf',
    size: '1.2 MB',
  });
  const [filter, setFilter] = useState('');

  const allFiles = files.length > 0 ? files : seedFiles;

  const submit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    const course = courses.find((c) => c.id === form.courseId);
    addFile({
      id: `f-${Date.now()}`,
      ...form,
      courseTitle: course?.title || '',
    });
    setForm({ ...form, title: '' });
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

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return allFiles;
    return allFiles.filter((f) =>
      [f.title, f.courseTitle, f.year].filter(Boolean).join(' ').toLowerCase().includes(q)
    );
  }, [allFiles, filter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Upload files</h1>
          <p className="text-sm text-slate-500">PDFs, slides, worksheets — attached to the freshman or premium course of your choice.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Filter files..."
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
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">New file</h3>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Title</span>
            <input required className="input mt-1" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
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
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Type</span>
              <select className="input mt-1" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="pdf">PDF</option>
                <option value="pptx">PPTX</option>
                <option value="docx">DOCX</option>
                <option value="xlsx">XLSX</option>
                <option value="zip">ZIP</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Size</span>
              <input className="input mt-1" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
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
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Files ({filtered.length})</h3>
          </div>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {filtered.map((f) => (
              <li key={f.id} className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{f.title}</div>
                  <div className="text-xs text-slate-500">
                    {f.courseTitle || f.course} · {f.size} · {(f.type || 'pdf').toUpperCase()}
                  </div>
                </div>
                <Badge variant={f.access === 'free' ? 'success' : 'accent'}>{f.access}</Badge>
                {files.some((x) => x.id === f.id) && (
                  <button
                    onClick={() => removeFile(f.id)}
                    className="btn-ghost !px-2 !py-1 text-xs text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="p-8 text-center text-sm text-slate-500">No files match your filter.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
