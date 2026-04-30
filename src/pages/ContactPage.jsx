import { useState } from 'react';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { site } from '../data/siteConfig';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="We\u2019d love to hear from you."
        description="Support replies within 24 hours. Partnerships, feedback, bug reports — anything at all."
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Reach us</h2>
          <ul className="mt-5 space-y-4">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                <Mail className="h-4 w-4" />
              </div>
              {site.email}
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                <Phone className="h-4 w-4" />
              </div>
              {site.phone}
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                <MapPin className="h-4 w-4" />
              </div>
              {site.address}
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card-padded space-y-4"
        >
          {sent && (
            <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
              Thanks! We\u2019ll get back to you within 24 hours.
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Name</span>
              <input required className="input mt-1.5" placeholder="Your full name" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
              <input required type="email" className="input mt-1.5" placeholder="you@university.edu" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Subject</span>
            <input required className="input mt-1.5" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Message</span>
            <textarea required rows={5} className="input mt-1.5" />
          </label>
          <button type="submit" className="btn-primary">
            <Send className="h-4 w-4" /> Send message
          </button>
        </form>
      </Container>
    </>
  );
}
