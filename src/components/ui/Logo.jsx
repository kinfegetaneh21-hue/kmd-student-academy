import { Link } from 'react-router-dom';

export default function Logo({ className = '', compact = false }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-soft">
        <span className="font-display text-lg font-extrabold">K</span>
        <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-950" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
            KMD Student <span className="gradient-text">Academy</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Learn · Rise · Lead
          </span>
        </span>
      )}
    </Link>
  );
}
