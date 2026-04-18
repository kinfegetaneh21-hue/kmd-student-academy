import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Download, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';

export default function ResourcesPage() {
  const { courses } = useData();
  const { isPremium } = useAuth();

  const files = courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.flatMap((l) => [
        ...l.notes.map((n) => ({ ...n, course: c })),
        ...l.files.map((n) => ({ ...n, course: c })),
      ])
    )
  );

  return (
    <>
      <PageHeader
        kicker="Resources"
        title="Notes, slides and practice materials."
        description="Everything you need to study, review and ace exams."
      />
      <Container className="py-14">
        <div className="card-padded overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-3">File</th>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Access</th>
                  <th className="px-5 py-3 text-right">Size</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {files.slice(0, 40).map((f) => {
                  const locked = f.course.access === 'premium' && !isPremium;
                  return (
                    <tr key={`${f.course.id}-${f.id}`} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                          <FileText className="h-4 w-4 text-brand-500" />
                          {f.title}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Link to={`/courses/${f.course.id}`} className="text-brand-600 hover:underline dark:text-brand-300">
                          {f.course.title}
                        </Link>
                      </td>
                      <td className="px-5 py-3 uppercase text-slate-500">{f.type}</td>
                      <td className="px-5 py-3">
                        {f.course.access === 'free' ? (
                          <Badge variant="success">Free</Badge>
                        ) : (
                          <Badge variant="accent">
                            <Lock className="h-3 w-3" /> Premium
                          </Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-slate-500">{f.size}</td>
                      <td className="px-5 py-3 text-right">
                        {locked ? (
                          <Link to="/pricing" className="btn-accent !py-1.5 !px-3 text-xs">
                            Unlock
                          </Link>
                        ) : (
                          <button className="btn-secondary !py-1.5 !px-3 text-xs">
                            <Download className="h-3.5 w-3.5" /> Download
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
