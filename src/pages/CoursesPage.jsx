import { useMemo, useState } from 'react';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import CourseCard from '../components/courses/CourseCard';
import CourseFilters from '../components/courses/CourseFilters';
import Empty from '../components/ui/Empty';
import { useData } from '../context/DataContext';

export default function CoursesPage() {
  const { courses } = useData();
  const [q, setQ] = useState('');
  const [year, setYear] = useState('');
  const [dept, setDept] = useState('');
  const [access, setAccess] = useState('');

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (year && c.year !== year) return false;
      if (dept && c.department !== dept) return false;
      if (access && c.access !== access) return false;
      if (q) {
        const s = q.toLowerCase();
        return (
          c.title.toLowerCase().includes(s) ||
          c.code.toLowerCase().includes(s) ||
          c.instructor.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [courses, q, year, dept, access]);

  return (
    <>
      <PageHeader
        kicker="All courses"
        title="Every course, one place."
        description="From freshman fundamentals to 7th year exit exam prep — filter by year, department or access."
      />
      <Container className="-mt-10 py-6">
        <CourseFilters q={q} setQ={setQ} year={year} setYear={setYear} dept={dept} setDept={setDept} access={access} setAccess={setAccess} />
      </Container>
      <Container className="pb-20">
        {filtered.length === 0 ? (
          <Empty title="No courses match your filters." description="Try clearing the search or changing the year/department." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
