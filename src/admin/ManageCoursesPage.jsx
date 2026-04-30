import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { academicYears, departments } from '../data/siteConfig';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

const empty = {
  id: '',
  title: '',
  code: '',
  instructor: '',
  department: 'cse',
  year: 'freshman',
  access: 'free',
  hours: 8,
  level: 'Foundational',
  description: '',
  thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=60',
  modules: [],
  students: 0,
  rating: 4.8,
  outcomes: [],
  tags: [],
};

export default function ManageCoursesPage() {
  const { courses, addCourse, updateCourse, removeCourse } = useData();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = courses.filter((c) =>
    q ? c.title.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase()) : true
  );

  const startNew = () => {
    setEditing({ ...empty, id: `c-${Date.now()}` });
    setOpen(true);
  };
  const startEdit = (c) => {
    setEditing(c);
    setOpen(true);
  };

  const save = () => {
    if (!editing.title) return;
    if (courses.find((c) => c.id === editing.id)) updateCourse(editing);
    else addCourse(editing);
    setOpen(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Courses</h1>
          <p className="text-sm text-slate-500">Create, edit and organize the entire course catalog.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search courses…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button onClick={startNew} className="btn-primary">
            <Plus className="h-4 w-4" /> New course
          </button>
        </div>
      </div>

      <div className="card-padded !p-0 overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Year</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Access</th>
              <th className="px-5 py-3 text-right">Hours</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                <td className="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">{c.title}</td>
                <td className="px-5 py-3 text-slate-500">{c.code}</td>
                <td className="px-5 py-3 text-slate-500">{academicYears.find((y) => y.id === c.year)?.label}</td>
                <td className="px-5 py-3 text-slate-500">{departments.find((d) => d.id === c.department)?.label}</td>
                <td className="px-5 py-3">
                  <Badge variant={c.access === 'free' ? 'success' : 'accent'}>{c.access}</Badge>
                </td>
                <td className="px-5 py-3 text-right text-slate-500">{c.hours}h</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => startEdit(c)} className="btn-ghost !px-2 !py-1 text-xs">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => removeCourse(c.id)} className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing && !courses.find((c) => c.id === editing.id) ? 'New course' : 'Edit course'}>
        {editing && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Title</span>
              <input className="input mt-1" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Code</span>
              <input className="input mt-1" value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Instructor</span>
              <input className="input mt-1" value={editing.instructor} onChange={(e) => setEditing({ ...editing, instructor: e.target.value })} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Year</span>
              <select className="input mt-1" value={editing.year} onChange={(e) => setEditing({ ...editing, year: e.target.value })}>
                {academicYears.map((y) => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Department</span>
              <select className="input mt-1" value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })}>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Access</span>
              <select className="input mt-1" value={editing.access} onChange={(e) => setEditing({ ...editing, access: e.target.value })}>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Hours</span>
              <input type="number" className="input mt-1" value={editing.hours} onChange={(e) => setEditing({ ...editing, hours: Number(e.target.value) })} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Description</span>
              <textarea rows={3} className="input mt-1" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </label>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} className="btn-primary">Save course</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
