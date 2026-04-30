import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CourseCard from '../courses/CourseCard';
import { useData } from '../../context/DataContext';

export default function FreshmanPreview() {
  const { courses } = useData();
  const fresh = courses.filter((c) => c.year === 'freshman').slice(0, 6);
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Freshman — 100% Free"
            title="Every 1st year course, on the house."
            description="Communicative English, Math, Physics, Critical Thinking, Civics, Geography and Emerging Tech."
          />
          <div className="flex flex-wrap gap-3">
            <a
              href={`${import.meta.env.BASE_URL}materials/freshman-course-catalog.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download="KMD-Freshman-Course-Catalog.pdf"
              className="btn-secondary"
            >
              <Download className="h-4 w-4" /> Course catalog PDF
            </a>
            <Link to="/freshman" className="btn-outline">See all freshman courses →</Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fresh.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
