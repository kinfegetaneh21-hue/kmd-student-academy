import { Download, FileText, Lock, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Empty from '../components/ui/Empty';
import Badge from '../components/ui/Badge';
import { Link } from 'react-router-dom';

export default function NotesPage() {
  const { courses } = useData();
  const { isPremium } = useAuth();
  const [q, setQ] = useState('');

  const notes = useMemo(() => {
    return courses.flatMap((c) =>
      c.modules.flatMap((m) =>
        m.lessons.flatMap((l) => l.notes.map((n) => ({ ...n, course: c, lesson: l })))
      )
    );
  }, [courses]);

  const filtered = q
    ? notes.filter((n) => n.title.toLowerCase().includes(q.toLowerCase()))
    : notes;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Notes Library</h1>
          <p className="text-sm text-slate-500">Downloadable lecture notes and summaries.</p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search notes…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      {filtered.length === 0 ? (
        <Empty title="No notes match your search" />
      ) : (
        <div className="card-padded !p-0 overflow-hidden">
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {filtered.slice(0, 40).map((n) => {
              const locked = n.course.access === 'premium' && !isPremium;
              return (
                <li key={`${n.course.id}-${n.id}`} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{n.title}</div>
                    <div className="text-xs text-slate-500">
                      <Link to={`/courses/${n.course.id}`} className="hover:underline">
                        {n.course.title}
                      </Link>{' '}
                      · {n.size}
                    </div>
                  </div>
                  {locked ? (
                    <Link to="/pricing" className="btn-accent !px-3 !py-1.5 text-xs">
                      <Lock className="h-3 w-3" /> Unlock
                    </Link>
                  ) : (
                    <button className="btn-secondary !px-3 !py-1.5 text-xs">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  )}
                  <Badge variant={n.course.access === 'free' ? 'success' : 'accent'} className="hidden sm:inline-flex">
                    {n.course.access === 'free' ? 'Free' : 'Premium'}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
