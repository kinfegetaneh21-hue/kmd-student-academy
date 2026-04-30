import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '../../data/announcements';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Loved by students"
          title="Real stories, real grades."
          description="From freshmen to final-year med students — KMD is how they study."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.id} className="card-padded h-full">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-slate-700 dark:text-slate-200">&ldquo;{t.body}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
