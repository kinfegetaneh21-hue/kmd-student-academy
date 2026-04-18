import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CourseCard from '../courses/CourseCard';
import { useData } from '../../context/DataContext';

export default function PremiumPreview() {
  const { courses } = useData();
  const prem = courses.filter((c) => c.access === 'premium').slice(0, 6);
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="2nd–7th Year — Premium"
            title="Go deeper with year-based learning tracks."
            description="Pick your year and department. Premium content is organized, structured and up-to-date."
          />
          <Link to="/premium" className="btn-outline">Browse premium →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prem.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
