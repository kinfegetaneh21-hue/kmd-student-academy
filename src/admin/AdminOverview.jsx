import {
  Users,
  BookOpen,
  PlayCircle,
  FileText,
  Youtube,
  Crown,
  TrendingUp,
  Megaphone,
  CircleDollarSign,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminOverview() {
  const { courses, videos, announcements } = useData();

  const stats = [
    { icon: Users, label: 'Students', value: '24,812', diff: '+320 this week', color: 'text-brand-600 bg-brand-50 dark:bg-brand-950 dark:text-brand-300' },
    { icon: Crown, label: 'Premium students', value: '6,431', diff: '+84 this week', color: 'text-accent-600 bg-accent-50 dark:bg-accent-950 dark:text-accent-300' },
    { icon: BookOpen, label: 'Courses', value: courses.length, diff: '+2 this month', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300' },
    { icon: FileText, label: 'Uploaded files', value: '1,842', diff: '+56 this week', color: 'text-violet-600 bg-violet-50 dark:bg-violet-950 dark:text-violet-300' },
    { icon: PlayCircle, label: 'Uploaded videos', value: '3,214', diff: '+12 today', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950 dark:text-rose-300' },
    { icon: Youtube, label: 'YouTube lessons', value: videos.length, diff: 'Synced 2h ago', color: 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-300' },
    { icon: CircleDollarSign, label: 'Monthly revenue', value: '1.28M ETB', diff: '+14.2% vs last', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-300' },
    { icon: Megaphone, label: 'Announcements', value: announcements.length, diff: 'Last: today', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-300' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Admin overview</h1>
        <p className="text-sm text-slate-500">Pulse of the entire KMD academy — in real time.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-padded">
            <div className="flex items-center justify-between">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-3 w-3" /> live
              </span>
            </div>
            <div className="mt-4 font-display text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</div>
            <div className="mt-2 text-xs text-slate-500">{s.diff}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-padded lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Recent activity</h3>
            <button className="btn-ghost text-xs">View all</button>
          </div>
          <ul className="mt-4 divide-y divide-slate-200 text-sm dark:divide-slate-800">
            {[
              { who: 'Sara T.', what: 'enrolled in Intro to AI', when: '2m ago' },
              { who: 'Admin', what: 'uploaded Circuits — Module 4', when: '14m ago' },
              { who: 'Dawit M.', what: 'upgraded to Advanced Academic', when: '1h ago' },
              { who: 'Admin', what: 'added YouTube: Databases Lecture 3', when: '3h ago' },
              { who: 'Helen A.', what: 'submitted quiz: Critical Thinking', when: '4h ago' },
              { who: 'Ibrahim K.', what: 'refunded Standard plan', when: '6h ago' },
            ].map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3">
                <span className="text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">{r.who}</span> {r.what}
                </span>
                <span className="text-xs text-slate-500">{r.when}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-padded bg-gradient-to-br from-brand-700 to-accent-500 text-white">
          <h3 className="font-display text-lg font-bold">This week</h3>
          <p className="mt-1 text-sm text-white/85">6,431 premium subscribers · 84 new signups today</p>
          <div className="mt-6 grid grid-cols-7 items-end gap-1.5">
            {[40, 55, 62, 48, 70, 85, 92].map((h, i) => (
              <div key={i} className="rounded-md bg-white/20" style={{ height: `${h}px` }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-7 text-center text-[10px] uppercase text-white/70">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
