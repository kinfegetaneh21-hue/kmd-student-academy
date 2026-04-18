import { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { site } from '../../data/siteConfig';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-gradient-to-r from-brand-700 via-brand-600 to-accent-500 text-white">
      <div className="container-px mx-auto flex max-w-7xl items-center justify-center gap-3 py-2 text-xs sm:text-sm">
        <Megaphone className="h-4 w-4 shrink-0" />
        <p className="truncate">
          <span className="font-semibold">{site.announcement}</span>{' '}
          <Link to="/pricing" className="underline decoration-white/60 underline-offset-2 hover:decoration-white">
            See plans
          </Link>
        </p>
        <button
          aria-label="Dismiss"
          onClick={() => setOpen(false)}
          className="ml-auto hidden rounded-md p-1 hover:bg-white/10 sm:inline-flex"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
