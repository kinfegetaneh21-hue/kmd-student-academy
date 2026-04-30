import { Link } from 'react-router-dom';
import { Clock, Users, Star, Lock, BookOpen, PlayCircle, ShieldCheck } from 'lucide-react';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function CourseCard({ course, compact = false }) {
  const { isPremium, isAuthenticated } = useAuth();
  const locked = course.access === 'premium' && !isPremium;
  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-slate-900 dark:ring-slate-800"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.access === 'free' ? (
            <Badge variant="success">Free</Badge>
          ) : (
            <Badge variant="accent">
              <Lock className="h-3 w-3" /> Premium
            </Badge>
          )}
          <Badge variant="brand">{course.level}</Badge>
        </div>
        {locked && isAuthenticated && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-900">
              <Lock className="h-3.5 w-3.5" /> Upgrade to unlock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{course.code}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
          {course.title}
        </h3>
        {!compact && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{course.tagline}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {course.hours}h</span>
          <span className="inline-flex items-center gap-1.5"><PlayCircle className="h-3.5 w-3.5" /> {totalLessons} lessons</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {course.students.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1.5 text-amber-500"><Star className="h-3.5 w-3.5 fill-current" /> {course.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Prepared by KMD Student Academy
          </div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-300">View course →</span>
        </div>
      </div>
    </Link>
  );
}
