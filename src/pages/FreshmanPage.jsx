import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import CourseCard from '../components/courses/CourseCard';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Download, FileText } from 'lucide-react';

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
          <a
            href={`${import.meta.env.BASE_URL}materials/freshman-course-catalog.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download="KMD-Freshman-Course-Catalog.pdf"
            className="btn-outline"
          >
            <Download className="h-4 w-4" /> Download official course catalog (PDF)
          </a>
          <Link to="/videos" className="btn-ghost">Browse video library</Link>
        </div>
      </PageHeader>
      <Container className="py-14">
        <div className="mb-10 flex items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-900">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            <p className="text-sm text-emerald-900 dark:text-emerald-200">
              <span className="font-semibold">All freshman content is free, forever.</span> No credit card. No trials.
            </p>
          </div>
          <a
            href={`${import.meta.env.BASE_URL}materials/freshman-course-catalog.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download="KMD-Freshman-Course-Catalog.pdf"
            className="hidden shrink-0 items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 shadow-soft hover:bg-emerald-100 sm:inline-flex dark:border-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
          >
            <FileText className="h-3.5 w-3.5" /> Course catalog PDF
          </a>
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
