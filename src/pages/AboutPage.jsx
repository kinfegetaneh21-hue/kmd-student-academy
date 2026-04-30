import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import { Sparkles, Target, Users, Award } from 'lucide-react';

const values = [
  { icon: Target, title: 'Student outcomes first', text: 'Every feature is measured by student results.' },
  { icon: Users, title: 'Built with students', text: 'Shaped by hundreds of Ethiopian learners.' },
  { icon: Award, title: 'Expert teachers', text: 'University lecturers and field experts only.' },
  { icon: Sparkles, title: 'Modern & accessible', text: 'Affordable pricing, no data hogging, works on slow networks.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About KMD"
        title="We\u2019re building the future of university learning in Ethiopia."
        description="KMD Student Academy was founded to give every Ethiopian student — from freshman to 7th year — access to world-class learning materials, in one place, in one platform."
      />
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Our mission</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Make premium university learning affordable and accessible — freshman courses free for life, and
              year-based premium content for every department.
            </p>
            <h3 className="mt-10 text-xl font-bold text-slate-900 dark:text-white">Our story</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              KMD started as a YouTube channel helping freshman students with math and English. Today it\u2019s a full
              LMS used by 24,800+ students across 40+ universities.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card-padded">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                  <v.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-white">{v.title}</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
