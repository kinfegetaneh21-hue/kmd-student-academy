import { useState } from 'react';
import { Search, UserCog, UserX, Crown, GraduationCap } from 'lucide-react';
import Badge from '../components/ui/Badge';

const mockStudents = Array.from({ length: 24 }).map((_, i) => ({
  id: `u-${i + 1}`,
  name: ['Sara T.', 'Dawit M.', 'Helen A.', 'Ibrahim K.', 'Martha B.', 'Samuel R.', 'Lidya Y.', 'Yonas G.'][i % 8] + ' ' + (i + 1),
  email: `student${i + 1}@university.edu`,
  year: ['freshman', 'y2', 'y3', 'y4', 'y5', 'y6', 'y7'][i % 7],
  plan: ['freshman', 'standard', 'advanced', 'department'][i % 4],
  status: i % 7 === 0 ? 'suspended' : 'active',
  joined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}));

export default function ManageStudentsPage() {
  const [q, setQ] = useState('');
  const filtered = mockStudents.filter((s) =>
    q ? s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Students</h1>
          <p className="text-sm text-slate-500">All registered KMD students.</p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9 w-80" placeholder="Search name or email…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="card-padded !p-0 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Year</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                <td className="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">{s.name}</td>
                <td className="px-5 py-3 text-slate-500">{s.email}</td>
                <td className="px-5 py-3 uppercase text-slate-500">{s.year}</td>
                <td className="px-5 py-3">
                  <Badge variant={s.plan === 'freshman' ? 'success' : 'accent'}>
                    {s.plan === 'freshman' ? <GraduationCap className="h-3 w-3" /> : <Crown className="h-3 w-3" />}
                    {s.plan}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <Badge variant={s.status === 'active' ? 'success' : 'slate'}>{s.status}</Badge>
                </td>
                <td className="px-5 py-3 text-slate-500">{s.joined}</td>
                <td className="px-5 py-3 text-right">
                  <button className="btn-ghost !px-2 !py-1 text-xs">
                    <UserCog className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button className="btn-ghost !px-2 !py-1 text-xs text-rose-600">
                    <UserX className="h-3.5 w-3.5" /> Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
