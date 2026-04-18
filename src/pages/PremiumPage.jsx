import { useState } from 'react';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import CourseCard from '../components/courses/CourseCard';
import { useData } from '../context/DataContext';
import { academicYears } from '../data/siteConfig';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export default function PremiumPage() {
  const { courses } = useData();
  const [year, setYear] = useState('');
  const premium = courses.filter((c) => c.access === 'premium');
  const list = year ? premium.filter((c) => c.year === year) : premium;

  return (
    <>
      <PageHeader
        kicker="2nd – 7th Year · Premium"
        title="Unlock your year. Accelerate your career."
        description="Choose your academic year and department — every premium course comes with videos, notes, quizzes and downloadable materials."
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/pricing" className="btn-primary">
            <Crown className="h-4 w-4" /> See plans
          </Link>
          <Link to="/courses" className="btn-outline">All courses</Link>
        </div>
      </PageHeader>
      <Container className="py-14">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setYear('')}
            className={`chip ${year === '' ? 'chip-brand' : 'chip-slate'}`}
          >
            All years
          </button>
          {academicYears
            .filter((y) => y.access === 'premium')
            .map((y) => (
              <button
                key={y.id}
                onClick={() => setYear(y.id)}
                className={`chip ${year === y.id ? 'chip-brand' : 'chip-slate'}`}
              >
                {y.label}
              </button>
            ))}
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
