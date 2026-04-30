import { BadgeCheck, BookOpen, Brain, Crown, PlayCircle, ShieldCheck, Users, Zap } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const reasons = [
  { icon: BookOpen, title: 'Built for Ethiopian curricula', text: 'Aligned with freshman, 2nd–7th year and exit exam structures.' },
  { icon: PlayCircle, title: '3,200+ video lessons', text: 'From freshman math to 7th year exit exam masterclasses.' },
  { icon: Brain, title: 'AI tutor, 24/7', text: 'Stuck at midnight? KMD-AI answers your study questions instantly.' },
  { icon: Crown, title: 'Premium, not pretentious', text: 'Affordable plans starting from 299 ETB / month.' },
  { icon: ShieldCheck, title: 'Safe & secure accounts', text: 'Role-based access for students and administrators.' },
  { icon: Users, title: 'Community of 24,800+', text: 'Learn alongside motivated students across 40+ universities.' },
  { icon: BadgeCheck, title: 'Verified instructors', text: 'Taught by university lecturers and field experts.' },
  { icon: Zap, title: 'Mobile-first', text: 'Works beautifully on every phone and laptop, online or offline.' },
];

export default function WhyChoose() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          kicker="Why KMD"
          title="Designed for the reality of Ethiopian universities."
          description="We listened to hundreds of students. KMD is the result."
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="card-padded group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-950 dark:text-brand-300">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-white">{r.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{r.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
