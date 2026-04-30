import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ClipboardList, Download, PlayCircle } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import ProgressBar from '../ui/ProgressBar';

export default function DashboardPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Your LMS portal"
              title="A student dashboard that actually helps you study."
              description="Continue watching, track progress, download notes, submit assignments and chat with your AI tutor — all in one clean dashboard."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary">
                Open my dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-outline">See premium tools</Link>
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="rounded-3xl bg-white p-4 shadow-glow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <div className="grid gap-4 sm:grid-cols-5">
                <div className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 p-5 text-white">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Continue learning</div>
                  <div className="mt-1 text-lg font-bold">Intro to AI — Lecture 3</div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <PlayCircle className="h-4 w-4" />
                    <span>Resume at 12:40</span>
                  </div>
                  <ProgressBar value={54} className="mt-4 !bg-white/20" />
                </div>
                <div className="sm:col-span-3 grid grid-cols-2 gap-3">
                  {[
                    { k: '6', v: 'Enrolled', i: BookOpen },
                    { k: '12', v: 'New notes', i: Download },
                    { k: '3', v: 'Assignments', i: ClipboardList },
                    { k: '84%', v: 'Avg. score', i: PlayCircle },
                  ].map((s) => (
                    <div key={s.v} className="card-padded flex items-center gap-3 !p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                        <s.i className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">{s.k}</div>
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{s.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Today\u2019s plan</div>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Watch: Kirchhoff\u2019s Laws</span>
                    <span className="chip-brand">Circuits · 19m</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Read: ER Modeling notes</span>
                    <span className="chip-accent">Databases · 12m</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Quiz: Critical Thinking — Module 1</span>
                    <span className="chip-success">Due today</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
