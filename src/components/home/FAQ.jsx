import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { faqs } from '../../data/announcements';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-16 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          kicker="FAQ"
          title="Questions? We have answers."
          description="Can\u2019t find what you need? Our team replies within 24 hours."
          align="center"
        />
        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 dark:divide-slate-800 dark:bg-slate-900 dark:ring-slate-800">
          {faqs.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpen((x) => (x === i ? -1 : i))}
              className="flex w-full flex-col items-start p-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <div className="flex w-full items-center justify-between gap-4">
                <span className="font-semibold text-slate-900 dark:text-white">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition ${open === i ? 'rotate-180' : ''}`}
                />
              </div>
              {open === i && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{f.a}</p>
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
