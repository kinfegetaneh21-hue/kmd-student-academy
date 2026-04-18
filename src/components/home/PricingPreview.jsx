import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { useData } from '../../context/DataContext';
import { Check, Crown } from 'lucide-react';

export default function PricingPreview() {
  const { plans } = useData();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Pricing"
          title="One free plan. Three premium plans. Zero surprises."
          description="Pick what fits your year or department — upgrade, downgrade or cancel anytime."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col card-padded ${p.highlight ? 'ring-2 ring-brand-500' : ''}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {p.tag}
                </span>
              )}
              <div className="flex items-center gap-2">
                {p.id !== 'freshman' && <Crown className="h-4 w-4 text-accent-500" />}
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">{p.name}</h3>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {p.priceETB === 0 ? 'Free' : `${p.priceETB} ETB`}
                </span>
                <span className="text-sm text-slate-500">/{p.period.replace('per ', '')}</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {p.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-slate-700 dark:text-slate-200">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className={`mt-6 ${p.highlight ? 'btn-primary' : 'btn-secondary'} w-full`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
