import { Link } from 'react-router-dom';
import { Check, Crown, GraduationCap, X } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const rows = [
  { label: 'All freshman (1st year) courses', free: true, premium: true },
  { label: '2nd–7th year course libraries', free: false, premium: true },
  { label: 'Premium videos & notes', free: false, premium: true },
  { label: 'Downloadable PDFs & slides', free: false, premium: true },
  { label: 'Quizzes & assignments', free: false, premium: true },
  { label: 'Exit Exam Masterclass', free: false, premium: true },
  { label: 'AI tutor & live Q&A', free: false, premium: true },
  { label: 'Community support', free: true, premium: true },
];

export default function FreeVsPremium() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Free vs Premium"
          title="Learn free forever — or unlock the full academy."
          description="Every 1st year course is 100% free. When you move up to 2nd–7th year, unlock premium for advanced content."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card-padded relative">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Freshman — Free</h3>
                <p className="text-sm text-slate-500">For all 1st year students</p>
              </div>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Access every freshman course, free notes and hand-picked YouTube lessons. Nothing to pay, ever.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5">
                  {r.free ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <X className="h-4 w-4 text-slate-300" />
                  )}
                  <span className={r.free ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 line-through'}>
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/freshman" className="btn-secondary mt-6 w-full">
              Explore freshman courses
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-6 text-white shadow-glow">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Premium — 2nd–7th Year</h3>
                <p className="text-sm text-white/80">For serious academic progress</p>
              </div>
            </div>
            <p className="mt-4 text-white/85">
              Unlock every year-based course library, downloadables, quizzes, AI tutor and live sessions.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5">
                  {r.premium ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <X className="h-4 w-4 text-white/40" />
                  )}
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="btn-accent">View plans</Link>
              <Link to="/premium" className="btn-secondary !bg-white/10 !text-white !ring-white/20 hover:!bg-white/20">
                Explore premium
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
