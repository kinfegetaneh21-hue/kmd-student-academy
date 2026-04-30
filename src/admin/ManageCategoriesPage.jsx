import { academicYears, departments } from '../data/siteConfig';
import { Layers, BookOpen, GraduationCap } from 'lucide-react';

export default function ManageCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Categories & Years</h1>
        <p className="text-sm text-slate-500">Structure used across the platform. Admin-only.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-padded">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-brand-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Academic years</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {academicYears.map((y) => (
              <li key={y.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900">
                <span className="font-semibold text-slate-800 dark:text-slate-100">{y.label}</span>
                <span className={y.access === 'free' ? 'chip-success' : 'chip-accent'}>{y.access}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-padded">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-accent-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">Departments</h3>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {departments.map((d) => (
              <li key={d.id} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900">
                <BookOpen className="h-4 w-4 text-brand-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-100">{d.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
