import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Download, File, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DownloadsPage() {
  const { courses } = useData();
  const { isPremium } = useAuth();

  const files = courses.flatMap((c) =>
    c.modules.flatMap((m) => m.lessons.flatMap((l) => l.files.map((f) => ({ ...f, course: c }))))
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Downloads</h1>
        <p className="text-sm text-slate-500">Slides, worksheets and practice sheets.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.slice(0, 24).map((f) => {
          const locked = f.course.access === 'premium' && !isPremium;
          return (
            <div key={`${f.course.id}-${f.id}`} className="card-padded">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300">
                  {f.type === 'pdf' ? <FileText className="h-5 w-5" /> : <File className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{f.title}</div>
                  <div className="text-xs text-slate-500">{f.course.title} · {f.size}</div>
                </div>
              </div>
              <div className="mt-4">
                {locked ? (
                  <Link to="/pricing" className="btn-accent w-full">
                    <Lock className="h-4 w-4" /> Unlock premium
                  </Link>
                ) : (
                  <button className="btn-secondary w-full">
                    <Download className="h-4 w-4" /> Download
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
