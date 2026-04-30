import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Container from '../ui/Container';

export default function CTABanner() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 px-8 py-14 text-white shadow-glow sm:px-14">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Your university journey deserves better tools.
              </h2>
              <p className="mt-3 max-w-xl text-white/90">
                Join KMD today — start free as a freshman, and upgrade any time as you move up the academic ladder.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/signup" className="btn bg-white text-brand-700 hover:bg-slate-100">
                <Sparkles className="h-4 w-4" /> Start free
              </Link>
              <Link to="/pricing" className="btn bg-slate-900/30 text-white ring-1 ring-white/30 hover:bg-slate-900/50 backdrop-blur">
                See all plans
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
