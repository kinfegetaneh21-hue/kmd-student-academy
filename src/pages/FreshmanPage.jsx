import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import CourseCard from '../components/courses/CourseCard';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function FreshmanPage() {
  const { courses } = useData();
  const list = courses.filter((c) => c.year === 'freshman');
  return (
    <>
      <PageHeader
        kicker="Freshman · 100% Free"
        title="Your entire 1st year, free and online."
        description="Communicative English, Math, Physics, Critical Thinking, Civics, Geography and Emerging Technologies — all ready to learn."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/signup" className="btn-primary">
            <Sparkles className="h-4 w-4" /> Create free account
          </Link>
          <Link to="/videos" className="btn-outline">Browse video library</Link>
        </div>
      </PageHeader>
      <Container className="py-14">
        <div className="mb-10 flex items-center gap-3 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900">
          <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
          <p className="text-sm text-emerald-900 dark:text-emerald-200">
            <span className="font-semibold">All freshman content is free, forever.</span> No credit card. No trials.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </Container>
    </>
  );
}
