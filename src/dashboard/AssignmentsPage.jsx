import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

const assignments = [
  {
    id: 'a1',
    title: 'Essay: Impact of Emerging Tech in Ethiopia',
    course: 'Intro to Emerging Technologies',
    due: '2025-04-10',
    status: 'due',
  },
  {
    id: 'a2',
    title: 'Problem set: Derivatives',
    course: 'Mathematics for Natural Sciences',
    due: '2025-04-05',
    status: 'submitted',
  },
  {
    id: 'a3',
    title: 'Lab report: Newton\u2019s 2nd Law',
    course: 'General Physics',
    due: '2025-04-12',
    status: 'due',
  },
  {
    id: 'a4',
    title: 'Case study: Business Ethics',
    course: 'Financial Management',
    due: '2025-03-30',
    status: 'graded',
    score: '88%',
  },
];

const statusChip = {
  due: { cls: 'chip-brand', icon: Clock, label: 'Due' },
  submitted: { cls: 'chip-accent', icon: ClipboardList, label: 'Submitted' },
  graded: { cls: 'chip-success', icon: CheckCircle2, label: 'Graded' },
};

export default function AssignmentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Assignments</h1>
        <p className="text-sm text-slate-500">Submit, track and review your assignments.</p>
      </div>
      <div className="card-padded !p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Due</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {assignments.map((a) => {
              const s = statusChip[a.status];
              return (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">{a.title}</td>
                  <td className="px-5 py-3 text-slate-500">{a.course}</td>
                  <td className="px-5 py-3 text-slate-500">{a.due}</td>
                  <td className="px-5 py-3">
                    <span className={s.cls}><s.icon className="h-3 w-3" /> {s.label}{a.score ? ` · ${a.score}` : ''}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="btn-outline !py-1.5 !px-3 text-xs">{a.status === 'due' ? 'Submit' : 'View'}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
