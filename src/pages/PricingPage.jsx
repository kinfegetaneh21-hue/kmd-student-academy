import { useState } from 'react';
import { Check, Crown, Sparkles, X } from 'lucide-react';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { initiateCheckout } from '../services/paymentService';

export default function PricingPage() {
  const { plans } = useData();
  const { user, upgradePlan } = useAuth();
  const [billing, setBilling] = useState('monthly');
  const nav = useNavigate();

  const choose = async (plan) => {
    if (!user) return nav('/signup');
    if (plan.priceETB === 0) {
      upgradePlan(plan.id);
      nav('/dashboard');
      return;
    }
    await initiateCheckout({ plan, user });
    upgradePlan(plan.id);
    nav('/dashboard');
  };

  const yearly = billing === 'yearly';

  return (
    <>
      <PageHeader
        kicker="Pricing"
        title="Simple pricing, big results."
        description="Pick what fits. Switch anytime. Cancel anytime. 7-day refund guarantee."
      >
        <div className="inline-flex items-center rounded-xl bg-white p-1 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${billing === 'monthly' ? 'bg-brand-600 text-white' : 'text-slate-700 dark:text-slate-300'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${billing === 'yearly' ? 'bg-brand-600 text-white' : 'text-slate-700 dark:text-slate-300'}`}
          >
            Yearly · save 20%
          </button>
        </div>
      </PageHeader>
      <Container className="py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const price = p.priceETB === 0 ? 0 : yearly ? Math.round(p.priceETB * 12 * 0.8) : p.priceETB;
            const period = p.priceETB === 0 ? 'forever' : yearly ? 'per year' : 'per month';
            return (
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
                <div className="mt-3">
                  {price === 0 ? (
                    <span className="font-display text-4xl font-extrabold text-slate-900 dark:text-white">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-extrabold text-slate-900 dark:text-white">{price}</span>
                      <span className="text-sm text-slate-500">ETB / {period.replace('per ', '')}</span>
                    </div>
                  )}
                </div>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-slate-700 dark:text-slate-200">{f}</span>
                    </li>
                  ))}
                  {p.limits.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-slate-400">
                      <X className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className="line-through">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choose(p)}
                  className={`mt-6 ${p.highlight ? 'btn-primary' : 'btn-secondary'} w-full`}
                >
                  {p.priceETB === 0 ? <Sparkles className="h-4 w-4" /> : <Crown className="h-4 w-4" />}
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
          <h3 className="font-display text-xl font-extrabold">We accept</h3>
          <p className="mt-2 text-sm text-slate-300">Chapa · Telebirr · CBE Birr · Visa / Mastercard · Stripe (international)</p>
        </div>
      </Container>
    </>
  );
}
