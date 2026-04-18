import { Link } from 'react-router-dom';
import {
  BookOpen,
  PlayCircle,
  FileText,
  ClipboardList,
  Sparkles,
  ArrowRight,
  Crown,
  GraduationCap,
  Megaphone,
  Download,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';

export default function StudentOverview() {
  const { user, isPremium, isFreshman } = useAuth();
  const { courses, announcements } = useData();

  const myCourses = courses
    .filter((c) => (isPremium ? c.access === 'premium' || c.year === 'freshman' : c.year === 'freshman'))
    .slice(0, 4);
  const nextUp = myCourses[0];
  const firstLesson = nextUp?.modules[0]?.lessons[0];

  const cards = [
    { icon: BookOpen, label: 'Enrolled', value: myCourses.length, color: 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300' },
    { icon: PlayCircle, label: 'Hours watched', value: '12.4h', color: 'bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300' },
    { icon: ClipboardList, label: 'Assignments', value: '3', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300' },
    { icon: FileCheck2, label: 'Avg. quiz score', value: '84%', color: 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300' },
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-6 text-white sm:p-8">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip bg-white/15 text-white ring-1 ring-white/20">
                {isFreshman ? <GraduationCap className="h-3 w-3" /> : <Crown className="h-3 w-3" />}
                {user?.plan?.toUpperCase()}
              </span>
              <Badge variant="success">Active</Badge>
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="mt-2 max-w-xl text-white/85">
              You have {myCourses.length} active courses today. Let\u2019s make it count.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/dashboard/continue" className="btn bg-white text-brand-700 hover:bg-slate-100">
              <PlayCircle className="h-4 w-4" /> Continue learning
            </Link>
            {!isPremium && (
              <Link to="/pricing" className="btn bg-white/15 text-white ring-1 ring-white/20 hover:bg-white/25">
                <Sparkles className="h-4 w-4" /> Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((s) => (
          <div key={s.label} className="card-padded flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {nextUp && firstLesson && (
            <div className="card overflow-hidden">
              <div className="grid sm:grid-cols-3">
                <div
                  className="relative aspect-video sm:aspect-auto"
                  style={{
                    backgroundImage: `url(${nextUp.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand-600">
                      <PlayCircle className="h-6 w-6" />
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">Continue learning</div>
                  <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">{firstLesson.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{nextUp.title} · Module 1</p>
                  <ProgressBar value={42} className="mt-4" />
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">42% complete</span>
                    <Link to={`/courses/${nextUp.id}`} className="text-sm font-semibold text-brand-600 hover:underline">
                      Resume →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 card-padded">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">My courses</h3>
              <Link to="/dashboard/courses" className="text-xs font-semibold text-brand-600 hover:underline">
                View all <ArrowRight className="inline h-3 w-3" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {myCourses.map((c, i) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.id}`}
                  className="group flex gap-3 rounded-xl bg-slate-50 p-3 ring-1 ring-transparent hover:ring-brand-500 dark:bg-slate-900"
                >
                  <img src={c.thumbnail} alt={c.title} className="h-16 w-24 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">{c.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{c.level} · {c.hours}h</div>
                    <ProgressBar value={[22, 41, 58, 73, 86][i % 5]} className="mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-padded">
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-accent-500" />
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Announcements</h3>
            </div>
            <ul className="mt-3 space-y-3 text-sm">
              {announcements.slice(0, 4).map((a) => (
                <li key={a.id} className="border-b border-slate-100 pb-3 last:border-b-0 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">{a.title}</div>
                  <div className="mt-0.5 line-clamp-2 text-xs text-slate-500">{a.body}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-padded bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h3 className="font-display text-lg font-bold">Downloads & notes</h3>
            <p className="mt-1 text-sm text-slate-300">Fresh materials added this week.</p>
            <Link to="/dashboard/downloads" className="btn mt-4 bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20">
              <Download className="h-4 w-4" /> Open library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
