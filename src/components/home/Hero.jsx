import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, PlayCircle, Youtube, ShieldCheck, Star } from 'lucide-react';
import Container from '../ui/Container';
import { site } from '../../data/siteConfig';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <Container className="relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="section-kicker">
              <Sparkles className="h-3.5 w-3.5" />
              New — 2nd–7th year content now live
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              The smartest way for Ethiopian <br className="hidden sm:block" />
              students to <span className="gradient-text">master every course</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Free for all freshmen. Premium libraries for 2nd–7th year students — videos, notes, quizzes,
              downloadable materials and an AI tutor, all in one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/signup" className="btn-primary">
                <Sparkles className="h-4 w-4" /> Start free as a freshman
              </Link>
              <Link to="/pricing" className="btn-accent">
                Go premium
              </Link>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Youtube className="h-4 w-4 text-red-500" /> Watch on YouTube
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-600 dark:text-slate-400">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Trusted by 40+ Ethiopian universities
              </div>
              <div className="inline-flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1 font-semibold text-slate-700 dark:text-slate-200">4.9 / 5</span>
                <span className="text-slate-500">from 12,000+ students</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-glow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60"
                  alt="Students learning together"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur dark:bg-slate-950/80">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                        <PlayCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Now playing</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Intro to Emerging Technologies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 p-3 pt-4">
                {[
                  { k: '24.8k', v: 'Students' },
                  { k: '3.2k+', v: 'Videos' },
                  { k: '80h', v: 'Exit Prep' },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
                    <div className="font-display text-lg font-extrabold text-slate-900 dark:text-white">{s.k}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-6 -top-6 hidden rotate-6 rounded-2xl bg-white p-4 shadow-glow ring-1 ring-slate-200 sm:block dark:bg-slate-900 dark:ring-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Exit Exam</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">80h Masterclass</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
