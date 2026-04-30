import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProgressBar from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import { lessonsOfCourse } from '../data/courses';

export default function ContinueLearningPage() {
  const { courses } = useData();
  const { isPremium } = useAuth();
  const visible = isPremium ? courses : courses.filter((c) => c.year === 'freshman');
  const items = visible
    .slice(0, 6)
    .map((c, i) => {
      const lessons = lessonsOfCourse(c);
      if (lessons.length === 0) return null;
      return {
        course: c,
        lesson: lessons[0],
        progress: [15, 32, 48, 60, 75, 88][i % 6],
      };
    })
    .filter(Boolean);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Continue Learning</h1>
        <p className="text-sm text-slate-500">Pick up where you left off.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map(({ course, lesson, progress }) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="group flex gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-200 hover:shadow-glow dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="relative h-24 w-36 overflow-hidden rounded-lg">
              <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 opacity-0 transition group-hover:opacity-100">
                <PlayCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">{course.level}</div>
              <div className="mt-0.5 truncate text-sm font-bold text-slate-900 dark:text-white">{lesson.title}</div>
              <div className="text-xs text-slate-500">{course.title}</div>
              <ProgressBar value={progress} className="mt-3" />
              <div className="mt-1 text-[11px] text-slate-500">{progress}% complete</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
