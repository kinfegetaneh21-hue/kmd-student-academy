import { useState } from 'react';
import { PlayCircle, Lock, Clock } from 'lucide-react';
import { youtubeThumb } from '../../data/youtube';
import Badge from '../ui/Badge';
import LockOverlay from '../ui/LockOverlay';
import { useAuth } from '../../context/AuthContext';

export default function YouTubeCard({ video, embedded = false }) {
  const [playing, setPlaying] = useState(false);
  const { isPremium } = useAuth();
  const locked = video.access === 'premium' && !isPremium;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-slate-900 dark:ring-slate-800">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {playing && !locked ? (
          <iframe
            title={video.title}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={youtubeThumb(video.youtubeId)}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            {!locked && (
              <button
                aria-label={`Play ${video.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (embedded) setPlaying(true);
                  else window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
                }}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/10 transition hover:bg-slate-950/30"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand-600 shadow-glow transition group-hover:scale-110">
                  <PlayCircle className="h-8 w-8" />
                </span>
              </button>
            )}
            <div className="absolute left-3 top-3 flex gap-2">
              <Badge variant={video.access === 'free' ? 'success' : 'accent'}>
                {video.access === 'premium' && <Lock className="h-3 w-3" />}
                {video.access === 'free' ? 'Free' : 'Premium'}
              </Badge>
              <Badge variant="brand">{video.tag}</Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-950/70 px-2 py-1 text-xs font-semibold text-white">
                <Clock className="h-3 w-3" /> {video.duration}
              </span>
            </div>
            {locked && <LockOverlay />}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-slate-900 dark:text-white">
          {video.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{video.description}</p>
      </div>
    </div>
  );
}
