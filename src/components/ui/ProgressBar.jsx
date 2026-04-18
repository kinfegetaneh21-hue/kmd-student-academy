export default function ProgressBar({ value = 0, className = '' }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
