import { Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LockOverlay({ title = 'Premium content', subtitle = 'Upgrade to unlock this material.' }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-slate-950/60 p-6 text-center text-white backdrop-blur-sm">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/90 shadow-soft">
        <Lock className="h-6 w-6" />
      </div>
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-slate-200">{subtitle}</p>
      <Link to="/pricing" className="btn-accent mt-4">
        <Sparkles className="h-4 w-4" /> Upgrade now
      </Link>
    </div>
  );
}
