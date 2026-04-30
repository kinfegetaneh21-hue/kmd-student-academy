import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import CourseCard from '../components/courses/CourseCard';
import Empty from '../components/ui/Empty';
import { Link } from 'react-router-dom';

export default function MyCoursesPage() {
  const { isPremium } = useAuth();
  const { courses } = useData();
  const list = isPremium ? courses : courses.filter((c) => c.year === 'freshman');

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">My Courses</h1>
          <p className="text-sm text-slate-500">Everything you have access to with your current plan.</p>
        </div>
        <Link to="/courses" className="btn-outline">Browse catalog</Link>
      </div>
      {list.length === 0 ? (
        <Empty title="No courses yet" description="Browse the catalog to start learning." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
