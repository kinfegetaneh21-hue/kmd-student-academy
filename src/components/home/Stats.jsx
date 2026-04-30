import Container from '../ui/Container';
import { stats } from '../../data/announcements';

export default function Stats() {
  return (
    <section className="py-6">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-padded text-center">
              <div className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
